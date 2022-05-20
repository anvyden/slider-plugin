import Scale from "../subView/Scale/Scale";
import {ISettings, Orientation, SliderComponents} from "../../interfaces/interfaces";
import { changeFirstCharToLower } from "../../../utils/utils";
import Knob from "../subView/Knob/Knob";
import './Slider.scss'
import Fill from "../subView/Fill/Fill";
import Labels from "../subView/Labels/Labels";

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

  public getComponents(): object {
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
    const elementsSlider = [Scale, Knob, Fill, Labels]
    elementsSlider.forEach(Element => {
      const element: object = new Element(this.settings)
      const elementName: string = changeFirstCharToLower(element.constructor.name)
      components[elementName] = element
    })

    if (isRange) components = { ...components, ...{ knobSecond: new Knob(this.settings, 'knob-second') } }
    return <SliderComponents>components
  }

  private addElementsInScale() {
    const { isRange } = this.settings
    const knob: HTMLDivElement = this.components['knob'].getKnob()
    const fill: HTMLDivElement = this.components['fill'].getFill()
    const labels: HTMLDivElement = this.components['labels'].getLabels()
    this.scale.insertAdjacentElement("beforeend", fill)
    this.scale.insertAdjacentElement("beforeend", knob)

    if (isRange) {
      const knobSecond: HTMLDivElement = this.components['knobSecond'].getKnob()
      this.scale.insertAdjacentElement('beforeend', knobSecond)
    }

    this.scale.insertAdjacentElement('beforeend', labels)

  }

  private createSlider(orientation: Orientation): HTMLDivElement {
    const slider = document.createElement('div')
    slider.classList.add('js-slider', 'slider', `slider__${orientation}`)

    return slider
  }
}

export default Slider
