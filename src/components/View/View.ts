import { ISettings, OptionFromThumbValues, SliderComponents } from "../interfaces/interfaces";
import { ThumbEvents, LabelsEvents, ScaleEvents, ViewEvents } from "../Observer/events";
import Observer from "../Observer/Observer";
import Slider from "./Slider/Slider";
import Thumb from "./subView/Thumb/Thumb";

class View extends Observer {
  protected readonly state: ISettings
  protected readonly root: HTMLElement
  private sliderComponents!: SliderComponents

  constructor(state: ISettings, root: HTMLElement) {
    super()
    this.state = state
    this.root = root
    this.init(state)
  }

  public init(state: ISettings): void {
    this.root.innerHTML = ''
    const slider = new Slider(state, this.root)

    this.sliderComponents = slider.getComponents()
    this.bindEvents()
  }

  public update(state: ISettings) {
    const sliderComponents = [
      this.sliderComponents.thumb,
      this.sliderComponents.progressBar,
      this.sliderComponents.thumbSecond
    ]

    sliderComponents.forEach(component => {
      if (component) component.update(state)
    })
  }

  public setTargetThumb(option: OptionFromThumbValues): void {
    if (option === 'from') {
      this.sliderComponents.thumb.dragThumbAfterScaleClick(option)
    } else if (this.sliderComponents.thumbSecond) {
      this.sliderComponents.thumbSecond.dragThumbAfterScaleClick(option)
    }
  }

  private bindEvents(): void {
    this.bindThumbEvents()
    this.bindLabelsEvents()
    this.bindScaleEvents()
  }

  private bindScaleEvents(): void {
    const { scale } = this.sliderComponents
    scale.subscribe(ScaleEvents.SCALE_VALUE_CHANGED, (percentValue: number) => {
      this.emit(ViewEvents.VALUE_CHANGED, percentValue)
    })
  }

  private bindThumbEvents(): void {
    const { thumb, thumbSecond } = this.sliderComponents

    thumb.subscribe(ThumbEvents.THUMB_VALUE_FROM_CHANGED, (percentValue: number) => {
      this.emit(ViewEvents.VALUE_FROM_CHANGED, percentValue)
    })

    thumb.subscribe(ThumbEvents.THUMB_VALUE_INCREMENT, (option: OptionFromThumbValues) => {
      this.emit(ViewEvents.VALUE_FROM_INCREMENT, option)
    })

    thumb.subscribe(ThumbEvents.THUMB_VALUE_DECREMENT, (option: OptionFromThumbValues) => {
      this.emit(ViewEvents.VALUE_FROM_DECREMENT, option)
    })

    if (thumbSecond) {
      this.setThumbZIndex(thumb, thumbSecond)

      thumbSecond.subscribe(ThumbEvents.THUMB_VALUE_TO_CHANGED, (percentValue: number) => {
        this.emit(ViewEvents.VALUE_TO_CHANGED, percentValue)
      })

      thumbSecond.subscribe(ThumbEvents.THUMB_VALUE_INCREMENT, (option: OptionFromThumbValues) => {
        this.emit(ViewEvents.VALUE_FROM_INCREMENT, option)
      })

      thumbSecond.subscribe(ThumbEvents.THUMB_VALUE_DECREMENT, (option: OptionFromThumbValues) => {
        this.emit(ViewEvents.VALUE_FROM_DECREMENT, option)
      })
    }
  }

  private setThumbZIndex(thumb: Thumb, thumbSecond: Thumb): void {
    const thumbNode = thumb.getThumb()
    const thumbSecondNode = thumbSecond.getThumb()

    thumb.subscribe(ThumbEvents.THUMB_VALUE_FROM_CHANGED, () => {
      thumbNode.style.zIndex = '1'
      thumbSecondNode.style.zIndex = '0'
    })

    thumbSecond.subscribe(ThumbEvents.THUMB_VALUE_TO_CHANGED, () => {
      thumbNode.style.zIndex = '0'
      thumbSecondNode.style.zIndex = '1'
    })
  }

  private bindLabelsEvents(): void {
    const { labels } = this.sliderComponents
    labels.subscribe(LabelsEvents.LABEL_VALUE_CHANGED, (percentValue: number) => {
      this.emit(ViewEvents.VALUE_CHANGED_FROM_LABELS, percentValue)
    })
  }
}

export default View
