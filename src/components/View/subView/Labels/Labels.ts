import {
  convertPercentValueToNumber,
  convertStateValueToPercent,
} from '../../../../utils/utils';
import { ISettings, Orientation } from '../../../interfaces/interfaces';
import { LabelsEvents } from '../../../Observer/events';
import Observer from '../../../Observer/Observer';

class Labels extends Observer {
  protected readonly state: ISettings;
  private labels!: HTMLDivElement;

  constructor(state: ISettings) {
    super();
    this.state = state;
    this.init();
  }

  public getLabels(): HTMLDivElement {
    return this.labels;
  }

  private init(): void {
    const {
      orientation,
      max,
      min,
      step,
      labels: { countOfLabels },
    } = this.state;
    this.labels = this.createLabels(orientation, max, min, step, countOfLabels);
    this.labels.addEventListener(
      'pointerdown',
      this.handleLabelsPointerDown.bind(this)
    );
  }

  private createLabels(
    orientation: Orientation,
    max: number,
    min: number,
    step: number,
    countOfLabels: number
  ): HTMLDivElement {
    const items = this.getItems(orientation, countOfLabels, max, min, step);

    const labelsClass = ['slider__labels', `slider__labels--${orientation}`];

    const labels = document.createElement('div');
    labels.classList.add(...labelsClass);
    labels.setAttribute('data-id', 'labels');

    items.forEach((item) => labels.insertAdjacentElement('beforeend', item));

    return labels;
  }

  private getItems(
    orientation: Orientation,
    countOfLabels: number,
    max: number,
    min: number,
    step: number
  ): HTMLDivElement[] {
    const items: HTMLDivElement[] = [];
    const labelsValues: number[] = new Array(countOfLabels).fill(0)
      .map((_, index) => {
        const countOfSteps = (max - min) / step;
        const stepsForLabel = Math.round(
          (countOfSteps / (countOfLabels - 1)) * index
        );
        const positionInNumber = stepsForLabel * step + min;
        const positionInPercent = Number(
          convertStateValueToPercent(this.state, positionInNumber).toFixed(3)
        );

        return positionInPercent;
      })
      .filter((value, index, arr) => arr.indexOf(value) === index)
      .sort((a, b) => a - b)

    labelsValues.forEach((value) => {
      const positionInNumber = convertPercentValueToNumber(this.state, value);
      const item = this.createLabel(orientation, positionInNumber, value);
      items.push(item);
    });

    return items;
  }

  private createLabel(
    orientation: Orientation,
    positionInNumber: number,
    positionInPercent: number
  ): HTMLDivElement {
    const direction = orientation === 'vertical' ? 'bottom' : 'left';
    const labelClass = 'slider__labels-item';

    const label = document.createElement('div');
    label.classList.add(labelClass);
    label.setAttribute('data-value', `${positionInPercent}`);
    label.style[direction] = `${positionInPercent}%`;
    label.innerHTML = `${positionInNumber}`;

    return label;
  }

  private handleLabelsPointerDown(event: PointerEvent): void {
    const target = <HTMLElement>event.target;
    const targetValuePercent = Number(target.dataset.value);
    this.emit(LabelsEvents.LABEL_VALUE_CHANGED, targetValuePercent);
  }
}

export default Labels;
