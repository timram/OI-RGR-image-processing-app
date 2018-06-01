import React from 'react';

export default ({ pixelColor }) => {
  const { rgbColor } = pixelColor;

  if (!rgbColor) {
    return <div />;
  }

  return (
    <div className="pixel-data">
      <p>{rgbColor}</p>
      <div
        className="color-view"
        style={{ backgroundColor: rgbColor }}
      />
    </div>
  );
};
