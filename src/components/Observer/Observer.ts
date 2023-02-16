type Callback<T> = (args: T) => void;

type Observers<T> = {
  [K in keyof T]: Callback<T[K]>[];
};

abstract class Observer<T extends Record<string, unknown>> {
  private observers: Observers<T> = {} as Observers<T>;

  public subscribe<K extends keyof T>(
    event: K,
    callback: Callback<T[K]>
  ): void {
    const eventObservers = this.observers[event] || [];
    this.observers[event] = [...eventObservers, callback];
  }

  public emit<K extends keyof T>(event: K, value: T[K]): void {
    this.observers[event]?.forEach((observer) => observer(value));
  }
}

export default Observer;
