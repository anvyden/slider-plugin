import {ISettings, Option, OptionFromKnobValues} from "../interfaces/interfaces";

/* TODO
    Надо сделать проверку на типы, поскольку в emit я буду передавать не только state,
    а может и одно значение. Мои типы оказались неправильными.
*/
type ChangesType<T> = { [key: string]: T }

abstract class Observer {
  private observers: { [key: string]: Function[] } = {}

  public subscribe(event: string, callback: Function): void {
    const eventObservers: Function[] = this.observers[event] || []
    this.observers[event] = [...eventObservers, callback]
  }

  public emit(event: string, changes: ISettings | number | OptionFromKnobValues): void {
    this.observers[event]?.forEach((observer) => observer(changes))
  }
}

export default Observer
