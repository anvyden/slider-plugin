import { defaultState } from '../../defaultState';
import { ISettings } from '../interfaces/interfaces';
import Validation from './Validation';

describe('Validation:', () => {
  let validation: Validation;
  let state: ISettings;

  beforeEach(() => {
    validation = new Validation();
    state = {
      ...JSON.parse(JSON.stringify(defaultState)),
      max: 100,
      min: -100,
      step: 10,
      from: -20,
      to: 40,
      isRange: true,
      hasProgressBar: true,
      orientation: 'horizontal',
    };
  });

  describe('checkStep method', () => {
    test('if step < 0, should return step = defaultState.step', () => {
      const newState = {
        ...state,
        step: -10,
      };

      const validStep = validation.checkStep(
        newState.max,
        newState.min,
        newState.step
      );
      expect(validStep).toBe(defaultState.step);
    });

    test('if step = 0, should return step = 1', () => {
      const newState = {
        ...state,
        step: 0,
      };

      const validStep = validation.checkStep(
        newState.max,
        newState.min,
        newState.step
      );
      expect(validStep).toBe(1);
    });

    test('if step more than range, should return step = range', () => {
      const newState = {
        ...state,
        step: 300,
      };

      const validStep = validation.checkStep(
        newState.max,
        newState.min,
        newState.step
      );
      expect(validStep).toBe(200);
    });
  });

  describe('checkMaxMin method', () => {
    test('if min = max should increase by 1 max value', () => {
      const newState = {
        ...state,
        max: 100,
        min: 100,
      };

      validation.checkMaxMin.bind(newState)(newState.max, newState.min);

      expect(newState.max).toBe(101);
    });

    test('should return swapped values min and max', () => {
      const newState = {
        ...state,
        max: -100,
        min: 100,
      };

      validation.checkMaxMin.bind(newState)(newState.max, newState.min);

      expect(newState.max).toBe(100);
      expect(newState.min).toBe(-100);
    });
  });

  describe('convertValueToStep method', () => {
    test('should return valid value with step', () => {
      const newState = {
        ...state,
        max: 100,
        min: -100,
        step: 10,
        from: -16,
      };

      const validValue = validation.convertValueToStep.bind(newState)(
        newState.from
      );

      expect(validValue).toBe(-20);
    });
  });

  describe('checkFromRangeValue method', () => {
    test('if from more than to, should return from = to', () => {
      const newState = {
        ...state,
        from: 60,
      };

      const validFrom = validation.checkFromRangeValue.bind(newState)(
        newState.from
      );
      expect(validFrom).toBe(40);
    });
  });

  describe('checkToRangeValue method', () => {
    test('if to less than from, should return to = from', () => {
      const newState = {
        ...state,
        to: -40,
      };

      const validTo = validation.checkToRangeValue.bind(newState)(newState.to);
      expect(validTo).toBe(-20);
    });
  });

  describe('checkCountOfLabels method', () => {
    test('should return rounded value of countOfLabels', () => {
      const newState = {
        ...JSON.parse(JSON.stringify(state)),
        labels: {
          addLabels: true,
          countOfLabels: 4.8,
        },
      };

      const validCountOfLabels = validation.checkCountOfLabels(
        newState.labels.countOfLabels
      );
      expect(validCountOfLabels).toBe(5);
    });

    test('value of countOfLabels should be more than 2 and less than 6', () => {
      let newState = {
        ...JSON.parse(JSON.stringify(state)),
        labels: {
          addLabels: true,
          countOfLabels: 8,
        },
      };

      const validCountOfLabels1 = validation.checkCountOfLabels(
        newState.labels.countOfLabels
      );
      expect(validCountOfLabels1).toBe(6);

      newState = {
        ...JSON.parse(JSON.stringify(state)),
        labels: {
          addLabels: true,
          countOfLabels: 1,
        },
      };

      const validCountOfLabels2 = validation.checkCountOfLabels(
        newState.labels.countOfLabels
      );
      expect(validCountOfLabels2).toBe(6);
    });
  });

  describe('checkState method', () => {
    test('should return valid state', () => {
      const validState = validation.checkState(state);

      expect(validState).toBeTruthy();
      expect(validState).toEqual(state);
    });

    test('should deleted unnecessary options from state when passed via jquery', () => {
      const newState = {
        ...state,
        margin: 40,
      };

      const validState = validation.checkState(newState);
      expect(validState).not.toHaveProperty('margin');
    });
  });

  test('should return valid state when isRange = false', () => {
    const newState = {
      ...state,
      isRange: false,
    };

    const validState = validation.checkState(newState);

    expect(validState).toBeTruthy();
    expect(validState).toEqual(newState);
  });

  test('should swapped values of from and to and return valid state', () => {
    const newState = {
      ...state,
      from: 60,
      to: -40,
    };

    const validState = validation.checkState(newState);

    expect(validState).toBeTruthy();
    expect(validState.from).toBe(-40);
    expect(validState.to).toBe(60);
  });

  test('if from <= min and to >= max, should return state with valid values of from and to', () => {
    const newState = {
      ...state,
      from: -110,
      to: 120,
    };

    const validState = validation.checkState(newState);

    expect(validState.from).toBe(-100);
    expect(validState.to).toBe(100);
  });

  test('if from > max or from < min when isRange = false, should return state with valid value of from', () => {
    let newState = {
      ...state,
      isRange: false,
      from: -110,
    };

    let validState = validation.checkState(newState);
    expect(validState.from).toBe(-100);

    newState = {
      ...state,
      isRange: false,
      from: 110,
    };

    validState = validation.checkState(newState);
    expect(validState.from).toBe(100);
  });
});
