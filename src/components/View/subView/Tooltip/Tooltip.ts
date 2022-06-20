import {Color, ISettings, Orientation} from "../../../interfaces/interfaces";
import './tooltip.scss'

class Tooltip {
  protected readonly state: ISettings
  protected readonly dataId?: string
  private tooltip!: HTMLDivElement
  private tooltipValue!: HTMLSpanElement

  constructor(state: ISettings, dataId?: string) {
    this.state = state
    this.dataId = dataId
    this.init()
  }

  public getTooltip(): HTMLDivElement {
    return this.tooltip
  }

  public update(state: ISettings): void {
    const { from, to } = state

    this.tooltip.dataset.id === 'tooltip-second'
      ? this.tooltipValue.textContent = `${to}`
      : this.tooltipValue.textContent = `${from}`
  }

  private init(): void {
    const { orientation, color, from, to } = this.state
    this.tooltip = this.createTooltip(orientation, color, from, to)
  }

  private createTooltip(orientation: Orientation, color: Color, from: number, to: number): HTMLDivElement {
    const { isRange } = this.state

    const tooltipFirstId = isRange ? 'tooltip-first' : 'tooltip'
    const tooltipId = this.dataId ? this.dataId : tooltipFirstId

    const tooltip = document.createElement('div')
    tooltip.classList.add('tooltip', 'slider__tooltip', `slider__tooltip--${orientation}`, `slider__tooltip--${color}`)
    tooltip.dataset.id = tooltipId

    const tooltipValue = document.createElement('span')
    tooltipValue.classList.add('tooltip__value')
    tooltipValue.textContent = tooltipId === 'tooltip-second' ? `${to}` : `${from}`
    this.tooltipValue = tooltipValue

    tooltip.appendChild(tooltipValue)

    return tooltip
  }

}

export default Tooltip
