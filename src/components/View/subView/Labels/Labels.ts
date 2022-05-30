import { ISettings, Orientation } from "../../../interfaces/interfaces";
import { convertStateValueToPercent } from "../../../../utils/utils";
import { LabelsEvents } from "../../../Observer/events";
import Observer from "../../../Observer/Observer";
import './labels.scss'

class Labels extends Observer {
  protected readonly state: ISettings
  private labels!: HTMLDivElement

  constructor(state: ISettings) {
    super()
    this.state = state
    this.init()
  }

  public getLabels(): HTMLDivElement {
    return this.labels
  }

  private init(): void {
    const { orientation, max, min, step } = this.state
    this.labels = this.createLabels(orientation, max, min, step)
    this.labels.addEventListener('pointerdown', this.handleLabelsPointerDown.bind(this))
  }

  private createLabels(
    orientation: Orientation,
    max: number,
    min: number,
    step: number
  ): HTMLDivElement {

    /*TODO: Реализовать из state количество labels (countOfLabels).
    *   Конечно же добавить проверку сначала на наличие labels вообще в state
    *   То есть (state = { labels: { addLabels: true, countOfLabels: 5 } }) */

    const countOfLabels: number = 6
    const items = this.getItems(orientation, countOfLabels, max, min, step)

    const labels = document.createElement('div')
    labels.classList.add('slider__labels', `slider__labels--${orientation}`)
    labels.setAttribute('data-id', 'labels')

    items.forEach(item => labels.insertAdjacentElement('beforeend', item))

    return labels
  }

  private getItems(
    orientation: Orientation,
    countOfLabels: number,
    max: number,
    min: number,
    step: number
  ): HTMLDivElement[] {

    const items = []

    /* TODO Проблема с количеством лейблов в том, что если я задаю количество лейблов
        больше нужного количества шагов, то они не появляются */

    for (let i = 0; i < countOfLabels; i++) {
      const countOfSteps = (max - min) / step
      const stepsForLabel = Math.round((countOfSteps / (countOfLabels - 1)) * i)
      const positionInNumber = (stepsForLabel * step) + min
      const correctPositionInNumber = positionInNumber > max ? max : positionInNumber
      const positionInPercent = Number(convertStateValueToPercent(this.state, correctPositionInNumber).toFixed(3))
      const item = this.createLabel(orientation, correctPositionInNumber, positionInPercent)
      items.push(item)
    }

    return items
  }

  private createLabel(
    orientation: Orientation,
    positionInNumber: number,
    positionInPercent: number
  ): HTMLDivElement {

    const direction = orientation === 'vertical' ? 'bottom' : 'left'
    const label = document.createElement('div')
    label.classList.add('slider__labels-item')
    label.setAttribute('data-value', `${positionInPercent}`)
    label.style[direction] = `${positionInPercent}%`
    label.innerHTML = `${positionInNumber}`

    return label
  }

  private handleLabelsPointerDown(event: PointerEvent): void {
    const { target } = event
    if (target instanceof HTMLElement) {
      const targetValuePercent = Number(target.dataset.value)
      this.emit(LabelsEvents.LABEL_VALUE_CHANGED, targetValuePercent)
    }
  }
}

export default Labels
