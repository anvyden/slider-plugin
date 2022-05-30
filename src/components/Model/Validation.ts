import { ISettings } from "../interfaces/interfaces";
import { convertPercentValueToNumber, convertStateValueToPercent } from "../../utils/utils";
import { defaultState } from "../../defaultState";

class Validation {
  private min!: number
  private max!: number
  private step!: number
  private from!: number
  private to!: number

  public checkState(state: ISettings): ISettings {
    //TODO нужно бы сделать валидацию стейта, чтоб не было свойств кроме ISettings
    // при прокидывании через jquery

    const {
      max,
      min,
      step,
      from,
      to,
      isRange
    } = state

    this.max = max
    this.min = min
    this.step = step
    this.from = from
    this.to = to

    this.checkMaxMin(this.max, this.min)
    this.step = this.checkStep(this.max, this.min, this.step)

    if (isRange) {
      this.checkMaxMinRange(this.from, this.to)
      this.from = this.checkFromRangeValue(this.from)
      this.to = this.checkToRangeValue(this.to)
    } else {
      this.from = this.checkFrom(this.from)
    }

    const validState: ISettings = {
      ...state,
      max: this.max,
      min: this.min,
      step: this.step,
      from: this.from,
      to: this.to,
    }
    return validState
  }

  public checkStep(max: number, min: number, step: number): number {
    const difference = max - min
    const roundStep = Math.round(step)

    if (roundStep <= 0) return defaultState.step
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

}

export default Validation
