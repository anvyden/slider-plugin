import { ISettings, Orientation, SliderComponents } from "../../interfaces/interfaces";
import { changeFirstCharToLower } from "../../../utils/utils";
import Scale from "../subView/Scale/Scale";
import Knob from "../subView/Knob/Knob";
import Fill from "../subView/Fill/Fill";
import Labels from "../subView/Labels/Labels";
import Tooltip from "../subView/Tooltip/Tooltip";
import './slider.scss'

class Slider {
  protected readonly settings: ISettings
  private root: HTMLElement
  private scale!: HTMLDivElement
  private components!: SliderComponents

  constructor(settings: ISettings, root: HTMLElement) {
    this.root = root
    this.settings = settings
    this.init()
  }

  public getComponents(): SliderComponents {
    return this.components
  }

  private init(): void {
    const { orientation } = this.settings
    const slider = this.createSlider(orientation)

    this.components = this.createComponents()
    this.scale = this.components['scale'].getScale()

    slider.insertAdjacentElement('beforeend', this.scale)

    this.addElementsInScale()

    this.root.insertAdjacentElement('beforeend', slider)
  }

  private createComponents(): SliderComponents {
    const { isRange } = this.settings
    let components = {}
    const elementsSlider = [Scale, Knob, Fill, Labels, Tooltip]
    elementsSlider.forEach(Element => {
      const element: object = new Element(this.settings)
      const elementName: string = changeFirstCharToLower(element.constructor.name)
      components[elementName] = element
    })

    if (isRange) components = { ...components, ...{ knobSecond: new Knob(this.settings, 'knob-second') } }
    return <SliderComponents>components
  }

  private addElementsInScale() {
    const { isRange, hasFill, hasLabels } = this.settings

    const knob: HTMLDivElement = this.components['knob'].getKnob()
    const fill: HTMLDivElement = this.components['fill'].getFill()
    const labels: HTMLDivElement = this.components['labels'].getLabels()

    this.scale.insertAdjacentElement("beforeend", knob)

    if (isRange) {
      const knobSecond: HTMLDivElement = this.components['knobSecond'].getKnob()
      this.scale.insertAdjacentElement('beforeend', knobSecond)
    }

    if (hasFill) this.scale.insertAdjacentElement("afterbegin", fill)
    if (hasLabels) this.scale.insertAdjacentElement('beforeend', labels)

  }

  private createSlider(orientation: Orientation): HTMLDivElement {
    const slider = document.createElement('div')
    slider.classList.add('js-slider', 'slider', `slider--${orientation}`)

    return slider
  }
}

export default Slider
