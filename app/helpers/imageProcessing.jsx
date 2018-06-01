import { savedableActions } from '../actions/ImageActionTypes.js';
import ImageActionsTypes from '../actions/ImageActionTypes.js';

const worker = new Worker('./app/helpers/worker.js');

class ImageActionController {
  constructor () {
    this._canvas = null;
    this._ctx = null;
    this._savedPixelData = null;
    this._previousAction = null;
    this._originalPixels = null;
  }

  setCanvas (canvas) {
    this._canvas = canvas;
    this._ctx = canvas.getContext('2d');
    this._savedPixelData = this._ctx.getImageData(0, 0, canvas.width, canvas.height);
    this._originalPixels = this._savedPixelData.data;
    this._previousAction = ImageActionsTypes.LOAD_IMAGE;
  }

  resetCanvas () {
    const imageData = this._ctx.getImageData(0, 0, this._canvas.width, this._canvas.height);
    imageData.data.set(this._originalPixels);
    this._savedPixelData = imageData;
    this._ctx.putImageData(imageData, 0, 0);
    this._previousAction = ImageActionsTypes.RESET_IMAGE;
  }

  saveImageData (imageData, actionType) {
    this._ctx.putImageData(imageData, 0, 0);

    if (savedableActions[actionType]) {
      this._savedPixelData = this._ctx.getImageData(0, 0, this._canvas.width, this._canvas.height);
    }

    this._previousAction = actionType;
  }

  getImageData (actionType) {
    if (savedableActions[actionType] || this._previousAction !== actionType) {
      this._savedPixelData = this._ctx.getImageData(0, 0, this._canvas.width, this._canvas.height);
      return this._ctx.getImageData(0, 0, this._canvas.width, this._canvas.height);
    }
    const imagePixelDataCopy = this._ctx.createImageData(this._canvas.width, this._canvas.height);
    imagePixelDataCopy.data.set(this._savedPixelData.data);

    return imagePixelDataCopy;
  }

  getCurrentPixelData () {
    if (!this._ctx) {
      throw new Error('there is not image');
    }

    return this._ctx.getImageData(0, 0, this._canvas.width, this._canvas.height).data;
  }

  getCanvasDimentions () {
    return {
      width: this._canvas.width,
      height: this._canvas.height
    };
  }
}

const controller = new ImageActionController();

function loadImage ({ actionData, canvas, onSaveImageProfile }) {
  const imageElem = new Image();
  const imageSrc = actionData.src;

  imageElem.addEventListener('load', () => {
    const { width, height } = imageElem;

    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext('2d');

    ctx.drawImage(imageElem, 0, 0);

    controller.setCanvas(canvas);

    const imageData = controller.getImageData(ImageActionsTypes.LOAD_IMAGE);

    worker.postMessage({
      action: ImageActionsTypes.GET_BRIGHTNESS_PROFILE,
      pixels: imageData.data,
      actionData: { ...actionData, ...controller.getCanvasDimentions() },
    });

    worker.onmessage = (message) => {
      const { data: { brightnessProfile } } = message;

      onSaveImageProfile({ ...brightnessProfile, width, height });
    };
  });

  imageElem.src = imageSrc;
}

function resetImage (actionData, onSaveImageProfile) {
  controller.resetCanvas();

  worker.postMessage({
    action: ImageActionsTypes.GET_BRIGHTNESS_PROFILE,
    pixels: controller.getCurrentPixelData(),
    actionData: { ...actionData, ...controller.getCanvasDimentions() },
  });

  worker.onmessage = (message) => {
    const { data: { brightnessProfile } } = message;

    onSaveImageProfile({ ...brightnessProfile });
  };
}

function updateImage ({ action, actionData, canvas, onSaveImageProfile }) {
  const imageData = controller.getImageData(action);

  worker.postMessage({
    action,
    actionData: { ...actionData, ...controller.getCanvasDimentions() },
    pixels: imageData.data
  });

  worker.onmessage = (message) => {
    const { data: { pixels, brightnessProfile } } = message;
    imageData.data.set(pixels);
    controller.saveImageData(imageData, action);

    onSaveImageProfile({ ...brightnessProfile });
  };
}

function updateImageBrightnessProfile ({ action, actionData, onSaveImageProfile }) {
  const imageData = controller.getImageData(action);

  worker.postMessage({
    action,
    actionData: { ...actionData, ...controller.getCanvasDimentions() },
    pixels: imageData.data
  });

  worker.onmessage = (message) => {
    const { data: { brightnessProfile } } = message;

    onSaveImageProfile({ ...brightnessProfile });
  };
}

export default ({ action, actionData, canvas, onSaveImageProfile }) => {
  if (action === ImageActionsTypes.LOAD_IMAGE) {
    return loadImage({
      actionData,
      canvas,
      onSaveImageProfile
    });
  }

  if (action === ImageActionsTypes.RESET_IMAGE) {
    return resetImage(actionData, onSaveImageProfile);
  }

  if (action === ImageActionsTypes.GET_BRIGHTNESS_PROFILE) {
    return updateImageBrightnessProfile({ action, actionData, onSaveImageProfile });
  }

  updateImage({ action, actionData, canvas, onSaveImageProfile });
};

