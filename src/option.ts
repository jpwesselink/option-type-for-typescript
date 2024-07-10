/**
 * Option type inspired by Rust's Option type
 * @see https://doc.rust-lang.org/std/option/enum.Option.html
 * @author JP Wesselink
 */
export class Option<T> {
  /**
   * Private constructor to prevent instantiation
   * @param value The value to wrap in an Option
   */
  private constructor(private value?: T) {}

  /**
   * Create a Some Option with a value
   *
   * @param value
   * @returns An Option containing the given value
   */
  static Some<T>(value: T): Option<T> {
    return new Option(value);
  }

  /**
   * Create a None Option
   *
   * @returns An Option that is None
   */
  static None<T>(): Option<T> {
    return new Option<T>(undefined);
  }

  /**
   * Check if the Option is Some
   *
   * @returns true if the Option is Some, false otherwise
   */
  isSome(): boolean {
    return this.value !== undefined;
  }

  /**
   * Check if the Option is None
   *
   * @returns true if the Option is None, false otherwise
   */
  isNone(): boolean {
    return this.value === undefined;
  }

  /**
   * Return the value of the Option, or throw an error if the Option is None
   *
   * @returns The value of the Option
   */

  unwrap(): T {
    if (this.isNone()) {
      throw new Error('Tried to unwrap an Option that is None');
    }
    return this.value as T;
  }

  /**
   * Return the value of the Option, or a default value if the Option is None
   *
   * @returns The value of the Option, or the default value if the Option is None
   */
  unwrapOr(defaultValue: T): T {
    return this.isSome() ? (this.value as T) : defaultValue;
  }

  /**
   * Return the value of the Option, or a default value from a function if the Option is None
   *
   * @param fn A function that returns a default value when called with no arguments
   * @returns The value of the Option, or the default value if the Option is None
   */
  unwrapOrElse(fn: () => T): T {
    return this.isSome() ? (this.value as T) : fn();
  }

  /**
   * Map the value of the Option to a new value
   *
   * @param fn A function that maps the value of the Option to a new value
   * @returns A new Option with the mapped value, or None if the Option is None
   */
  map<U>(fn: (value: T) => U): Option<U> {
    if (this.isSome()) {
      return Option.Some(fn(this.value as T));
    }
    return Option.None<U>();
  }

  /**
   * Return the Option if it is Some, or another Option if it is None
   *
   * @param fn A function that returns an Option when called with no arguments
   * @returns The Option if it is Some, or another Option if it is None
   */
  orElse(fn: () => Option<T>): Option<T> {
    return this.isSome() ? this : fn();
  }

  /**
   * Match the Option with a function for Some and a function for None
   *
   * @param someFn A function to call when the Option is Some
   * @param noneFn A function to call when the Option is None
   * @returns The result of the function that matches the Option
   */
  match<U>(someFn: (value: T) => U, noneFn: () => U): U {
    return this.isSome() ? someFn(this.value as T) : noneFn();
  }
}

// Vitest tests
if (import.meta.vitest) {
  const { describe, it, expect } = import.meta.vitest;

  describe('Option', () => {
    it('should create a Some with a value', () => {
      const someValue = Option.Some(42);
      expect(someValue.isSome()).toBe(true);
      expect(someValue.unwrap()).toBe(42);
    });

    it('should create a None', () => {
      const noneValue = Option.None<number>();
      expect(noneValue.isNone()).toBe(true);
    });

    it('should unwrapOr with a default value', () => {
      const noneValue = Option.None<number>();
      expect(noneValue.unwrapOr(0)).toBe(0);
    });

    it('should unwrapOrElse with a default function', () => {
      const noneValue = Option.None<number>();
      expect(noneValue.unwrapOrElse(() => 99)).toBe(99);
    });

    it('should map a Some value', () => {
      const someValue = Option.Some(42);
      const mappedValue = someValue.map((value) => value + 1);
      expect(mappedValue.isSome()).toBe(true);
      expect(mappedValue.unwrap()).toBe(43);
    });

    it('should not map a None value', () => {
      const noneValue = Option.None<number>();
      const mappedValue = noneValue.map((value) => value + 1);
      expect(mappedValue.isNone()).toBe(true);
    });

    it('should orElse with a Some value', () => {
      const someValue = Option.Some(42);
      const orElseValue = someValue.orElse(() => Option.Some(99));
      expect(orElseValue.isSome()).toBe(true);
      expect(orElseValue.unwrap()).toBe(42);
    });

    it('should orElse with a None value', () => {
      const noneValue = Option.None<number>();
      const orElseValue = noneValue.orElse(() => Option.Some(99));
      expect(orElseValue.isSome()).toBe(true);
      expect(orElseValue.unwrap()).toBe(99);
    });

    it('should throw error when unwrapping a None', () => {
      const noneValue = Option.None<number>();
      expect(() => noneValue.unwrap()).toThrow(
        'Tried to unwrap an Option that is None'
      );
    });

    it('should match', () => {
      const someValue = Option.Some(42);
      const noneValue = Option.None<number>();
      expect(
        someValue.match(
          (value) => value + 1,
          () => 0
        )
      ).toBe(43);
      expect(
        noneValue.match(
          (value) => value + 1,
          () => 0
        )
      ).toBe(0);
    });
  });
}
