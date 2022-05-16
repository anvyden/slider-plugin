import Observer from "../../../Observer/Observer";
import {Color, ElementCoords, ISettings, Orientation, PageCoords} from "../../../interfaces/interfaces";
import './Knob.scss'
import {convertPercentValueToNumber, convertStateValueToPercent} from "../../../../utils/utils";
import {KnobEvents} from "../../../events/events";

class Knob extends Observer {
  private settings: ISettings
  private knob!: HTMLDivElement
  // private position: number

  constructor(settings: ISettings) {
    super()
    this.settings = settings
    // this.position = 0
    this.init()
  }

  public getKnob(): HTMLDivElement {
    return this.knob
  }

  public update(state: ISettings): void {
    const { orientation, from } = state
    const knobDirection = orientation === 'vertical' ? 'bottom' : 'left'
    this.knob.style[knobDirection] = `${convertStateValueToPercent(state, from)}%`
  }

  private init(): void {
    const { orientation, color } = this.settings
    const knobDirection = orientation === 'vertical' ? 'bottom' : 'left'
    this.knob = this.createKnob(orientation, knobDirection, color)
    this.knob.addEventListener('pointerdown', this.handleKnobPointerDown.bind(this))
  }

  private createKnob(orientation: Orientation, direction: string, color: Color): HTMLDivElement {
    const knob = document.createElement('div')
    knob.classList.add('js-slider__knob', 'slider__knob', `slider__knob--${orientation}`, `slider__knob--${color}`)

    const { from } = this.settings
    knob.style[direction] = convertStateValueToPercent(this.settings, from) + '%'

    return knob
  }

  private handleKnobPointerDown(event: PointerEvent): void {
    event.preventDefault()

    const handleKnobPointerMove = (event: PointerEvent): void => {
      const knobPosition = this.calculatePositionKnob(event)
      const knobPositionInNumber = convertPercentValueToNumber(this.settings, knobPosition)
      this.emit(KnobEvents.KNOB_VALUE_CHANGED, Number((knobPositionInNumber).toFixed(3)))
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

    // TODO
    // Для того, чтобы бегунок не уезжал, надо добавить валидацию, в handleKnobPointerMove
    // в котором надо вызывать event, где он будет обновлять модель и оттуда получать
    // новое валидное значение
    // И все эти методы можно перенести в utils
    //
    if (orientation === 'horizontal') {
      return ((clientX - left) / width ) * 100
    }

    return ((bottom - clientY) / height ) * 100
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
      width,
      height,
      bottom,
      left
    } = elem.getBoundingClientRect()

    return {
      left,
      bottom,
      width,
      height,
    }
  }
}

export default Knob
