import {ISettings, Orientation} from "../../../interfaces/interfaces";
import {convertPercentValueToNumber} from "../../../../utils/utils";
import './Labels.scss'

class Labels {
  private state: ISettings
  private labels!: HTMLDivElement[]

  constructor(state: ISettings) {
    this.state = state
    this.init()
  }

  public getLabels(): HTMLDivElement[] {
    return this.labels
  }

  public update(): HTMLDivElement[] {
    return this.labels
  }

  private init(): void {
    const { orientation } = this.state
    const labelsOrientation = orientation === 'vertical' ? 'bottom' : 'left'
    this.labels = this.createLabels(orientation, labelsOrientation)
  }

  private createLabels(orientation: Orientation, direction: string): HTMLDivElement[] {
    const labels = []
    const countOfLabels = 5
    for (let i = 0; i < countOfLabels; i++) {
      const positionInPercent = (i / (countOfLabels - 1)) * 100
      const positionInNumber = convertPercentValueToNumber(this.state, positionInPercent)

      const label = document.createElement('div')
      label.classList.add('slider__labels', `slider__labels--${orientation}`)
      label.innerHTML = `${positionInNumber}`
      label.style[direction] = `${positionInPercent}%`

      labels.push(label)
    }

    return labels
  }
}

export default Labels
