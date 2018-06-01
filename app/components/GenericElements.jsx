import React from 'react';

export const Slider = ({ min, max, value, name, onSliderChange }) => {
  return (
    <div className="slider-container">
      <input
        type="range"
        min={min}
        max={max}
        step="1"
        value={value}
        onChange={(e) => onSliderChange(e.target.value)}
      />
    </div>
  );
};

export const SingleButton = ({ action, name, data, checked }) => {
  const onClick = () => {
    action(data || {});
  };

  const checkBox = typeof checked === 'boolean' ? <input type="checkbox" checked={checked} onChange={onClick}/> : '';

  return (
    <div className="nav-container button">
      <button onClick={onClick}>{name}</button>
      {checkBox}
    </div>
  );
};

export class SingleButtonsDropDown extends React.Component {
  constructor (props) {
    super(props);

    const { title, buttonsData, ...actions } = this.props;

    const buttons = buttonsData.map(button => ({
      ...button,
      action: () => {
        const updButtons = this.state.buttonsData.map(b => {
          if (typeof button.checked !== 'boolean' || b.name !== button.name) {
            return b;
          }

          return { ...b, checked: !b.checked };
        });

        actions[button.actionName]();

        this.setState({
          ...this.state,
          buttonsData: updButtons
        });
      }
    }));

    this.state = {
      title,
      buttonsData: buttons
    };
  }

  render () {
    const { title, buttonsData } = this.state;

    const buttons = buttonsData.map((button, i) => (
      <SingleButton
        onClick={() => console.log('click')}
        key={i}
        action={button.action}
        name={button.name}
        data={button.data}
        checked={button.checked}
      />
    ));

    return (
      <div className="nav-container buttons-dropdown">
        <p className="drop-down title">{title}</p>
        <div className="drop-down wrapper">
          <div className="drop-down container">
            {buttons}
          </div>
        </div>
      </div>
    );
  }
}

export const NavItemWrapper = ({
  blockName,
  title,
  opened,
  collapsed,
  onToggleExpandedData,
  onToggleNavItem,
  children
}) => {
  const className = `nav-container ${opened ? 'open' : 'closed'} ${collapsed ? 'collapsed' : ''}`;

  const onTitleClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (onToggleExpandedData) {
      onToggleExpandedData(blockName);
    }
  };

  const onArrowClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (onToggleNavItem) {
      onToggleNavItem(blockName);
    }
  };

  const arrowClassName = `arrow ${collapsed ? 'down' : 'up'}`;

  const content = collapsed ? <div /> : children;

  return (
    <div className={className}>
      <p
        className="title"
        onClick={onTitleClick}
      >
        {title}
        <span className={arrowClassName} onClick={onArrowClick}>
          <span />
        </span>
      </p>
      {content}
    </div>
  );
};
