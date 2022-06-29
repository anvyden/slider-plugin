import { getPosition } from '../../../../utils/utils';
import { ISettings, Orientation } from '../../../interfaces/interfaces';
import { ScaleEvents } from '../../../Observer/events';
import Observer from '../../../Observer/Observer';
import './scale.scss';

class Scale extends Observer {
  protected readonly state: ISettings;
  protected readonly root: HTMLElement;
  private scale!: HTMLDivElement;

  constructor(state: ISettings, root: HTMLElement) {
    super();
    this.state = state;
    this.root = root;
    this.init();
  }

  public getScale(): HTMLDivElement {
    return this.scale;
  }

  private init(): void {
    const { orientation } = this.state;
    const orientationClass =
      orientation === 'vertical' ? orientation : 'horizontal';

    this.scale = this.createScale(orientationClass);
    this.scale.addEventListener(
      'pointerdown',
      this.handleScalePointerDown.bind(this)
    );
  }

  private createScale(orientation: Orientation): HTMLDivElement {
    const scale = document.createElement('div');
    scale.classList.add(
      'js-slider__scale',
      'slider__scale',
      `slider__scale--${orientation}`
    );
    scale.setAttribute('data-id', 'scale');

    return scale;
  }

  private handleScalePointerDown(event: PointerEvent): void {
    /* istanbul ignore else */
    if (this.isScale(event)) {
      const positionClick = getPosition(event, this.state, this.root);
      this.emit(
        ScaleEvents.SCALE_VALUE_CHANGED,
        Number(positionClick.toFixed(3))
      );
    }
  }

  private isScale(event: PointerEvent): boolean {
    const target = <HTMLElement>event.target;
    const isScale =
      target.dataset.id === 'scale' || target.dataset.id === 'progressBar';
    return isScale;
  }
}

export default Scale;
