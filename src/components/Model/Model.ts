import { ISettings, Option, OptionValue, defaultState } from "../interfaces/interfaces";
import Validation from "./Validation";
import Observer from "../Observer/Observer";
import {modelEvents} from "../events/events";

class Model extends Observer {
  private state: ISettings = defaultState
  private validation: Validation

  constructor(state: ISettings) {
    super()
    this.validation = new Validation()
    this.setState(state)
  }

  public setState(state: ISettings): void {
    const newState = { ...this.state, ...this.validation.checkState(state) }
    this.state = { ...newState }
    // this.emit(modelEvents.STATE_CHANGED, this.state)
  }

  public getState(): ISettings {
    return this.state
  }

  public setValue(option: Option, value: OptionValue): void {
    const newOptionValue: object = { [option]: value }
    // Нужна валидация
    this.state = { ...this.state, ...newOptionValue }
  }
6.67
  public getValue(option: Option): OptionValue {
    return this.state[option]
  }

  public increment(option: number): void {
    const newOptionValue: number = this.state[option] + this.state.step
    // Нужна валидация нового значения, чтоб оно не выходило за границы допустимых
  }

  public decrement(option: number): void {
    const newOptionValue: number = this.state[option] - this.state.step
    // Нужна валидация нового значения, чтоб оно не выходило за границы допустимых
  }
}

export default Model
