import React from 'react';
import { NavItemWrapper } from './GenericElements.jsx';

export default ({ title, plotProperties, onToggleNavItem, onSaveLineProfileProps }) => {
  const { collapsed, brightness, red, green, blue } = plotProperties;

  return (
    <NavItemWrapper
      title={title}
      collapsed={collapsed}
      onToggleNavItem={() => onToggleNavItem()}
    >
      <div>
        <span>Яркость</span>
        <input
          type="checkbox"
          checked={brightness ? true : false}
          onChange={() => onSaveLineProfileProps({
            brightness: !brightness,
            red, green, blue
          })}
        />
      </div>
      <div>
        <span>Красны</span>
        <input
          type="checkbox"
          checked={red ? true : false}
          onChange={() => onSaveLineProfileProps({
            red: !red,
            brightness, green, blue
          })}
        />
      </div>
      <div>
        <span>Зеленый</span>
        <input
          type="checkbox"
          checked={green ? true : false}
          onChange={() => onSaveLineProfileProps({
            green: !green,
            red, brightness, blue
          })}
        />
      </div>
      <div>
        <span>Синий</span>
        <input
          type="checkbox"
          checked={blue ? true : false}
          onChange={() => onSaveLineProfileProps({
            blue: !blue,
            red, green, brightness
          })}
        />
      </div>
    </NavItemWrapper>
  );
};
