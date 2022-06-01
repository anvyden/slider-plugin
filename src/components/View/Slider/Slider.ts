import { ISettings, Orientation, SliderComponents } from "../../interfaces/interfaces";
import Scale from "../subView/Scale/Scale";
import Thumb from "../subView/Thumb/Thumb";
import ProgressBar from "../subView/ProgressBar/ProgressBar";
import Labels from "../subView/Labels/Labels";
import Tooltip from "../subView/Tooltip/Tooltip";
import './slider.scss'

class Slider {
  protected readonly state: ISettings
  protected readonly root: HTMLElement
  private scale!: HTMLDivElement
  private components!: SliderComponents

  constructor(state: ISettings, root: HTMLElement) {
    this.root = root
    this.state = state
    this.init()
  }

  public getComponents(): SliderComponents {
    return this.components
  }

  private init(): void {
    const { orientation } = this.state
    const slider = this.createSlider(orientation)

    this.components = this.createComponents()

    this.scale = this.components['scale'].getScale()
    slider.insertAdjacentElement('beforeend', this.scale)
    this.addElementsInScale()
    this.root.insertAdjacentElement('beforeend', slider)
  }

  private createComponents(): SliderComponents {
    const { isRange } = this.state

    let components: SliderComponents = {
      scale: new Scale(this.state, this.root),
      thumb: new Thumb(this.state, this.root),
      progressBar: new ProgressBar(this.state),
      labels: new Labels(this.state),
      tooltip: new Tooltip(this.state),
    }

    if (isRange) {
      components = {
        ...components,
        thumbSecond: new Thumb(this.state, this.root, 'thumb-second')
      }
    }

    return components
  }

  private addElementsInScale() {
    const {hasProgressBar, labels: { addLabels } } = this.state

    const thumb = this.components['thumb'].getThumb()
    const progressBar = this.components['progressBar'].getProgressBar()
    const labels = this.components['labels'].getLabels()

    this.scale.insertAdjacentElement("afterbegin", thumb)

    if (this.components.thumbSecond) {
      const thumbSecond = this.components['thumbSecond'].getThumb()
      this.scale.insertAdjacentElement('beforeend', thumbSecond)
    }

    if (hasProgressBar) this.scale.insertAdjacentElement("afterbegin", progressBar)
    if (addLabels) this.scale.insertAdjacentElement('beforeend', labels)
  }

  private createSlider(orientation: Orientation): HTMLDivElement {
    const slider = document.createElement('div')
    slider.classList.add('js-slider', 'slider', `slider--${orientation}`)

    return slider
  }
}

export default Slider
