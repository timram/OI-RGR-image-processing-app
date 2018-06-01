import React from 'react';
import { NavItemWrapper } from './GenericElements.jsx';
import BlockNames from './BlockNames';

export default ({ imageInfo, onToggleNavItem }) => {
  let { name, type, size, collapsed } = imageInfo;

  name = name || '';
  type = type || '';
  size = size || '';

  return (
    <NavItemWrapper
      blockName={BlockNames.IMAGE_DESCRIPTION}
      title="Свойства изображения"
      collapsed={collapsed}
      onToggleNavItem={() => onToggleNavItem(BlockNames.IMAGE_DESCRIPTION)}
    >
      <p>Имя: {name}</p>
      <p>Тип: {type}</p>
      <p>Размер: {size}</p>
    </NavItemWrapper>
  );
};
