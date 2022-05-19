import {Color, ISettings, Orientation} from "../../../interfaces/interfaces";
import './Fill.scss'
import {convertStateValueToPercent} from "../../../../utils/utils";

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
    const directionFill = orientation === 'vertical' ? 'height' : 'width'
    this.fill.style[directionFill] = convertStateValueToPercent(state, from) + '%'
  }

  private init(): void {
    const { orientation, color } = this.settings
    const directionFill = orientation === 'horizontal' ? 'width' : 'height'
    this.fill = this.createFill(orientation, directionFill , color)
  }

  private createFill(orientation: Orientation, direction: string, color: Color): HTMLDivElement {
    const { from } = this.settings
    const fill = document.createElement('div')
    fill.classList.add('slider__fill', `slider__fill--${orientation}`, `slider__fill--${color}`)
    fill.style[direction] = convertStateValueToPercent(this.settings, from) + '%'
    return fill
  }
}

export default Fill

