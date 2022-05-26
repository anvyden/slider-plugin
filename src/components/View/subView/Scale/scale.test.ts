/**
 * @jest-environment jsdom
 */

import Scale from "./Scale";
import {defaultState} from "../../../../defaultState";
// import jsdom from 'jsdom'

// const {JSDOM} = jsdom
// const dom = new JSDOM('<html><body></body></html>')

describe('Scale:', () => {
  let scale: Scale
  let event: PointerEvent

  beforeEach(() => {
    const cloneState = { ...defaultState }
    scale = new Scale(cloneState)
    event = <PointerEvent>new Event('pointerdown')
  })

  test('should be instance of Scale', () => {
    expect(scale).toBeInstanceOf(Scale)
  })

  test('getScale should not return falsy', () => {
    const scaleNode = scale.getScale()
    expect(scaleNode).not.toBeFalsy()
  })

  test('should emit the event once', () => {
    const spyEmit = jest.spyOn(scale, 'emit')
    const root = document.querySelector('body')

    if (root instanceof HTMLBodyElement) {
      const scaleNode = scale.getScale()
      root.appendChild(scaleNode)
      scaleNode.dispatchEvent(event)
      expect(spyEmit).toHaveBeenCalledTimes(1)
    }
  })

  test('should emit the event once with vertical orientation', () => {
    const newState = Object.assign({}, defaultState, {
      orientation: 'vertical'
    })
    const verticalScale = new Scale(newState)
    const spyEmit = jest.spyOn(verticalScale, 'emit')
    const root = document.querySelector('body')

    if (root instanceof HTMLBodyElement) {
      const verticalScaleNode = verticalScale.getScale()
      root.appendChild(verticalScaleNode)
      verticalScaleNode.dispatchEvent(event)
      expect(spyEmit).toHaveBeenCalledTimes(1)
    }
  })
})
