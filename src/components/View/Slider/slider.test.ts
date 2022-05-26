/**
 * @jest-environment jsdom
 */

import Slider from "./Slider";
import {defaultState} from "../../../defaultState";
import {ISettings} from "../../interfaces/interfaces";

describe('Slider:', () => {
  let slider: Slider
  let root: HTMLElement
  let cloneState: ISettings

  beforeEach(() => {
    cloneState = JSON.parse(JSON.stringify(defaultState))
    root = document.createElement('div')
  })

  test('should be instance of Slider', () => {
    slider = new Slider(cloneState, root)
    expect(slider).toBeInstanceOf(Slider)
  })

  test('should have components for creating simple slider', () => {
    slider = new Slider(cloneState, root)
    const components = slider.getComponents()
    expect(components).toHaveProperty('scale')
    expect(components).toHaveProperty('fill')
    expect(components).toHaveProperty('labels')
    expect(components).toHaveProperty('knob')
    expect(components).toHaveProperty('tooltip')
  })

  test('should have additional components for creating range slider', () => {
    const newState = {
      ...cloneState,
      isRange: true
    }
    const rangeSlider = new Slider(newState, root)
    const components = rangeSlider.getComponents()
    expect(components).toHaveProperty('knobSecond')
  })

  test('should should embed components into DOM', () => {
    const newState = {
      ...cloneState,
      hasLabels: true,
      hasFill: true,
      hasTooltips: true,
      isRange: false
    }
    slider = new Slider(newState, root)
    expect(root.querySelectorAll('.slider__fill').length).toBe(1)
    expect(root.querySelectorAll('.slider__labels').length).toBe(1)
  })

})
