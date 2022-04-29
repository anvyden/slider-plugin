type Orientation = 'vertical' | 'horizontal'
type Color = 'green'

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

  get getState(): ISettings {
    return this.state
  }
}
