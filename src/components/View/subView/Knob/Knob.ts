import Observer from "../../../Observer/Observer";
import {Color, ISettings, Orientation} from "../../../interfaces/interfaces";
import './Knob.scss'
import {convertStateValueToPercent, getPosition} from "../../../../utils/utils";
import {KnobEvents} from "../../../events/events";

type knobTarget = KnobEvents.KNOB_VALUE_FROM_CHANGED | KnobEvents.KNOB_VALUE_TO_CHANGED

class Knob extends Observer {
  protected readonly settings: ISettings
  protected readonly dataId?: string
  private knobTarget!: knobTarget
  private knob!: HTMLDivElement

  constructor(settings: ISettings, dataId?: string) {
    super()
    this.settings = settings
    this.dataId = dataId
    this.init()
  }

  public getKnob(): HTMLDivElement {
    return this.knob
  }

  public update(state: ISettings): void {
    const { orientation, from, to } = state
    const direction = orientation === 'vertical' ? 'bottom' : 'left'

    this.knob.dataset.id === 'knob-second'
      ? this.knob.style[direction] = convertStateValueToPercent(this.settings, to) + '%'
      : this.knob.style[direction] = convertStateValueToPercent(this.settings, from) + '%'
  }

  private init(): void {
    const { orientation, color, from, to } = this.settings
    const direction = orientation === 'vertical' ? 'bottom' : 'left'
    this.knob = this.createKnob(orientation, color)

    this.knob.dataset.id === 'knob-second'
      ? this.knob.style[direction] = convertStateValueToPercent(this.settings, to) + '%'
      : this.knob.style[direction] = convertStateValueToPercent(this.settings, from) + '%'

    this.knob.addEventListener('pointerdown', this.checkKnobTarget.bind(this))
    this.knob.addEventListener('pointerdown', this.handleKnobPointerDown.bind(this))
    this.knob.addEventListener('keydown', this.checkKnobTarget.bind(this))
    this.knob.addEventListener('keydown', this.handleKnobKeyDown.bind(this))
  }

  private createKnob(orientation: Orientation, color: Color): HTMLDivElement {
    const { isRange } = this.settings

    const knobFirstId = isRange ? 'knob-first' : 'knob'
    const knobId = this.dataId ? this.dataId : knobFirstId

    const knob = document.createElement('div')
    knob.classList.add('js-slider__knob', 'slider__knob', `slider__knob--${orientation}`, `slider__knob--${color}`)
    knob.setAttribute('data-id', knobId)
    knob.setAttribute('tabindex', '0')

    return knob
  }

  private handleKnobPointerDown(event: PointerEvent): void {
    event.preventDefault()


    const handleKnobPointerMove = (event: PointerEvent): void => {
      const knobPosition = getPosition(event, this.settings)
      this.emit(this.knobTarget, Number((knobPosition).toFixed(3)))
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
    const option = this.knobTarget === KnobEvents.KNOB_VALUE_TO_CHANGED ? 'to' : 'from'

    if (code === 'ArrowRight' || code === 'ArrowUp') {
      this.emit(KnobEvents.KNOB_VALUE_INCREMENT, option)
    }

    if (code === 'ArrowLeft' || code === 'ArrowDown') {
      this.emit(KnobEvents.KNOB_VALUE_DECREMENT, option)
    }
  }

  private checkKnobTarget(event: PointerEvent | KeyboardEvent): void {
    if (event.target instanceof HTMLElement) {
      const { target } = event

      const isFirstKnob = target.dataset.id === 'knob-first'
        || target.dataset.id === 'knob'

      this.knobTarget = isFirstKnob
        ? KnobEvents.KNOB_VALUE_FROM_CHANGED
        : KnobEvents.KNOB_VALUE_TO_CHANGED
    }
  }
}

export default Knob
