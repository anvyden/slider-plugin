import {ISettings} from "../interfaces/interfaces";

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
    // console.log(this.observers)
  }

  // public unsubscribe(event: string): void {
  //   this.observers[event].length = 0
  // }

  public emit(event: string, changes: ISettings | number): void {
    this.observers[event]?.forEach((observer) => observer(changes))
    console.log(this.observers[event])
  }
}

export default Observer
