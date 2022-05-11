type Orientation = 'vertical' | 'horizontal'
type Color = 'green' | 'purple'
type Option = keyof ISettings
type OptionValue = number | boolean | Orientation | Color

interface ISettings {
  min: number,
  max: number,
  step: number,
  from: number,
  to: number,
  orientation: Orientation,
  isRange: boolean,
  hasFill: boolean,
  hasLabels: boolean,
  hasTooltips: boolean,
  color: Color,
}

type PageCoords = {
  clientX: number,
  clientY: number,
}

type ElementCoords = {
  left: number,
  bottom: number,
  width: number,
  height: number,
}

const defaultState: ISettings = {
  min: 0,
  max: 200,
  step: 5,
  from: 80,
  to: 80,
  orientation: 'horizontal',
  isRange: true,
  hasFill: true,
  hasLabels: false,
  hasTooltips: false,
  color: 'green',
}

export {
  Option,
  OptionValue,
  Orientation,
  Color,
  ISettings,
  ElementCoords,
  PageCoords,
  defaultState
}
