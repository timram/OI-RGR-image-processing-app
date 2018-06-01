import ActionTypes from '../actions/ActionTypes.js';

const initState = {
  rgbColor: null
};

const pixelReducer = (state = initState, action) => {
  switch (action.type) {
    case ActionTypes.PIXEL_COLOR_CHANGED:
      const { color } = action.payload;

      return { ...state, rgbColor: color };

    default:
      return state;
  }
};

export default pixelReducer;
