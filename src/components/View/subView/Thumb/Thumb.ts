import {
  convertStateValueToPercent,
  getPosition,
} from '../../../../utils/utils';
import {
  Color,
  ISettings,
  OptionFromThumbValues,
  Orientation,
} from '../../../interfaces/interfaces';
import { ThumbEvents } from '../../../Observer/events';
import Observer from '../../../Observer/Observer';

type thumbTarget =
  | ThumbEvents.THUMB_VALUE_FROM_CHANGED
  | ThumbEvents.THUMB_VALUE_TO_CHANGED

type thumbEvent = {
  [ThumbEvents.THUMB_VALUE_FROM_CHANGED]: number,
  [ThumbEvents.THUMB_VALUE_TO_CHANGED]: number,
  [ThumbEvents.THUMB_VALUE_INCREMENT]: OptionFromThumbValues,
  [ThumbEvents.THUMB_VALUE_DECREMENT]: OptionFromThumbValues,
}

class Thumb extends Observer<thumbEvent> {
  private state: ISettings;
  protected readonly root: HTMLElement;
  protected readonly dataId?: string;
  private thumbTarget!: thumbTarget;
  private thumb!: HTMLDivElement;
  private thumbPosition!: number;
  private isFirstThumb!: boolean;
  private thumbsIsReversed!: boolean;

  constructor(state: ISettings, root: HTMLElement, dataId?: string) {
    super();
    this.state = state;
    this.root = root;
    this.dataId = dataId;
    this.thumbsIsReversed = false;
    this.init();
  }

  public getThumb(): HTMLDivElement {
    return this.thumb;
  }

  public getPosition(): number {
    return this.thumbPosition
  }

  public getThumbsIsReversed(): boolean {
    return this.thumbsIsReversed
  }

  public dragThumbAfterScaleClick(option: OptionFromThumbValues): void {
    this.thumbTarget =
      option === 'to'
        ? ThumbEvents.THUMB_VALUE_TO_CHANGED
        : ThumbEvents.THUMB_VALUE_FROM_CHANGED;

    this.handleThumbPointerDown();
  }

  public update(state: ISettings): void {
    this.state = state;
    const { orientation, from, to } = state;
    const direction = orientation === 'vertical' ? 'bottom' : 'left';

    let thumbValue: number

    if (this.isFirstThumb) {
      thumbValue = from
    } else {
      thumbValue = to
    }

    this.thumbPosition = convertStateValueToPercent(
      this.state,
      thumbValue
    )
    this.thumb.style[direction] = `${this.thumbPosition}%`
  }

  private init(): void {
    const { orientation, color, from, to } = this.state;
    const direction = orientation === 'vertical' ? 'bottom' : 'left';
    this.thumb = this.createThumb(orientation, color);

    let thumbValue: number

    if (this.isFirstThumb) {
      thumbValue = from
    } else {
      thumbValue = to
    }

    this.thumbPosition = convertStateValueToPercent(
      this.state,
      thumbValue
    )
    this.thumb.style[direction] = `${this.thumbPosition}%`;

    this.thumb.addEventListener(
      'pointerdown',
      this.setThumbTarget.bind(this)
    );
    this.thumb.addEventListener(
      'pointerdown',
      this.handleThumbPointerDown.bind(this)
    );
    this.thumb.addEventListener('keydown', this.setThumbTarget.bind(this));
    this.thumb.addEventListener('keydown', this.handleThumbKeyDown.bind(this));
  }

  private createThumb(orientation: Orientation, color: Color): HTMLDivElement {
    const { isRange } = this.state;

    const thumbFirstId = isRange ? 'thumb-first' : 'thumb';
    const thumbId = this.dataId ? this.dataId : thumbFirstId;

    if (thumbId !== thumbFirstId) {
      this.isFirstThumb = false
    } else {
      this.isFirstThumb = true
    }

    const thumbClass = [
      'slider__thumb',
      `slider__thumb--${orientation}`,
      `slider__thumb--${color}`
    ]

    const thumb = document.createElement('div');
    thumb.classList.add(...thumbClass);
    thumb.setAttribute('data-id', thumbId);
    thumb.setAttribute('tabindex', '0');
    thumb.setAttribute('role', 'slider');

    return thumb;
  }

  private handleThumbPointerDown(): void {
    const { from, to, isRange } = this.state

    if (isRange) {
      if (this.isFirstThumb) {
        this.thumbsIsReversed
          = this.thumbPosition === convertStateValueToPercent(this.state, to)
          ? true : false
      } else {
        this.thumbsIsReversed
          = this.thumbPosition === convertStateValueToPercent(this.state, from)
          ? true : false
      }
    }

    const handleThumbPointerUp = (): void => {
      document.removeEventListener('pointerup', handleThumbPointerUp);
      document.removeEventListener('pointermove', handleThumbPointerMove);
    };

    const handleThumbPointerMove = (event: PointerEvent): void => {
      event.preventDefault();
      this.thumbPosition = getPosition(event, this.state, this.root);

      const isReversed = isRange && this.thumbsIsReversed

      if (isReversed) {
        if (this.isFirstThumb) {
          if (this.thumbPosition > convertStateValueToPercent(this.state, to)) {
            handleThumbPointerUp();
          }
        } else {
          if (this.thumbPosition < convertStateValueToPercent(this.state, from)) {
            handleThumbPointerUp();
          }
        }
      }

      this.emit(this.thumbTarget, Number(this.thumbPosition.toFixed(3)));
    };

    document.addEventListener('pointermove', handleThumbPointerMove);
    document.addEventListener('pointerup', handleThumbPointerUp);

    this.thumb.ondragstart = (): boolean => false;
  }

  private handleThumbKeyDown = (event: KeyboardEvent): void => {
    const { code } = event;

    if (code !== 'Tab') event.preventDefault();

    const option =
      this.thumbTarget === ThumbEvents.THUMB_VALUE_TO_CHANGED ? 'to' : 'from';
    const isIncrement = code === 'ArrowRight' || code === 'ArrowUp'
    const isDecrement = code === 'ArrowLeft' || code === 'ArrowDown'

    if (isIncrement) {
      this.emit(ThumbEvents.THUMB_VALUE_INCREMENT, option);
    }

    if (isDecrement) {
      this.emit(ThumbEvents.THUMB_VALUE_DECREMENT, option);
    }
  };
  
  private setThumbTarget(event: PointerEvent | KeyboardEvent): void {
    const target = <HTMLElement>event.target;

    this.isFirstThumb =
      target.dataset.id === 'thumb-first' ||
      target.dataset.id === 'thumb' ||
      target.dataset.id === 'tooltip-first' ||
      target.dataset.id === 'tooltip' ||
      target.dataset.id === 'tooltip-value' ||
      target.dataset.id === 'tooltip-first-value';

    this.thumbTarget = this.isFirstThumb
      ? ThumbEvents.THUMB_VALUE_FROM_CHANGED
      : ThumbEvents.THUMB_VALUE_TO_CHANGED;
  }
}

export default Thumb;
