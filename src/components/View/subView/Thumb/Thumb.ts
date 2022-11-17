import {
  convertStateValueToPercent,
  getPosition,
  getStepInPercent,
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

class Thumb extends Observer {
  protected readonly state: ISettings;
  protected readonly root: HTMLElement;
  protected readonly dataId?: string;
  private thumbTarget!: thumbTarget;
  private thumb!: HTMLDivElement;
  private thumbPosition!: number;
  private isFirstThumb!: boolean;
  private reverseThumbs!: boolean;

  constructor(state: ISettings, root: HTMLElement, dataId?: string) {
    super();
    this.state = state;
    this.root = root;
    this.dataId = dataId;
    this.reverseThumbs = false;
    this.init();
  }

  public getThumb(): HTMLDivElement {
    return this.thumb;
  }

  public getPosition(): number {
    return this.thumbPosition
  }

  public update(state: ISettings): void {
    const { orientation, from, to } = state;
    const direction = orientation === 'vertical' ? 'bottom' : 'left';

    let thumbValue: number

    if (this.isFirstThumb) {
      thumbValue = this.reverseThumbs ? to : from
    } else {
      thumbValue = this.reverseThumbs ? from : to
    }

    this.thumbPosition = convertStateValueToPercent(
      this.state,
      thumbValue
    )
    this.thumb.style[direction] = `${this.thumbPosition}%`
  }

  public setThumbEvent(reverseThumbs: boolean): void {
    this.reverseThumbs = reverseThumbs;

    if (this.isFirstThumb) {
      this.thumbTarget = this.reverseThumbs
        ? ThumbEvents.THUMB_VALUE_TO_CHANGED
        : ThumbEvents.THUMB_VALUE_FROM_CHANGED
    } else {
      this.thumbTarget = this.reverseThumbs
        ? ThumbEvents.THUMB_VALUE_FROM_CHANGED
        : ThumbEvents.THUMB_VALUE_TO_CHANGED
    }
  }

  public dragThumbAfterScaleClick(option: OptionFromThumbValues): void {
    this.thumbTarget =
      option === 'to'
        ? ThumbEvents.THUMB_VALUE_TO_CHANGED
        : ThumbEvents.THUMB_VALUE_FROM_CHANGED;

    this.handleThumbPointerDown();
  }

  private init(): void {
    const { orientation, color, from, to } = this.state;
    const direction = orientation === 'vertical' ? 'bottom' : 'left';
    this.thumb = this.createThumb(orientation, color);

    let thumbValue: number
    
    if (this.isFirstThumb) {
      thumbValue =  this.reverseThumbs ? to : from
    } else {
      thumbValue = this.reverseThumbs ? from : to
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

    const thumb = document.createElement('div');
    thumb.classList.add(
      'slider__thumb',
      `slider__thumb--${orientation}`,
      `slider__thumb--${color}`
    );
    thumb.setAttribute('data-id', thumbId);
    thumb.setAttribute('tabindex', '0');
    thumb.setAttribute('role', 'slider');

    return thumb;
  }

  private handleThumbPointerDown(): void {
    const handleThumbPointerMove = (event: PointerEvent): void => {
      event.preventDefault();
      this.thumbPosition = getPosition(event, this.state, this.root);
      this.validateThumbPosition(this.thumbPosition);
      this.emit(this.thumbTarget, Number(this.thumbPosition.toFixed(3)));
    };

    const handleThumbPointerUp = (): void => {
      document.removeEventListener('pointerup', handleThumbPointerUp);
      document.removeEventListener('pointermove', handleThumbPointerMove);
    };

    document.addEventListener('pointermove', handleThumbPointerMove);
    document.addEventListener('pointerup', handleThumbPointerUp);

    this.thumb.ondragstart = (): boolean => false;
  }

  private handleThumbKeyDown = (event: KeyboardEvent): void => {
    const { max, min, step } = this.state
    const { code } = event;

    if (code !== 'Tab') event.preventDefault();

    const option =
      this.thumbTarget === ThumbEvents.THUMB_VALUE_TO_CHANGED ? 'to' : 'from';

    if (code === 'ArrowRight' || code === 'ArrowUp') {
      const stepInPercent = getStepInPercent(max, min, step);
      this.thumbPosition = this.thumbPosition + stepInPercent;
      this.validateThumbPosition(this.thumbPosition);
      this.emit(ThumbEvents.THUMB_VALUE_INCREMENT, option);
    }

    if (code === 'ArrowLeft' || code === 'ArrowDown') {
      const stepInPercent = getStepInPercent(max, min, step);
      this.thumbPosition = this.thumbPosition - stepInPercent;
      this.validateThumbPosition(this.thumbPosition);
      this.emit(ThumbEvents.THUMB_VALUE_DECREMENT, option);
    }
  };

  private validateThumbPosition(thumbPosition: number): number {
    let correctThumbPosition: number;

    if (thumbPosition > 100) {
      correctThumbPosition = 100;
    } else if (thumbPosition < 0) {
      correctThumbPosition = 0;
    } else {
      correctThumbPosition = thumbPosition
    }

    return correctThumbPosition
  }

  private setThumbTarget(event: PointerEvent | KeyboardEvent): void {
    const target = <HTMLElement>event.target;

    this.isFirstThumb =
      target.dataset.id === 'thumb-first' ||
      target.dataset.id === 'thumb' ||
      target.dataset.id === 'tooltip-first' ||
      target.dataset.id === 'tooltip' ||
      target.dataset.id === 'tooltip-value' ||
      target.dataset.id === 'tooltip-first-value';

    this.setThumbEvent(this.reverseThumbs);
  }
}

export default Thumb;
