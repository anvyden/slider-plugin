import Slider from "./components/View/Slider/Slider";
import {defaultState} from "./components/interfaces/interfaces";

const init: object = {
  slider: new Slider(defaultState, document.querySelector('#slider'))
}
