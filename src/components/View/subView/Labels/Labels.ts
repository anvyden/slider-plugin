import { ISettings, Orientation } from "../../../interfaces/interfaces";
import { convertPercentValueToNumber, convertStateValueToPercent } from "../../../../utils/utils";
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
    const { orientation, max, min, step, labels: { countOfLabels } } = this.state
    this.labels = this.createLabels(orientation, max, min, step, countOfLabels)
    this.labels.addEventListener('pointerdown', this.handleLabelsPointerDown.bind(this))
  }

  private createLabels(
    orientation: Orientation,
    max: number,
    min: number,
    step: number,
    countOfLabels: number
  ): HTMLDivElement {

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

    let items: HTMLDivElement[] = []
    const labelsValues: number[] = []

    const minLabel = this.createLabel(orientation, min, 0)
    const maxLabel = this.createLabel(orientation, max, 100)

    for (let i = 0; i < countOfLabels - 2; i++) {
      const countOfSteps = (max - min) / step
      const stepsForLabel = Math.round((countOfSteps / (countOfLabels - 1)) * (i + 1))
      const positionInNumber = (stepsForLabel * step) + min
      const correctPositionInNumber = positionInNumber > max ? max : positionInNumber
      const positionInPercent = Number(convertStateValueToPercent(this.state, correctPositionInNumber).toFixed(3))

      if (!labelsValues.includes(positionInPercent)) labelsValues.push(positionInPercent)
    }

    labelsValues.forEach(value => {
      const positionInNumber = convertPercentValueToNumber(this.state, value)
      const item = this.createLabel(orientation, positionInNumber, value)
      items.push(item)
    })

    items = [minLabel, ...items, maxLabel]

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
