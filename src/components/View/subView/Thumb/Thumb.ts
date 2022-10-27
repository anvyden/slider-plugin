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
import './thumb.scss';

type thumbTarget =
  | ThumbEvents.THUMB_VALUE_FROM_CHANGED
  | ThumbEvents.THUMB_VALUE_TO_CHANGED;

class Thumb extends Observer {
  protected readonly state: ISettings;
  protected readonly root: HTMLElement;
  protected readonly dataId?: string;
  private thumbTarget!: thumbTarget;
  private thumb!: HTMLDivElement;

  constructor(state: ISettings, root: HTMLElement, dataId?: string) {
    super();
    this.state = state;
    this.root = root;
    this.dataId = dataId;
    this.init();
  }

  public getThumb(): HTMLDivElement {
    return this.thumb;
  }

  public update(state: ISettings): void {
    const { orientation, from, to } = state;
    const direction = orientation === 'vertical' ? 'bottom' : 'left';

    this.thumb.dataset.id === 'thumb-second'
      ? (this.thumb.style[direction] = `${convertStateValueToPercent(
          this.state,
          to
        )}%`)
      : (this.thumb.style[direction] = `${convertStateValueToPercent(
          this.state,
          from
        )}%`);
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

    this.thumb.dataset.id === 'thumb-second'
      ? (this.thumb.style[direction] = `${convertStateValueToPercent(
          this.state,
          to
        )}%`)
      : (this.thumb.style[direction] = `${convertStateValueToPercent(
          this.state,
          from
        )}%`);

    this.thumb.addEventListener(
      'pointerdown',
      this.checkThumbTarget.bind(this)
    );
    this.thumb.addEventListener(
      'pointerdown',
      this.handleThumbPointerDown.bind(this)
    );
    this.thumb.addEventListener('keydown', this.checkThumbTarget.bind(this));
    this.thumb.addEventListener('keydown', this.handleThumbKeyDown.bind(this));
  }

  private createThumb(orientation: Orientation, color: Color): HTMLDivElement {
    const { isRange } = this.state;

    const thumbFirstId = isRange ? 'thumb-first' : 'thumb';
    const thumbId = this.dataId ? this.dataId : thumbFirstId;

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
      const thumbPosition = getPosition(event, this.state, this.root);
      this.emit(this.thumbTarget, Number(thumbPosition.toFixed(3)));
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
    const { code } = event;

    if (code !== 'Tab') event.preventDefault();

    const option =
      this.thumbTarget === ThumbEvents.THUMB_VALUE_TO_CHANGED ? 'to' : 'from';

    if (code === 'ArrowRight' || code === 'ArrowUp') {
      this.emit(ThumbEvents.THUMB_VALUE_INCREMENT, option);
    }

    if (code === 'ArrowLeft' || code === 'ArrowDown') {
      this.emit(ThumbEvents.THUMB_VALUE_DECREMENT, option);
    }
  };

  private checkThumbTarget(event: PointerEvent | KeyboardEvent): void {
    const target = <HTMLElement>event.target;

    const isFirstThumb =
      target.dataset.id === 'thumb-first' ||
      target.dataset.id === 'thumb' ||
      target.dataset.id === 'tooltip-first' ||
      target.dataset.id === 'tooltip' ||
      target.dataset.id === 'tooltip-value' ||
      target.dataset.id === 'tooltip-first-value';

    this.thumbTarget = isFirstThumb
      ? ThumbEvents.THUMB_VALUE_FROM_CHANGED
      : ThumbEvents.THUMB_VALUE_TO_CHANGED;
  }
}

export default Thumb;
