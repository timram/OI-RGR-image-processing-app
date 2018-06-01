import { connect } from 'react-redux';
import BlockNames from '../components/BlockNames.js';
import ImageLoader from '../components/ImageLoader.jsx';
import { SingleButtonsDropDown } from '../components/GenericElements.jsx';
import BinDataNavElem from '../components/BinDataNavElem.jsx';
import ImageInfo from '../components/ImageInfo.jsx';
import ContrastDataNavElem from '../components/ContrastDataNavElem.jsx';
import BrightnessDataNavElem from '../components/BrightnessDataNavElem.jsx';
import LineColorDataNavElem from '../components/LineColorNavElem.jsx';
import LineProfilePropsNavElem from '../components/LineProfilePropsNavElem.jsx';
import SoldPepperNavElem from '../components/SoldPepperNavElem.jsx';
import SinuNoiseNavElem from '../components/SinusNoiseNavElem.jsx';
import FindBordersMethods from '../actions/findBordersMethods.js';
import {
  resetImage,
  invertImage,
  grayscaleImage,
  binarizeImage,
  toggleNavItem,
  toggleExpandedData,
  setSliderValue,
  setColorPaletteValue,
  loadImage,
  toggleImage,
  changeContrast,
  changeBrightness,
  updateDrawCanvas,
  saveLinePoints,
  saveBrightnessPlotProps,
  setSelectorValue,
  applySoldPepperNoise,
  applySinusNoise,
  applyLineFiltering,
  applyNotLineFiltering,
  toggleDrawCanvas,
  findBorders
} from '../actions';

export const FindBordersButtonsDropDownContainer = connect(
  state => ({
    title: 'Поиск границ',
    buttonsData: [
      {
        name: 'Методом Кирша',
        actionName: 'onFindBordersKirsh'
      },
      {
        name: 'Методом Лапласа',
        actionName: 'onFindBordersLaplas'
      },
      {
        name: 'Методом Робертса',
        actionName: 'onFindBordersRoberts'
      },
      {
        name: 'Методом Собела',
        actionName: 'onFindBordersSobel'
      },
      {
        name: 'Методом Уоллеса',
        actionName: 'onFindBordersWalles'
      },
      {
        name: 'Статистический метод',
        actionName: 'onFindBordersStatisticMethod'
      },
    ]
  }),
  dispatch => ({
    onFindBordersKirsh: () => dispatch(findBorders(FindBordersMethods.KIRSH)),
    onFindBordersLaplas: () => dispatch(findBorders(FindBordersMethods.LAPLAS)),
    onFindBordersRoberts: () => dispatch(findBorders(FindBordersMethods.ROBERTS)),
    onFindBordersSobel: () => dispatch(findBorders(FindBordersMethods.SOBEL)),
    onFindBordersWalles: () => dispatch(findBorders(FindBordersMethods.WALLES)),
    onFindBordersStatisticMethod: () => dispatch(findBorders(FindBordersMethods.STATIC_METHOD))
  })
)(SingleButtonsDropDown);

export const PlotButtonsDropDownContainer = connect(
  state => ({
    title: 'Графики',
    buttonsData: [
      {
        name: 'Диаграмма яркости',
        checked: false,
        actionName: 'onToggleDiagrams'
      },
      {
        name: 'Профиль яркости',
        checked: false,
        actionName: 'onToggleProfile'
      }
    ]
  }),
  dispatch => ({
    onToggleDiagrams: () => dispatch(toggleNavItem(BlockNames.IMAGE_BRIGHTNESS_PROFILE)),
    onToggleProfile: () => dispatch(toggleNavItem(BlockNames.LINE_BRIGHTNESS_PROFILE))
  })
)(SingleButtonsDropDown);

export const ActionsButtonsDropDownContainer = connect(
  state => ({
    title: 'Действия',
    buttonsData: [
      {
        name: 'Сбросить',
        actionName: 'onResetImage'
      },
      {
        name: 'Отчистить',
        actionName: 'onClearDrawCanvas'
      },
      {
        name: 'Оригинал',
        checked: false,
        actionName: 'onShowOriginal'
      },
      {
        name: 'Режим рисования',
        checked: state.drawCanvasReducer.opened,
        actionName: 'onToggleDrawCanvas'
      },
      {
        name: 'Негатив',
        actionName: 'onInvertImage'
      },
      {
        name: 'Оттенки серого',
        actionName: 'onGrayscaleImage'
      }
    ]
  }),
  dispatch => ({
    onResetImage: () => dispatch(resetImage()),
    onClearDrawCanvas: () => {
      dispatch(updateDrawCanvas({
        startPoint: null,
        startPointConfirmed: null,
        endPoint: null,
        endPointConfirmed: null
      }));
      dispatch(saveLinePoints({
        startPoint: null,
        endPoint: null
      }));
    },
    onShowOriginal: () => dispatch(toggleImage()),
    onInvertImage: () => dispatch(invertImage()),
    onGrayscaleImage: () => dispatch(grayscaleImage()),
    onToggleDrawCanvas: () => dispatch(toggleDrawCanvas())
  })
)(SingleButtonsDropDown);

export const FiltersButtonsDropDownContainer = connect(
  state => ({
    title: 'Фильтра',
    buttonsData: [
      {
        name: 'Линейный Фильтр',
        actionName: 'onApplyLineFiltering'
      },
      {
        name: 'Не линейный фильтр',
        actionName: 'onApplyNotLineFiltering'
      }
    ]
  }),
  dispatch => ({
    onApplyLineFiltering: () => dispatch(applyLineFiltering()),
    onApplyNotLineFiltering: () => dispatch(applyNotLineFiltering())
  })
)(SingleButtonsDropDown);

export const SoldPepperNavElemContainer = connect(
  state => ({ soldPepperData: state.soldPepperNoiseNavItemData }),
  dispatch => ({
    onToggleNavItem: () => {
      dispatch(toggleNavItem(BlockNames.SOLD_PEPPER_NOISE_ELEM));
    },
    onSetSelectorValue: (name, value) => {
      dispatch(setSelectorValue({
        blockName: BlockNames.SOLD_PEPPER_NOISE_ELEM,
        name,
        value
      }));
    },
    onApplySoldPepperNoise: (probability) => {
      dispatch(applySoldPepperNoise(probability));
    }
  })
)(SoldPepperNavElem);

export const SinusNoiseNavElemContainer = connect(
  state => ({ sinusNoiseData: state.sinusNoiseNavItemData }),
  dispatch => ({
    onToggleNavItem: () => {
      dispatch(toggleNavItem(BlockNames.SINUS_NOISE_ELEM));
    },
    onSetSelectorValue: (name, value) => {
      dispatch(setSelectorValue({
        blockName: BlockNames.SINUS_NOISE_ELEM,
        name,
        value
      }));
    },
    onApplySinusNoise: (data) => {
      dispatch(applySinusNoise(data));
    }
  })
)(SinuNoiseNavElem);

export const LineColorDataContainer = connect(
  state => ({
    lineData: state.drawCanvasReducer,
    stateData: state.lineColorReducer
  }),
  dispatch => ({
    onToggleNavItem: (blockName) => {
      dispatch(toggleNavItem(blockName));
    },
    onToggleExpandedData: (blockName) => {
      dispatch(toggleExpandedData(blockName));
    },
    onUpdateDrawCanvas: (color) => {
      dispatch(updateDrawCanvas({ color }));
    }
  })
)(LineColorDataNavElem);

export const ImageInfoContainer = connect(
  state => ({ imageInfo: state.imageDescriptionReducer }),
  dispatch => ({
    onToggleNavItem: (blockName) => {
      dispatch(toggleNavItem(blockName));
    }
  })
)(ImageInfo);

export const ImageLoaderContainer = connect(
  null,
  dispatch => ({
    onLoadImage: ({ name, type, size, src }) => {
      dispatch(loadImage({ name, type, size, src }));
    }
  })
)(ImageLoader);

export const ContrastDataContainer = connect(
  state => ({ contrastData: state.contrastDataReducer }),
  dispatch => ({
    onToggleNavItem: (blockName) => {
      dispatch(toggleNavItem(blockName));
    },
    onToggleExpandedData: (blockName) => {
      dispatch(toggleExpandedData(blockName));
    },
    onSetSliderValue: ({ blockName, sliderName, value }) => {
      dispatch(setSliderValue({ blockName, sliderName, value }));
    },
    onChangeContrast: ({ correction }) => {
      dispatch(changeContrast(correction));
    }
  })
)(ContrastDataNavElem);

export const BrightnessDataContainer = connect(
  state => ({ brightnessData: state.brightnessDataReducer }),
  dispatch => ({
    onToggleNavItem: (blockName) => {
      dispatch(toggleNavItem(blockName));
    },
    onToggleExpandedData: (blockName) => {
      dispatch(toggleExpandedData(blockName));
    },
    onSetSliderValue: ({ blockName, sliderName, value }) => {
      dispatch(setSliderValue({ blockName, sliderName, value }));
    },
    onChangeBrightness: ({ coof }) => {
      dispatch(changeBrightness(coof));
    }
  })
)(BrightnessDataNavElem);

export const BinarizeImageDataContainer = connect(
  state => ({ binData: state.binDataReducer }),
  dispatch => ({
    onToggleNavItem: (blockName) => {
      dispatch(toggleNavItem(blockName));
    },
    onToggleExpandedData: (blockName) => {
      dispatch(toggleExpandedData(blockName));
    },
    onSetColorPaletteValue: ({ blockName, name, hex, rgb }) => {
      dispatch(setColorPaletteValue({ blockName, name, hex, rgb }));
    },
    onSetSliderValue: ({ blockName, sliderName, value }) => {
      dispatch(setSliderValue({ blockName, sliderName, value }));
    },
    onBinarizeImage: ({ border, lowRGBColor, highRGBColor }) => {
      dispatch(binarizeImage({
        border,
        lowValue: lowRGBColor,
        highValue: highRGBColor
      }));
    }
  })
)(BinDataNavElem);

export const LineProfilePropsContainer = connect(
  state => ({ plotProperties: state.lineProfilePropsData, title: 'Св-во профиля яркости' }),
  dispatch => ({
    onToggleNavItem: () => {
      dispatch(toggleNavItem(BlockNames.LINE_PROFILE_NAV_ELEM));
    },
    onSaveLineProfileProps: ({ brightness, red, green, blue }) => {
      dispatch(saveBrightnessPlotProps({ blockName: BlockNames.LINE_PROFILE_NAV_ELEM, brightness, red, green, blue }));
    }
  })
)(LineProfilePropsNavElem);

export const DiagramPropsContainer = connect( 
  state => ({ plotProperties: state.diagramPropsData, title: 'Св-ва диаграмм' }),
  dispatch => ({
    onToggleNavItem: () => {
      dispatch(toggleNavItem(BlockNames.DIAGRAM_BRIGHTNESS_NAV_ELEM));
    },
    onSaveLineProfileProps: ({ brightness, red, green, blue }) => {
      dispatch(saveBrightnessPlotProps({ blockName: BlockNames.DIAGRAM_BRIGHTNESS_NAV_ELEM, brightness, red, green, blue }));
    }
  })
)(LineProfilePropsNavElem);