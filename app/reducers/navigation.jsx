import ActionTypes from '../actions/ActionTypes.js';
import Directions from '../actions/directions.js';
import BlockNames from '../components/BlockNames.js';

const initBinData = {
  opened: false,
  collapsed: true,
  border: 127,
  lowHexColor: '#000',
  highHexColor: '#fff',
  lowRGBColor: { red: 0, green: 0, blue: 0 },
  highRGBColor: { red: 255, green: 255, blue: 255 }
};

export const binDataReducer = (state = initBinData, action) => {
  switch (action.type) {
    case ActionTypes.TOGGLE_NAV_ITEM:
      if (action.payload.blockName !== BlockNames.BIN_DATA) {
        return state;
      }

      return { ...state, collapsed: !state.collapsed };
    
    case ActionTypes.TOGGLE_EXPANDED_DATA:
      if (action.payload.blockName !== BlockNames.BIN_DATA) {
        return state;
      }

      return { ...state, opened: !state.opened };

    case ActionTypes.SET_SLIDER_VALUE:
      if (action.payload.blockName !== BlockNames.BIN_DATA) {
        return state;
      }

      const { value } = action.payload;

      return { ...state, border: value };

    case ActionTypes.SET_COLOR_PALETTE_VALUE:
      if (action.payload.blockName !== BlockNames.BIN_DATA) {
        return state;
      }

      const { name, hex, rgb } = action.payload;

      return {
        ...state,
        [`${name}HexColor`]: hex,
        [`${name}RGBColor`]: rgb
      };

    default:
      return state;
  }
};

const initContrastData = {
  opened: false,
  collapsed: true,
  correction: 0
};

export const contrastDataReducer = (state = initContrastData, action) => {
  switch (action.type) {
    case ActionTypes.TOGGLE_NAV_ITEM:
      if (action.payload.blockName !== BlockNames.CONTRAST_DATA) {
        return state;
      }

      return { ...state, collapsed: !state.collapsed };

    case ActionTypes.TOGGLE_EXPANDED_DATA:
      if (action.payload.blockName !== BlockNames.CONTRAST_DATA) {
        return state;
      }

      return { ...state, opened: !state.opened };

    case ActionTypes.SET_SLIDER_VALUE:
      if (action.payload.blockName !== BlockNames.CONTRAST_DATA) {
        return state;
      }

      const { value } = action.payload;

      return { ...state, correction: value };

    default:
      return state;
  }
};

const initBrightnessData = {
  opened: false,
  collapsed: true,
  coof: 0
};

export const brightnessDataReducer = (state = initBrightnessData, action) => {
  switch (action.type) {
    case ActionTypes.TOGGLE_NAV_ITEM:
      if (action.payload.blockName !== BlockNames.BRIGHTNESS_DATA) {
        return state;
      }

      return { ...state, collapsed: !state.collapsed };

    case ActionTypes.TOGGLE_EXPANDED_DATA:
      if (action.payload.blockName !== BlockNames.BRIGHTNESS_DATA) {
        return state;
      }

      return { ...state, opened: !state.opened };

    case ActionTypes.SET_SLIDER_VALUE:
      if (action.payload.blockName !== BlockNames.BRIGHTNESS_DATA) {
        return state;
      }

      const { value } = action.payload;

      return { ...state, coof: value };

    default:
      return state;
  }
};

const initSoldPepperNoiseNavItemData = {
  collapsed: true,
  probability: 0.1,
  options: [0.1, 0.2, 0.3, 0.4]
};

export const soldPepperNoiseNavItemData = (state = initSoldPepperNoiseNavItemData, action) => {
  switch (action.type) {
    case ActionTypes.TOGGLE_NAV_ITEM:
      if (action.payload.blockName !== BlockNames.SOLD_PEPPER_NOISE_ELEM) {
        return state;
      }

      return { ...state, collapsed: !state.collapsed };

    case ActionTypes.SET_SELECTOR_VALUE:
      if (action.payload.blockName !== BlockNames.SOLD_PEPPER_NOISE_ELEM) {
        return state;
      }

      const { value } = action.payload;

      return { ...state, probability: value };

    default:
      return state;
  }
};

const initSinusNoiseNavItemData = {
  collapsed: true,
  amplitude: 0.6,
  period: 1,
  direction: Directions.vertical,
  amplitudeOptions: [0.6, 0.7, 0.8, 0.9],
  periodOptions: [1, 2, 3, 4],
  directionOptions: Object.keys(Directions).map(d => Directions[d])
};

export const sinusNoiseNavItemData = (state = initSinusNoiseNavItemData, action) => {
  switch (action.type) {
    case ActionTypes.TOGGLE_NAV_ITEM:
      if (action.payload.blockName !== BlockNames.SINUS_NOISE_ELEM) {
        return state;
      }

      return { ...state, collapsed: !state.collapsed };

    case ActionTypes.SET_SELECTOR_VALUE:
      if (action.payload.blockName !== BlockNames.SINUS_NOISE_ELEM) {
        return state;
      }

      const { value, name } = action.payload;

      return { ...state, [name]: value };

    default:
      return state;
  }
};

const initLineColorReducer = {
  opened: false,
  collapsed: true
};

export const lineColorReducer = (state = initLineColorReducer, action) => {
  switch (action.type) {
    case ActionTypes.TOGGLE_EXPANDED_DATA:
      if (action.payload.blockName !== BlockNames.LINE_COLOR) {
        return state;
      }

      return { ...state, opened: !state.opened };

    case ActionTypes.TOGGLE_NAV_ITEM:
      if (action.payload.blockName !== BlockNames.LINE_COLOR) {
        return state;
      }

      return { ...state, collapsed: !state.collapsed };

    default:
      return state;
  }
};

const initImageProfileData = {
  opened: false,
  brightness: {},
  red: {},
  green: {},
  blue: {},
  showBrightness: true,
  showRed: true,
  showGreen: true,
  showBlue: true
};

export const imageProfileReducer = (state = initImageProfileData, action) => {
  switch (action.type) {
    case ActionTypes.TOGGLE_NAV_ITEM:
      if (action.payload.blockName !== BlockNames.IMAGE_BRIGHTNESS_PROFILE) {
        return state;
      }
      return { ...state, opened: !state.opened };

    case ActionTypes.SAVE_IMAGE_PROFILE:
      const { brightness, red, green, blue } = action.payload;

      return { ...state, brightness, red, green, blue };

    case ActionTypes.SAVE_BRIGHTNESS_PLOT_PROPS:
      if (action.payload.blockName !== BlockNames.DIAGRAM_BRIGHTNESS_NAV_ELEM) {
        return state;
      }

      return {
        ...state,
        showBrightness: action.payload.brightness,
        showRed: action.payload.red,
        showGreen: action.payload.green,
        showBlue: action.payload.blue
      };

    default:
      return state;
  }
};

const initDiagramPropsData = {
  collapsed: true,
  brightness: true,
  red: true,
  green: true,
  blue: true
};

export const diagramPropsData = (state = initDiagramPropsData, action) => {
  switch (action.type) {
    case ActionTypes.TOGGLE_NAV_ITEM:
      if (action.payload.blockName !== BlockNames.DIAGRAM_BRIGHTNESS_NAV_ELEM) {
        return state;
      }

      return { ...state, collapsed: !state.collapsed };

    case ActionTypes.SAVE_BRIGHTNESS_PLOT_PROPS:
      if (action.payload.blockName !== BlockNames.DIAGRAM_BRIGHTNESS_NAV_ELEM) {
        return state;
      }

      const { brightness, red, green, blue } = action.payload;

      return { ...state, brightness, red, green, blue };

    default:
      return state;
  }
};

const initLineProfileData = {
  opened: false,
  lineProfileData: [],
  brightness: true,
  red: true,
  green: true,
  blue: true
};

export const lineProfileReducer = (state = initLineProfileData, action) => {
  switch (action.type) {
    case ActionTypes.TOGGLE_NAV_ITEM:
      if (action.payload.blockName !== BlockNames.LINE_BRIGHTNESS_PROFILE) {
        return state;
      }
      return { ...state, opened: !state.opened };

    case ActionTypes.SAVE_IMAGE_PROFILE:
      const { lineProfileData } = action.payload;

      return { ...state, lineProfileData };

    case ActionTypes.SAVE_BRIGHTNESS_PLOT_PROPS:
      if (action.payload.blockName !== BlockNames.LINE_PROFILE_NAV_ELEM) {
        return state;
      }

      const { brightness, red, green, blue } = action.payload;

      return { ...state, brightness, red, green, blue };

    default:
      return state;
  }
};

const initLineProfilePropsData = {
  collapsed: true,
  brightness: true,
  red: true,
  green: true,
  blue: true
};

export const lineProfilePropsData = (state = initLineProfilePropsData, action) => {
  switch (action.type) {
    case ActionTypes.TOGGLE_NAV_ITEM:
      if (action.payload.blockName !== BlockNames.LINE_PROFILE_NAV_ELEM) {
        return state;
      }

      return { ...state, collapsed: !state.collapsed };

    case ActionTypes.SAVE_BRIGHTNESS_PLOT_PROPS:
      if (action.payload.blockName !== BlockNames.LINE_PROFILE_NAV_ELEM) {
        return state;
      }

      const { brightness, red, green, blue } = action.payload;

      return { ...state, brightness, red, green, blue };

    default:
      return state;
  }
};
