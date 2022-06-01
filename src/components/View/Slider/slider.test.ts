/**
 * @jest-environment jsdom
 */

import Slider from "./Slider";
import {defaultState} from "../../../defaultState";
import {ISettings} from "../../interfaces/interfaces";

describe('Slider:', () => {
  let slider: Slider
  let root: HTMLElement
  let state: ISettings

  beforeEach(() => {
    state = {
      ...JSON.parse(JSON.stringify(defaultState)),
      isRange: false,
      hasProgressBar: false,
      hasTooltips: false,
      labels: {
        addLabels: false,
        countOfLabels: 6,
      }
    }
    root = document.createElement('div')
  })

  test('should be instance of Slider', () => {
    slider = new Slider(state, root)
    expect(slider).toBeInstanceOf(Slider)
  })

  test('should have components for creating simple slider', () => {
    slider = new Slider(state, root)
    const components = slider.getComponents()
    expect(components).toHaveProperty('scale')
    expect(components).toHaveProperty('progressBar')
    expect(components).toHaveProperty('labels')
    expect(components).toHaveProperty('thumb')
    expect(components).toHaveProperty('tooltip')
  })

  test('should have additional components for creating range slider', () => {
    const newState = {
      ...state,
      isRange: true
    }
    const rangeSlider = new Slider(newState, root)
    const components = rangeSlider.getComponents()
    expect(components).toHaveProperty('thumbSecond')
  })

  test('should embed components into DOM', () => {
    const newState = {
      ...state,
      hasProgressBar: true,
      hasTooltips: true,
      labels: {
        addLabels: true,
        countOfLabels: 6,
      }
    }
    slider = new Slider(newState, root)
    expect(root.querySelectorAll('.slider__progress-bar').length).toBe(1)
    expect(root.querySelectorAll('.slider__labels').length).toBe(1)
  })

})
