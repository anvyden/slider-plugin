import Observer from "../../../Observer/Observer";
import {Color, ISettings, Orientation} from "../../../interfaces/interfaces";
import './Knob.scss'
import {convertStateValueToPercent, getPosition} from "../../../../utils/utils";
import {KnobEvents} from "../../../events/events";

class Knob extends Observer {
  protected readonly settings: ISettings
  private knob!: HTMLDivElement

  constructor(settings: ISettings) {
    super()
    this.settings = settings
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
    this.knob.addEventListener('keydown', this.handleKnobKeyDown.bind(this))
  }

  private createKnob(orientation: Orientation, direction: string, color: Color): HTMLDivElement {
    const knob = document.createElement('div')
    knob.classList.add('js-slider__knob', 'slider__knob', `slider__knob--${orientation}`, `slider__knob--${color}`)
    knob.setAttribute('data-id', 'knob')
    knob.setAttribute('tabindex', '0')

    const { from } = this.settings
    knob.style[direction] = convertStateValueToPercent(this.settings, from) + '%'

    return knob
  }

  private handleKnobPointerDown(event: PointerEvent): void {
    event.preventDefault()

    const handleKnobPointerMove = (event: PointerEvent): void => {
      const knobPosition = getPosition(event, this.settings)
      this.emit(KnobEvents.KNOB_VALUE_CHANGED, Number((knobPosition).toFixed(3)))
    }

    const handleKnobPointerUp = (): void => {
      document.removeEventListener('pointerup', handleKnobPointerUp)
      document.removeEventListener('pointermove', handleKnobPointerMove)
    }

    document.addEventListener('pointermove', handleKnobPointerMove)
    document.addEventListener('pointerup', handleKnobPointerUp)

    this.knob.ondragstart = (): boolean => false
  }

  private handleKnobKeyDown = (event: KeyboardEvent): void => {
    const { code } = event

    if (code === 'ArrowRight' || code === 'ArrowUp') {
      this.emit(KnobEvents.KNOB_VALUE_INCREMENT, 'from')
    }

    if (code === 'ArrowLeft' || code === 'ArrowDown') {
      this.emit(KnobEvents.KNOB_VALUE_DECREMENT, 'from')
    }
  }
}

export default Knob
