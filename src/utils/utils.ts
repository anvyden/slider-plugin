import { ElementCoords, ISettings, PageCoords, StateValuesForConvert } from "../components/interfaces/interfaces";

const changeFirstCharToLower = (str: string): string => str[0].toLowerCase() + str.slice(1)

const getStepInPercent = (max: number, min: number, step: number): number => {
  const countOfSteps = (max - min) / step
  const stepInPercent = 100 / countOfSteps

  return stepInPercent
}

const convertStateValueToPercent = (state: ISettings | StateValuesForConvert, value: number): number => {
  const { max, min, step } = state
  const stepInPercent = getStepInPercent(max, min, step)

  let percent = ((value - min) / step) * stepInPercent

  if (percent > 100) percent = 100
  if (percent < 0) percent = 0

  return percent
}

const convertPercentValueToNumber = (state: ISettings | StateValuesForConvert, valueInPercent: number): number => {
  const { max, min, step } = state
  const stepInPercent = getStepInPercent(max, min, step)

  const valueWithSteps = Math.round(valueInPercent / stepInPercent) * step
  const valueInNumber = valueWithSteps + min

  return valueInNumber
}

const getPosition = (event: PointerEvent, state: ISettings): number => {
  const { orientation } = state
  const scale = document.querySelector('.js-slider__scale')

  const { left, bottom, width, height } = getElementCoords(<HTMLDivElement>scale)
  const { clientX, clientY } = getPageCoords(event)

  if (orientation === 'horizontal') {
    return ((clientX - left) / width ) * 100
  }

  return ((bottom - clientY) / height ) * 100
}

const getPageCoords = (event: PointerEvent): PageCoords => {
  const { clientX, clientY } = event

  return {
    clientX,
    clientY
  }
}

const getElementCoords = (elem: Element): ElementCoords => {
  const {
    width,
    height,
    bottom,
    left
  } = elem.getBoundingClientRect()

  return {
    left,
    bottom,
    width,
    height,
  }
}

export {
  changeFirstCharToLower,
  convertStateValueToPercent,
  convertPercentValueToNumber,
  getStepInPercent,
  getPosition,
  getPageCoords,
  getElementCoords,
}
