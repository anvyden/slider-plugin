/**
 * @jest-environment jsdom
 */

import {defaultState} from "../../../../defaultState";
import Tooltip from "./Tooltip";
import {ISettings} from "../../../interfaces/interfaces";

describe('Tooltip', () => {
  let state: ISettings
  let tooltip: Tooltip
  let root: HTMLDivElement

  beforeEach(() => {
    state = {
      ...JSON.parse(JSON.stringify(defaultState)),
      max: 100,
      min: -100,
      step: 10,
      from: -20,
      to: 40,
      isRange: true,
      hasTooltips: true,
    }

    tooltip = new Tooltip(state)
    root = document.createElement('div')
  })

  test('should be a instance of Tooltip', () => {
    expect(tooltip).toBeInstanceOf(Tooltip)
  })

  test('should return HTMLDivElement of tooltip', () => {
    expect(tooltip.getTooltip()).toBeTruthy()
  })

  test('should created tooltip', () => {
    const tooltipNode = tooltip.getTooltip()
    root.appendChild(tooltipNode)
    expect(root.querySelectorAll('.slider__tooltip').length).toBe(1)
  })

  test('should be completed update method', () => {
    const newState = {
      ...state,
      from: -30,
    }

    tooltip.update(newState)
    const tooltipNode = tooltip.getTooltip()

    expect(tooltipNode.textContent).toBe('-30')
  })

})
