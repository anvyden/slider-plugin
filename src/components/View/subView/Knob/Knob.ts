import Observer from "../../../Observer/Observer";
import {Color, ElementCoords, ISettings, Orientation, PageCoords} from "../../../interfaces/interfaces";
import './Knob.scss'
import {checkColor, checkOrientation} from "../../../../utils/utils";

class Knob extends Observer {
  private settings: ISettings
  private knob!: HTMLDivElement
  private position: number


  constructor(settings: ISettings) {
    super()
    this.settings = settings
    this.position = 0
    this.init()
  }

  public getKnob(): HTMLDivElement {
    return this.knob
  }

  private init(): void {
    const { orientation, color } = this.settings
    const colorKnob = checkColor(color)
    const orientationScale = checkOrientation(orientation)
    const knobDirection = orientationScale === 'horizontal' ? 'left' : 'bottom'
    this.knob = this.createKnob(orientation, knobDirection, colorKnob)
    this.knob.addEventListener('pointerdown', this.handleKnobPointerDown.bind(this))
  }

  private createKnob(orientation: Orientation, direction: string, color: Color): HTMLDivElement {
    const knob = document.createElement('div')
    knob.classList.add('js-slider__knob', 'slider__knob', `slider__knob--${orientation}`, `slider__knob--${color}`)

    const { max, min, from } = this.settings
    this.position = ((min + from) / max ) * 100
    knob.style[direction] = `${this.position}%`

    return knob
  }

  private handleKnobPointerDown(event: PointerEvent): void {
    event.preventDefault()

    const handleKnobPointerMove = (event: PointerEvent): void => {
      const knobPosition = this.calculatePositionKnob(event)

      //TODO
      // Надо будет тут убрать метод и просто сделать метод update, где буду обновлять
      // позицию.
      this.knob.style.left = knobPosition + '%'
    }

    const handleKnobPointerUp = (): void => {
      document.removeEventListener('pointerup', handleKnobPointerUp)
      document.removeEventListener('pointermove', handleKnobPointerMove)
    }

    document.addEventListener('pointermove', handleKnobPointerMove)
    document.addEventListener('pointerup', handleKnobPointerUp)

    this.knob.ondragstart = (): boolean => false
  }

  private calculatePositionKnob(event: PointerEvent): number {
    const { orientation } = this.settings
    const scale = document.querySelector('.js-slider__scale')

    const { left, bottom, width, height } = scale ? this.getElementCoords(scale) : null
    const { clientX, clientY } = this.getPageCoords(event)

    if (orientation === 'horizontal') {
      const value = ((clientX - left) / width ) * 100
      this.position = value < 0 ? 0 : value
      this.position = value > 100 ? 100 : value
      return this.position
    }

    const value = ((bottom - clientY) / height ) * 100
    this.position = value < 0 ? 0 : value
    this.position = value > 100 ? 100 : value
    return this.position

    //TODO
    // Для того, чтобы бегунок не уезжал, надо добавить валидацию, в handleKnobPointerMove
    // в котором надо вызывать event, где он будет обновлять модель и оттуда получать
    // новое валидное значение
    // И все эти методы можно перенести в utils
    //
    // if (orientation === 'horizontal') {
    //   return ((clientX - left) / width ) * 100
    // }
    //
    // return ((bottom - clientY) / height ) * 100
  }

  private getPageCoords(event: PointerEvent): PageCoords {
    const { clientX, clientY } = event

    return {
      clientX,
      clientY
    }
  }

  private getElementCoords(elem: Element): ElementCoords {
    const {
      width: widthElement,
      height: heightElement,
      bottom: elementPosBottom,
      left: elementPosLeft
    } = elem.getBoundingClientRect()

    return {
      left: elementPosLeft,
      bottom: elementPosBottom,
      width: widthElement,
      height: heightElement,
    }
  }
}

export default Knob
