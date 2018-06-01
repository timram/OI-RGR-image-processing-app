import React from 'react';
import ImageActionTypes from '../actions/ImageActionTypes.js';
import imageProcessing from '../helpers/imageProcessing.jsx';

export class ImageCanvas extends React.Component {
  constructor (props) {
    super(props);

    this.onMoveOverImage = this.onMoveOverImage.bind(this);
  }

  componentDidUpdate () {
    const { imageData: { actionData, action, startProfilePoint, endProfilePoint }, onSaveImageProfile } = this.props;
    const { canvas } = this.refs;
    if (action === ImageActionTypes.NONE) {
      return;
    }

    imageProcessing({
      action,
      actionData: { ...actionData, startProfilePoint, endProfilePoint },
      canvas,
      onSaveImageProfile
    });
  }

  onMoveOverImage (event) {
    const { onPixelColorChanged, imageData: { imageSrc } } = this.props;

    if (imageSrc === null) {
      return;
    }

    const ctx = this.refs.canvas.getContext('2d');

    const { layerX: x, layerY: y } = event.nativeEvent;

    const pixel = ctx.getImageData(x, y, 1, 1);

    const color = pixel.data;
    const pixelColor = 'rgba(' + color[0] + ', ' + color[1] +
      ', ' + color[2] + ', ' + (color[3] / 255) + ')';

    onPixelColorChanged(pixelColor);
  }

  render () {
    return (
      <canvas
        ref="canvas"
        onMouseMove={this.onMoveOverImage}
      />
    );
  }
}

export class DrawCanvas extends React.Component {
  constructor (props) {
    super(props);

    this.onClick = this.onClick.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseOut = this.onMouseOut.bind(this);
  }

  componentDidUpdate () {
    const { canvasData: { width, height, startPoint, endPoint, color } } = this.props;
    const { canvas } = this.refs;

    if (!canvas) {
      return;
    }

    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext('2d');

    ctx.fillStyle = color;
    ctx.strokeStyle = color;

    if (startPoint) {
      ctx.beginPath();
      ctx.arc(startPoint.x, startPoint.y, 5, 0, 2 * Math.PI);
      ctx.fill();
      ctx.stroke();
    }

    if (endPoint) {
      ctx.beginPath();
      ctx.arc(endPoint.x, endPoint.y, 5, 0, 2 * Math.PI);
      ctx.moveTo(startPoint.x, startPoint.y);
      ctx.lineTo(endPoint.x, endPoint.y);
      ctx.fill();
      ctx.stroke();
    }
  }

  onMouseMove (event) {
    const { onUpdateDrawCanvas, canvasData: { startPointConfirmed, endPointConfirmed } } = this.props;

    const { layerX: x, layerY: y } = event.nativeEvent;

    if (endPointConfirmed) {
      return;
    }

    if (startPointConfirmed) {
      return onUpdateDrawCanvas({ endPoint: { x, y } });
    }

    onUpdateDrawCanvas({ startPoint: { x, y } });
  }

  onMouseOut (event) {
    const { onUpdateDrawCanvas } = this.props;
    const { canvasData: { startPointConfirmed, endPointConfirmed } } = this.props;

    if (!startPointConfirmed) {
      return onUpdateDrawCanvas({ startPoint: null });
    }

    if (!endPointConfirmed) {
      return onUpdateDrawCanvas({ endPoint: null });
    }
  }

  onClick (event) {
    const { onSaveLinePoints, onUpdateDrawCanvas, canvasData: { startPoint, startPointConfirmed, endPointConfirmed } } = this.props;
    const { layerX: x, layerY: y } = event.nativeEvent;

    if (endPointConfirmed) {
      return;
    }

    if (startPointConfirmed) {
      onUpdateDrawCanvas({ endPointConfirmed: true, endPoint: { x, y } });
      onSaveLinePoints(startPoint, { x, y });
      return;
    }

    return onUpdateDrawCanvas({ startPointConfirmed: true, startPoint: { x, y } });
  }

  render () {
    const { canvasData: { opened } } = this.props;

    if (!opened) {
      return <div />;
    }

    return (
      <canvas
        ref="canvas"
        onClick={this.onClick}
        onMouseMove={this.onMouseMove}
        onMouseOut={this.onMouseOut}
      />
    );
  }
}
