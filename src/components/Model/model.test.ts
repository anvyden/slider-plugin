import Model from './Model';
import { ISettings } from '../interfaces/interfaces';
import { defaultState } from '../../defaultState';
import { ModelEvents } from '../Observer/events';

describe('Model:', () => {
  let state: ISettings;
  let model: Model;

  beforeEach(() => {
    state = {
      ...JSON.parse(JSON.stringify(defaultState)),
      max: 100,
      min: -100,
      step: 10,
      from: -20,
      to: 60,
      isRange: true,
      hasProgressBar: true,
      orientation: 'horizontal',
      color: 'green',
      labels: {
        addLabels: true,
        countOfLabels: 6,
      },
    };

    model = new Model(state);
  });

  test('should be instance of Model', () => {
    expect(model).toBeInstanceOf(Model);
  });

  describe('setState method', () => {
    test('should set to transferred state and emit should have been called with transferred state', () => {
      const newState = {
        ...state,
        from: -30,
      };

      const spyEmit = jest.spyOn(model, 'emit');
      model.setState(newState);

      expect(spyEmit).toHaveBeenCalledWith(ModelEvents.STATE_CHANGED, newState);
    });
  });

  describe('getState method', () => {
    test('should return current state', () => {
      const currentState = model.getState();

      expect(currentState).toBeTruthy();
      expect(currentState).toEqual(state);
    });
  });

  describe('setValue method', () => {
    test('should set to "from" or "to" value and emit should have been called with the new state', () => {
      const spyEmit = jest.spyOn(model, 'emit');
      model.setValue('from', -30);
      const currentState = model.getState();

      expect(currentState.from).toBe(-30);
      expect(spyEmit).toHaveBeenCalledWith(
        ModelEvents.VALUE_CHANGED,
        currentState
      );
    });

    test('should set to boolean value and emit should have been called with the new state', () => {
      const spyEmit = jest.spyOn(model, 'emit');
      model.setValue('isRange', false);
      const currentState = model.getState();

      expect(currentState.isRange).toBe(false);
      expect(spyEmit).toHaveBeenCalledWith(
        ModelEvents.STATE_CHANGED,
        currentState
      );
    });

    test('should set to number value and emit should have been called with the new state', () => {
      const spyEmit = jest.spyOn(model, 'emit');
      model.setValue('max', 110);
      const currentState = model.getState();

      expect(currentState.max).toBe(110);
      expect(spyEmit).toHaveBeenCalledWith(
        ModelEvents.STATE_CHANGED,
        currentState
      );
    });

    test('should set to color value and emit should have been called with the new state', () => {
      const spyEmit = jest.spyOn(model, 'emit');
      model.setValue('color', 'purple');
      const currentState = model.getState();

      expect(currentState.color).toBe('purple');
      expect(spyEmit).toHaveBeenCalledWith(
        ModelEvents.STATE_CHANGED,
        currentState
      );
    });

    test('should set to color value and emit should have been called with the new state', () => {
      const spyEmit = jest.spyOn(model, 'emit');
      model.setValue('color', 'purple');
      const currentState = model.getState();

      expect(currentState.color).toBe('purple');
      expect(spyEmit).toHaveBeenCalledWith(
        ModelEvents.STATE_CHANGED,
        currentState
      );
    });

    test('should set to color value and emit should have been called with the new state', () => {
      const spyEmit = jest.spyOn(model, 'emit');
      model.setValue('color', 'purple');
      const currentState = model.getState();

      expect(currentState.color).toBe('purple');
      expect(spyEmit).toHaveBeenCalledWith(
        ModelEvents.STATE_CHANGED,
        currentState
      );
    });

    test('should set to orientation value and emit should have been called with the new state', () => {
      const spyEmit = jest.spyOn(model, 'emit');
      model.setValue('orientation', 'vertical');
      const currentState = model.getState();

      expect(currentState.orientation).toBe('vertical');
      expect(spyEmit).toHaveBeenCalledWith(
        ModelEvents.STATE_CHANGED,
        currentState
      );
    });

    test('should set to addLabels value and emit should have been called with the new state', () => {
      const spyEmit = jest.spyOn(model, 'emit');
      model.setValue('addLabels', false);
      const currentState = model.getState();

      expect(currentState.labels.addLabels).toBe(false);
      expect(spyEmit).toHaveBeenCalledWith(
        ModelEvents.STATE_CHANGED,
        currentState
      );
    });

    test('should set to countOfLabels value and emit should have been called with the new state', () => {
      const spyEmit = jest.spyOn(model, 'emit');
      model.setValue('countOfLabels', 4);
      const currentState = model.getState();

      expect(currentState.labels.countOfLabels).toBe(4);
      expect(spyEmit).toHaveBeenCalledWith(
        ModelEvents.STATE_CHANGED,
        currentState
      );
    });

    test('should set to from value when isRange = false and emit should have been called with the new state', () => {
      const newState = {
        ...state,
        isRange: false,
      };

      const newModel = new Model(newState);
      const spyEmit = jest.spyOn(newModel, 'emit');
      newModel.setValue('from', -40);
      const currentState = newModel.getState();

      expect(currentState.from).toBe(-40);
      expect(spyEmit).toHaveBeenCalledWith(
        ModelEvents.VALUE_CHANGED,
        currentState
      );
    });
  });

  describe('getValue method', () => {
    test('should return the value of any option', () => {
      const value = model.getValue('max');
      expect(value).toBeTruthy();
      expect(value).toBe(100);
    });

    test('should return the value of addLabels', () => {
      const value = model.getValue('addLabels');
      expect(value).toBeTruthy();
      expect(value).toBe(true);
    });

    test('should return the value of countOfLabels', () => {
      const value = model.getValue('countOfLabels');
      expect(value).toBeTruthy();
      expect(value).toBe(6);
    });
  });

  describe('increment method', () => {
    test('should increment the value of "from" or "to" by step and emit should have been called with new state', () => {
      const spyEmit = jest.spyOn(model, 'emit');
      model.increment('from');
      const currentState = model.getState();

      expect(currentState.from).toBe(-10);
      expect(spyEmit).toHaveBeenCalledWith(
        ModelEvents.VALUE_CHANGED,
        currentState
      );
    });
  });

  describe('decrement method', () => {
    test('should decrement the value of "from" or "to" by step and emit should have been called with new state', () => {
      const spyEmit = jest.spyOn(model, 'emit');
      model.decrement('to');
      const currentState = model.getState();

      expect(currentState.to).toBe(50);
      expect(spyEmit).toHaveBeenCalledWith(
        ModelEvents.VALUE_CHANGED,
        currentState
      );
    });
  });

  describe('setValueFromPercent method', () => {
    test('should set to the percent value of "from" or "to"', () => {
      model.setValueFromPercent('to', 75);
      const currentState = model.getState();

      expect(currentState.to).toBe(50);
    });
  });

  describe('getOptionByNearValue method', () => {
    test('should return "to" because it`s closer to the passed percent value', () => {
      const option = model.getOptionByNearValue(65);

      expect(option).toBeTruthy();
      expect(option).toBe('to');
    });

    test('should return "from" because it`s closer to the passed percent value', () => {
      const option = model.getOptionByNearValue(50);

      expect(option).toBeTruthy();
      expect(option).toBe('from');
    });

    test('if isRange = false, should return "from"', () => {
      const newState = {
        ...state,
        isRange: false,
      };

      const newModel = new Model(newState);
      const option = newModel.getOptionByNearValue(65);

      expect(option).toBeTruthy();
      expect(option).toBe('from');
    });
  });
});
