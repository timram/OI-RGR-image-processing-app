import React from 'react';
import {
  AreaSeries,
  LineSeries,
  XYPlot,
  XAxis,
  YAxis,
  HorizontalGridLines,
  VerticalGridLines,
} from 'react-vis';

function getDataToDisplay (data) {
  return Object.keys(data).map(k => ({ x: ~~k, y: data[k] }));
}

export const ImageBrightnessDiagram = ({ profileData }) => {
  const { opened, brightness, red, green, blue, showBrightness, showRed, showGreen, showBlue } = profileData;

  if (!opened) {
    return <div/>;
  }

  return (
    <BrightnessPlotContainer
      brightness={showBrightness ? brightness : []}
      red={showRed ? red : []}
      green={showGreen ? green : []}
      blue={showBlue ? blue : []}
    />
  );
};

export const ProfileBrightnessDiagram = ({ profileData }) => {
  const { opened, lineProfileData, brightness, red, green, blue } = profileData;

  if (!opened || lineProfileData.length === 0) {
    return <div />;
  }

  return (
    <LinePlot
      width={1100}
      height={200}
      pixelsData={lineProfileData}
      brightness={brightness}
      red={red}
      green={green}
      blue={blue}
    />
  );
};

const BrightnessPlotContainer = ({
  brightness,
  red,
  green,
  blue
}) => {
  const brightnessToDisplay = getDataToDisplay(brightness);
  const redToDisplay = getDataToDisplay(red);
  const greenToDisplay = getDataToDisplay(green);
  const blueToDisplay = getDataToDisplay(blue);

  return (
    <div className="plot-container">
      <Plot
        width={600}
        height={300}
        data={brightnessToDisplay}
        color="#abc"
        name="brightness"
      />
      <div className="row-plot-container">
        <Plot
          width={360}
          height={250}
          data={redToDisplay}
          color="#f00"
          name="red"
        />
        <Plot
          width={360}
          height={250}
          data={greenToDisplay}
          color="#0f0"
          name="green"
        />
        <Plot
          width={360}
          height={250}
          data={blueToDisplay}
          color="#00f"
          name="blue"
        />
      </div>
    </div>
  );
};

const LinePlot = ({ width, height, pixelsData, brightness, red, green, blue }) => {
  const className = 'line-plot';
  const brightnessData = [];
  const redData = [];
  const greenData = [];
  const blueData = [];

  pixelsData.forEach((p, i) => {
    if (brightness) {
      brightnessData.push({ x: i, y: p.brightness });
    }
    if (red) {
      redData.push({ x: i, y: p.red });
    }
    if (green) {
      greenData.push({ x: i, y: p.green });
    }
    if (blue) {
      blueData.push({ x: i, y: p.blue });
    }
  });

  return (
    <div className={className}>
      <XYPlot width={width} height={height}>
        <XAxis />
        <YAxis />
        <HorizontalGridLines />
        <VerticalGridLines />
        <LineSeries color="#abc" data={brightnessData} />
        <LineSeries color="#f00" data={redData} />
        <LineSeries color="#0f0" data={greenData} />
        <LineSeries color="#00f" data={blueData} />
      </XYPlot>
    </div>
  );
};

const Plot = ({ width, height, data, color, name }) => {
  const className = `plot ${name}`;

  return (
    <div className={className}>
      <XYPlot
        width={width}
        height={height}
      >
        <XAxis />
        <YAxis />
        <HorizontalGridLines />
        <VerticalGridLines />
        <AreaSeries
          color={color}
          data={data}
        />
      </XYPlot>
    </div>
  );
};
