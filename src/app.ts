import { defaultState } from './defaultState';
import Presenter from './components/Presenter/Presenter';
import './app.scss';
import {ISettings} from "./components/interfaces/interfaces";

// const root = document.querySelector('#slider')

// @ts-ignore
// const init: object = {
//   presenter: new Presenter(defaultState, <HTMLElement>root),
// };

function init(this: JQuery, options: ISettings) {
  return this.each(function(this: HTMLElement) {
    const newOptions = {...JSON.parse(JSON.stringify(defaultState)), ...options}
    $(this).data('sliderPlugin', new Presenter(newOptions, this))
  })
}

$.fn.sliderPlugin = function(...args: ISettings[]){
  const firstArg = args[0]
  // const argsIsOptions = typeof firstArg === 'object' || !firstArg

  const options = firstArg || {}
  return init.call(this, options)

}

declare global {
  interface JQuery {
    sliderPlugin(): void,
    sliderPlugin(options: ISettings): void,
  }
}


$('#slider').sliderPlugin()
