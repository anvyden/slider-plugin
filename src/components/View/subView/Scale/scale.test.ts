/**
 * @jest-environment jsdom
 */

import Scale from "./Scale";
import {defaultState} from "../../../../defaultState";
import {ISettings} from "../../../interfaces/interfaces";
// import Slider from "../../Slider/Slider";


describe('Scale:', () => {
  // let slider: Slider
  let scale: Scale
  let event: PointerEvent
  let state: ISettings
  let root: HTMLElement

  beforeEach(() => {
    state = {
      ...JSON.parse(JSON.stringify(defaultState)),
      isRange: false,
      hasFill: false,
      hasTooltips: false,
      hasLabels: false,
    }
    event = <PointerEvent>new Event('pointerdown')
    root = document.createElement('div')
  })

  test('should be instance of Scale', () => {
    scale = new Scale(state)
    expect(scale).toBeInstanceOf(Scale)
  })

  test('getScale should not return falsy', () => {
    scale = new Scale(state)
    const scaleNode = scale.getScale()
    expect(scaleNode).not.toBeFalsy()
  })

  test('should emit the event once', () => {
    scale = new Scale(state)
    const spyEmit = jest.spyOn(scale, 'emit')
    const body = document.querySelector('body')

    if (body instanceof HTMLBodyElement) {
      const scaleNode = scale.getScale()

      body.appendChild(root)
      root.appendChild(scaleNode)

      scaleNode.dispatchEvent(event)
      expect(spyEmit).toHaveBeenCalledTimes(1)
    }
  })

  test('should emit the event once with vertical orientation', () => {
    const newState = Object.assign({}, state, {
      orientation: 'vertical'
    })

    scale = new Scale(newState)
    const spyEmit = jest.spyOn(scale, 'emit')
    const body = document.querySelector('body')

    if (body instanceof HTMLBodyElement) {
      const scaleNode = scale.getScale()

      body.appendChild(root)
      root.appendChild(scaleNode)
      scaleNode.dispatchEvent(event)
      expect(spyEmit).toHaveBeenCalledTimes(1)
    }
  })

  // test('1', () => {
  //   const body = document.querySelector('body')
  //   if (body instanceof HTMLBodyElement) {
  //     body.appendChild(root)
  //     slider = new Slider(state, root)
  //     const scale = slider.getComponents().scale
  //     const knob = slider.getComponents().knob
  //     const spyEmit = jest.spyOn(scale, 'emit')
  //
  //     if (event.target instanceof HTMLElement) {
  //       const knobNode = knob.getKnob()
  //       knobNode.dispatchEvent(event)
  //       expect(spyEmit).toHaveBeenCalledTimes(0)
  //     }
  //   }
  // })
})
