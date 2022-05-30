import { Color, ISettings, Orientation } from "../../../interfaces/interfaces";
import { convertStateValueToPercent, getPosition } from "../../../../utils/utils";
import { ThumbEvents } from "../../../Observer/events";
import Observer from "../../../Observer/Observer";
import './thumb.scss'

type thumbTarget = ThumbEvents.THUMB_VALUE_FROM_CHANGED | ThumbEvents.THUMB_VALUE_TO_CHANGED

class Thumb extends Observer {
  protected readonly state: ISettings
  protected readonly dataId?: string
  private thumbTarget!: thumbTarget
  private thumb!: HTMLDivElement

  constructor(state: ISettings, dataId?: string) {
    super()
    this.state = state
    this.dataId = dataId
    this.init()
  }

  public getThumb(): HTMLDivElement {
    return this.thumb
  }

  public update(state: ISettings): void {
    const { orientation, from, to } = state
    const direction = orientation === 'vertical' ? 'bottom' : 'left'

    this.thumb.dataset.id === 'thumb-second'
      ? this.thumb.style[direction] = `${convertStateValueToPercent(this.state, to)}%`
      : this.thumb.style[direction] = `${convertStateValueToPercent(this.state, from)}%`
  }

  private init(): void {
    const { orientation, color, from, to } = this.state
    const direction = orientation === 'vertical' ? 'bottom' : 'left'
    this.thumb = this.createThumb(orientation, color)

    this.thumb.dataset.id === 'thumb-second'
      ? this.thumb.style[direction] = `${convertStateValueToPercent(this.state, to)}%`
      : this.thumb.style[direction] = `${convertStateValueToPercent(this.state, from)}%`

    this.thumb.addEventListener('pointerdown', this.checkThumbTarget.bind(this))
    this.thumb.addEventListener('pointerdown', this.handleThumbPointerDown.bind(this))
    this.thumb.addEventListener('keydown', this.checkThumbTarget.bind(this))
    this.thumb.addEventListener('keydown', this.handleThumbKeyDown.bind(this))
  }

  private createThumb(orientation: Orientation, color: Color): HTMLDivElement {
    const { isRange } = this.state

    const thumbFirstId = isRange ? 'thumb-first' : 'thumb'
    const thumbId = this.dataId ? this.dataId : thumbFirstId

    const thumb = document.createElement('div')
    thumb.classList.add('slider__thumb', `slider__thumb--${orientation}`, `slider__thumb--${color}`)
    thumb.setAttribute('data-id', thumbId)
    thumb.setAttribute('tabindex', '0')

    return thumb
  }

  private handleThumbPointerDown(event: PointerEvent): void {
    event.preventDefault()

    const handleThumbPointerMove = (event: PointerEvent): void => {
      const thumbPosition = getPosition(event, this.state)
      this.emit(this.thumbTarget, Number((thumbPosition).toFixed(3)))
    }

    const handleThumbPointerUp = (): void => {
      document.removeEventListener('pointerup', handleThumbPointerUp)
      document.removeEventListener('pointermove', handleThumbPointerMove)
    }

    document.addEventListener('pointermove', handleThumbPointerMove)
    document.addEventListener('pointerup', handleThumbPointerUp)

    this.thumb.ondragstart = (): boolean => false
  }

  private handleThumbKeyDown = (event: KeyboardEvent): void => {
    const { code } = event
    const option = this.thumbTarget === ThumbEvents.THUMB_VALUE_TO_CHANGED ? 'to' : 'from'

    if (code === 'ArrowRight' || code === 'ArrowUp') {
      this.emit(ThumbEvents.THUMB_VALUE_INCREMENT, option)
    }

    if (code === 'ArrowLeft' || code === 'ArrowDown') {
      this.emit(ThumbEvents.THUMB_VALUE_DECREMENT, option)
    }
  }

  private checkThumbTarget(event: PointerEvent | KeyboardEvent): void {
    if (event.target instanceof HTMLElement) {
      const { target } = event

      const isFirstThumb =
        target.dataset.id === 'thumb-first' ||
        target.dataset.id === 'thumb'

      this.thumbTarget = isFirstThumb
        ? ThumbEvents.THUMB_VALUE_FROM_CHANGED
        : ThumbEvents.THUMB_VALUE_TO_CHANGED
    }
  }
}

export default Thumb
