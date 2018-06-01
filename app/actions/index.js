import ActionTypes from './ActionTypes.js';

export const loadImage = ({ name, type, src, size }) => ({
  type: ActionTypes.LOAD_IMAGE,
  payload: { name, type, src, size }
});

export const toggleImage = () => ({ type: ActionTypes.TOGGLE_IMAGE });

export const toggleDrawCanvas = () => ({ type: ActionTypes.TOGGLE_DRAW_CANVAS });

export const pixelColorChanged = color => ({
  type: ActionTypes.PIXEL_COLOR_CHANGED,
  payload: { color }
});

export const resetImage = () => ({ type: ActionTypes.RESET_IMAGE });

export const invertImage = () => ({ type: ActionTypes.INVERT_IMAGE });

export const grayscaleImage = () => ({ type: ActionTypes.GRAYSCALE_IMAGE });

export const binarizeImage = ({ border, lowValue, highValue }) => ({
  type: ActionTypes.BINARIZE_IMAGE,
  payload: { border, lowValue, highValue }
});

export const changeContrast = (correction) => ({
  type: ActionTypes.CHANGE_CONTRAST,
  payload: { correction }
});

export const changeBrightness = (coof) => ({
  type: ActionTypes.CHANGE_BRIGHTNESS,
  payload: { coof }
});

export const toggleNavItem = (blockName) => ({
  type: ActionTypes.TOGGLE_NAV_ITEM,
  payload: { blockName }
});

export const toggleExpandedData = (blockName) => ({
  type: ActionTypes.TOGGLE_EXPANDED_DATA,
  payload: { blockName }
});

export const setSliderValue = ({ blockName, sliderName, value }) => ({
  type: ActionTypes.SET_SLIDER_VALUE,
  payload: {
    blockName,
    name: sliderName,
    value
  } 
});

export const setColorPaletteValue = ({ blockName, name, hex, rgb }) => ({
  type: ActionTypes.SET_COLOR_PALETTE_VALUE,
  payload: { blockName, name, hex, rgb }
});

export const setSelectorValue = ({ blockName, name, value }) => ({
  type: ActionTypes.SET_SELECTOR_VALUE,
  payload: { blockName, name, value }
});

export const savePixelDataProfile = ({
  brightness,
  red,
  green,
  blue,
  lineProfileData,
  width,
  height
}) => ({
  type: ActionTypes.SAVE_IMAGE_PROFILE,
  payload: { brightness, red, green, blue, lineProfileData, width, height }
});

export const saveLinePoints = ({ startPoint, endPoint }) => ({
  type: ActionTypes.SAVE_LINE_POINTS,
  payload: { startPoint, endPoint }
});

export const updateDrawCanvas = ({ startPoint, startPointConfirmed, endPoint, endPointConfirmed, color }) => ({
  type: ActionTypes.UPDATE_DRAW_CANVAS,
  payload: { startPoint, startPointConfirmed, endPoint, endPointConfirmed, color }
});

export const saveBrightnessPlotProps = ({ blockName, brightness, red, green, blue }) => ({
  type: ActionTypes.SAVE_BRIGHTNESS_PLOT_PROPS,
  payload: { blockName, brightness, red, green, blue }
});

export const applySoldPepperNoise = probability => ({
  type: ActionTypes.APPLY_SOLD_PEPPER_NOISE,
  payload: { probability }
});

export const applySinusNoise = ({ amplitude, period, direction }) => ({
  type: ActionTypes.APPLY_SINUS_NOISE,
  payload: { amplitude, period, direction }
});

export const applyLineFiltering = () => ({
  type: ActionTypes.LINE_FILTERING
});

export const applyNotLineFiltering = () => ({
  type: ActionTypes.NOT_LINE_FILTERING
});

export const findBorders = (methodName) => ({
  type: ActionTypes.FIND_BORDERS,
  payload: { methodName }
});