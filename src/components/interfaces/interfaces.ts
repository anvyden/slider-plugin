import Knob from "../View/subView/Knob/Knob";
import Scale from "../View/subView/Scale/Scale";
import Fill from "../View/subView/Fill/Fill";
import Labels from "../View/subView/Labels/Labels";

type Orientation = 'vertical' | 'horizontal'
type Color = 'green' | 'purple'
type Option = keyof ISettings
type OptionValue = number | boolean | Orientation | Color
type OptionFromKnobValues = 'from' | 'to'

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

type SliderComponents = {
  scale: Scale,
  knob: Knob,
  fill: Fill,
  labels: Labels
}

const defaultState: ISettings = {
  min: -50,
  max: 100,
  step: 10,
  from: 20,
  to: 40,
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
  OptionFromKnobValues,
  Orientation,
  Color,
  ISettings,
  ElementCoords,
  PageCoords,
  SliderComponents,
  defaultState
}
