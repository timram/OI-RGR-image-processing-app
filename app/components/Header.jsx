import React from 'react';
import {
  ImageLoaderContainer,
  PlotButtonsDropDownContainer,
  FiltersButtonsDropDownContainer,
  ActionsButtonsDropDownContainer,
  FindBordersButtonsDropDownContainer
} from '../containers/navigation';

export default () => (
  <div className="header">
    <div className="navigation">
      <ImageLoaderContainer />
      <ActionsButtonsDropDownContainer />
      <PlotButtonsDropDownContainer />
      <FiltersButtonsDropDownContainer />
      <FindBordersButtonsDropDownContainer />
    </div>
  </div>
);
