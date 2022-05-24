import { defaultState } from './defaultState';
import Presenter from './components/Presenter/Presenter';
import './app.scss';

const init: object = {
  presenter: new Presenter(defaultState, document.querySelector('#slider')),
};
