import { ISettings, Orientation, SliderComponents } from "../../interfaces/interfaces";
import { changeFirstCharToLower } from "../../../utils/utils";
import Scale from "../subView/Scale/Scale";
import Thumb from "../subView/Thumb/Thumb";
import ProgressBar from "../subView/ProgressBar/ProgressBar";
import Labels from "../subView/Labels/Labels";
import Tooltip from "../subView/Tooltip/Tooltip";
import './slider.scss'

class Slider {
  protected readonly state: ISettings
  private root: HTMLElement
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
    let components = {}
    const elementsSlider = [Scale, Thumb, ProgressBar, Labels, Tooltip]

    elementsSlider.forEach(Element => {
      const element = new Element(this.state)
      const elementName: string = changeFirstCharToLower(element.constructor.name)
      components[elementName] = element
    })
    //TODO можно все элементе инициализировать, но не вставлять. Так можно избежать
    // многих проверок на isRange например, но тогда будут работать методы update
    // и другие, когда эти элементы не нужны.
    if (isRange) {
      components = {
        ...components,
        thumbSecond: new Thumb(this.state, 'thumb-second')
      }
    }

    return <SliderComponents>components
  }

  private addElementsInScale() {
    const { isRange, hasProgressBar, hasLabels } = this.state

    const thumb = this.components['thumb'].getThumb()
    const progressBar = this.components['progressBar'].getProgressBar()
    const labels = this.components['labels'].getLabels()

    this.scale.insertAdjacentElement("beforeend", thumb)

    if (isRange) {
      const thumbSecond = this.components['thumbSecond'].getThumb()
      this.scale.insertAdjacentElement('beforeend', thumbSecond)
    }

    if (hasProgressBar) this.scale.insertAdjacentElement("afterbegin", progressBar)
    if (hasLabels) this.scale.insertAdjacentElement('beforeend', labels)
  }

  private createSlider(orientation: Orientation): HTMLDivElement {
    const slider = document.createElement('div')
    slider.classList.add('js-slider', 'slider', `slider--${orientation}`)

    return slider
  }
}

export default Slider
