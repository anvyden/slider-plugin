import {defaultState} from "../../defaultState";
import Validation from "./Validation";
import {ISettings} from "../interfaces/interfaces";


describe('Validation:', () => {
  let validation: Validation
  let state: ISettings

  beforeEach(() => {
    validation = new Validation()
    state = {
      ...JSON.parse(JSON.stringify(defaultState)),
      max: 100,
      min: -100,
      step: 10,
      from: -20,
      to: 40,
      isRange: true,
    }
  })

  describe('checkStep method', () => {

    test('should return rounded value of step', () => {
      const newState = {
        ...state,
        step: 9.5
      }

      const validStep = validation.checkStep(newState.max, newState.min, newState.step)
      expect(validStep).toBe(10)
    })

    test('if step = 0, should return step = 1', () => {
      const newState = {
        ...state,
        step: 0,
      }

      const validStep = validation.checkStep(newState.max, newState.min, newState.step)
      expect(validStep).toBe(1)
    })

    test('if step more than range, should return step = range', () => {
      const newState = {
        ...state,
        step: 300
      }

      const validStep = validation.checkStep(newState.max, newState.min, newState.step)
      expect(validStep).toBe(200)
    })

  })

  describe('checkMaxMin method', () => {

    test('should return rounded values of max and min', () => {
      const newState = {
        ...state,
        max: 99.5,
        min: -99.4,
      }

      validation.checkMaxMin.bind(newState)(newState.max, newState.min)

      expect(newState.max).toBe(100)
      expect(newState.min).toBe(-99)
    })

    test('should return swapped values min and max', () => {
      const newState = {
        ...state,
        max: -100,
        min: 100,
      }

      validation.checkMaxMin.bind(newState)(newState.max, newState.min)

      expect(newState.max).toBe(100)
      expect(newState.min).toBe(-100)
    })

  })

  describe('convertValueToStep method', () => {

    test('should return valid value with step', () => {
      const newState = {
        ...state,
        max: 100,
        min: -100,
        step: 10,
        from: -16,
      }

      const validValue = validation.convertValueToStep.bind(newState)(newState.from)

      expect(validValue).toBe(-20)
    })

  })

  describe('checkFromRangeValue method', () => {

    test('if from more than to, should return from = to', () => {
      const newState = {
        ...state,
        from: 60,
      }

      const validFrom = validation.checkFromRangeValue.bind(newState)(newState.from)
      expect(validFrom).toBe(40)
    })

  })

  describe('checkToRangeValue method', () => {

    test('if to less than from, should return to = from', () => {
      const newState = {
        ...state,
        to: -40,
      }

      const validTo = validation.checkToRangeValue.bind(newState)(newState.to)
      expect(validTo).toBe(-20)
    })

  })

  describe('checkCountOfLabels method', () => {

    test('should return rounded value of countOfLabels', () => {
      const newState = {
        ...JSON.parse(JSON.stringify(state)),
        labels: {
          addLabels: true,
          countOfLabels: 4.8,
        }
      }

      const validCountOfLabels = validation.checkCountOfLabels(newState.labels.countOfLabels)
      expect(validCountOfLabels).toBe(5)
    })

    test('value of countOfLabels should be more than 2 and less than 6', () => {
      let newState = {
        ...JSON.parse(JSON.stringify(state)),
        labels: {
          addLabels: true,
          countOfLabels: 8,
        }
      }

      const validCountOfLabels1 = validation.checkCountOfLabels(newState.labels.countOfLabels)
      expect(validCountOfLabels1).toBe(6)

      newState = {
        ...JSON.parse(JSON.stringify(state)),
        labels: {
          addLabels: true,
          countOfLabels: 1,
        }
      }

      const validCountOfLabels2 = validation.checkCountOfLabels(newState.labels.countOfLabels)
      expect(validCountOfLabels2).toBe(6)
    })

  })

})
