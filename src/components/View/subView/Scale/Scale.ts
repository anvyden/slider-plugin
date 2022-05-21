import Observer from "../../../Observer/Observer";
import { ISettings, Orientation } from "../../../interfaces/interfaces";
import './Scale.scss'
import {getPosition} from "../../../../utils/utils";
import {ScaleEvents} from "../../../events/events";

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
    const orientationClass = orientation ? orientation : 'horizontal'

    this.scale = this.createScale(orientationClass)
    this.scale.addEventListener('pointerdown', this.handleScalePointerDown.bind(this))
  }

  private createScale(orientation: Orientation): HTMLDivElement {
    const scaleNode = document.createElement('div')
    scaleNode.classList.add('js-slider__scale', 'slider__scale', `slider__scale--${orientation}`)
    scaleNode.setAttribute('data-id', 'scale')

    return scaleNode
  }

  /* TODO некорректно работает клик по scale при не соответствии step с min - max range. Как и у
  *   labels. Это из-за расчет через функцию convertPercentValueToNumber.  */

  private handleScalePointerDown(event: PointerEvent): void {
    if (this.isScale(event)) {
      const positionClick = getPosition(event, this.state)
      this.emit(ScaleEvents.SCALE_VALUE_CHANGED, Number((positionClick).toFixed(3)))
    }
  }

  private isScale(event: PointerEvent): boolean {
    const { target } = event
    if (target instanceof HTMLElement) {
      const isScale = target.dataset.id === 'scale' || target.dataset.id === 'fill'
      return isScale
    }
    return false
  }
}

export default Scale
