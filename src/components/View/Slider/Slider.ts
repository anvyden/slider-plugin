import Scale from "../subView/Scale/Scale";
import {ISettings, Orientation} from "../../interfaces/interfaces";
import { changeFirstCharToLower } from "../../../utils/utils";
import Knob from "../subView/Knob/Knob";
import './Slider.scss'
import Fill from "../subView/Fill/Fill";

class Slider {
  protected readonly settings: ISettings
  private root: HTMLElement
  private scale!: HTMLDivElement
  private components!: Object

  constructor(settings: ISettings, root: HTMLElement) {
    this.root = root
    this.settings = settings
    this.init()
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

  private createComponents(): object {
    const components = {}
    const elementsSlider = [Scale, Knob, Fill]
    elementsSlider.forEach(Element => {
      const element: object = new Element(this.settings)
      const elementName: string = changeFirstCharToLower(element.constructor.name)
      components[elementName] = element
    })

    return components
  }

  private addElementsInScale() {
    const knob: HTMLDivElement = this.components['knob'].getKnob()
    const fill: HTMLDivElement = this.components['fill'].getFill()
    this.scale.insertAdjacentElement("beforeend", fill)
    this.scale.insertAdjacentElement("beforeend", knob)
  }

  private createSlider(orientation: Orientation): HTMLDivElement {
    const slider = document.createElement('div')
    slider.classList.add('js-slider', 'slider', `slider__${orientation}`)

    return slider
  }
}

export default Slider
