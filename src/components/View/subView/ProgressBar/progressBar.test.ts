/**
 * @jest-environment jsdom
 */

import ProgressBar from './ProgressBar';
import { ISettings } from '../../../interfaces/interfaces';
import { defaultState } from '../../../../defaultState';

describe('Progress-bar:', () => {
  let progressBar: ProgressBar;
  let root: HTMLElement;
  let state: ISettings;

  beforeEach(() => {
    state = JSON.parse(JSON.stringify(defaultState));
    root = document.createElement('div');
    progressBar = new ProgressBar(state);
  });

  test('should be instance of ProgressBar', () => {
    expect(progressBar).toBeInstanceOf(ProgressBar);
  });

  test('should return HTMLDivElement of progress-bar', () => {
    expect(progressBar.getProgressBar()).toBeTruthy();
  });

  test('should created progress-bar with vertical orientation', () => {
    const stateForVerticalBar: ISettings = {
      ...state,
      orientation: 'vertical',
      isRange: true,
    };

    const verticalBar = new ProgressBar(stateForVerticalBar);
    const verticalBarNode = verticalBar.getProgressBar();
    root.appendChild(verticalBarNode);

    expect(
      root.querySelectorAll('.slider__progress-bar--vertical').length
    ).toBe(1);
  });

  test('should be completed method update with horizontal orientation', () => {
    const newState: ISettings = {
      ...state,
      max: 100,
      min: -100,
      step: 10,
      from: -20,
      to: 30,
      isRange: true,
      orientation: 'horizontal',
    };

    const newBar = new ProgressBar(newState);
    const newBarNode = newBar.getProgressBar();

    const changeState = {
      ...newState,
      to: 60,
    };

    newBar.update(changeState);

    expect(newBarNode.style.width).toBeTruthy();
    expect(newBarNode.style.left).toBeTruthy();
    expect(newBarNode.style.width).toBe('40%');
  });

  test('should have property height and bottom when orientation is vertical', () => {
    const newState: ISettings = {
      ...state,
      isRange: true,
      orientation: 'vertical',
    };

    const verticalBar = new ProgressBar(newState);
    const verticalBarNode = verticalBar.getProgressBar();

    verticalBar.update(newState);

    expect(verticalBarNode.style.height).toBeTruthy();
    expect(verticalBarNode.style.bottom).toBeTruthy();
  });
});
