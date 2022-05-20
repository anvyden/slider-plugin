import { ISettings, defaultState } from "../interfaces/interfaces";

class Validation {
  private min!: number
  private max!: number
  private step!: number
  private from!: number
  private to!: number

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
    this.to = this.checkTo(to)

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

  /* TODO надо провалидировать значения from and to, чтоб to не мог заезжать за from
  *   и from не мог заезжать за to. И соответственно в этой ситуации надо менять
  *   z-index у каждого knob, чтоб можно было тащить его, когда они накладываются
  *   друг на друга. */

  public checkFrom(from: number): number {
    const roundFrom = Math.round(from)
    if (roundFrom < this.min) return this.min
    if (roundFrom > this.max) return this.max
    return roundFrom
  }

  public checkTo(to: number): number {
    const roundTo = Math.round(to)
    if (roundTo < this.min) return this.min
    if (roundTo > this.max) return this.max
    return roundTo
  }

}

export default Validation
