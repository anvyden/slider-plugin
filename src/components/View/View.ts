import {ISettings, OptionFromKnobValues, SliderComponents} from "../interfaces/interfaces";
import { KnobEvents, LabelsEvents, ScaleEvents, ViewEvents } from "../Observer/events";
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
    const slider = new Slider(state, this.root)

    this.sliderComponents = slider.getComponents()
    this.bindEvents()
  }

  public update(state: ISettings) {
    this.sliderComponents.knob.update(state)
    this.sliderComponents.knobSecond.update(state)
    this.sliderComponents.fill.update(state)
    // const sliderComponents = Object.values(this.sliderComponents)
    // sliderComponents.forEach(component => {
    //   if (component.update) component.update(state)
    // })
  }

  private bindEvents(): void {
    this.bindKnobEvents()
    this.bindLabelsEvents()
    this.bindScaleEvents()
  }

  private bindScaleEvents(): void {
    const { scale } = this.sliderComponents
    scale.subscribe(ScaleEvents.SCALE_VALUE_CHANGED, (percentValue: number) => {
      this.emit(ViewEvents.VALUE_CHANGED, percentValue)
    })
  }

  private bindKnobEvents(): void {
    const { isRange } = this.state
    const { knob, knobSecond } = this.sliderComponents
    const knobNode = knob.getKnob()
    const knobSecondNode = knobSecond.getKnob()

    knob.subscribe(KnobEvents.KNOB_VALUE_FROM_CHANGED, (value: number) => {
      knobNode.style.zIndex = '1'
      knobSecondNode.style.zIndex = '0'
      this.emit(ViewEvents.VALUE_FROM_CHANGED, value)
    })

    knob.subscribe(KnobEvents.KNOB_VALUE_INCREMENT, (value: OptionFromKnobValues) => {
      this.emit(ViewEvents.VALUE_FROM_INCREMENT, value)
    })

    knob.subscribe(KnobEvents.KNOB_VALUE_DECREMENT, (value: OptionFromKnobValues) => {
      this.emit(ViewEvents.VALUE_FROM_DECREMENT, value)
    })

    if (isRange) {
      knobSecond.subscribe(KnobEvents.KNOB_VALUE_TO_CHANGED, (value: number) => {
        knobSecondNode.style.zIndex = '1'
        knobNode.style.zIndex = '0'
        this.emit(ViewEvents.VALUE_TO_CHANGED, value)
      })

      knobSecond.subscribe(KnobEvents.KNOB_VALUE_INCREMENT, (value: OptionFromKnobValues) => {
        this.emit(ViewEvents.VALUE_FROM_INCREMENT, value)
      })

      knobSecond.subscribe(KnobEvents.KNOB_VALUE_DECREMENT, (value: OptionFromKnobValues) => {
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
