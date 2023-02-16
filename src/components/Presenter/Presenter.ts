import { ISettings, OptionFromThumbValues } from '../interfaces/interfaces';
import { ModelEvents, ViewEvents } from '../Observer/events';
import Model from '../Model/Model';
import View from '../View/View';

class Presenter {
  private model: Model;
  private view: View;
  private root: HTMLElement;
  private state: ISettings;

  constructor(state: ISettings, root: HTMLElement) {
    this.model = new Model(state);
    this.view = new View(this.model.getState(), root);
    this.root = root;
    this.state = state;

    this.bindModelEvents();
    this.bindViewEvents();
  }

  private bindModelEvents(): void {
    this.model.subscribe(ModelEvents.STATE_CHANGED, (state: ISettings) => {
      this.view.init(state);
      this.dispatchUpdateEvent(state);
    });

    this.model.subscribe(ModelEvents.VALUE_CHANGED, (state: ISettings) => {
      this.view.update(state);
      this.dispatchUpdateEvent(state);
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
      ViewEvents.VALUE_INCREMENT,
      (option: OptionFromThumbValues) => {
        this.model.increment(option);
      }
    );

    this.view.subscribe(
      ViewEvents.VALUE_DECREMENT,
      (option: OptionFromThumbValues) => {
        this.model.decrement(option);
      }
    );
  }

  private updateEvent(state: ISettings): CustomEvent {
    const currentState = state;
    const changedParams = {};

    Object.keys(this.state).forEach((key) => {
      if (typeof this.state[key] !== 'object') {
        if (this.state[key] !== currentState[key]) {
          changedParams[key] = currentState[key];
        }
      } else {
        if (
          JSON.stringify(this.state[key]) !== JSON.stringify(currentState[key])
        ) {
          changedParams[key] = { ...currentState[key] };
        }
      }
    });

    this.state = currentState;

    return new CustomEvent('update', {
      detail: changedParams,
    });
  }

  private dispatchUpdateEvent(state: ISettings): void {
    this.root.dispatchEvent(this.updateEvent(state));
  }
}

export default Presenter;
