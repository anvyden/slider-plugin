import {
  ISettings,
  OptionFromThumbValues,
  Orientation,
  SliderComponents,
} from '../interfaces/interfaces';
import {
  ThumbEvents,
  LabelsEvents,
  ScaleEvents,
  ViewEvents,
} from '../Observer/events';
import Observer from '../Observer/Observer';
import Slider from './Slider/Slider';
import Thumb from './subView/Thumb/Thumb';
import Tooltip from './subView/Tooltip/Tooltip';

class View extends Observer {
  protected readonly state: ISettings;
  protected readonly root: HTMLElement;
  private sliderComponents!: SliderComponents;

  constructor(state: ISettings, root: HTMLElement) {
    super();
    this.state = state;
    this.root = root;
    this.init(state);
  }

  public init(state: ISettings): void {
    this.root.innerHTML = '';
    const slider = new Slider(state, this.root);

    this.sliderComponents = slider.getComponents();
    this.bindEvents();

    if (state.isRange) this.createUnitedTooltip(state);
  }

  public update(state: ISettings): void {
    const sliderComponents = [
      this.sliderComponents.thumb,
      this.sliderComponents.progressBar,
      this.sliderComponents.tooltip,
      <Thumb>this.sliderComponents.thumbSecond,
      <Tooltip>this.sliderComponents.tooltipSecond,
    ];

    sliderComponents.forEach((component) => {
      if (component) component.update(state);
    });

    if (state.isRange) this.createUnitedTooltip(state);
  }

  public setTargetThumb(option: OptionFromThumbValues): void {
    const thumb = this.sliderComponents.thumb;
    const thumbSecond = <Thumb>this.sliderComponents.thumbSecond;

    if (option === 'to') {
      thumbSecond.dragThumbAfterScaleClick(option);
    } else {
      thumb.dragThumbAfterScaleClick(option);
    }
  }

  private bindEvents(): void {
    this.bindThumbEvents();
    this.bindLabelsEvents();
    this.bindScaleEvents();
  }

  /* istanbul ignore next */
  private bindScaleEvents(): void {
    const { scale } = this.sliderComponents;
    scale.subscribe(ScaleEvents.SCALE_VALUE_CHANGED, (percentValue: number) => {
      this.emit(ViewEvents.VALUE_CHANGED, percentValue);
    });
  }

  /* istanbul ignore next */
  private bindLabelsEvents(): void {
    const { labels } = this.sliderComponents;
    labels.subscribe(
      LabelsEvents.LABEL_VALUE_CHANGED,
      (percentValue: number) => {
        this.emit(ViewEvents.VALUE_CHANGED_FROM_LABELS, percentValue);
      }
    );
  }

  /* istanbul ignore next */
  private bindThumbEvents(): void {
    const { thumb, thumbSecond } = this.sliderComponents;

    thumb.subscribe(
      ThumbEvents.THUMB_VALUE_FROM_CHANGED,
      (percentValue: number) => {
        this.emit(ViewEvents.VALUE_FROM_CHANGED, percentValue);
      }
    );

    thumb.subscribe(
      ThumbEvents.THUMB_VALUE_INCREMENT,
      (option: OptionFromThumbValues) => {
        this.emit(ViewEvents.VALUE_FROM_INCREMENT, option);
      }
    );

    thumb.subscribe(
      ThumbEvents.THUMB_VALUE_DECREMENT,
      (option: OptionFromThumbValues) => {
        this.emit(ViewEvents.VALUE_FROM_DECREMENT, option);
      }
    );

    if (thumbSecond) {
      this.setThumbZIndex(thumb, thumbSecond);

      thumbSecond.subscribe(
        ThumbEvents.THUMB_VALUE_TO_CHANGED,
        (percentValue: number) => {
          this.emit(ViewEvents.VALUE_TO_CHANGED, percentValue);
        }
      );

      thumbSecond.subscribe(
        ThumbEvents.THUMB_VALUE_INCREMENT,
        (option: OptionFromThumbValues) => {
          this.emit(ViewEvents.VALUE_FROM_INCREMENT, option);
        }
      );

      thumbSecond.subscribe(
        ThumbEvents.THUMB_VALUE_DECREMENT,
        (option: OptionFromThumbValues) => {
          this.emit(ViewEvents.VALUE_FROM_DECREMENT, option);
        }
      );
    }
  }

  private setThumbZIndex(thumb: Thumb, thumbSecond: Thumb): void {
    const thumbNode = thumb.getThumb();
    const thumbSecondNode = thumbSecond.getThumb();

    /* istanbul ignore next */
    thumb.subscribe(ThumbEvents.THUMB_VALUE_FROM_CHANGED, () => {
      thumbNode.style.zIndex = '1';
      thumbSecondNode.style.zIndex = '0';
    });

    /* istanbul ignore next */
    thumbSecond.subscribe(ThumbEvents.THUMB_VALUE_TO_CHANGED, () => {
      thumbNode.style.zIndex = '0';
      thumbSecondNode.style.zIndex = '1';
    });
  }

  private checkTooltipsOverlap(
    orientation: Orientation,
    tooltipFirst: HTMLDivElement,
    tooltipSecond: HTMLDivElement
  ): boolean {
    const { right: tooltipFirstRight, top: tooltipFirstTop } =
      tooltipFirst.getBoundingClientRect();

    const { left: tooltipSecondLeft, bottom: tooltipSecondBottom } =
      tooltipSecond.getBoundingClientRect();

    const isOverlapHorizontal =
      orientation === 'horizontal' && tooltipFirstRight >= tooltipSecondLeft;
    const isOverlapVertical =
      orientation === 'vertical' && tooltipSecondBottom >= tooltipFirstTop;

    /* istanbul ignore next */
    if (isOverlapHorizontal || isOverlapVertical) return true;
    else return false;
  }

  private createUnitedTooltip(state: ISettings): void {
    const { from, to, orientation } = state;

    const tooltip = this.sliderComponents.tooltip;
    const tooltipSecond = <Tooltip>this.sliderComponents.tooltipSecond;
    const tooltipNode = tooltip.getTooltip();
    const tooltipSecondNode = tooltipSecond.getTooltip();
    const tooltipValue = tooltipNode.children[0];

    /* istanbul ignore else */
    if (
      this.checkTooltipsOverlap(orientation, tooltipNode, tooltipSecondNode)
    ) {
      tooltipNode.classList.add('tooltip--united');
      tooltipValue.textContent = `${from} \u2013 ${to}`;
      tooltipSecondNode.style.visibility = 'hidden';
    } else {
      tooltipNode.classList.remove('tooltip--united');
      tooltipSecondNode.style.visibility = 'visible';
    }
  }
}

export default View;
