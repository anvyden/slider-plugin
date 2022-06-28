import { ISettings } from './components/interfaces/interfaces';

const defaultState: ISettings = {
  min: 0,
  max: 100,
  step: 10,
  from: 20,
  to: 50,
  orientation: 'horizontal',
  isRange: true,
  hasProgressBar: true,
  hasTooltips: true,
  color: 'green',
  labels: {
    addLabels: true,
    countOfLabels: 6,
  },
};

export { defaultState };
