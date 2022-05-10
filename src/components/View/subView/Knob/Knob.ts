import Observer from "../../../Observer/Observer";
import {ElementCoords, ISettings, PageCoords} from "../../../interfaces/interfaces";
import './Knob.scss'

class Knob extends Observer {
  private settings: ISettings
  private knob!: HTMLDivElement


  constructor(settings: ISettings) {
    super()
    this.settings = settings
    this.init()
  }

  public getKnob(): HTMLDivElement {
    return this.knob
  }

  private init(): void {
    this.knob = this.createKnob()
  }

  private createKnob(): HTMLDivElement {
    const knob = document.createElement('div')
    knob.classList.add('js-slider__knob', 'slider__knob')
    knob.style.left = `${this.calculatePositionKnob()}%`

    return knob
  }

  private calculatePositionKnob(): number {
    const { max, min, from } = this.settings
    const position = ((min + from) / max ) * 100
    return position
  }

  private getPageCoords(event: PointerEvent): PageCoords {
    const { pageX, pageY } = event

    return {
      pageX,
      pageY
    }
  }

  private getElementCoords(elem: Element): ElementCoords {
    const {
      top: elementPosTop,
      right: elementPosRight,
      bottom: elementPosBottom,
      left: elementPosLeft
    } = elem.getBoundingClientRect()

    const offsetX = Math.round(window.scrollX)
    const offsetY = Math.round(window.scrollY)

    return {
      left: elementPosLeft + offsetX,
      bottom: elementPosBottom + offsetY,
      width: elementPosRight - elementPosLeft,
      height: elementPosBottom - elementPosTop,
    }
  }
}

export default Knob
