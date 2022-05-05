import { ISettings, Option, OptionValue, defaultState } from "../interfaces/interfaces";

class Model {
  private state: ISettings = defaultState

  constructor(settings: ISettings) {
    this.setState(settings)
  }

  public setState(state: ISettings): void {
    const newState = { ...this.state, ...state }
    this.state = { ...newState } // Нужно добавить валидацию параметров слайдера.
  }

  public getState(): ISettings {
    return this.state
  }

  public setValue(option: Option, value: OptionValue): void {
    const newOptionValue: object = { [option]: value }
    // Нужна валидация
    this.state = { ...this.state, ...newOptionValue }
  }

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
