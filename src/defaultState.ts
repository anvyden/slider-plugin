import { ISettings } from './components/interfaces/interfaces';

const defaultState: ISettings = {
  min: -50,
  max: 0,
  step: 10,
  from: -44,
  to: -22,
  orientation: 'horizontal',
  isRange: true,
  hasProgressBar: true,
  hasLabels: true,
  hasTooltips: false,
  color: 'green',
};

export { defaultState };
