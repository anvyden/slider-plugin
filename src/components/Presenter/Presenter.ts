import Model from "../Model/Model";
import {ISettings} from "../interfaces/interfaces";
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

    /* TODO я добавил обновление по изменению значения, но я не реализовать у всех
    *   subView метод update. Также я не сделал метод изменения одного значения
    *   у самой модели */

    this.model.subscribe(modelEvents.VALUE_CHANGED, (state: ISettings) => {
      this.view.update(state)
    })
  }

  private bindViewEvents(): void {
    this.view.subscribe(viewEvents.VALUE_FROM_CHANGED, (value: number) => {
      this.model.setValueFromPercent('from', value)
    })
  }

}

export default Presenter
