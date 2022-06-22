/**
 * @jest-environment jsdom
 */

import { defaultState } from '../../defaultState';
import { ISettings, OptionFromThumbValues } from '../interfaces/interfaces';
import View from './View';

describe('View:', () => {
  let view: View;
  let state: ISettings;
  let root: HTMLElement;

  beforeEach(() => {
    state = {
      ...JSON.parse(JSON.stringify(defaultState)),
      max: 100,
      min: -100,
      step: 10,
      from: -20,
      to: 40,
      isRange: true,
      hasProgressBar: true,
      hasTooltips: true,
      orientation: 'horizontal',
      color: 'green',
      labels: {
        addLabels: true,
        countOfLabels: 6,
      },
    };

    root = document.createElement('div');
  });

  afterEach(() => {
    root.innerHTML = '';
  });

  test('should be instance of View', () => {
    view = new View(state, root);
    expect(view).toBeInstanceOf(View);
  });

  test('should have been called method init and should created slider', () => {
    view = new View(state, root);
    const spyInit = jest.spyOn(view, 'init');

    view.init(state);
    expect(spyInit).toHaveBeenCalled();
    expect(root.children.length).toBe(1);
  });

  test('should created slider when isRange = false', () => {
    const newState = {
      ...state,
      isRange: false,
    }

    view = new View(newState, root)
    expect(root.children.length).toBe(1);
  })

  test('should have been called method update', () => {
    view = new View(state, root);
    const spyUpdate = jest.spyOn(view, 'update');

    view.update(state);
    expect(spyUpdate).toHaveBeenCalled();
  });

  test('should have been called method update when isRange = false', () => {
    const newState = {
      ...state,
      isRange: false
    }

    view = new View(newState, root);
    const spyUpdate = jest.spyOn(view, 'update');

    view.update(newState);
    expect(spyUpdate).toHaveBeenCalled();
  });

  test('should have been called setTargetThumb method with from option', () => {
    view = new View(state, root);
    const spySetTargetThumb = jest.spyOn(view, 'setTargetThumb');

    const option: OptionFromThumbValues = 'from';

    view.setTargetThumb(option);
    expect(spySetTargetThumb).toHaveBeenCalled();
  });

  test('should have been called setTargetThumb method with to option', () => {
    view = new View(state, root);
    const spySetTargetThumb = jest.spyOn(view, 'setTargetThumb');

    const option: OptionFromThumbValues = 'to';

    view.setTargetThumb(option);
    expect(spySetTargetThumb).toHaveBeenCalled();
  });

  test('should created united tooltip with vertical orientation', () => {
    const newState: ISettings = {
      ...state,
      orientation: 'vertical',
      from: -40,
    }

    view = new View(newState, root);
    expect(root.querySelectorAll('.tooltip--united').length).toBe(1)
  });

});
