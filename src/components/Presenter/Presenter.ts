import Model from "../Model/Model";
import {ISettings} from "../interfaces/interfaces";
import {modelEvents} from "../events/events";
import View from "../View/View";

class Presenter {
  private model: Model
  private view: View

  constructor(state: ISettings, root: HTMLElement) {
    this.model = new Model(state)
    this.view = new View(this.model.getState(), root)

    this.bindModelEvents()
  }

  private bindModelEvents(): void {
    this.model.subscribe(modelEvents.STATE_CHANGED, (state: ISettings) => {
      this.view.init(state)
    })

    /* TODO я добавил обновление по изменению значения, но я не реализовать у всех
    *   subView метод update. Также я не сделал метод изменения одного значения
    *   у самой модели */

    // this.view.subscribe(modelEvents.VALUE_CHANGED, (state: ISettings) => {
    //   this.view.update(state)
    // })
  }

}

export default Presenter
