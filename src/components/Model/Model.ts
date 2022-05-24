import { ISettings, Option, OptionValue, OptionFromKnobValues } from "../interfaces/interfaces";
import { convertPercentValueToNumber } from "../../utils/utils";
import { ModelEvents } from "../Observer/events";
import { defaultState } from "../../defaultState";
import Validation from "./Validation";
import Observer from "../Observer/Observer";

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
    this.emit(ModelEvents.STATE_CHANGED, this.state)
  }

  public getState(): ISettings {
    return this.state
  }

  public setValue(option: Option, value: OptionValue): void {
    const newState = this.checkStateValue(option, value)
    this.state = { ...this.state, ...this.validation.checkState(newState) }
    this.emit(ModelEvents.VALUE_CHANGED, this.state)
  }

  public getValue(option: Option): OptionValue {
    return this.state[option]
  }

  public increment(option: OptionFromKnobValues): void {
    const newOptionValue = this.state[option] + this.state.step
    const newState = this.checkStateValue(option, newOptionValue)
    this.state = { ...this.state, ...this.validation.checkState(newState) }
    this.emit(ModelEvents.VALUE_CHANGED, this.state)
  }

  public decrement(option: OptionFromKnobValues): void {
    const newOptionValue = this.state[option] - this.state.step
    const newState = this.checkStateValue(option, newOptionValue)
    this.state = { ...this.state, ...this.validation.checkState(newState) }
    this.emit(ModelEvents.VALUE_CHANGED, this.state)
  }

  public setValueFromPercent(option: Option, value: number): void {
    const valueInNumber = convertPercentValueToNumber(this.state, value)
    this.setValue(option, valueInNumber)
  }

  public getOptionByNearValue(percentValue: number): Option {
    const { isRange, from, to } = this.state

    if (isRange) {
      const valueInNumber = convertPercentValueToNumber(this.state, percentValue)
      const half = (to - from) / 2
      const nearValue = valueInNumber - from
      return nearValue >= half ? 'to' : 'from'
    }

    return 'from'
  }

  private checkStateValue <Option extends keyof ISettings>(option: Option, value: ISettings[Option]): ISettings{
    const cloneState = { ...this.state }
    const optionTypeIsNumber = typeof value === 'number'

    const optionNameIsFromWithRange = option === 'from' && optionTypeIsNumber && this.state.isRange
    const optionNameIsTo = option === 'to' && optionTypeIsNumber
    const optionNameIsFrom = option === 'from' && optionTypeIsNumber && !this.state.isRange

    if (optionNameIsFromWithRange) cloneState.from = this.validation.checkFromRangeValue(value)
    if (optionNameIsTo) cloneState.to = this.validation.checkToRangeValue(value)
    if (optionNameIsFrom) cloneState.from = this.validation.checkFrom(value)

    return cloneState
  }
}

export default Model
