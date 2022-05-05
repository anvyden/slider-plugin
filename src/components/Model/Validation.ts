import { ISettings, defaultState } from "../interfaces/interfaces";

class Validation {
  private min: number
  private max: number
  private step: number

  public checkStep(min: number, max: number, step: number): number {
    const difference: number = max - min
    const roundStep: number = Math.round(step)

    if (roundStep <= 0) return defaultState.step
    if (roundStep > difference) return difference

    return roundStep
  }
}
