import { defaultState } from './defaultState';
import Presenter from './components/Presenter/Presenter';
import './app.scss';
import {ISettings, Option, OptionValue} from "./components/interfaces/interfaces";

const methods = {

  init(this: JQuery, options: Partial<ISettings>) {
    return this.each(function(this: HTMLElement): void {
      const newOptions = {...JSON.parse(JSON.stringify(defaultState)), ...options}
      $(this).data('sliderPlugin', new Presenter(newOptions, this))
    })
  },

  setValue(this: JQuery, name: Option, value: OptionValue): void {
    const sliderPlugin = $(this).data('sliderPlugin')
    sliderPlugin.model.setValue(name, value)
  }

}

$.fn.sliderPlugin = function <T>(...args: T[]) {
  const method = args[0]
  const params = args.slice(1)

  const isMethod = typeof method === 'string'

  if (isMethod) {
    return methods[<string>method].apply(this, params)
  }

  if (typeof method === 'object' || !method) {
    const options = method || {}
    return methods.init.call(this, options)
  }

  $.error(`метод с именем ${method} не существует для sliderPlugin`)
}

declare global {
  interface JQuery {
    sliderPlugin(): void,
    sliderPlugin(options: Partial<ISettings>): void,
    sliderPlugin(method: 'setValue', option: Option, value: OptionValue): void
  }
}


$('#slider').sliderPlugin()
