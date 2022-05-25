import { defaultState } from './defaultState';
import Presenter from './components/Presenter/Presenter';
import './app.scss';

const root = document.querySelector('#slider')

// @ts-ignore
const init: object = {
  presenter: new Presenter(defaultState, <HTMLElement>root),
};
