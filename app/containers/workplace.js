import { connect } from 'react-redux';
import { ImageCanvas, DrawCanvas } from '../components/Canvas.jsx';
import PixelColor from '../components/PixelColor.jsx';
import OriginalImage from '../components/OriginalImage.jsx';
import {
  pixelColorChanged,
  savePixelDataProfile,
  updateDrawCanvas,
  saveLinePoints
} from '../actions';
import { ImageBrightnessDiagram, ProfileBrightnessDiagram } from '../components/Diagrams.jsx';

export const CanvasContainer = connect(
  state => ({ imageData: state.canvasReducer }),
  dispatch => ({
    onPixelColorChanged: (color) => {
      dispatch(pixelColorChanged(color));
    },
    onSaveImageProfile: (profile) => {
      dispatch(savePixelDataProfile(profile));
    }
  })
)(ImageCanvas);

export const PixelColorContainer = connect(
  state => ({ pixelColor: state.pixelColor }),
  null
)(PixelColor);

export const ImageContainer = connect(
  state => ({ imageData: state.imageReducer }),
  null
)(OriginalImage);

export const ImageBrightnessProfileContainer = connect(
  state => ({ profileData: state.imageProfileReducer }),
  null
)(ImageBrightnessDiagram);

export const LineBrightnessProfileContainer = connect(
  state => ({ profileData: state.lineProfileReducer }),
  null
)(ProfileBrightnessDiagram);

export const DrawCanvasContainer = connect(
  state => ({ canvasData: state.drawCanvasReducer, /* lineData: state.lineProfileReducer */ }),
  dispatch => ({
    onUpdateDrawCanvas: ({ startPoint, startPointConfirmed, endPoint, endPointConfirmed }) => {
      dispatch(updateDrawCanvas({ startPoint, startPointConfirmed, endPoint, endPointConfirmed }));
    },
    onSaveLinePoints: (startPoint, endPoint) => {
      dispatch(saveLinePoints({ startPoint, endPoint }));
    }
  })
)(DrawCanvas);
