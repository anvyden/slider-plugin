import Model from "../Model/Model";
import {ISettings, OptionFromKnobValues} from "../interfaces/interfaces";
import {modelEvents, viewEvents} from "../events/events";
import View from "../View/View";

class Presenter {
  private model: Model
  private view: View

  constructor(state: ISettings, root: HTMLElement) {
    this.model = new Model(state)
    this.view = new View(this.model.getState(), root)

    this.bindModelEvents()
    this.bindViewEvents()
  }

  private bindModelEvents(): void {
    this.model.subscribe(modelEvents.STATE_CHANGED, (state: ISettings) => {
      this.view.init(state)
    })

    this.model.subscribe(modelEvents.VALUE_CHANGED, (state: ISettings) => {
      this.view.update(state)
    })
  }

  private bindViewEvents(): void {
    this.view.subscribe(viewEvents.VALUE_CHANGED, (value: number) => {
      const option = this.model.getOptionByNearValue(value)
      this.model.setValueFromPercent(option, value)
    })

    this.view.subscribe(viewEvents.VALUE_FROM_CHANGED, (value: number) => {
      this.model.setValueFromPercent('from', value)
    })

    this.view.subscribe(viewEvents.VALUE_TO_CHANGED, (value: number) => {
      this.model.setValueFromPercent('to', value)
    })

    this.view.subscribe(viewEvents.VALUE_FROM_INCREMENT, (value: OptionFromKnobValues) => {
      this.model.increment(value)
    })

    this.view.subscribe(viewEvents.VALUE_FROM_DECREMENT, (value: OptionFromKnobValues) => {
      this.model.decrement(value)
    })
  }

}

export default Presenter
