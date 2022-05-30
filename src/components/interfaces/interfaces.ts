import Thumb from "../View/subView/Thumb/Thumb";
import Scale from "../View/subView/Scale/Scale";
import ProgressBar from "../View/subView/ProgressBar/ProgressBar";
import Labels from "../View/subView/Labels/Labels";

type Orientation = 'vertical' | 'horizontal'
type Color = 'green' | 'purple'
type Option = keyof ISettings
type OptionValue = number | boolean | Orientation | Color
type OptionFromThumbValues = 'from' | 'to'

interface ISettings {
  min: number,
  max: number,
  step: number,
  from: number,
  to: number,
  orientation: Orientation,
  isRange: boolean,
  hasProgressBar: boolean,
  hasLabels: boolean,
  hasTooltips: boolean,
  color: Color,
}

type StateValuesForConvert = {
  max: number,
  min: number,
  step: number
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

type SliderComponents = {
  scale: Scale,
  thumb: Thumb,
  progressBar: ProgressBar,
  labels: Labels,
  thumbSecond: Thumb,
}

export {
  Option,
  OptionValue,
  OptionFromThumbValues,
  Orientation,
  Color,
  ISettings,
  ElementCoords,
  PageCoords,
  SliderComponents,
  StateValuesForConvert
}
