type ChangesType<T> = { [key: string]: T }

abstract class Observer {
  private observers: { [key: string]: Function[] } = {}

  public subscribe(event: string, callback: Function): void {
    const eventObservers: Function[] = this.observers[event] || []
    this.observers[event] = [...eventObservers, callback]
  }

  // public unsubscribe(event: string): void {
  //   this.observers[event].length = 0
  // }

  public emit<T>(event: string, changes: ChangesType<T>): void {
    this.observers[event].forEach((observer) => observer(changes))
  }
}

export default Observer
