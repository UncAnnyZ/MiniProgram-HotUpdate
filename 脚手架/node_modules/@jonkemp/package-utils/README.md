# package-utils [![Build Status](https://travis-ci.com/jonkemp/package-utils.svg?branch=master)](https://travis-ci.com/jonkemp/package-utils)

> Helper utility modules for collections, arrays, objects and more.

Inspired by `_`. 😄


## Install

Install with [npm](https://npmjs.org/package/@jonkemp/package-utils)

```
$ npm install @jonkemp/package-utils
```

## Usage

### forEach

Iterates over a list of elements, yielding each in turn to an iteratee function. The iteratee is bound to the context object, if one is passed. Each invocation of iteratee is called with three arguments: (element, index, list). If list is a JavaScript object, iteratee's arguments will be (value, key, list). Returns the list for chaining.

```js
forEach([1, 2, 3], alert);
//=> alerts each number in turn...

forEach({one: 1, two: 2, three: 3}, alert);
//=> alerts each number value in turn...
```

### map

Produces a new array of values by mapping each value in list through a transformation function (iteratee). The iteratee is passed three arguments: the value, then the index (or key) of the iteration, and finally a reference to the entire list.

```js
map([1, 2, 3], num => num * 3);
//=> [3, 6, 9]

map({one: 1, two: 2, three: 3}, (num, key) => num * 3);
//=> [3, 6, 9]

map([[1, 2], [3, 4]], first);
//=> [1, 3]
```

### flatten

Flattens a nested array (the nesting can be to any depth). If you pass shallow, the array will only be flattened a single level.

```js
flatten([1, [2], [3, [[4]]]]);
//=> [1, 2, 3, 4];

flatten([1, [2], [3, [[4]]]], true);
//=> [1, 2, 3, [[4]]];
```

### allKeys

Retrieve all the names of object's own and inherited properties.

```js
function Stooge(name) {
  this.name = name;
}
Stooge.prototype.silly = true;
allKeys(new Stooge("Moe"));
//=> ["name", "silly"]
```

### property

Returns a function that will return the specified property of any passed-in object. path may be specified as a simple key, or as an array of object keys or array indexes, for deep property fetching.

```js
const stooge = {name: 'moe'};
'moe' === property('name')(stooge);
//=> true

const stooges = {moe: {fears: {worst: 'Spiders'}}, curly: {fears: {worst: 'Moe'}}};
const curlysWorstFear = property(['curly', 'fears', 'worst']);
curlysWorstFear(stooges);
//=> 'Moe'
```

### matcher

Returns a predicate function that will tell you if a passed in object contains all of the key/value properties present in attrs.

```js
const ready = matcher({selected: true, visible: true});
const readyToGoList = filter(list, ready);
```

### isFunction

Returns true if object is a Function.

```js
isFunction(alert);
// => true
```

### isNumber

Returns true if object is a Number (including NaN).

```js
isNumber(8.4 * 5);
//=> true
```

### isUndefined

Returns true if value is undefined.

```js
isUndefined(window.missingVariable);
//=> true
```

### identity

Returns the same value that is used as the argument. In math: f(x) = x
This function looks useless, but is used throughout Underscore as a default iteratee.

```js
const stooge = { name: 'moe' };
stooge === identity(stooge);
//=> true
```

### constant

Creates a function that returns the same value that is used as the argument of constant.

```js
const stooge = { name: 'moe' };
stooge === constant(stooge)();
//=> true
```

---
| **Like us a lot?** Help others know why you like us! **Review this package on [pkgreview.dev](https://pkgreview.dev/npm/package-utils)** | ➡   | [![Review us on pkgreview.dev](https://i.ibb.co/McjVMfb/pkgreview-dev.jpg)](https://pkgreview.dev/npm/package-utils) |
| ----------------------------------------------------------------------------------------------------------------------------------------- | --- | --------------------------------------------------------------------------------------------------------------------- |

## License

MIT
