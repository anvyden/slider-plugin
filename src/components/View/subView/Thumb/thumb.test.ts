/**
 * @jest-environment jsdom
 */

import { defaultState } from '../../../../defaultState';
import { ISettings } from '../../../interfaces/interfaces';
import { ThumbEvents } from '../../../Observer/events';
import Slider from '../../Slider/Slider';
import Thumb from './Thumb';

describe('Thumb:', () => {
  let thumb: Thumb;
  let thumbSecond: Thumb;
  let root: HTMLElement;
  let state: ISettings;
  let eventPointerDown: PointerEvent;
  let eventPointerMove: PointerEvent;
  let eventPointerUp: PointerEvent;
  let eventKeyboard: KeyboardEvent;

  beforeEach(() => {
    state = {
      ...JSON.parse(JSON.stringify(defaultState)),
      max: 100,
      min: -100,
      step: 10,
      from: -20,
      to: 40,
      isRange: true,
      orientation: 'horizontal',
    };

    root = document.createElement('div');
    eventPointerDown = <PointerEvent>new Event('pointerdown');
    eventPointerMove = <PointerEvent>new Event('pointermove', {
      bubbles: true,
    });
    eventPointerUp = <PointerEvent>new Event('pointerup', {
      bubbles: true,
    });
    eventKeyboard = <KeyboardEvent>new Event('keydown');
  });

  test('should be instance of Thumb', () => {
    thumb = new Thumb(state, root);
    expect(thumb).toBeInstanceOf(Thumb);
  });

  test('should return HTMLDivElement of thumb', () => {
    thumb = new Thumb(state, root);
    expect(thumb.getThumb()).toBeTruthy();
  });

  test('should be completed method update of thumbs', () => {
    thumb = new Thumb(state, root);
    thumbSecond = new Thumb(state, root, 'thumb-second');

    const thumbNode = thumb.getThumb();
    const thumbSecondNode = thumbSecond.getThumb();

    const changeState = {
      ...state,
      from: -50,
      to: 60,
    };

    thumb.update(changeState);
    thumbSecond.update(changeState);

    expect(thumbNode.style).toHaveProperty('left');
    expect(thumbNode.style.left).toBe('25%');
    expect(thumbSecondNode.style).toHaveProperty('left');
    expect(thumbSecondNode.style.left).toBe('80%');
  });

  test('should be completed method update of thumbs with vertical orientation', () => {
    const verticalState: ISettings = {
      ...state,
      orientation: 'vertical',
    };

    thumb = new Thumb(verticalState, root);
    thumbSecond = new Thumb(verticalState, root, 'thumb-second');

    const thumbNode = thumb.getThumb();
    const thumbSecondNode = thumbSecond.getThumb();

    const changeState = {
      ...verticalState,
      from: -50,
      to: 60,
    };

    thumb.update(changeState);
    thumbSecond.update(changeState);

    expect(thumbNode.style).toHaveProperty('bottom');
    expect(thumbNode.style.bottom).toBe('25%');
    expect(thumbSecondNode.style).toHaveProperty('bottom');
    expect(thumbSecondNode.style.bottom).toBe('80%');
  });

  test('should created thumb', () => {
    thumb = new Thumb(state, root);
    const thumbNode = thumb.getThumb();
    root.appendChild(thumbNode);

    expect(root.querySelectorAll('.slider__thumb').length).toBe(1);
  });

  test('when the up arrow is pressed, should to call the keyboard event handler', () => {
    // @ts-ignore
    eventKeyboard.code! = 'ArrowUp';
    thumb = new Thumb(state, root);
    const spyEmit = jest.spyOn(thumb, 'emit');
    const body = document.querySelector('body');

    if (body instanceof HTMLBodyElement) {
      const thumbNode = thumb.getThumb();

      body.appendChild(root);
      root.appendChild(thumbNode);

      thumbNode.dispatchEvent(eventKeyboard);
      expect(spyEmit).toHaveBeenCalledWith(
        ThumbEvents.THUMB_VALUE_INCREMENT,
        'from'
      );
    }
  });

  test('when the down arrow is pressed, should to call the keyboard event handler', () => {
    // @ts-ignore
    eventKeyboard.code! = 'ArrowDown';
    thumb = new Thumb(state, root);
    const spyEmit = jest.spyOn(thumb, 'emit');
    const body = document.querySelector('body');

    if (body instanceof HTMLBodyElement) {
      const thumbNode = thumb.getThumb();
      thumbNode.dataset.id = 'thumb-second';

      body.appendChild(root);
      root.appendChild(thumbNode);

      thumbNode.dispatchEvent(eventKeyboard);
      expect(spyEmit).toHaveBeenCalledWith(
        ThumbEvents.THUMB_VALUE_DECREMENT,
        'to'
      );
    }
  });

  test('should call the event handler', () => {
    const slider = new Slider(state, root);
    thumb = slider.getComponents().thumb;

    const spyEmit = jest.spyOn(thumb, 'emit');
    const spyAddEventListener = jest.spyOn(document, 'removeEventListener');
    const spyRemoveEventListener = jest.spyOn(document, 'removeEventListener');
    const body = document.querySelector('body');

    if (body instanceof HTMLBodyElement) {
      const thumbNode = thumb.getThumb();

      body.appendChild(root);

      thumbNode.dispatchEvent(eventPointerDown);
      thumbNode.dispatchEvent(eventPointerMove);
      thumbNode.dispatchEvent(eventPointerUp);

      expect(spyEmit).toHaveBeenCalled();
      expect(spyAddEventListener).toHaveBeenCalled();
      expect(spyRemoveEventListener).toHaveBeenCalled();
    }
  });

  test('should intercept the target and call the event handler on the first thumb', () => {
    thumb = new Thumb(state, root);
    const spyHandler = jest.spyOn(thumb, 'dragThumbAfterScaleClick');
    thumb.dragThumbAfterScaleClick('from');

    expect(spyHandler).toHaveBeenCalled();
  });

  test('should intercept the target and call the event handler on the second thumb', () => {
    thumb = new Thumb(state, root);
    const spyHandler = jest.spyOn(thumb, 'dragThumbAfterScaleClick');
    thumb.dragThumbAfterScaleClick('to');

    expect(spyHandler).toHaveBeenCalled();
  });
});
