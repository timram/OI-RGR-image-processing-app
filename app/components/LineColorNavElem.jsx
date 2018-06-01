import React from 'react';
import { SketchPicker } from 'react-color';
import { NavItemWrapper } from './GenericElements.jsx';
import BlockNames from './BlockNames.js';

const LineColorDataContainer = ({
  onToggleNavItem,
  onToggleExpandedData,
  onUpdateDrawCanvas,
  lineData,
  stateData
}) => {
  const { opened, collapsed } = stateData;
  const { color } = lineData;

  const onColorChange = color => onUpdateDrawCanvas(color.hex);

  return (
    <NavItemWrapper
      blockName={BlockNames.LINE_COLOR}
      title="Свойства линий"
      opened={opened}
      collapsed={collapsed}
      onToggleExpandedData={onToggleExpandedData}
      onToggleNavItem={onToggleNavItem}
    >
      <p>
        Цвет:
        <span
          className="color-view"
          style={{ backgroundColor: color }}
        />
      </p>
      <div className="expanded-nav-item">
        <SketchPicker
          color={color}
          onChangeComplete={onColorChange}
        />
      </div>
    </NavItemWrapper>
  );
};

export default LineColorDataContainer;
