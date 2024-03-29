import { defaultState } from '../../defaultState';
import { convertPercentValueToNumber } from '../../utils/utils';
import {
  ISettings,
  Option,
  OptionValue,
  OptionFromThumbValues,
} from '../interfaces/interfaces';
import { ModelEvents } from '../Observer/events';
import Observer from '../Observer/Observer';
import Validation from './Validation';

// type Option = keyof ISettings;

type ModelEvent = {
  [ModelEvents.VALUE_CHANGED]: ISettings,
  [ModelEvents.STATE_CHANGED]: ISettings
}

class Model extends Observer<ModelEvent> {
  private state: ISettings = defaultState;
  private validation: Validation;

  constructor(state: ISettings) {
    super();
    this.validation = new Validation();
    this.setState(state);
  }

  public setState(state: ISettings): void {
    const prevState = { ...JSON.parse(JSON.stringify(this.state)) };
    this.state = { ...prevState, ...this.validation.checkState(state) };
    this.emit(ModelEvents.STATE_CHANGED, this.state);
  }

  public getState(): ISettings {
    return JSON.parse(JSON.stringify(this.state));
  }

  public setValue(option: Option, value: OptionValue): void {
    const newState = this.checkStateValue(option, value);
    this.state = { ...this.state, ...this.validation.checkState(newState) };
    const OptionFromThumb = option === 'from' || option === 'to'

    if (OptionFromThumb) {
      this.emit(ModelEvents.VALUE_CHANGED, this.state);
    } else {
      this.emit(ModelEvents.STATE_CHANGED, this.state);
    }
  }

  public getValue(option: Option): OptionValue {
    if (option === 'addLabels') return this.state.labels.addLabels;
    if (option === 'countOfLabels') return this.state.labels.countOfLabels;
    return JSON.parse(JSON.stringify(this.state))[option];
  }

  public increment(option: OptionFromThumbValues): void {
    const newOptionValue = this.state[option] + this.state.step;
    const newState = this.checkStateValue(option, newOptionValue);
    this.state = { ...this.state, ...this.validation.checkState(newState) };
    this.emit(ModelEvents.VALUE_CHANGED, this.state);
  }

  public decrement(option: OptionFromThumbValues): void {
    const newOptionValue = this.state[option] - this.state.step;
    const newState = this.checkStateValue(option, newOptionValue);
    this.state = { ...this.state, ...this.validation.checkState(newState) };
    this.emit(ModelEvents.VALUE_CHANGED, this.state);
  }

  public setValueFromPercent(
    option: OptionFromThumbValues,
    percentValue: number
  ): void {
    const valueInNumber = convertPercentValueToNumber(this.state, percentValue);
    this.setValue(option, valueInNumber);
  }

  public getOptionByNearValue(percentValue: number): OptionFromThumbValues {
    const { isRange, from, to } = this.state;

    if (isRange) {
      const valueInNumber = convertPercentValueToNumber(
        this.state,
        percentValue
      );
      const half = (to - from) / 2;
      const nearValue = valueInNumber - from;

      return nearValue >= half ? 'to' : 'from';
    }

    return 'from';
  }

  private checkStateValue(option: Option, value: OptionValue): ISettings {
    const newState = { ...JSON.parse(JSON.stringify(this.state)) };

    const optionTypeIsNumber = typeof value === 'number';
    const optionTypeIsBoolean = typeof value === 'boolean';
    const optionTypeIsColor = value === 'purple' || value === 'green';
    const optionTypeIsOrientation =
      value === 'horizontal' || value === 'vertical';

    const optionNameIsFromWithRange =
      option === 'from' && optionTypeIsNumber && this.state.isRange;
    const optionNameIsTo = option === 'to' && optionTypeIsNumber;
    const optionNameIsFrom =
      option === 'from' && optionTypeIsNumber && !this.state.isRange;

    const optionNameHasTypeNumber =
      (option === 'max' || option === 'min' || option === 'step') &&
      optionTypeIsNumber;

    const optionNameHasTypeBoolean =
      (option === 'hasProgressBar' ||
        option === 'hasTooltips' ||
        option === 'isRange') &&
      optionTypeIsBoolean;

    const optionNameHasTypeColor = option === 'color' && optionTypeIsColor;
    const optionNameHasTypeOrientation =
      option === 'orientation' && optionTypeIsOrientation;
    const optionNameHasTypeAddLabels =
      option === 'addLabels' && optionTypeIsBoolean;
    const optionNameHasTypeCountOfLabels =
      option === 'countOfLabels' && optionTypeIsNumber;
      
    if (optionNameIsFromWithRange)
      newState.from = this.validation.checkFromRangeValue(value);
    if (optionNameIsTo) newState.to = this.validation.checkToRangeValue(value);
    if (optionNameIsFrom) newState.from = this.validation.checkFrom(value);
    if (optionNameHasTypeNumber) newState[option] = value;
    if (optionNameHasTypeBoolean) newState[option] = value;
    if (optionNameHasTypeColor) newState[option] = value;
    if (optionNameHasTypeOrientation) newState[option] = value;
    if (optionNameHasTypeAddLabels) newState.labels.addLabels = value;
    if (optionNameHasTypeCountOfLabels) newState.labels.countOfLabels = value;

    return newState;
  }
}

export default Model;
