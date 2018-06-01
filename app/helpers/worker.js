function getPointBrightness ({ red, green, blue }) {
  return 0.3 * red + 0.59 * green + 0.11 * blue;
}

function getAvarageBrightness (data) {
  let avarageBrightness = 0;

  for (let i = 0; i < data.length; i += 4) {
    avarageBrightness += getPointBrightness({ red: data[i], green: data[i + 1], blue: data[i + 2] });
  }

  return Math.ceil(avarageBrightness / Math.ceil((data.length / 4)));
}

function getUpdatedContrastPalette ({ avarageBrightness, correction }) {
  const coof = 1 + ~~correction / 100;

  return new Array(256)
    .fill(0)
    .map((elem, i) => {
      const delta = i - avarageBrightness;
      return avarageBrightness + coof * delta;
    });
}

function getUpdChannelValue (val, coof) {
  const newVal = ~~val + ~~coof;

  if (newVal > 255) {
    return 255;
  }

  if (newVal < 0) {
    return 0;
  }

  return newVal;
}

function checkPixelInLineBounds (startPoint, endPoint, x, y) {
  const [leftPoint, rightPoint] = startPoint.x < endPoint.x ? [startPoint, endPoint] : [endPoint, startPoint];

  const [bottomPoint, topPoint] = startPoint.y < endPoint.y ? [startPoint, endPoint] : [endPoint, startPoint];

  return x >= leftPoint.x && x <= rightPoint.x && y >= bottomPoint.y && y <= topPoint.y;
}

function getPixelChannels (pixels, i) {
  return [pixels[i], pixels[i + 1], pixels[i + 2]];
}

const directionsFunctions = {
  'горизонтальное': (x, y) => y,
  'вертикальное': (x, y) => x,
  'справо налево': (x, y) => (-x + y) / 2,
  'слево направо': (x, y) => (x + y) / 2
};

const WINDOW_SIZE = 9;

function buildWorkWindow ({ pixels, start, step, size }) {
  let window = [];

  for (let i = start, row = 0; row < size; row += 1, i += step) {
    for (let j = 0, col = 0; col < size; col += 1, j += 4) {
      window = window.concat(getPixelChannels(pixels, i + j));
    }
  }

  return window;
}

function getAvarageChannels (pixels) {
  let red = 0;
  let green = 0;
  let blue = 0;

  for (let i = 0; i < pixels.length; i += 3) {
    red += pixels[i];
    green += pixels[i + 1];
    blue += pixels[i + 2];
  }

  return {
    red: Math.floor(red / WINDOW_SIZE),
    green: Math.floor(green / WINDOW_SIZE),
    blue: Math.floor(blue / WINDOW_SIZE),
  };
}

function getMiddleChannels (pixels) {
  const formattedPixels = [];
  for (let i = 0; i < pixels.length; i += 3) {
    formattedPixels.push({
      red: pixels[i],
      green: pixels[i + 1],
      blue: pixels[i + 2],
      brightness: getPointBrightness({ red: pixels[i], green: pixels[i + 1], blue: pixels[i + 2] })
    });
  }

  const sortedPixels = formattedPixels.sort((p1, p2) => p1.brightness - p2.brightness);

  return sortedPixels[Math.floor(WINDOW_SIZE / 2)];
}

function getPixelBrightnessInWindow (pixels) {
  const array = [];
  for (let i = 0; i < pixels.length; i += 3) {
    array.push(getPointBrightness({ red: pixels[i], green: pixels[i + 1], blue: pixels[i + 2] }));
  }

  return array;
}

function setUpPixelValue (pixels, start, value) {
  pixels[start] = value;
  pixels[start + 1] = value;
  pixels[start + 2] = value;
}

function calculateRobertsValue (pixels) {
  const [x1, x2, x3, x4] = getPixelBrightnessInWindow(pixels);

  return Math.sqrt(((x1 - x4) ** 2) + ((x2 - x3) ** 2)) + 100;
}

function calculateSobelValue (pixels) {
  const [x1, x2, x3, x4, x5, x6, x7, x8, x9] = getPixelBrightnessInWindow(pixels);
  const X = (x1 + 2 * x2 + x3) - (x7 + 2 * x8 + x9);
  const Y = (x1 + 2 * x4 + x7) - (x3 + 2 * x6 + x9);

  return Math.sqrt(X ** 2 + Y ** 2) + 100;
}

function calculateWallesValue (pixels) {
  const [x1, x2, x3, x4, x5, x6, x7, x8, x9] = getPixelBrightnessInWindow(pixels);
  return (Math.log((x5 / (x2 + 1)) * (x5 / (x6 + 1)) * (x5 / (x8 + 1)) * (x5 / (x9 + 1))) / 4) * 500 + 100;
}

function calculateStaticValue (pixels) {
  const size = 9;
  const brightnesses = getPixelBrightnessInWindow(pixels);
  const avarageBrightness = brightnesses.reduce((acc, b) => acc + b, 0) / size;
  return Math.sqrt(brightnesses.reduce((acc, b) => acc + ((b - avarageBrightness) ** 2), 0) / size);
}

function mod8Sum (a, b) {
  const sum = a + b;
  return sum > 8 ? sum - 8 : sum;
}

function calculateKirshValue (pixels) {
  const [x1, x2, x3, x4, x5, x6, x7, x8, x9] = getPixelBrightnessInWindow(pixels);
  const roundWindow = [x1, x2, x3, x4, x6, x7, x8, x9];

  return Math.max.apply(null, roundWindow
    .map(p => {
      const Si = p + mod8Sum(p, 1) + mod8Sum(p, 2);
      const Ti = mod8Sum(p, 3) + mod8Sum(p, 4) + mod8Sum(p, 5) + mod8Sum(p, 6) + mod8Sum(p, 7);
      return Math.abs((5 * Si) - (3 * Ti));
    }));
}

const getLaplasMatrixValue = (() => {
  const matrixes = {
    0: [
      0, -1, 0,
      -1, 4, -1,
      0, -1, 0
    ],

    1: [
      1, 1, 1,
      1, -2, 1,
      -1, -1, -1
    ],

    2: [
      -1, 1, 1,
      -1, -2, 1,
      -1, 1, 1
    ],

    3: [
      1, 1, 1,
      -1, -2, 1,
      -1, -1, 1
    ]
  };

  return (pixels, id) => {
    const laplasMatrix = matrixes[id];

    let sum = 0;

    for (let i = 0, pc = 0; i < pixels.length; i += 3, pc += 1) {
      sum += pixels[i] * laplasMatrix[pc];
      sum += pixels[i + 1] * laplasMatrix[pc];
      sum += pixels[i + 2] * laplasMatrix[pc];
    }

    return sum;
  };
})();

const FindBordersMethods = {
  kirsh: ({ width, height, pixels }) => {
    const widthStep = width * 4;
    const windowSize = 3;

    for (let i = 0, pc = 0; i < pixels.length; i += 4, pc += 1) {
      const x = pc % width;
      const y = Math.floor(pc / width);

      if (width - x < windowSize) {
        continue;
      }

      if (height - y < windowSize) {
        break;
      }

      const windowPixels = buildWorkWindow({ pixels, start: i, step: widthStep, size: windowSize });

      const kirshValue = calculateKirshValue(windowPixels);

      setUpPixelValue(pixels, i + widthStep + 4, kirshValue);
    }

    return pixels;
  },

  laplas: ({ width, height, pixels }) => {
    const widthStep = width * 4;

    for (let i = 0, pc = 0; i < pixels.length; i += 4, pc += 1) {
      const x = pc % width;
      const y = Math.floor(pc / width);

      if (width - x < 3) {
        continue;
      }

      if (height - y < 3) {
        break;
      }

      const windowPixels = buildWorkWindow({ pixels, start: i, step: widthStep, size: 3 });

      const laplasValue = getLaplasMatrixValue(windowPixels, 0) + 100;

      setUpPixelValue(pixels, i + widthStep + 4, laplasValue);
    }

    return pixels;
  },

  roberts: ({ width, height, pixels }) => {
    const widthStep = width * 4;
    const windowSize = 2;

    for (let i = 0, pc = 0; i < pixels.length; i += 4, pc += 1) {
      const x = pc % width;
      const y = Math.floor(pc / width);

      if (width - x < windowSize) {
        continue;
      }

      if (height - y < windowSize) {
        break;
      }

      const windowPixels = buildWorkWindow({ pixels, start: i, step: widthStep, size: windowSize });

      const robValue = calculateRobertsValue(windowPixels);

      setUpPixelValue(pixels, i, robValue);
    }

    return pixels;
  },

  sobel: ({ width, height, pixels }) => {
    const widthStep = width * 4;
    const windowSize = 3;

    for (let i = 0, pc = 0; i < pixels.length; i += 4, pc += 1) {
      const x = pc % width;
      const y = Math.floor(pc / width);

      if (width - x < windowSize) {
        continue;
      }

      if (height - y < windowSize) {
        break;
      }

      const windowPixels = buildWorkWindow({ pixels, start: i, step: widthStep, size: windowSize });

      const sobelValue = calculateSobelValue(windowPixels);

      setUpPixelValue(pixels, i + widthStep + 4, sobelValue);
    }

    return pixels;
  },

  walles: ({ width, height, pixels }) => {
    const widthStep = width * 4;
    const windowSize = 3;

    for (let i = 0, pc = 0; i < pixels.length; i += 4, pc += 1) {
      const x = pc % width;
      const y = Math.floor(pc / width);

      if (width - x < windowSize) {
        continue;
      }

      if (height - y < windowSize) {
        break;
      }

      const windowPixels = buildWorkWindow({ pixels, start: i, step: widthStep, size: windowSize });

      const wallesValue = calculateWallesValue(windowPixels);

      setUpPixelValue(pixels, i + widthStep + 4, wallesValue);
    }

    return pixels;
  },

  staticMethod: ({ width, height, pixels }) => {
    const widthStep = width * 4;
    const windowSize = 3;

    for (let i = 0, pc = 0; i < pixels.length; i += 4, pc += 1) {
      const x = pc % width;
      const y = Math.floor(pc / width);

      if (width - x < windowSize) {
        continue;
      }

      if (height - y < windowSize) {
        break;
      }

      const windowPixels = buildWorkWindow({ pixels, start: i, step: widthStep, size: windowSize });

      const staticValue = calculateStaticValue(windowPixels);

      for (let j = i, row = 0; row < windowSize; row += 1, j += widthStep) {
        for (let k = 0, col = 0; col < windowSize; col += 1, k += 4) {
          const id = k + j;
          pixels[id] = pixels[id] * staticValue;
          pixels[id + 1] = pixels[id + 1] * staticValue;
          pixels[id + 2] = pixels[id + 2] * staticValue;
        }
      }
    }

    return pixels;
  }
};

const Handler = {
  getBrightnessProfile: (pixels, { startProfilePoint, endProfilePoint, width, height }) => {
    let checkPixelFunc = null;
    if (startProfilePoint && endProfilePoint && width && height) {
      const xdiff = endProfilePoint.x - startProfilePoint.x;
      const ydiff = endProfilePoint.y - startProfilePoint.y;
      const ytemp = startProfilePoint.y * xdiff;
      const xtemp = startProfilePoint.x * ydiff;

      checkPixelFunc = (x, y) => {
        const xres = Math.abs((x * ydiff) - xtemp);
        const yres = Math.abs((y * xdiff) - ytemp);

        return Math.abs(xres - yres) < 300;
      };
    }

    const profile = {
      brightness: {},
      red: {},
      green: {},
      blue: {},
      lineProfileData: []
    };

    try {
      for (let i = 0; i < 256; i++) {
        profile.brightness[i] = 0;
        profile.red[i] = 0;
        profile.green[i] = 0;
        profile.blue[i] = 0;
      }

      for (let i = 0, pc = 0; i < pixels.length; i += 4, pc += 1) {
        const [red, green, blue] = [pixels[i], pixels[i + 1], pixels[i + 2]];
        const brightness = Math.ceil(getPointBrightness({
          red,
          green,
          blue
        }));

        profile.brightness[brightness] += 1;
        profile.red[red] += 1;
        profile.green[green] += 1;
        profile.blue[blue] += 1;

        if (checkPixelFunc !== null) {
          const x = pc % width;
          const y = Math.floor(pc / width);

          if (checkPixelInLineBounds(startProfilePoint, endProfilePoint, x, y)) {
            const isOnLine = checkPixelFunc(x, y);
            if (isOnLine) {
              profile.lineProfileData.push({
                x,
                y,
                brightness,
                red,
                green,
                blue
              });
            }
          }
        }
      }

      return profile;
    } catch (err) {
      return profile;
    }
  },

  invertImage: (pixels, actionData) => {
    for (let i = 0; i < pixels.length; i += 4) {
      pixels[i] = 255 - pixels[i];
      pixels[i + 1] = 255 - pixels[i + 1];
      pixels[i + 2] = 255 - pixels[i + 2];
    }

    return pixels;
  },

  grayscaleImage: (pixels, actionData) => {
    for (let i = 0; i < pixels.length; i += 4) {
      const pointBrightness = getPointBrightness({
        red: pixels[i],
        green: pixels[i + 1],
        blue: pixels[i + 2]
      });

      setUpPixelValue(pixels, i, pointBrightness);
    }

    return pixels;
  },

  binarizeImage: (pixels, actionData) => {
    const { border, lowValue, highValue } = actionData;

    for (let i = 0; i < pixels.length; i += 4) {
      const pointBrightness = getPointBrightness({
        red: pixels[i],
        green: pixels[i + 1],
        blue: pixels[i + 2]
      });

      const value = pointBrightness >= border ? highValue : lowValue;
      pixels[i] = value.red;
      pixels[i + 1] = value.green;
      pixels[i + 2] = value.blue;
    }

    return pixels;
  },

  changeContrast: (pixels, actionData) => {
    const { correction } = actionData;

    const avarageBrightness = getAvarageBrightness(pixels);

    const contrastPalette = getUpdatedContrastPalette({ avarageBrightness, correction });

    for (let i = 0; i < pixels.length; i += 4) {
      pixels[i] = contrastPalette[pixels[i]];
      pixels[i + 1] = contrastPalette[pixels[i + 1]];
      pixels[i + 2] = contrastPalette[pixels[i + 2]];
    }

    return pixels;
  },

  changeBrightness: (pixels, actionData) => {
    const { coof } = actionData;

    for (let i = 0; i < pixels.length; i += 4) {
      pixels[i] = getUpdChannelValue(pixels[i], coof);
      pixels[i + 1] = getUpdChannelValue(pixels[i + 1], coof);
      pixels[i + 2] = getUpdChannelValue(pixels[i + 2], coof);
    }

    return pixels;
  },

  applySoldPepperNoise: (pixels, actionData) => {
    const { probability } = actionData;

    for (let i = 0; i < pixels.length; i += 4) {
      if (Math.random() <= probability) {
        const val = Math.random() < 0.5 ? 0 : 255;

        setUpPixelValue(pixels, i, val);
      }
    }

    return pixels;
  },

  applySinusNoise: (pixels, actionData) => {
    const { amplitude, period, direction, width } = actionData;

    const getDirFunc = directionsFunctions[direction];

    for (let i = 0, pc = 0; i < pixels.length; i += 4, pc += 1) {
      const x = pc % width;
      const y = Math.floor(pc / width);
      let val = amplitude * Math.sin(2 * Math.PI * period * getDirFunc(x, y) / width);

      val = Math.ceil(Math.abs(val) * 255);

      pixels[i] = getUpdChannelValue(pixels[i], val);
      pixels[i + 1] = getUpdChannelValue(pixels[i + 1], val);
      pixels[i + 2] = getUpdChannelValue(pixels[i + 2], val);
    }

    return pixels;
  },

  applyLineFiltering: (pixels, actionData) => {
    const { width, height } = actionData;
    const widthStep = width * 4;

    for (let i = 0, pc = 0; i < pixels.length; i += 4, pc += 1) {
      const x = pc % width;
      const y = Math.floor(pc / width);

      if (width - x < 3) {
        continue;
      }

      if (height - y < 3) {
        break;
      }

      const windowPixels = buildWorkWindow({ pixels, start: i, step: widthStep, size: 3 });

      const avarageChannels = getAvarageChannels(windowPixels);
      const middlePixelID = i + widthStep + 4;

      pixels[middlePixelID] = avarageChannels.red;
      pixels[middlePixelID + 1] = avarageChannels.green;
      pixels[middlePixelID + 2] = avarageChannels.blue;
    }

    return pixels;
  },

  applyNotLineFiltering: (pixels, actionData) => {
    const { width, height } = actionData;
    const widthStep = width * 4;

    for (let i = 0, pc = 0; i < pixels.length; i += 4, pc += 1) {
      const x = pc % width;
      const y = Math.floor(pc / width);

      if (width - x < 3) {
        continue;
      }

      if (height - y < 3) {
        break;
      }

      const windowPixels = buildWorkWindow({ pixels, start: i, step: widthStep, size: 3 });

      const midleChannels = getMiddleChannels(windowPixels);
      const middlePixelID = i + widthStep + 4;

      pixels[middlePixelID] = midleChannels.red;
      pixels[middlePixelID + 1] = midleChannels.green;
      pixels[middlePixelID + 2] = midleChannels.blue;
    }

    return pixels;
  },

  findBorders: (pixels, actionData) => {
    const { width, height } = actionData;
    return FindBordersMethods[actionData.methodName]({ width, height, pixels });
  }
};

self.onmessage = (message) => {
  const { data: { action, actionData, pixels } } = message;
  if (action === 'getBrightnessProfile') {
    return self.postMessage({
      brightnessProfile: Handler.getBrightnessProfile(pixels, actionData)
    });
  }

  const updPixels = Handler[action](pixels, actionData);
  const brightnessProfile = Handler.getBrightnessProfile(updPixels, actionData);

  self.postMessage({
    pixels: updPixels,
    brightnessProfile
  });
};
