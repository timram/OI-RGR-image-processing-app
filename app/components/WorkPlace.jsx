import React from 'react';
import {
  CanvasContainer,
  DrawCanvasContainer,
  PixelColorContainer,
  ImageContainer,
  ImageBrightnessProfileContainer,
  LineBrightnessProfileContainer
} from '../containers/workplace.js';

export default () => (
  <div className="col-container work-place">
    <ImageContainer />
    <div className="canvas-container">
      <div className="canvas-wrapper">
        <CanvasContainer />
        <DrawCanvasContainer />
      </div>
      <PixelColorContainer />
      <ImageBrightnessProfileContainer />
      <LineBrightnessProfileContainer />
    </div>
  </div>
);
