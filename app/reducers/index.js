import { combineReducers } from 'redux';
import pixelColor from './pixelColor.jsx';
import {
  imageReducer,
  canvasReducer,
  imageDescriptionReducer,
  drawCanvasReducer
} from './image.jsx';
import {
  binDataReducer,
  contrastDataReducer,
  brightnessDataReducer,
  imageProfileReducer,
  lineColorReducer,
  lineProfileReducer,
  lineProfilePropsData,
  diagramPropsData,
  soldPepperNoiseNavItemData,
  sinusNoiseNavItemData
} from './navigation.jsx';

const appReducer = combineReducers({
  pixelColor,
  imageReducer,
  canvasReducer,
  imageDescriptionReducer,
  binDataReducer,
  contrastDataReducer,
  brightnessDataReducer,
  imageProfileReducer,
  diagramPropsData,
  drawCanvasReducer,
  lineColorReducer,
  lineProfileReducer,
  lineProfilePropsData,
  soldPepperNoiseNavItemData,
  sinusNoiseNavItemData
});

export default appReducer;
