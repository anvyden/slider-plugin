import { ISettings } from './components/interfaces/interfaces';

const defaultState: ISettings = {
  min: -100,
  max: 90,
  step: 1,
  from: -50,
  to: -22,
  orientation: 'horizontal',
  isRange: true,
  hasProgressBar: true,
  hasTooltips: true,
  color: 'green',
  labels: {
    addLabels: true,
    countOfLabels: 6,
  }
};

export { defaultState };
