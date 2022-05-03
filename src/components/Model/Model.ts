type Orientation = 'vertical' | 'horizontal'
type Color = 'green'
type Option = keyof ISettings
type OptionValue = number | boolean | Orientation | Color

interface ISettings {
  min: number,
  max: number,
  step: number,
  from: number,
  to: number,
  orientation: Orientation,
  isRange: boolean,
  hasFill: boolean,
  hasLabels: boolean,
  hasTooltips: boolean,
  color: Color,
}

const defaultState: ISettings = {
  min: 0,
  max: 100,
  step: 10,
  from: 5,
  to: 80,
  orientation: 'horizontal',
  isRange: true,
  hasFill: true,
  hasLabels: false,
  hasTooltips: false,
  color: 'green',
}

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
