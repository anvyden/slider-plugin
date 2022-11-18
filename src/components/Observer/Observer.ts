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

// type observerEvent = { event: string, value: unknown }
// type callbackOption<T, K> = T extends { event: K } ? T : never
// type callbackFunction<T extends observerEvent, K> = (value: callbackOption<T, K>['value']) => void;

// abstract class Observer<T extends observerEvent> {
//   private observers: { [key in T['event']]?: callbackFunction<T, key>[] } = {};

//   public subscribe<K extends T['event']>(event: T['event'], callback: callbackFunction<T, K>): void {
//     const eventObservers: callbackFunction<T, K>[] = this.observers[event] || [];
//     this.observers[event] = [...eventObservers, callback];
//   }

//   public emit(
//     event: T['event'],
//     value: T['value']
//   ): void {
//     this.observers[event]?.forEach((observer) => observer(value));
//   }
// }

// export default Observer;
