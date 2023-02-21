interface Option<T> {
  unwrap(): NonNullable<T>;
  expect(_err: Error): NonNullable<T>;
}

export default class Some<T> implements Option<T> {
  private value: NonNullable<T>;

  static wrapNull<T>(value: T): Option<T> {
    if (value == null) {
      return new None<T>();
    }

    return new Some<NonNullable<T>>(value);
  }

  constructor(v: NonNullable<T>) {
    this.value = v;
  }

  unwrap(): NonNullable<T> {
    return this.value;
  }

  expect(_err: Error): NonNullable<T> {
    return this.value;
  }
}

class None<T> implements Option<T> {
  unwrap(): NonNullable<T> {
    console.error('None.unwrap()');

    throw new Error('None.get');
  }

  expect(err: Error): NonNullable<T> {
    throw err;
  }
}
