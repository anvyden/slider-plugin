import Observer from "../Observer/Observer";
import {ISettings, OptionFromKnobValues} from "../interfaces/interfaces";
import Slider from "./Slider/Slider";
import {KnobEvents, LabelsEvents, ScaleEvents, viewEvents} from "../events/events";

class View extends Observer {
  protected readonly root: HTMLElement
  private sliderComponents!: object

  constructor(state: ISettings, root: HTMLElement) {
    super()
    this.root = root
    this.init(state)
  }

  public init(state: ISettings): void {
    const slider = new Slider(state, this.root)

    this.sliderComponents = slider.getComponents()
    this.bindEvents()
  }

  public update(state: ISettings) {
    const sliderComponents = Object.values(this.sliderComponents)
    sliderComponents.forEach(component => {
      if (component.update) component.update(state)
    })
  }

  private bindEvents(): void {
    this.bindKnobEvents()
    this.bindLabelsEvents()
    this.bindScaleEvents()
  }

  private bindScaleEvents(): void {
    const { scale } = this.sliderComponents
    scale.subscribe(ScaleEvents.SCALE_VALUE_CHANGED, (value: number) => {
      this.emit(viewEvents.VALUE_FROM_CHANGED, value)
    })
  }

  private bindKnobEvents(): void {
    const { knob } = this.sliderComponents

    knob.subscribe(KnobEvents.KNOB_VALUE_CHANGED, (value: number) => {
      this.emit(viewEvents.VALUE_FROM_CHANGED, value)
    })

    knob.subscribe(KnobEvents.KNOB_VALUE_INCREMENT, (value: OptionFromKnobValues) => {
      this.emit(viewEvents.VALUE_FROM_INCREMENT, value)
    })

    knob.subscribe(KnobEvents.KNOB_VALUE_DECREMENT, (value: OptionFromKnobValues) => {
      this.emit(viewEvents.VALUE_FROM_DECREMENT, value)
    })

  }

  private bindLabelsEvents(): void {
    const { labels } = this.sliderComponents
    labels.subscribe(LabelsEvents.LABEL_VALUE_CHANGED, (value: number) => {
      this.emit(viewEvents.VALUE_FROM_CHANGED, value)
    })
  }
}

export default View
