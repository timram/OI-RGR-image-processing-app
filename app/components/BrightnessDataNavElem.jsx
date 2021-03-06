import React from 'react';
import { Slider, SingleButton, NavItemWrapper } from './GenericElements.jsx';
import BlockNames from './BlockNames.js';

const BrightnessDataContainer = ({
  onToggleNavItem,
  onToggleExpandedData,
  onSetSliderValue,
  onChangeBrightness,
  brightnessData,
}) => {
  const { coof, opened, collapsed } = brightnessData;

  const onSliderChange = (value) => {
    onSetSliderValue({
      blockName: BlockNames.BRIGHTNESS_DATA,
      sliderName: 'contrast-data-correction',
      value
    });
  };

  return (
    <NavItemWrapper
      blockName={BlockNames.BRIGHTNESS_DATA}
      title="Свойства яркости"
      opened={opened}
      collapsed={collapsed}
      onToggleExpandedData={onToggleExpandedData}
      onToggleNavItem={onToggleNavItem}
    >
      <p>Коэффициент коррекции: {coof}</p>
      <SingleButton
        name="Изменить"
        data={{ coof }}
        action={onChangeBrightness}
      />
      <div className="expanded-nav-item contrast-data">
        <Slider
          min="-100"
          max="100"
          value={coof}
          name="contrast"
          onSliderChange={onSliderChange}
        />
      </div>
    </NavItemWrapper>
  );
};

export default BrightnessDataContainer;
