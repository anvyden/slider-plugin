import { ISettings, defaultState } from "../interfaces/interfaces";

class Validation {
  private min!: number
  private max!: number
  private step!: number
  private from!: number

  public checkState(state: ISettings): ISettings {
    const {
      max,
      min,
      step,
      from,
      to,
    } = state

    this.checkMaxMin(max, min)
    this.step = this.checkStep(this.max, this.min, step)
    this.from = this.checkFrom(from)

    const validState: ISettings = {
      ...state,
      max: this.max,
      min: this.min,
      step: this.step,
      from: this.from,
    }

    return validState
  }

  public checkStep(min: number, max: number, step: number): number {
    const difference: number = max - min
    const roundStep: number = Math.round(step)

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

  public checkFrom(from: number): number {
    const roundFrom = Math.round(from)

    return roundFrom
  }

}

export default Validation
