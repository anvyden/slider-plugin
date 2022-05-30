import { ISettings, Orientation } from "../../../interfaces/interfaces";
import { getPosition } from "../../../../utils/utils";
import { ScaleEvents } from "../../../Observer/events";
import Observer from "../../../Observer/Observer";
import './scale.scss'

class Scale extends Observer {
  protected readonly state: ISettings
  private scale!: HTMLDivElement

  constructor(state: ISettings) {
    super()
    this.state = state
    this.init()
  }

  public getScale(): HTMLDivElement {
    return this.scale
  }

  private init(): void {
    const { orientation } = this.state
    const orientationClass = orientation === 'vertical' ? orientation : 'horizontal'

    this.scale = this.createScale(orientationClass)
    this.scale.addEventListener('pointerdown', this.handleScalePointerDown.bind(this))
  }

  private createScale(orientation: Orientation): HTMLDivElement {
    const scale = document.createElement('div')
    scale.classList.add('js-slider__scale', 'slider__scale', `slider__scale--${orientation}`)
    scale.setAttribute('data-id', 'scale')

    return scale
  }

  /* TODO некорректно работает клик по scale при не соответствии step с min - max range. Как и у
  *   labels. Это из-за расчет через функцию convertPercentValueToNumber.  */

  private handleScalePointerDown(event: PointerEvent): void {
    if (this.isScale(event)) {
      const positionClick = getPosition(event, this.state)
      this.emit(ScaleEvents.SCALE_VALUE_CHANGED, Number((positionClick).toFixed(3)))
    }
  }

  private isScale(event: PointerEvent): boolean | unknown {
    const { target } = event
    if (target instanceof HTMLElement) {
      const isScale = target.dataset.id === 'scale' || target.dataset.id === 'progressBar'
      return isScale
    }
  }
}

export default Scale
