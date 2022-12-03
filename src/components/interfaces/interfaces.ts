import Thumb from '../View/subView/Thumb/Thumb';
import Scale from '../View/subView/Scale/Scale';
import ProgressBar from '../View/subView/Progress-bar/ProgressBar';
import Labels from '../View/subView/Labels/Labels';
import Tooltip from '../View/subView/Tooltip/Tooltip';
import labels from '../View/subView/Labels/Labels';

type Orientation = 'vertical' | 'horizontal';
type Color = 'green' | 'purple';
type Option = Exclude<keyof ISettings, labels> | keyof LabelsOptions;
type OptionValue = number | boolean | Orientation | Color | LabelsOptions;
type OptionFromThumbValues = 'from' | 'to';
type EventsNames = 'update';

interface ISettings {
  min: number;
  max: number;
  step: number;
  from: number;
  to: number;
  orientation: Orientation;
  isRange: boolean;
  hasProgressBar: boolean;
  hasTooltips: boolean;
  labels: LabelsOptions;
  color: Color;
}

type LabelsOptions = {
  addLabels: boolean;
  countOfLabels: number;
};

type StateValuesForConvert = {
  max: number;
  min: number;
  step: number;
};

type PageCoords = {
  clientX: number;
  clientY: number;
};

type ElementCoords = {
  left: number;
  bottom: number;
  width: number;
  height: number;
};

type SliderComponents = {
  scale: Scale;
  thumb: Thumb;
  progressBar: ProgressBar;
  labels: Labels;
  tooltip: Tooltip;
  thumbSecond?: Thumb;
  tooltipSecond?: Tooltip;
};

export {
  Option,
  OptionValue,
  OptionFromThumbValues,
  Orientation,
  Color,
  ISettings,
  LabelsOptions,
  ElementCoords,
  PageCoords,
  SliderComponents,
  StateValuesForConvert,
  EventsNames,
};
