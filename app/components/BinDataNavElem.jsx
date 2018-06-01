import React from 'react';
import { SketchPicker } from 'react-color';
import { Slider, SingleButton, NavItemWrapper } from './GenericElements.jsx';
import BlockNames from './BlockNames.js';

const BinarizeDataContainer = ({
  onToggleNavItem,
  onToggleExpandedData,
  onSetColorPaletteValue,
  onSetSliderValue,
  onBinarizeImage,
  binData
}) => {
  const {
    opened,
    collapsed,
    border,
    lowHexColor,
    highHexColor,
    lowRGBColor,
    highRGBColor
  } = binData;

  const onColorChange = (name, color) => {
    const { r, g, b } = color.rgb;
    onSetColorPaletteValue({
      blockName: BlockNames.BIN_DATA,
      name: name,
      hex: color.hex,
      rgb: { red: r, green: g, blue: b }
    });
  };

  const onSliderChange = (value, sliderName) => {
    onSetSliderValue({
      blockName: BlockNames.BIN_DATA,
      sliderName: 'bin-data-border',
      value
    });
  };

  return (
    <NavItemWrapper
      blockName={BlockNames.BIN_DATA}
      title="Свойства бинаризации"
      opened={opened}
      collapsed={collapsed}
      onToggleExpandedData={onToggleExpandedData}
      onToggleNavItem={onToggleNavItem}
    >
      <p>Порого яркости {border}</p>
      <p>
        Нижний цвет
        <span
          className="color-view"
          style={{ backgroundColor: lowHexColor }}
        />
      </p>
      <p>
        Верхний цвет
        <span
          className="color-view"
          style={{ backgroundColor: highHexColor }}
        />
      </p>
      <SingleButton
        name="Бинаризировать"
        data={{ border, lowRGBColor, highRGBColor }}
        action={onBinarizeImage}
      />
      <ExpandedBinData
        onColorChange={onColorChange}
        onSliderChange={onSliderChange}
        border={border}
        lowHexColor={lowHexColor}
        highHexColor={highHexColor}
      />
    </NavItemWrapper>
  );
};

const ExpandedBinData = ({
  onColorChange,
  onSliderChange,
  border,
  lowHexColor,
  highHexColor
}) => (
  <div className="expanded-nav-item bin-data">
    <Slider
      min="1"
      max="255"
      value={border}
      name="binarize"
      onSliderChange={onSliderChange}
    />
    <div className="col-container">
      <label>Цвет нижненого порога</label>
      <SketchPicker
        color={lowHexColor}
        onChangeComplete={(color) => onColorChange('low', color)}
      />
    </div>
    <div className="col-container">
      <label>Цвет верхнего порога</label>
      <SketchPicker
        color={highHexColor}
        onChangeComplete={(color) => onColorChange('high', color)}
      />
    </div>
  </div>
);

export default BinarizeDataContainer;
