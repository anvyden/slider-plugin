import {Color, ISettings, Orientation} from "../components/interfaces/interfaces";

const changeFirstCharToLower = (str: string): string => str[0].toLowerCase() + str.slice(1)

const checkOrientation = (orientation: Orientation): Orientation => orientation === 'vertical'
  ? 'vertical'
  : 'horizontal'

const checkColor = (color: Color): Color => color === 'purple' ? 'purple' : 'green'

const convertStateValueToPercent = (state: ISettings, value: number): number => {
  let { max, min, from, to, step } = state

  const countOfSteps = (max - min) / step
  const stepInPercent = 100 / countOfSteps

  let percent = ((value - min) / step) * stepInPercent

  if (percent > 100) percent = 100
  if (percent < 0) percent = 0

  return percent
}

export { changeFirstCharToLower, checkOrientation, checkColor, convertStateValueToPercent }
