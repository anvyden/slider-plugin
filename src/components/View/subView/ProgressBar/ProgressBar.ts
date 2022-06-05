import { Color, ISettings, Orientation } from "../../../interfaces/interfaces";
import { convertStateValueToPercent, getStepInPercent } from "../../../../utils/utils";
import './progressBar.scss'

class ProgressBar {
  protected readonly state: ISettings
  private progressBar!: HTMLDivElement

  constructor(state: ISettings) {
    this.state = state
    this.init()
  }

  public getProgressBar(): HTMLDivElement {
    return this.progressBar
  }

  public update(state: ISettings): void {
    const { orientation, isRange, from, to } = state
    const propertyFill = orientation === 'horizontal' ? 'width' : 'height'
    const direction = orientation === 'horizontal' ? 'left' : 'bottom'
    this.setProgressBarValues(direction, propertyFill, isRange, from, to)
  }

  private init(): void {
    const { orientation, color, from, to, isRange } = this.state
    const propertyFill = orientation === 'horizontal' ? 'width' : 'height'
    const direction = orientation === 'horizontal' ? 'left' : 'bottom'
    this.progressBar = this.createProgressBar(orientation, color)
    this.setProgressBarValues(direction, propertyFill, isRange, from, to)
  }

  private createProgressBar(orientation: Orientation, color: Color): HTMLDivElement {
    const progressBar = document.createElement('div')
    progressBar.classList.add('slider__progress-bar', `slider__progress-bar--${orientation}`, `slider__progress-bar--${color}`)
    progressBar.setAttribute('data-id', 'progressBar')

    return progressBar
  }

  private setProgressBarValues(
    direction: string,
    propertyFill: string,
    isRange: boolean,
    from: number,
    to: number
  ): void {
    if (isRange) {
      const valueFill = to - from
      this.progressBar.style[direction] = `${convertStateValueToPercent(this.state, from)}%`
      this.progressBar.style[propertyFill] = `${this.getValueFill(valueFill)}%`
    } else {
      this.progressBar.style[propertyFill] = `${convertStateValueToPercent(this.state, from)}%`
    }
  }

  private getValueFill(value: number): number {
    const { max, min, step } = this.state
    const stepInPercent = getStepInPercent(max, min, step)

    const percentValue = (value / step) * stepInPercent

    return percentValue
  }
}

export default ProgressBar

