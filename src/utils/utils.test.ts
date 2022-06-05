/**
 * @jest-environment jsdom
 */

import {
  convertPercentValueToNumber,
  convertStateValueToPercent,
  getElementCoords,
  getPageCoords,
  getStepInPercent
} from "./utils";
import { ISettings } from "../components/interfaces/interfaces";
import { defaultState } from "../defaultState";
import Scale from "../components/View/subView/Scale/Scale";

const state = {
  max: 100,
  min: 0,
  step: 10,
}

describe('Utils: getStepInPercent', () => {

  expect(getStepInPercent(state.max, state.min, state.step)).toBe(10)

})

describe('Utils: convertStateValueToPercent', () => {

  test('should return the value as a percentage', () => {
    const value = 20
    expect(convertStateValueToPercent(state, value)).toBe(20)
  })

  test('if the value greater than max, it should return a percentage value equal to 100', () => {
    const value = 110
    expect(convertStateValueToPercent(state, value)).toBe(100)
  })

  test('if the value less than min, it should return a percentage value equal to 0', () => {
    const value = -10
    expect(convertStateValueToPercent(state, value)).toBe(0)
  })

})

describe('Utils: convertPercentValueToNumber', () => {

  test('should return the value in a number', () => {
    const value = 50
    expect(convertPercentValueToNumber(state, value)).toBe(50)
  })

  test('if the percentage value greater than 100%, should return the value equal to max of range', () => {
    const value = 110
    expect(convertPercentValueToNumber(state, value)).toBe(state.max)
  })

})

describe('Utils: positionFunctions', () => {
  let state: ISettings
  let scale: Scale
  let event: PointerEvent
  let root: HTMLElement

  beforeEach(() => {
    root = document.createElement('div')
    state = JSON.parse(JSON.stringify(defaultState))
    scale = new Scale(state, root)
    event = <PointerEvent>new Event('pointerdown')
  })

  test('getElementCoords should return element coordinates', () => {
    const scaleNode = scale.getScale()
    expect(getElementCoords(scaleNode)).toHaveProperty('left')
    expect(getElementCoords(scaleNode)).toHaveProperty('bottom')
    expect(getElementCoords(scaleNode)).toHaveProperty('width')
    expect(getElementCoords(scaleNode)).toHaveProperty('height')
  })

  test('getPageCoords should return event page coordinates', () => {
    root.dispatchEvent(event)
    expect(getPageCoords(event)).toHaveProperty('clientX')
    expect(getPageCoords(event)).toHaveProperty('clientY')
  })

})
