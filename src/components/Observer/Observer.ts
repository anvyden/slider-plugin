import { ISettings, OptionFromThumbValues } from '../interfaces/interfaces';

abstract class Observer {
  private observers: { [key: string]: Function[] } = {};

  public subscribe(event: string, callback: Function): void {
    const eventObservers: Function[] = this.observers[event] || [];
    this.observers[event] = [...eventObservers, callback];
  }

  public emit(
    event: string,
    value: ISettings | number | OptionFromThumbValues
  ): void {
    this.observers[event]?.forEach((observer) => observer(value));
  }
}

export default Observer;
