/**
 * @jest-environment jsdom
 */

import Labels from "./Labels";
import {ISettings} from "../../../interfaces/interfaces";
import {defaultState} from "../../../../defaultState";

describe('Labels:', () => {
  let labels: Labels
  let root: HTMLElement
  let state: ISettings
  let event: PointerEvent

  beforeEach(() => {
    state = {
      ...JSON.parse(JSON.stringify(defaultState)),
      labels: {
        addLabels: true,
        countOfLabels: 6
      }
    }

    root = document.createElement('div')
    event = <PointerEvent>new Event('pointerdown')
  })

  test('should be instance of Labels', () => {
    labels = new Labels(state)
    expect(labels).toBeInstanceOf(Labels)
  })

  test('should return HTMLDivElement of labels', () => {
    labels = new Labels(state)
    expect(labels.getLabels()).toBeTruthy()
  })

  test('should created labels', () => {
    labels = new Labels(state)
    const labelsNode = labels.getLabels()
    root.appendChild(labelsNode)

    expect(root.querySelectorAll('.slider__labels').length).toBe(1)
  })

  test('should created labels with vertical orientation', () => {
    const newState: ISettings = {
      ...state,
      orientation: 'vertical'
    }

    labels = new Labels(newState)
    const labelsNode = labels.getLabels()
    root.appendChild(labelsNode)

    expect(root.querySelectorAll('.slider__labels--vertical').length).toBe(1)
  })

  test('should emit the event once', () => {
    labels = new Labels(state)
    const spyEmit = jest.spyOn(labels, 'emit')
    const body = document.querySelector('body')

    if (body instanceof HTMLBodyElement) {
      const labelsNode = labels.getLabels()

      body.appendChild(root)
      root.appendChild(labelsNode)

      labelsNode.dispatchEvent(event)
      expect(spyEmit).toHaveBeenCalledTimes(1)
    }
  })

})
