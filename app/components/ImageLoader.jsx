import React from 'react';

export default ({ onLoadImage }) => {
  const onImageChanges = (event) => {
    const image = event.target.files[0];
    if (!image) {
      return;
    }

    const { name, type, size } = image;
    const src = window.URL.createObjectURL(image);

    onLoadImage({
      name, type, size, src
    });
  };

  return (
    <div className="nav-container loader">
      <input
        type="file"
        accept=".png, .jpg, .jpeg"
        onChange={onImageChanges}
      />
    </div>
  );
};
