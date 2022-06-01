import { ISettings } from "../interfaces/interfaces";
import { convertPercentValueToNumber, convertStateValueToPercent } from "../../utils/utils";
import { defaultState } from "../../defaultState";

class Validation {
  private min!: number
  private max!: number
  private step!: number
  private from!: number
  private to!: number
  private countOfLabels!: number
  private addLabels!: boolean

  public checkState(state: ISettings): ISettings {

    const correctStateKeys = Object.keys(defaultState)
    const receivedState = JSON.parse(JSON.stringify(state))
    const receivedStateKeys = Object.keys(receivedState)

    receivedStateKeys.forEach(key => {
      if (!correctStateKeys.includes(key)) {
        delete receivedState[key]
      }
    })

    const {
      max,
      min,
      step,
      from,
      to,
      isRange,
      labels
    } = receivedState

    const { addLabels, countOfLabels } = labels

    this.max = max
    this.min = min
    this.step = step
    this.from = from
    this.to = to
    this.countOfLabels = countOfLabels
    this.addLabels = addLabels

    this.checkMaxMin(this.max, this.min)
    this.step = this.checkStep(this.max, this.min, this.step)
    this.countOfLabels = this.checkCountOfLabels(countOfLabels)

    if (isRange) {
      this.checkMaxMinRange(this.from, this.to)
      this.from = this.checkFromRangeValue(this.from)
      this.to = this.checkToRangeValue(this.to)
    } else {
      this.from = this.checkFrom(this.from)
    }

    const validState: ISettings = {
      ...receivedState,
      max: this.max,
      min: this.min,
      step: this.step,
      from: this.from,
      to: this.to,
      labels: {
        addLabels: this.addLabels,
        countOfLabels: this.countOfLabels
      }
    }

    return validState
  }

  public checkStep(max: number, min: number, step: number): number {
    const difference = max - min
    let roundStep = Math.round(step)

    if (roundStep < 0) return defaultState.step
    if (roundStep === 0) roundStep += 1
    if (roundStep > difference) return difference

    return roundStep
  }

  public checkMaxMin(max: number, min: number): void {
    let validMax = Math.round(max)
    let validMin = Math.round(min)

    if (validMax < validMin) {
      const swap = validMax
      validMax = validMin
      validMin = swap
    }

    this.max = validMax
    this.min = validMin
  }

  public convertValueToStep(value: number): number {
    const validPercentValue = convertStateValueToPercent({
      max: this.max,
      min: this.min,
      step: this.step
    }, value)

    const validValue = convertPercentValueToNumber({
      max: this.max,
      min: this.min,
      step: this.step
    }, validPercentValue)

    return validValue
  }

  public checkFromRangeValue(value: number): number {
    if (value >= this.to) value = this.to
    return value
  }

  public checkToRangeValue(value: number): number {
    if (value <= this.from) value = this.from
    return value
  }

  public checkMaxMinRange(from: number, to: number): void {
    const roundFrom = Math.round(from)
    const roundTo = Math.round(to)

    let validFrom = this.convertValueToStep(roundFrom)
    let validTo = this.convertValueToStep(roundTo)

    if (validTo < validFrom) {
      const swap = validFrom
      validFrom = validTo
      validTo = swap
    }

    if (validFrom <= this.min) validFrom = this.min
    if (validTo >= this.max) validTo = this.max

    this.from = validFrom
    this.to = validTo
  }

  public checkFrom(from: number): number {
    const roundFrom = Math.round(from)
    const validFrom = this.convertValueToStep(roundFrom)
    if (validFrom < this.min) return this.min
    if (validFrom > this.max) return this.max
    return validFrom
  }

  public checkCountOfLabels(count: number): number {
    const roundCount = Math.round(count)

    if (roundCount > 6) return defaultState.labels.countOfLabels
    if (roundCount < 2) return defaultState.labels.countOfLabels

    return roundCount
  }

}

export default Validation
