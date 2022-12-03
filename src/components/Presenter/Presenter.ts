import { ISettings, OptionFromThumbValues } from '../interfaces/interfaces';
import { ModelEvents, ViewEvents } from '../Observer/events';
import Model from '../Model/Model';
import View from '../View/View';

class Presenter {
  private model: Model;
  private view: View;
  private root: HTMLElement;

  constructor(state: ISettings, root: HTMLElement) {
    this.model = new Model(state);
    this.view = new View(this.model.getState(), root);
    this.root = root;

    this.bindModelEvents();
    this.bindViewEvents();
  }

  private bindModelEvents(): void {
    this.model.subscribe(ModelEvents.STATE_CHANGED, (state: ISettings) => {
      this.view.init(state);
      this.dispatchUpdateEvent();
    });

    this.model.subscribe(ModelEvents.VALUE_CHANGED, (state: ISettings) => {
      this.view.update(state);
      this.dispatchUpdateEvent();
    });
  }

  private bindViewEvents(): void {
    this.view.subscribe(ViewEvents.VALUE_CHANGED, (percentValue: number) => {
      const option = this.model.getOptionByNearValue(percentValue);
      this.model.setValueFromPercent(option, percentValue);
      this.view.setTargetThumb(option);
    });

    this.view.subscribe(
      ViewEvents.VALUE_CHANGED_FROM_LABELS,
      (percentValue: number) => {
        const option = this.model.getOptionByNearValue(percentValue);
        this.model.setValueFromPercent(option, percentValue);
      }
    );

    this.view.subscribe(
      ViewEvents.VALUE_FROM_CHANGED,
      (percentValue: number) => {
        this.model.setValueFromPercent('from', percentValue);
      }
    );

    this.view.subscribe(ViewEvents.VALUE_TO_CHANGED, (percentValue: number) => {
      this.model.setValueFromPercent('to', percentValue);
    });

    this.view.subscribe(
      ViewEvents.VALUE_FROM_INCREMENT,
      (option: OptionFromThumbValues) => {
        this.model.increment(option);
      }
    );

    this.view.subscribe(
      ViewEvents.VALUE_FROM_DECREMENT,
      (option: OptionFromThumbValues) => {
        this.model.decrement(option);
      }
    );
  }

  private updateEvent(): CustomEvent {
    return new CustomEvent('update', {
      detail: JSON.parse(JSON.stringify(this.model.getState())),
    });
  }

  private dispatchUpdateEvent(): void {
    this.root.dispatchEvent(this.updateEvent());
  }
}

export default Presenter;
