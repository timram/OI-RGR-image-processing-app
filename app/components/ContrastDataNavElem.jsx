import React from 'react';
import { Slider, SingleButton, NavItemWrapper } from './GenericElements.jsx';
import BlockNames from './BlockNames.js';

const ContrastDataContainer = ({
  onToggleNavItem,
  onToggleExpandedData,
  onSetSliderValue,
  onChangeContrast,
  contrastData 
}) => { 
  const { correction, opened, collapsed } = contrastData;

  const onSliderChange = (value) => {
    onSetSliderValue({
      blockName: BlockNames.CONTRAST_DATA,
      sliderName: 'contrast-data-correction',
      value
    });
  };

  return (
    <NavItemWrapper
      blockName={BlockNames.CONTRAST_DATA}
      title="Свойства контрасности"
      opened={opened}
      collapsed={collapsed}
      onToggleExpandedData={onToggleExpandedData}
      onToggleNavItem={onToggleNavItem}
    >
      <p>Коэффициент коррекции: {correction}</p>
      <SingleButton
        name="Изменить"
        data={{ correction }}
        action={onChangeContrast}
      />
      <div className="expanded-nav-item contrast-data">
        <Slider
          min="-100"
          max="100"
          value={correction}
          name="contrast"
          onSliderChange={onSliderChange}
        />
      </div>
    </NavItemWrapper>
  );
};

export default ContrastDataContainer;
