import { ISettings, OptionFromThumbValues, SliderComponents } from "../interfaces/interfaces";
import { ThumbEvents, LabelsEvents, ScaleEvents, ViewEvents } from "../Observer/events";
import Observer from "../Observer/Observer";
import Slider from "./Slider/Slider";

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

  //TODO update

  public update(state: ISettings) {
    const { isRange } = state
    this.sliderComponents.thumb.update(state)
    this.sliderComponents.progressBar.update(state)
    if (isRange) {
      this.sliderComponents.thumbSecond.update(state)
    }
    // const sliderComponents = Object.values(this.sliderComponents)
    // sliderComponents.forEach(component => {
    //   if (component.update) component.update(state)
    // })
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
    const { isRange } = this.state
    const { thumb, thumbSecond } = this.sliderComponents
    const thumbNode = thumb.getThumb()

    thumb.subscribe(ThumbEvents.THUMB_VALUE_FROM_CHANGED, (value: number) => {
      if (isRange) {
        const thumbSecondNode = thumbSecond.getThumb()
        thumbNode.style.zIndex = '1'
        thumbSecondNode.style.zIndex = '0'
      }
      this.emit(ViewEvents.VALUE_FROM_CHANGED, value)
    })

    thumb.subscribe(ThumbEvents.THUMB_VALUE_INCREMENT, (value: OptionFromThumbValues) => {
      this.emit(ViewEvents.VALUE_FROM_INCREMENT, value)
    })

    thumb.subscribe(ThumbEvents.THUMB_VALUE_DECREMENT, (value: OptionFromThumbValues) => {
      this.emit(ViewEvents.VALUE_FROM_DECREMENT, value)
    })

    if (isRange) {
      thumbSecond.subscribe(ThumbEvents.THUMB_VALUE_TO_CHANGED, (value: number) => {
        const thumbSecondNode = thumbSecond.getThumb()
        thumbSecondNode.style.zIndex = '1'
        thumbNode.style.zIndex = '0'
        this.emit(ViewEvents.VALUE_TO_CHANGED, value)
      })

      thumbSecond.subscribe(ThumbEvents.THUMB_VALUE_INCREMENT, (value: OptionFromThumbValues) => {
        this.emit(ViewEvents.VALUE_FROM_INCREMENT, value)
      })

      thumbSecond.subscribe(ThumbEvents.THUMB_VALUE_DECREMENT, (value: OptionFromThumbValues) => {
        this.emit(ViewEvents.VALUE_FROM_DECREMENT, value)
      })
    }

  }

  private bindLabelsEvents(): void {
    const { labels } = this.sliderComponents
    labels.subscribe(LabelsEvents.LABEL_VALUE_CHANGED, (percentValue: number) => {
      this.emit(ViewEvents.VALUE_CHANGED, percentValue)
    })
  }
}

export default View
