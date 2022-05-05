type Orientation = 'vertical' | 'horizontal'
type Color = 'green'
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

const defaultState: ISettings = {
  min: 0,
  max: 100,
  step: 10,
  from: 5,
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
  ISettings,
  defaultState
}
