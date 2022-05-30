import { ISettings, OptionFromThumbValues } from "../interfaces/interfaces";
import { ModelEvents, ViewEvents } from "../Observer/events";
import Model from "../Model/Model";
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
    this.model.subscribe(ModelEvents.STATE_CHANGED, (state: ISettings) => {
      this.view.init(state)
    })

    this.model.subscribe(ModelEvents.VALUE_CHANGED, (state: ISettings) => {
      this.view.update(state)
    })
  }

  private bindViewEvents(): void {
    this.view.subscribe(ViewEvents.VALUE_CHANGED, (percentValue: number) => {
      const option = this.model.getOptionByNearValue(percentValue)
      this.model.setValueFromPercent(option, percentValue)
    })

    this.view.subscribe(ViewEvents.VALUE_FROM_CHANGED, (value: number) => {
      this.model.setValueFromPercent('from', value)
    })

    this.view.subscribe(ViewEvents.VALUE_TO_CHANGED, (value: number) => {
      this.model.setValueFromPercent('to', value)
    })

    this.view.subscribe(ViewEvents.VALUE_FROM_INCREMENT, (value: OptionFromThumbValues) => {
      this.model.increment(value)
    })

    this.view.subscribe(ViewEvents.VALUE_FROM_DECREMENT, (value: OptionFromThumbValues) => {
      this.model.decrement(value)
    })
  }

}

export default Presenter
