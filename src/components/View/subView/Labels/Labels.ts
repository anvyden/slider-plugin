import {ISettings, Orientation} from "../../../interfaces/interfaces";
import {convertStateValueToPercent} from "../../../../utils/utils";
import './Labels.scss'
import Observer from "../../../Observer/Observer";
import {LabelsEvents} from "../../../events/events";

class Labels extends Observer {
  private state: ISettings
  private labels!: HTMLDivElement[]

  constructor(state: ISettings) {
    super()
    this.state = state
    this.init()
  }

  public getLabels(): HTMLDivElement[] {
    return this.labels
  }

  private init(): void {
    const { orientation } = this.state
    const labelsOrientation = orientation === 'vertical' ? 'bottom' : 'left'
    this.labels = this.createLabels(orientation, labelsOrientation)
    this.labels.forEach(label => label.addEventListener('pointerdown', this.handleLabelsPointerDown.bind(this)))
  }

  private createLabels(orientation: Orientation, direction: string): HTMLDivElement[] {
    const { max, min, step } = this.state
    const labels = []
    const countOfLabels = 5

    for (let i = 0; i < countOfLabels; i++) {
      const countOfSteps = (max - min) / step
      const stepsForLabel = Math.round((countOfSteps / (countOfLabels - 1)) * i)
      const positionInNumber = (stepsForLabel * step) + min
      const positionInPercent = convertStateValueToPercent(this.state, positionInNumber)

      const label = document.createElement('div')
      label.classList.add('slider__labels', `slider__labels--${orientation}`)
      label.setAttribute('data-value', `${positionInPercent}`)
      label.style[direction] = `${positionInPercent}%`
      label.innerHTML = `${positionInNumber}`

      labels.push(label)
    }

    return labels
  }

  private handleLabelsPointerDown(event: PointerEvent): void {
    const { target } = event
    if (target instanceof HTMLElement) {
      const targetValue = Number(target.dataset.value)
      this.emit(LabelsEvents.LABEL_CLICK, targetValue)
    }
  }
}

export default Labels
