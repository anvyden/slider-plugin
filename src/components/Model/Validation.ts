import {
  convertPercentValueToNumber,
  convertStateValueToPercent,
} from '../../utils/utils';
import { defaultState } from '../../defaultState';
import { ISettings } from '../interfaces/interfaces';

class Validation {
  private min!: number;
  private max!: number;
  private step!: number;
  private from!: number;
  private to!: number;
  private countOfLabels!: number;
  private addLabels!: boolean;

  public checkState(state: ISettings): ISettings {
    const correctStateKeys = Object.keys(defaultState);
    const receivedState = JSON.parse(JSON.stringify(state));
    const receivedStateKeys = Object.keys(receivedState);

    receivedStateKeys.forEach((key) => {
      if (!correctStateKeys.includes(key)) {
        delete receivedState[key];
      }
    });

    const { max, min, step, from, to, isRange, labels } = receivedState;

    const { addLabels, countOfLabels } = labels;

    this.max = max;
    this.min = min;
    this.step = step;
    this.from = from;
    this.to = to;
    this.countOfLabels = countOfLabels;
    this.addLabels = addLabels;

    this.checkMaxMin(this.max, this.min);
    this.step = this.checkStep(this.max, this.min, this.step);
    this.countOfLabels = this.checkCountOfLabels(countOfLabels);

    if (isRange) {
      this.checkMaxMinRange(this.from, this.to);
    } else {
      this.from = this.checkFrom(this.from);
    }

    const validState: ISettings = {
      ...receivedState,
      max: this.max,
      min: this.min,
      step: this.step,
      from: this.from,
      to: this.to,
      labels: {
        addLabels: this.addLabels,
        countOfLabels: this.countOfLabels,
      },
    };

    return validState;
  }

  public checkStep(max: number, min: number, step: number): number {
    const difference = max - min;
    let roundStep = Number(step.toFixed(2));

    if (roundStep < 0) return defaultState.step;
    if (roundStep === 0) roundStep += 1;
    if (roundStep > difference) return difference;

    return roundStep;
  }

  public checkMaxMin(max: number, min: number): void {
    let validMax = Number(max.toFixed(2));
    let validMin = Number(min.toFixed(2));

    if (validMax < validMin) {
      const swap = validMax;
      validMax = validMin;
      validMin = swap;
    }

    if (validMax === validMin) {
      validMax += 1;
    }

    this.max = validMax;
    this.min = validMin;
  }

  public convertValueToStep(value: number): number {
    const validPercentValue = convertStateValueToPercent(
      {
        max: this.max,
        min: this.min,
        step: this.step,
      },
      value
    );

    const validValue = convertPercentValueToNumber(
      {
        max: this.max,
        min: this.min,
        step: this.step,
      },
      validPercentValue
    );

    return validValue;
  }

  public checkMaxMinRange(from: number, to: number): void {
    const roundFrom = Number(from.toFixed(2));
    const roundTo = Number(to.toFixed(2));

    let validFrom = this.convertValueToStep(roundFrom);
    let validTo = this.convertValueToStep(roundTo);

    if (validTo < validFrom) {
      const swap = validFrom;
      validFrom = validTo;
      validTo = swap;
    }

    this.from = validFrom;
    this.to = validTo;
  }

  public checkFrom(from: number): number {
    const roundFrom = Number(from.toFixed(2));
    const validFrom = this.convertValueToStep(roundFrom);

    return validFrom;
  }

  public checkCountOfLabels(count: number): number {
    const roundCount = Math.round(count);

    if (roundCount > 6) return defaultState.labels.countOfLabels;
    if (roundCount < 2) return defaultState.labels.countOfLabels;

    return roundCount;
  }
}

export default Validation;
