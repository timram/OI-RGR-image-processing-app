import React from 'react';

export default ({ imageData }) => {
  const { src, opened } = imageData;

  if (!opened) {
    return <div />;
  }

  return (
    <div className="image-description">
      <img src={src} />
    </div>
  );
};
