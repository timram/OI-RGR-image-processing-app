export const savedableActions = {
  loadImage: 1,
  resetImage: 1,
  invertImage: 1,
  grayscaleImage: 1,
  binarizeImage: 1
};

export default {
  LOAD_IMAGE: 'loadImage',
  RESET_IMAGE: 'resetImage',
  INVERT_IMAGE: 'invertImage',
  GRAYSCALE_IMAGE: 'grayscaleImage',
  BINARIZE_IMAGE: 'binarizeImage',
  CHANGE_CONTRAST: 'changeContrast',
  CHANGE_BRIGHTNESS: 'changeBrightness',
  GET_BRIGHTNESS_PROFILE: 'getBrightnessProfile',
  APPLY_SOLD_PEPPER_NOISE: 'applySoldPepperNoise',
  APPLY_SINUS_NOISE: 'applySinusNoise',
  APPLY_LINE_FILTERING: 'applyLineFiltering',
  APPLY_NOT_LINE_FILTERING: 'applyNotLineFiltering',
  FIND_BORDERS: 'findBorders',
  NONE: 'none'
};
