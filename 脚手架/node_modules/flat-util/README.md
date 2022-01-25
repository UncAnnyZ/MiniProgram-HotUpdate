# flat-util ![Build Status](https://github.com/jonkemp/flat-util/actions/workflows/main.yml/badge.svg?branch=master)

> Flatten a nested array.

The nesting can be to any depth. If you pass shallow, the array will only be flattened one level. 

## Features

- Small utility to flatten nested arrays.
- Free of TypeScript. 😄


## Install

Install with [npm](https://npmjs.org/package/flat-util)

```
$ npm install flat-util
```

Or [unpkg](https://unpkg.com/flat-util/)

```
<script src="https://unpkg.com/flat-util@1.1.5/umd/index.js" />
```

Check out the unit tests on [CodePen](https://codepen.io/jonkemp/full/YzPBmwz).

## Usage

```js
const flatten = require('flat-util');

flatten([1, 2, [3, 4]]);
//=> [1, 2, 3, 4]

flatten([1, [2], [3, [[4]]]]);
//=> [1, 2, 3, 4];

flatten([1, [2], [3, [[4]]]], true);
//=> [1, 2, 3, [[4]]];
```

---
| **Like us a lot?** Help others know why you like us! **Review this package on [pkgreview.dev](https://pkgreview.dev/npm/flat-util)** | ➡   | [![Review us on pkgreview.dev](https://i.ibb.co/McjVMfb/pkgreview-dev.jpg)](https://pkgreview.dev/npm/flat-util) |
| ----------------------------------------------------------------------------------------------------------------------------------------- | --- | --------------------------------------------------------------------------------------------------------------------- |

## API

### flatten(input, shallow)

#### input

Type: `array`  
Default: `none`

The array to flatten.

#### shallow

Type: `boolean`  
Default: `false`

Whether or not to flatten the array only one level.

## License

MIT
