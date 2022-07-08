import { convertStateValueToPercent } from '../../../utils/utils';
import {
  ISettings,
  Orientation,
  SliderComponents,
} from '../../interfaces/interfaces';
import Scale from '../subView/Scale/Scale';
import Thumb from '../subView/Thumb/Thumb';
import ProgressBar from '../subView/Progress-bar/Progress-bar';
import Labels from '../subView/Labels/Labels';
import Tooltip from '../subView/Tooltip/Tooltip';
import './slider.scss';

class Slider {
  protected readonly state: ISettings;
  protected readonly root: HTMLElement;
  private scale!: HTMLDivElement;
  private components!: SliderComponents;

  constructor(state: ISettings, root: HTMLElement) {
    this.root = root;
    this.state = state;
    this.init();
  }

  public getComponents(): SliderComponents {
    return this.components;
  }

  private init(): void {
    const { orientation } = this.state;
    const slider = this.createSlider(orientation);

    this.components = this.createComponents();

    this.scale = this.components.scale.getScale();
    slider.insertAdjacentElement('beforeend', this.scale);
    this.addElementsInScale();
    this.root.insertAdjacentElement('beforeend', slider);
  }

  private createComponents(): SliderComponents {
    const { isRange } = this.state;

    let components: SliderComponents = {
      scale: new Scale(this.state, this.root),
      thumb: new Thumb(this.state, this.root),
      progressBar: new ProgressBar(this.state),
      labels: new Labels(this.state),
      tooltip: new Tooltip(this.state),
    };

    if (isRange) {
      components = {
        ...components,
        thumbSecond: new Thumb(this.state, this.root, 'thumb-second'),
        tooltipSecond: new Tooltip(this.state, 'tooltip-second'),
      };
    }

    return components;
  }

  private addElementsInScale(): void {
    const {
      isRange,
      hasProgressBar,
      hasTooltips,
      labels: { addLabels },
    } = this.state;

    const thumbNode = this.components.thumb.getThumb();
    const progressBarNode = this.components.progressBar.getProgressBar();
    const labelsNode = this.components.labels.getLabels();
    const tooltipNode = this.components.tooltip.getTooltip();

    this.scale.insertAdjacentElement('afterbegin', thumbNode);

    if (isRange) {
      const thumbSecond = <Thumb>this.components.thumbSecond;
      const thumbSecondNode = thumbSecond.getThumb();

      if (hasTooltips) {
        const tooltipSecond = <Tooltip>this.components.tooltipSecond;
        const tooltipSecondNode = tooltipSecond.getTooltip();
        thumbSecondNode.insertAdjacentElement('beforeend', tooltipSecondNode);
      }

      const insertPosition = this.checkThumbsPosition() ? 'afterbegin' : 'beforeend';
      this.scale.insertAdjacentElement(insertPosition, thumbSecondNode);
    }

    if (hasProgressBar) this.scale.insertAdjacentElement('afterbegin', progressBarNode);
    if (hasTooltips) thumbNode.insertAdjacentElement('beforeend', tooltipNode);
    if (addLabels) this.scale.insertAdjacentElement('beforeend', labelsNode);
  }

  private checkThumbsPosition(): boolean {
    const { from, to } = this.state;

    const fromInPercent = convertStateValueToPercent(this.state, from);
    const toInPercent = convertStateValueToPercent(this.state, to);

    const isFinite = fromInPercent === 100 && toInPercent === 100;

    return isFinite;
  }

  private createSlider(orientation: Orientation): HTMLDivElement {
    const slider = document.createElement('div');
    slider.classList.add('js-slider', 'slider', `slider--${orientation}`);

    return slider;
  }
}

export default Slider;
