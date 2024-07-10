# Option Type for TypeScript

Welcome to the **Option Type** project! This project provides an implementation of the `Option` type inspired by Rust's `Option` type. The `Option` type is a powerful way to handle values that may or may not be present, offering a safer and more expressive alternative to `null` or `undefined`.

Why? Because `null` and `undefined` are error-prone and can lead to runtime errors. By using the `Option` type, you can make your code more robust and avoid common pitfalls related to `null` and `undefined`, on top of that it's a great way to handle optional values in a functional programming style.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
  - [Creating Options](#creating-options)
  - [Checking Option Status](#checking-option-status)
  - [Unwrapping Values](#unwrapping-values)
  - [Mapping and Matching](#mapping-and-matching)
  - [Combining Options](#combining-options)
- [Testing](#testing)
- [License](#license)

## Installation

To use this `Option` type in your TypeScript project, you can directly include the `Option` class file in your project or install it via npm if it's available.

## Usage

### Creating Options

There are two main ways to create an `Option`:

1. `Some(value)`: Creates an `Option` containing a value.
2. `None()`: Creates an `Option` that represents no value.

```typescript
import { Option } from './option';

// Creating a Some Option
const someValue = Option.Some(42);

// Creating a None Option
const noneValue = Option.None<number>();

console.log(someValue); // Some(42)

console.log(noneValue); // None
```

### Checking Option Status

You can check if an `Option` is a `Some` or a `None` using the `isSome` and `isNone` methods.

```typescript
import { Option } from './option';

const someValue = Option.Some(42);
const noneValue = Option.None<number>();

console.log(someValue.isSome()); // true
console.log(someValue.isNone()); // false

console.log(noneValue.isSome()); // false
console.log(noneValue.isNone()); // true
```

### Unwrapping Values

You can unwrap the value of a `Some` using the `unwrap` method. If you try to unwrap a `None`, an error will be thrown.

```typescript
import { Option } from './option';

const someValue = Option.Some(42);
const noneValue = Option.None<number>();

console.log(someValue.unwrap()); // 42

try {
  noneValue.unwrap();
} catch (error) {
  console.error(error.message); // Cannot unwrap a None value
}
```

### Mapping and Matching

You can map over the value of an `Option` using the `map` method. You can also match an `Option` using the `match` method.

```typescript
import { Option } from './option';

const someValue = Option.Some(42);
const noneValue = Option.None<number>();

const mappedValue = someValue.map((value) => value * 2);
console.log(mappedValue); // Some(84)

const result = noneValue.map((value) => value * 2);
console.log(result); // None

const matchedValue = someValue.match({
  Some: (value) => value * 2,
  None: () => 0,
});
console.log(matchedValue); // 84

const matchedResult = noneValue.match({
  Some: (value) => value * 2,
  None: () => 0,
});
console.log(matchedResult); // 0
```

### Combining Options

You can combine two `Option` values using the `and` and `or` methods.

```typescript
import { Option } from './option';

const someValue = Option.Some(42);
const noneValue = Option.None<number>();

const otherValue = Option.Some(10);

const andResult = someValue.and(otherValue);

console.log(andResult); // Some(10)

const orResult = noneValue.or(otherValue);

console.log(orResult); // Some(10)
```

## Testing

To run the tests for this project, you can use the following command:

```bash
npm test
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

This project was inspired by Rust's `Option` type and the [Rust documentation](https://doc.rust-lang.org/std/option/enum.Option.html).

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request if you have any suggestions or improvements.
