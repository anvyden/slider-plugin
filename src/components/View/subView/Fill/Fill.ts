import {Color, ISettings, Orientation} from "../../../interfaces/interfaces";
import './Fill.scss'
import {convertStateValueToPercent, getStepInPercent} from "../../../../utils/utils";

class Fill {
  protected readonly settings: ISettings
  private fill!: HTMLDivElement

  constructor(settings: ISettings) {
    this.settings = settings
    this.init()
  }

  public getFill(): HTMLDivElement {
    return this.fill
  }

  public update(state: ISettings): void {
    const { orientation, isRange, from, to } = state
    const propertyFill = orientation === 'vertical' ? 'height' : 'width'
    const direction = orientation === 'horizontal' ? 'left' : 'bottom'
    this.setFillValues(direction, propertyFill, isRange, from, to)
  }

  private init(): void {
    const { orientation, color, from, to, isRange } = this.settings
    const propertyFill = orientation === 'horizontal' ? 'width' : 'height'
    const direction = orientation === 'horizontal' ? 'left' : 'bottom'
    this.fill = this.createFill(orientation, color)
    this.setFillValues(direction, propertyFill, isRange, from, to)
  }

  private createFill(orientation: Orientation, color: Color): HTMLDivElement {
    const fill = document.createElement('div')
    fill.classList.add('slider__fill', `slider__fill--${orientation}`, `slider__fill--${color}`)

    return fill
  }

  private setFillValues(
    direction: string,
    propertyFill: string,
    isRange: boolean,
    from: number,
    to: number
  ): void {
    if (isRange) {
      const valueFill = to - from
      this.fill.style[direction] = convertStateValueToPercent(this.settings, from) + '%'
      this.fill.style[propertyFill] = this.getValueFill(valueFill) + '%'
    } else {
      this.fill.style[propertyFill] = convertStateValueToPercent(this.settings, from) + '%'
    }
  }

  private getValueFill(value: number): number {
    const { max, min, step } = this.settings
    const stepInPercent = getStepInPercent(max, min, step)

    let percentValue = (value / step) * stepInPercent

    if (percentValue > 100) percentValue = 100
    if (percentValue < 0) percentValue = 0

    return percentValue
  }
}

export default Fill

