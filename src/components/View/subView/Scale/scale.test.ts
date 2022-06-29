/**
 * @jest-environment jsdom
 */

import { defaultState } from '../../../../defaultState';
import { ISettings } from '../../../interfaces/interfaces';
import Slider from '../../Slider/Slider';
import Scale from './Scale';

describe('Scale:', () => {
  let scale: Scale;
  let event: PointerEvent;
  let state: ISettings;
  let root: HTMLElement;

  beforeEach(() => {
    state = {
      ...JSON.parse(JSON.stringify(defaultState)),
      isRange: false,
      hasProgressBar: false,
      hasTooltips: false,
      labels: {
        addLabels: false,
        countOfLabels: 6,
      },
    };
    event = <PointerEvent>new Event('pointerdown', {
      bubbles: true,
    });
    root = document.createElement('div');
  });

  test('should be instance of Scale', () => {
    scale = new Scale(state, root);
    expect(scale).toBeInstanceOf(Scale);
  });

  test('getScale should not return falsy', () => {
    scale = new Scale(state, root);
    const scaleNode = scale.getScale();
    expect(scaleNode).not.toBeFalsy();
  });

  test('should emit the event once', () => {
    scale = new Scale(state, root);
    const spyEmit = jest.spyOn(scale, 'emit');
    const body = document.querySelector('body');

    if (body instanceof HTMLBodyElement) {
      const scaleNode = scale.getScale();

      body.appendChild(root);
      root.appendChild(scaleNode);

      scaleNode.dispatchEvent(event);
      expect(spyEmit).toHaveBeenCalledTimes(1);
    }
  });

  test('should emit the event once with vertical orientation', () => {
    const newState: ISettings = {
      ...state,
      orientation: 'vertical',
    };

    scale = new Scale(newState, root);
    const spyEmit = jest.spyOn(scale, 'emit');
    const body = document.querySelector('body');

    if (body instanceof HTMLBodyElement) {
      const scaleNode = scale.getScale();

      body.appendChild(root);
      root.appendChild(scaleNode);

      scaleNode.dispatchEvent(event);
      expect(spyEmit).toHaveBeenCalledTimes(1);
    }
  });

  test('should emit the event once when click happen on progressBar', () => {
    const slider = new Slider(state, root);

    const scale = slider.getComponents().scale;
    const progressBar = slider.getComponents().progressBar;
    const body = <HTMLBodyElement>document.querySelector('body');

    const spyEmit = jest.spyOn(scale, 'emit');
    const scaleNode = scale.getScale();
    const progressBarNode = progressBar.getProgressBar();

    body.appendChild(root);
    root.appendChild(scaleNode);
    scaleNode.appendChild(progressBarNode);

    progressBarNode.dispatchEvent(event);
    expect(spyEmit).toHaveBeenCalledTimes(1);
  });
});
