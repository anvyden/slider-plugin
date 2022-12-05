import {
  ISettings,
  Orientation,
  Color,
} from '../../../src/components/interfaces/interfaces';
import { defaultState } from '../../../src/defaultState';

class DemoBlock {
  private root: HTMLDivElement;
  private sliderRoot: JQuery;
  private state: ISettings = defaultState;
  private panel!: HTMLDivElement;
  private max!: HTMLInputElement;
  private min!: HTMLInputElement;
  private step!: HTMLInputElement;
  private from!: HTMLInputElement;
  private to!: HTMLInputElement;
  private orientation!: HTMLInputElement;
  private color!: HTMLInputElement;
  private isRange!: HTMLInputElement;
  private progressBar!: HTMLInputElement;
  private tooltips!: HTMLInputElement;
  private labels!: HTMLInputElement;
  private countOfLabels!: HTMLInputElement;

  constructor(root: HTMLDivElement, sliderRoot: JQuery) {
    this.root = root;
    this.sliderRoot = sliderRoot;
    this.init();
    this.bindEventListeners();
  }

  private findAllConfigurationItems(): void {
    this.panel = <HTMLDivElement>this.root.querySelector('[data-id="panel"]');
    this.max = <HTMLInputElement>this.panel.querySelector('[data-item="max"]');
    this.min = <HTMLInputElement>this.panel.querySelector('[data-item="min"]');
    this.step = <HTMLInputElement>(
      this.panel.querySelector('[data-item="step"]')
    );
    this.from = <HTMLInputElement>(
      this.panel.querySelector('[data-item="from"]')
    );
    this.to = <HTMLInputElement>this.panel.querySelector('[data-item="to"]');
    this.orientation = <HTMLInputElement>(
      this.panel.querySelector('[data-item="orientation"]')
    );
    this.color = <HTMLInputElement>(
      this.panel.querySelector('[data-item="color"]')
    );
    this.isRange = <HTMLInputElement>(
      this.panel.querySelector('[data-item="isRange"]')
    );
    this.progressBar = <HTMLInputElement>(
      this.panel.querySelector('[data-item="progressBar"]')
    );
    this.tooltips = <HTMLInputElement>(
      this.panel.querySelector('[data-item="tooltips"]')
    );
    this.labels = <HTMLInputElement>(
      this.panel.querySelector('[data-item="labels"]')
    );
    this.countOfLabels = <HTMLInputElement>(
      this.panel.querySelector('[data-item="countOfLabels"]')
    );
  }

  private init(): void {
    this.findAllConfigurationItems();
    this.setPanelParams();
  }

  private setPanelParams(event?: CustomEvent): void {
    if (event) {
      this.state = {
        ...this.state,
        ...event.detail
      }
    } else {
      this.state = this.sliderRoot.sliderPlugin('getState');
    }

    const {
      max,
      min,
      step,
      from,
      to,
      orientation,
      color,
      isRange,
      hasProgressBar,
      hasTooltips,
      labels,
    } = this.state;

    const { addLabels, countOfLabels } = labels;

    this.max.value = `${max}`;
    this.min.value = `${min}`;
    this.step.value = `${step}`;
    this.from.value = `${from}`;
    this.to.value = `${to}`;
    this.orientation.value = `${orientation}`;
    this.color.value = `${color}`;
    this.isRange.checked = isRange;
    this.progressBar.checked = hasProgressBar;
    this.tooltips.checked = hasTooltips;
    this.labels.checked = addLabels;
    this.countOfLabels.value = `${countOfLabels}`;

    const toIsDisabled = isRange ? false : true
    this.to.disabled = toIsDisabled
  }

  private handleUpdateSlider(event: CustomEvent): void {
    this.setPanelParams(event)
  }

  private bindEventListeners(): void {
    this.sliderRoot.sliderPlugin(
      'bindListener',
      'update',
      this.handleUpdateSlider.bind(this)
    );
    this.max.addEventListener('change', this.handleMaxChange.bind(this));
    this.min.addEventListener('change', this.handleMinChange.bind(this));
    this.step.addEventListener('change', this.handleStepChange.bind(this));
    this.from.addEventListener('change', this.handleFromChange.bind(this));
    this.to.addEventListener('change', this.handleToChange.bind(this));
    this.orientation.addEventListener(
      'change',
      this.handleOrientationChange.bind(this)
    );
    this.color.addEventListener('change', this.handleColorChange.bind(this));
    this.isRange.addEventListener(
      'change',
      this.handleIsRangeChange.bind(this)
    );
    this.progressBar.addEventListener(
      'change',
      this.handleProgressBarChange.bind(this)
    );
    this.tooltips.addEventListener(
      'change',
      this.handleTooltipsChange.bind(this)
    );
    this.labels.addEventListener('change', this.handleLabelsChange.bind(this));
    this.countOfLabels.addEventListener(
      'change',
      this.handleCountOfLabelsChange.bind(this)
    );
  }

  private handleMaxChange(): void {
    this.sliderRoot.sliderPlugin('setValue', 'max', Number(this.max.value));
  }

  private handleMinChange(): void {
    this.sliderRoot.sliderPlugin('setValue', 'min', Number(this.min.value));
  }

  private handleStepChange(): void {
    this.sliderRoot.sliderPlugin('setValue', 'step', Number(this.step.value));
  }

  private handleFromChange(): void {
    this.sliderRoot.sliderPlugin('setValue', 'from', Number(this.from.value));
  }

  private handleToChange(): void {
    this.sliderRoot.sliderPlugin('setValue', 'to', Number(this.to.value));
  }

  private handleOrientationChange(): void {
    this.sliderRoot.sliderPlugin(
      'setValue',
      'orientation',
      <Orientation>this.orientation.value
    );
  }

  private handleColorChange(): void {
    this.sliderRoot.sliderPlugin('setValue', 'color', <Color>this.color.value);
  }

  private handleIsRangeChange(): void {
    this.sliderRoot.sliderPlugin('setValue', 'isRange', this.isRange.checked);
  }

  private handleProgressBarChange(): void {
    this.sliderRoot.sliderPlugin(
      'setValue',
      'hasProgressBar',
      this.progressBar.checked
    );
  }

  private handleTooltipsChange(): void {
    this.sliderRoot.sliderPlugin(
      'setValue',
      'hasTooltips',
      this.tooltips.checked
    );
  }

  private handleLabelsChange(): void {
    this.sliderRoot.sliderPlugin('setValue', 'addLabels', this.labels.checked);
  }

  private handleCountOfLabelsChange(): void {
    this.sliderRoot.sliderPlugin(
      'setValue',
      'countOfLabels',
      Number(this.countOfLabels.value)
    );
  }
}

export default DemoBlock;
