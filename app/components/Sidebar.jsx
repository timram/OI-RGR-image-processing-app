import React from 'react';
import {
  BinarizeImageDataContainer,
  ImageInfoContainer,
  ContrastDataContainer,
  BrightnessDataContainer,
  LineColorDataContainer,
  LineProfilePropsContainer,
  DiagramPropsContainer,
  SoldPepperNavElemContainer,
  SinusNoiseNavElemContainer
} from '../containers/navigation.js';

export default () => (
  <div className="col-container sidebar">
    <ImageInfoContainer />
    <SoldPepperNavElemContainer />
    <SinusNoiseNavElemContainer />
    <LineColorDataContainer />
    <BinarizeImageDataContainer />
    <ContrastDataContainer />
    <BrightnessDataContainer />
    <DiagramPropsContainer />
    <LineProfilePropsContainer />
  </div>
);
