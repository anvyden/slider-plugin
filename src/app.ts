import {defaultState} from "./components/interfaces/interfaces";
import './app.scss'
import Presenter from "./components/Presenter/Presenter";

const init: object = {
  presenter: new Presenter(defaultState, document.querySelector('#slider'))
}
