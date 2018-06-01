import React from 'react';
import { SingleButton, NavItemWrapper } from './GenericElements.jsx';

const SinusNoiseNavElem = ({
  onToggleNavItem,
  onSetSelectorValue,
  onApplySinusNoise,
  sinusNoiseData
}) => {
  const {
    collapsed,
    amplitude,
    period,
    direction,
    amplitudeOptions,
    directionOptions,
    periodOptions
  } = sinusNoiseData;

  const ampSelectorOptions = amplitudeOptions.map((o, i) => <option key={i} value={o}>{o}</option>);
  const perSelectorOptions = periodOptions.map((o, i) => <option key={i} value={o}>{o}</option>);
  const dirSelectorOptions = directionOptions.map((o, i) => <option key={i} value={o}>{o}</option>);

  return (
    <NavItemWrapper
      title="Свойства синусоиадльных шумов"
      collapsed={collapsed}
      onToggleNavItem={onToggleNavItem}
    >
      <p>Амплитуда:</p>
      <select onChange={(e) => onSetSelectorValue('amplitude', e.target.value)} value={amplitude}>
        {ampSelectorOptions}
      </select>
      <p>Период:</p>
      <select onChange={(e) => onSetSelectorValue('period', e.target.value)} value={period}>
        {perSelectorOptions}
      </select>
      <p>Направление:</p>
      <select onChange={(e) => onSetSelectorValue('direction', e.target.value)} value={direction}>
        {dirSelectorOptions}
      </select>
      <SingleButton
        name="Применить"
        data={{ amplitude, period, direction }}
        action={onApplySinusNoise}
      />
    </NavItemWrapper>
  );
};

export default SinusNoiseNavElem;
