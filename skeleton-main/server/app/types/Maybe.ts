interface Option<T> {
  unwrap(): T;
  expect(err: string | Error): T;
  isSome(): boolean;
  map<U>(f: (a: T) => U): Option<U>;
}

export default class Maybe {
  private constructor() {}

  static wrap<T>(value: T): Option<NonNullable<T>> {
    if (value == null) {
      return new None<NonNullable<T>>();
    }

    return new Some<NonNullable<T>>(value);
  }
}

class Some<T> implements Option<T> {
  private value: T;

  constructor(v: T) {
    this.value = v;
  }

  unwrap(): T {
    return this.value;
  }

  expect(_err: string | Error): T {
    return this.value;
  }

  isSome(): boolean {
    return true;
  }

  map<U>(f: (a: T) => U): Option<U> {
    return new Some(f(this.value));
  }
}

class None<T> implements Option<T> {
  unwrap(): T {
    const error = new Error('None.unwrap()');
    error.name = 'MaybeError';

    throw error;
  }

  expect(err: string | Error): T {
    if (err instanceof Error) {
      throw err;
    }

    const newError = new Error(err);
    newError.name = 'MaybeError';

    throw newError;
  }

  isSome(): boolean {
    return false;
  }

  map<U>(_f: (a: T) => U): Option<U> {
    return new None<U>();
  }
}