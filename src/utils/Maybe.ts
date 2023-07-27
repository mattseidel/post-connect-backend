// maybe.ts

class Maybe<T> {
  private value: T | null;
  private errorLog: string[];

  constructor(value: T | null, errorLog: string[] = []) {
    this.value = value;
    this.errorLog = errorLog;
  }

  static just<T>(value: T): Maybe<T> {
    return new Maybe(value);
  }

  static nothing<T>(): Maybe<T> {
    return new Maybe<T>(null);
  }

  hasValue(): boolean {
    return this.value !== null;
  }

  getOrElse(defaultValue: T): T {
    return this.value !== null ? this.value : defaultValue;
  }

  getValueOrThrow(): T {
    if (this.value !== null) {
      return this.value;
    }
    throw new Error("Value not present in Maybe");
  }

  catchError(error: string): Maybe<T> {
    if (this.value !== null) {
      return this;
    }
    return new Maybe<T>(null, [...this.errorLog, error]);
  }

  getErrorLog(): string[] {
    return this.errorLog;
  }
}

export default Maybe;
