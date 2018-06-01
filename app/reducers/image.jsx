import ActionTypes from '../actions/ActionTypes.js';
import ImageActionTypes from '../actions/ImageActionTypes.js';
import BlockNames from '../components/BlockNames.js';

const initImageState = {
  src: null,
  opened: false
};

export const imageReducer = (state = initImageState, action) => {
  switch (action.type) {
    case ActionTypes.LOAD_IMAGE:
      const { payload: { src } } = action;
      if (!src) {
        return state;
      }

      return { ...state, src };

    case ActionTypes.TOGGLE_IMAGE:
      if (state.src === null) {
        return { ...state, opened: false };
      }

      return {
        ...state,
        opened: !state.opened
      };

    default:
      return state;
  }
};

const initImageDescriptionState = {
  name: null,
  type: null,
  size: null,
  collapsed: true
};

export const imageDescriptionReducer = (state = initImageDescriptionState, action) => {
  switch (action.type) {
    case ActionTypes.LOAD_IMAGE:
      const { payload: { name, type, size } } = action;
      if (!name || !type || !size) {
        return state;
      }

      return { ...state, name, type, size };

    case ActionTypes.TOGGLE_NAV_ITEM:
      if (action.payload.blockName !== BlockNames.IMAGE_DESCRIPTION) {
        return state;
      }

      return { ...state, collapsed: !state.collapsed };

    default:
      return state;
  }
};

const initCanvasState = {
  imageSrc: null,
  action: ImageActionTypes.NONE,
  actionData: null,
  startProfilePoint: null,
  endProfilePoint: null
};

export const canvasReducer = (state = initCanvasState, action) => {
  switch (action.type) {
    case ActionTypes.LOAD_IMAGE:
      const { src } = action.payload;
      if (!src) {
        return state;
      }

      return {
        ...state,
        imageSrc: src,
        action: ImageActionTypes.LOAD_IMAGE,
        actionData: { src }
      };

    case ActionTypes.RESET_IMAGE:
      if (state.imageSrc === null) {
        return state;
      }

      return {
        ...state,
        action: ImageActionTypes.RESET_IMAGE,
        actionData: null
      };

    case ActionTypes.INVERT_IMAGE:
      if (state.imageSrc === null) {
        return state;
      }

      return {
        ...state,
        action: ImageActionTypes.INVERT_IMAGE,
        actionData: null
      };

    case ActionTypes.GRAYSCALE_IMAGE:
      if (state.imageSrc === null) {
        return state;
      }

      return {
        ...state,
        action: ImageActionTypes.GRAYSCALE_IMAGE,
        actionData: null
      };

    case ActionTypes.BINARIZE_IMAGE:
      if (state.imageSrc === null) {
        return state;
      }

      return {
        ...state,
        action: ImageActionTypes.BINARIZE_IMAGE,
        actionData: action.payload
      };

    case ActionTypes.CHANGE_CONTRAST:
      if (state.imageSrc === null) {
        return state;
      }

      return {
        ...state,
        action: ImageActionTypes.CHANGE_CONTRAST,
        actionData: action.payload
      };

    case ActionTypes.CHANGE_BRIGHTNESS:
      if (state.imageSrc === null) {
        return state;
      }

      return {
        ...state,
        action: ImageActionTypes.CHANGE_BRIGHTNESS,
        actionData: action.payload
      };

    case ActionTypes.APPLY_SOLD_PEPPER_NOISE:
      if (state.imageSrc === null) {
        return state;
      }

      const { probability } = action.payload;

      return {
        ...state,
        action: ImageActionTypes.APPLY_SOLD_PEPPER_NOISE,
        actionData: { probability }
      };

    case ActionTypes.APPLY_SINUS_NOISE:
      if (state.imageSrc === null) {
        return state;
      }

      const { amplitude, period, direction } = action.payload;
      if (!amplitude || !period || !direction) {
        return state;
      }

      return {
        ...state,
        action: ImageActionTypes.APPLY_SINUS_NOISE,
        actionData: { amplitude, period, direction }
      };

    case ActionTypes.LINE_FILTERING:
      if (state.imageSrc === null) {
        return state;
      }

      return {
        ...state,
        action: ImageActionTypes.APPLY_LINE_FILTERING,
        actionData: null
      };

    case ActionTypes.NOT_LINE_FILTERING:
      if (state.imageSrc === null) {
        return state;
      }

      return {
        ...state,
        action: ImageActionTypes.APPLY_NOT_LINE_FILTERING,
        actionData: null
      };

    case ActionTypes.SAVE_LINE_POINTS:
      if (state.imageSrc === null) {
        return state;
      }

      const { startPoint, endPoint } = action.payload;

      return {
        ...state,
        action: ImageActionTypes.GET_BRIGHTNESS_PROFILE,
        startProfilePoint: startPoint,
        actionData: {},
        endProfilePoint: endPoint
      };
    
    case ActionTypes.FIND_BORDERS:
      if (state.imageSrc === null) {
        return state;
      }

      return {
        ...state,
        action: ImageActionTypes.FIND_BORDERS,
        actionData: action.payload
      };

    default:
      return state;
  }
};

const initDrawCanvasState = {
  width: null,
  height: null,
  startPoint: null,
  endPoint: null,
  confirmed: false,
  color: '#000',
  opened: false
};

export const drawCanvasReducer = (state = initDrawCanvasState, action) => {
  switch (action.type) {
    case ActionTypes.SAVE_IMAGE_PROFILE:
      const { width, height } = action.payload;

      if (!width || !height) {
        return state;
      }

      return { ...state, width, height };

    case ActionTypes.UPDATE_DRAW_CANVAS:
      const { startPoint, startPointConfirmed, endPoint, endPointConfirmed, color } = action.payload;

      if (color !== undefined) {
        return { ...state, color };
      }

      if (!state.width || !state.height) {
        return state;
      }

      const updState = {};

      if (startPoint !== undefined) {
        updState.startPoint = startPoint;
      }

      if (startPointConfirmed !== undefined) {
        updState.startPointConfirmed = startPointConfirmed;
      }

      if (endPoint !== undefined) {
        updState.endPoint = endPoint;
      }

      if (endPointConfirmed !== undefined) {
        updState.endPointConfirmed = endPointConfirmed;
      }

      return { ...state, ...updState };

    case ActionTypes.TOGGLE_DRAW_CANVAS:
      return {
        ...state,
        opened: !state.opened
      };

    default:
      return state;
  }
};
