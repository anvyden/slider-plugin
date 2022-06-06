/**
 * @jest-environment jsdom
 */

import Thumb from "./Thumb";
import {ISettings} from "../../../interfaces/interfaces";
import {defaultState} from "../../../../defaultState";
import {ThumbEvents} from "../../../Observer/events";

describe('Thumb:', () => {
  let thumb: Thumb
  let thumbSecond: Thumb
  let root: HTMLElement
  let state: ISettings
  let event: PointerEvent
  let eventKeyboard: KeyboardEvent

  beforeEach(() => {
    state = {
      ...JSON.parse(JSON.stringify(defaultState)),
      max: 100,
      min: -100,
      step: 10,
      from: -20,
      to: 40,
      isRange: true
    }

    root = document.createElement('div')
    event = <PointerEvent>new Event('pointerdown')
    eventKeyboard = <KeyboardEvent>new Event('keydown')
  })

  test('should be instance of Thumb', () => {
    thumb = new Thumb(state, root)
    expect(thumb).toBeInstanceOf(Thumb)
  })

  test('should return HTMLDivElement of thumb', () => {
    thumb = new Thumb(state, root)
    expect(thumb.getThumb()).toBeTruthy()
  })


  test('should be completed method update of thumbs', () => {
    thumb = new Thumb(state, root)
    thumbSecond = new Thumb(state, root, 'thumb-second')

    const thumbNode = thumb.getThumb()
    const thumbSecondNode = thumbSecond.getThumb()

    const changeState = {
      ...state,
      from: -50,
      to: 60,
    }

    thumb.update(changeState)
    thumbSecond.update(changeState)

    expect(thumbNode.style).toHaveProperty('left')
    expect(thumbNode.style.left).toBe('25%')
    expect(thumbSecondNode.style).toHaveProperty('left')
    expect(thumbSecondNode.style.left).toBe('80%')
  })

  test('should created thumb', () => {
    thumb = new Thumb(state, root)
    const thumbNode = thumb.getThumb()
    root.appendChild(thumbNode)

    expect(root.querySelectorAll('.slider__thumb').length).toBe(1)
  })

  test('when the up arrow is pressed, should to call the keyboard event handler', () => {
    eventKeyboard.code = 'ArrowUp'
    thumb = new Thumb(state, root)
    const spyEmit = jest.spyOn(thumb, 'emit')
    const body = document.querySelector('body')

    if (body instanceof HTMLBodyElement) {
      const thumbNode = thumb.getThumb()

      body.appendChild(root)
      root.appendChild(thumbNode)

      thumbNode.dispatchEvent(eventKeyboard)
      expect(spyEmit).toHaveBeenCalledTimes(1)
    }
  })

  // test('should intercept the target and call the event handler', () => {
  //   thumb = new Thumb(state, root)
  //   const spyEmit = jest.spyOn(thumb, 'emit')
  //   const body = document.querySelector('body')
  //
  //   if (body instanceof HTMLBodyElement) {
  //     const thumbNode = thumb.getThumb()
  //
  //     body.appendChild(root)
  //     root.appendChild(thumbNode)
  //
  //     thumbNode.dispatchEvent(event)
  //     expect(spyEmit).toHaveBeenCalledTimes(1)
  //   }
  // })

})