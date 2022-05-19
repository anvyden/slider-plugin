import {ISettings, Option, OptionValue, defaultState, OptionFromKnobValues} from "../interfaces/interfaces";
import Validation from "./Validation";
import Observer from "../Observer/Observer";
import {modelEvents} from "../events/events";
import {convertPercentValueToNumber} from "../../utils/utils";

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
    this.emit(modelEvents.STATE_CHANGED, this.state)
  }

  public getState(): ISettings {
    return this.state
  }

  public setValue(option: Option, value: OptionValue): void {
    const newState = this.checkStateValue(option, value)
    this.state = { ...this.state, ...this.validation.checkState(newState) }
    this.emit(modelEvents.VALUE_CHANGED, this.state)
  }

  public getValue(option: Option): OptionValue {
    return this.state[option]
  }

  public increment(option: OptionFromKnobValues): void {
    const newOptionValue = this.state[option] + this.state.step
    const newState = this.checkStateValue(option, newOptionValue)
    this.state = { ...this.state, ...this.validation.checkState(newState) }
    this.emit(modelEvents.VALUE_CHANGED, this.state)
  }

  public decrement(option: OptionFromKnobValues): void {
    const newOptionValue = this.state[option] - this.state.step
    const newState = this.checkStateValue(option, newOptionValue)
    this.state = { ...this.state, ...this.validation.checkState(newState) }
    this.emit(modelEvents.VALUE_CHANGED, this.state)
  }

  public setValueFromPercent(option: Option, value: number): void {
    const valueInNumber = convertPercentValueToNumber(this.state, value)
    this.setValue(option, valueInNumber)
  }

  private checkStateValue <Option extends keyof ISettings>(option: Option, value: ISettings[Option]): ISettings{
    const cloneState = { ...this.state }
    const optionTypeIsNumber = typeof value === 'number'

    const optionNameIsFrom = option === 'from' && optionTypeIsNumber
    if (optionNameIsFrom) cloneState.from = this.validation.checkFrom(value)

    return cloneState
  }
}

export default Model
