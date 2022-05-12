import Observer from "../Observer/Observer";
import {ISettings} from "../interfaces/interfaces";
import Slider from "./Slider/Slider";

class View extends Observer {
  private root: HTMLElement
  private sliderComponents!: object

  constructor(state: ISettings, root: HTMLElement) {
    super()
    this.root = root
    this.init(state)
  }

  public init(state: ISettings): void {
    const slider = new Slider(state, this.root)

    this.sliderComponents = slider.getComponents()
  }

  public update(state: ISettings) {
    const sliderComponents = Object.values(this.sliderComponents)
    sliderComponents.forEach(component => component.update(state))
  }
}

export default View
