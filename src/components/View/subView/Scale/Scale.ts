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

    return scaleNode
  }

  private handleScalePointerDown(event: PointerEvent): void {
    const positionClick = getPosition(event, this.state)
    this.emit(ScaleEvents.SCALE_VALUE_CHANGED, Number((positionClick).toFixed(3)))
  }
}

export default Scale
