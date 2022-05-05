import Observer from "../../../Observer/Observer";
import { ISettings, Orientation } from "../../../interfaces/interfaces";

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
  }

  private createScale(orientation: Orientation): HTMLDivElement {
    const scaleNode = document.createElement('div')
    scaleNode.classList.add('js-slider__scale', 'slider__scale', `slider__scale--${orientation}`)

    return scaleNode
  }
}
