import React from 'react';
import { SingleButton, NavItemWrapper } from './GenericElements.jsx';

const SoldPepperNavElem = ({
  onToggleNavItem,
  onSetSelectorValue,
  onApplySoldPepperNoise,
  soldPepperData
}) => {
  const { collapsed, probability, options } = soldPepperData;

  const selectorOptions = options.map((o, i) => <option key={i} value={o}>{o}</option>);

  const setSelectorValue = (e) => {
    onSetSelectorValue('prob-selector', e.target.value);
  };

  return (
    <NavItemWrapper
      title="Свойства шумов соль/перец"
      collapsed={collapsed}
      onToggleNavItem={onToggleNavItem}
    >
      <p>Вероятность:</p>
      <select onChange={setSelectorValue} value={probability}>
        {selectorOptions}
      </select>
      <SingleButton
        name="Применить"
        data={probability}
        action={onApplySoldPepperNoise}
      />
    </NavItemWrapper>
  );
};

export default SoldPepperNavElem;
