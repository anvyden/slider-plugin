import {
  ElementCoords,
  ISettings,
  PageCoords,
  StateValuesForConvert,
} from '../components/interfaces/interfaces';

const getStepInPercent = (max: number, min: number, step: number): number => {
  const countOfSteps = (max - min) / step;
  const stepInPercent = 100 / countOfSteps;

  return stepInPercent;
};

const convertStateValueToPercent = (
  state: ISettings | StateValuesForConvert,
  value: number
): number => {
  const { max, min, step } = state;
  const stepInPercent = getStepInPercent(max, min, step);

  let percent = ((value - min) / step) * stepInPercent;

  if (percent > 100) percent = 100;
  if (percent < 0) percent = 0;

  return percent;
};

const convertPercentValueToNumber = (
  state: ISettings | StateValuesForConvert,
  valueInPercent: number
): number => {
  const { max, min, step } = state;
  const stepInPercent = getStepInPercent(max, min, step);

  const valueWithSteps = Math.round(valueInPercent / stepInPercent) * step;
  const valueInNumber = Number((valueWithSteps + min).toFixed(2));

  if (valueInPercent >= 100) return max;
  
  return valueInNumber;
};

const getPosition = (
  event: PointerEvent,
  state: ISettings,
  root: HTMLElement
): number => {
  const { orientation } = state;
  const scale = root.querySelector('.js-slider__scale');

  const { left, bottom, width, height } = getElementCoords(
    <HTMLDivElement>scale
  );
  const { clientX, clientY } = getPageCoords(event);

  if (orientation === 'horizontal') {
    return ((clientX - left) / width) * 100;
  }

  return ((bottom - clientY) / height) * 100;
};

const getPageCoords = (event: PointerEvent): PageCoords => {
  const { clientX, clientY } = event;

  return {
    clientX,
    clientY,
  };
};

const getElementCoords = (elem: Element): ElementCoords => {
  const { width, height, bottom, left } = elem.getBoundingClientRect();

  return {
    left,
    bottom,
    width,
    height,
  };
};

export {
  convertStateValueToPercent,
  convertPercentValueToNumber,
  getStepInPercent,
  getPosition,
  getPageCoords,
  getElementCoords,
};
