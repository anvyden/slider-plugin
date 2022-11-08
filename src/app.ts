import { defaultState } from './defaultState';
import {
  EventsNames,
  ISettings,
  Option,
  OptionValue,
} from './components/interfaces/interfaces';
import Presenter from './components/Presenter/Presenter';

declare global {
  interface JQuery {
    sliderPlugin(): void;
    sliderPlugin(options: Partial<ISettings>): void;
    sliderPlugin(method: 'setValue', option: Option, value: OptionValue): void;
    sliderPlugin(method: 'getState'): ISettings;
    sliderPlugin(method: 'getValue', option: Option): OptionValue;
    sliderPlugin(
      method: 'bindListener',
      eventName: string,
      func: (event: CustomEvent) => void
    ): void;
  }
}

const methods = {
  init(this: JQuery, options: Partial<ISettings>) {
    return this.each(function (this: HTMLElement): void {
      const newOptions: ISettings = {
        ...JSON.parse(JSON.stringify(defaultState)),
        ...options,
      };
      $(this).data('sliderPlugin', new Presenter(newOptions, this));
    });
  },

  getState(this: JQuery): ISettings {
    const sliderPlugin = $(this).data('sliderPlugin');
    return sliderPlugin.model.getState();
  },

  getValue(this: JQuery, option: Option): OptionValue {
    const sliderPlugin = $(this).data('sliderPlugin');
    return sliderPlugin.model.getValue(option);
  },

  setValue(this: JQuery, name: Option, value: OptionValue): void {
    const sliderPlugin = $(this).data('sliderPlugin');
    sliderPlugin.model.setValue(name, value);
  },

  bindListener(
    this: JQuery,
    eventName: EventsNames,
    func: (event: CustomEventInit) => void
  ): void {
    const eventHandler = (event: CustomEventInit) => func(event);
    $(this).on(eventName, eventHandler);
  },
};

$.fn.sliderPlugin = function <T>(...args: T[]) {
  const method = args[0];
  const params = args.slice(1);

  const isMethod = typeof method === 'string' && methods[<string>method];

  if (isMethod) {
    return methods[<string>method].apply(this, params);
  }

  if (typeof method === 'object' || !method) {
    const options = method || {};
    return methods.init.call(this, options);
  }

  $.error(`Метод с именем "${method}" не существует для sliderPlugin`);
};
