# pick-util ![Build Status](https://github.com/jonkemp/pick-util/actions/workflows/main.yml/badge.svg?branch=master)

> Return a copy of the object only containing the whitelisted properties. Alternatively accepts a predicate indicating which keys to pick.

Inspired by `_.pick`. 😄


## Install

Install with [npm](https://npmjs.org/package/pick-util)

```
$ npm install pick-util
```

Or [unpkg](https://unpkg.com/pick-util/)

```
<script src="https://unpkg.com/pick-util@1.1.2/umd/index.js" />
```

Check out the unit tests on [CodePen](https://codepen.io/jonkemp/full/OJVXabQ).

## Usage

```js
const pick = require('pick-util');

pick({ 'a': 1, 'b': '2', 'c': 3 }, ['a', 'c']);
//=> { 'a': 1, 'c': 3 }

pick({ name: 'moe', age: 50, userid: 'moe1' }, 'name', 'age');
//=> { name: 'moe', age: 50 }

const isNumber = obj => toString.call(obj) === '[object Number]';

pick({ name: 'moe', age: 50, userid: 'moe1' }, (value) => isNumber(value));
//=> { age: 50 }
```

---
| **Like us a lot?** Help others know why you like us! **Review this package on [pkgreview.dev](https://pkgreview.dev/npm/pick-util)** | ➡   | [![Review us on pkgreview.dev](https://i.ibb.co/McjVMfb/pkgreview-dev.jpg)](https://pkgreview.dev/npm/pick-util) |
| ----------------------------------------------------------------------------------------------------------------------------------------- | --- | --------------------------------------------------------------------------------------------------------------------- |

## API

### pick(object, *keys)

#### object

Type: `object`  
Default: `none`

The object to filter.

#### keys

Type: `array` or comma separated list of `string` values or `function`  
Default: `none`

Keys for the picked properties. Or a predicate indicating which keys to pick. 

## License

MIT
