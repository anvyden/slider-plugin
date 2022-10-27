import { Color, ISettings, Orientation } from '../../../interfaces/interfaces';

class Tooltip {
  protected readonly state: ISettings;
  protected readonly dataId?: string;
  private tooltip!: HTMLDivElement;
  private tooltipValue!: HTMLSpanElement;

  constructor(state: ISettings, dataId?: string) {
    this.state = state;
    this.dataId = dataId;
    this.init();
  }

  public getTooltip(): HTMLDivElement {
    return this.tooltip;
  }

  public update(state: ISettings): void {
    const { from, to } = state;

    this.tooltip.dataset.id === 'tooltip-second'
      ? (this.tooltipValue.textContent = `${to}`)
      : (this.tooltipValue.textContent = `${from}`);
  }

  private init(): void {
    const { orientation, color, from, to } = this.state;
    this.tooltip = this.createTooltip(orientation, color, from, to);
  }

  private createTooltip(
    orientation: Orientation,
    color: Color,
    from: number,
    to: number
  ): HTMLDivElement {
    const { isRange } = this.state;

    const tooltipFirstId = isRange ? 'tooltip-first' : 'tooltip';
    const tooltipId = this.dataId ? this.dataId : tooltipFirstId;
    const tooltipFirstValueId = isRange
      ? 'tooltip-first-value'
      : 'tooltip-value';
    const tooltipValueId = this.dataId ?
      `${this.dataId}-value`
      : tooltipFirstValueId;

    const tooltip = document.createElement('div');
    tooltip.classList.add(
      'slider__tooltip',
      `slider__tooltip--${orientation}`,
      `slider__tooltip--${color}`
    );
    tooltip.dataset.id = tooltipId;

    const tooltipValue = document.createElement('span');
    tooltipValue.classList.add('slider__tooltip-value');
    tooltipValue.dataset.id = tooltipValueId;
    tooltipValue.textContent =
      tooltipId === 'tooltip-second' ? `${to}` : `${from}`;
    this.tooltipValue = tooltipValue;

    tooltip.appendChild(tooltipValue);

    return tooltip;
  }
}

export default Tooltip;
