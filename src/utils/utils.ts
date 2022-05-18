import { ISettings } from "../components/interfaces/interfaces";

const changeFirstCharToLower = (str: string): string => str[0].toLowerCase() + str.slice(1)

// const validateOrientation = (orientation: Orientation): Orientation => orientation === 'vertical'
//   ? 'vertical'
//   : 'horizontal'
//
// const validateColor = (color: Color): Color => color === 'purple' ? 'purple' : 'green'

const convertStateValueToPercent = (state: ISettings, value: number): number => {
  const { max, min, step } = state

  const countOfSteps = (max - min) / step
  const stepInPercent = 100 / countOfSteps

  let percent = ((value - min) / step) * stepInPercent

  if (percent > 100) percent = 100
  if (percent < 0) percent = 0

  return percent
}

const convertPercentValueToNumber = (state: ISettings, valueInPercent: number): number => {
  const { max, min, step } = state

  const countOfSteps = (max - min) / step
  const stepInPercent = 100 / countOfSteps

  const valueWithSteps = Math.round(valueInPercent / stepInPercent) * step
  const valueInNumber = valueWithSteps + min

  return valueInNumber
}

export { changeFirstCharToLower, convertStateValueToPercent, convertPercentValueToNumber }
