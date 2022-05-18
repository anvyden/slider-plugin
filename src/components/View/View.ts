import Observer from "../Observer/Observer";
import {ISettings} from "../interfaces/interfaces";
import Slider from "./Slider/Slider";
import {KnobEvents, LabelsEvents, viewEvents} from "../events/events";

class View extends Observer {
  private root: HTMLElement
  private sliderComponents!: object

  constructor(state: ISettings, root: HTMLElement) {
    super()
    this.root = root
    this.init(state)
  }

  public init(state: ISettings): void {
    const slider = new Slider(state, this.root)

    this.sliderComponents = slider.getComponents()
    this.bindKnobEvents()
    this.bindLabelsEvents()
  }

  public update(state: ISettings) {
    const sliderComponents = Object.values(this.sliderComponents)
    sliderComponents.forEach(component => {
      if (component.update) component.update(state)
    })
  }

  private bindKnobEvents(): void {
    const { knob } = this.sliderComponents
    knob.subscribe(KnobEvents.KNOB_VALUE_CHANGED, (value: number) => {
      this.emit(viewEvents.VALUE_FROM_CHANGED, value)
    })
  }

  private bindLabelsEvents(): void {
    const { labels } = this.sliderComponents
    labels.subscribe(LabelsEvents.LABEL_CLICK, (value: number) => {
      this.emit(viewEvents.VALUE_FROM_CHANGED, value)
    })
  }
}

export default View
