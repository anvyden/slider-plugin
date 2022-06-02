import { ISettings } from './components/interfaces/interfaces';

const defaultState: ISettings = {
  min: -50,
  max: 90,
  step: 30,
  from: -44,
  to: -22,
  orientation: 'horizontal',
  isRange: true,
  hasProgressBar: true,
  hasTooltips: false,
  color: 'green',
  labels: {
    addLabels: true,
    countOfLabels: 6,
  }
};

export { defaultState };
