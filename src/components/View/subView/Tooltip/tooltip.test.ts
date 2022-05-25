import {defaultState} from "../../../../defaultState";
import Tooltip from "./Tooltip";


describe('Tooltip', () => {
  let tooltip: Tooltip

  beforeEach(() => {
    tooltip = new Tooltip(defaultState)
  })

  test('should be a instance of Tooltip', () => {
    expect(tooltip).toBeInstanceOf(Tooltip)
  })
})
