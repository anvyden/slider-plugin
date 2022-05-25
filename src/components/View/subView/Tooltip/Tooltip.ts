import {ISettings} from "../../../interfaces/interfaces";


class Tooltip {
  protected readonly state: ISettings

  constructor(state: ISettings) {
    this.state = state
  }

}

export default Tooltip
