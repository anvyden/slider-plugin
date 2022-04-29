type ChangesType<T> = { [key: string]: T }

class Observer {
  private observers: { [key: string]: Function[] } = {}

  public subscribe(event: string, fn: Function): void {
    const eventObservers: Function[] = this.observers[event] || []
    this.observers[event] = [...eventObservers, fn]
  }

  public unsubscribe(event: string): void {
    this.observers[event].length = 0
  }

  public emit<T>(changes: ChangesType<T>, event: string): void {
    this.observers[event].forEach((observer) => observer(changes))
  }
}

