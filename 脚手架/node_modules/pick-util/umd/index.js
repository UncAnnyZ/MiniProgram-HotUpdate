(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.pick = factory());
})(this, (function () { 'use strict';

	var shallowProperty$3 = key => obj => obj == null ? void 0 : obj[key];

	const shallowProperty$2 = shallowProperty$3;

	var getLength$3 = shallowProperty$2('length');

	const getLength$2 = getLength$3;

	var isArrayLike$4 = (collection) => {
		const length = getLength$2(collection);

		return typeof length == 'number' && length >= 0 && length <= Number.MAX_SAFE_INTEGER;
	};

	var isFunction$4 = obj => toString.call(obj) === '[object Function]';

	var isObject$4 = obj => {
		const type = typeof obj;

		return type === 'function' || type === 'object' && !!obj;
	};

	var isArguments$2 = obj => toString.call(obj) === '[object Arguments]';

	var identity$3 = value => value;

	const isObject$3 = isObject$4;

	var getKeys$4 = (obj) => {
		if (!isObject$3(obj)) return [];

		return Object.keys(obj);
	};

	const shallowProperty$1 = shallowProperty$3;

	const deepGet = (obj, path) => {
		const { length } = path;

		for (let i = 0; i < length; i++) {
			if (obj == null) return void 0;
			obj = obj[path[i]];
		}

		return length ? obj : void 0;
	};

	var property$3 = path => {
		if (!Array.isArray(path)) {
			return shallowProperty$1(path);
		}

		return obj => deepGet(obj, path);
	};

	const getKeys$3 = getKeys$4;

	var isMatch$2 = (object, attrs) => {
		const keys = getKeys$3(attrs);
		const {length} = keys;

		if (object == null) return !length;
		const obj = Object(object);

		for (let i = 0; i < length; i++) {
			const key = keys[i];

			if (attrs[key] !== obj[key] || !(key in obj)) return false;
		}

		return true;
	};

	const isMatch$1 = isMatch$2;

	var matcher$3 = attrs => {
		attrs = Object.assign({}, attrs);

		return obj => isMatch$1(obj, attrs);
	};

	var optimizeCb$5 = (func, context, argCount) => {
		if (context === void 0) return func;
		switch (argCount == null ? 3 : argCount) {
			case 1: return value => func.call(context, value);
				// The 2-argument case is omitted because we’re not using it.
			case 3: return (value, index, collection) => func.call(context, value, index, collection);
			case 4: return (accumulator, value, index, collection) => func.call(context, accumulator, value, index, collection);
		}

		return (...args) => func.apply(context, args);
	};

	const identity$2 = identity$3;

	const isFunction$3 = isFunction$4;

	const optimizeCb$4 = optimizeCb$5;

	const isObject$2 = isObject$4;

	const matcher$2 = matcher$3;

	const property$2 = property$3;

	const baseIteratee = (value, context, argCount) => {
		if (value == null) return identity$2;
		if (isFunction$3(value)) return optimizeCb$4(value, context, argCount);
		if (isObject$2(value) && !Array.isArray(value)) return matcher$2(value);

		return property$2(value);
	};

	let iteratee;

	const exportIteratee = iteratee = (value, context) => baseIteratee(value, context, Infinity);

	var cb$3 = (value, context, argCount) => {
		if (iteratee !== exportIteratee) return iteratee(value, context);

		return baseIteratee(value, context, argCount);
	};

	const getKeys$2 = getKeys$4;
	const isArrayLike$3 = isArrayLike$4;
	const optimizeCb$3 = optimizeCb$5;

	var forEach$3 = (obj, iteratee, context) => {
		iteratee = optimizeCb$3(iteratee, context);
		if (isArrayLike$3(obj)) {
			let i = 0;

			for (const item of obj) {
				iteratee(item, i++, obj);
			}
		} else {
			const keys = getKeys$2(obj);

			for (const key of keys) {
				iteratee(obj[key], key, obj);
			}
		}

		return obj;
	};

	const isArrayLike$2 = isArrayLike$4;
	const isArguments$1 = isArguments$2;
	const forEach$2 = forEach$3;
	const flatten$3 = (input, shallow, strict, output = []) => {
		let idx = output.length;

		forEach$2(input, value => {
			if (isArrayLike$2(value) && (Array.isArray(value) || isArguments$1(value))) {
				if (shallow) {
					let j = 0;
					const len = value.length;

					while (j < len) output[idx++] = value[j++];
				} else {
					flatten$3(value, shallow, strict, output);
					idx = output.length;
				}
			} else if (!strict) {
				output[idx++] = value;
			}
		});

		return output;
	};

	var flatten_1 = (array, shallow) => flatten$3(array, shallow, false);

	const getKeys$1 = getKeys$4;
	const isArrayLike$1 = isArrayLike$4;
	const cb$2 = cb$3;

	var map$2 = (obj, iteratee, context) => {
		iteratee = cb$2(iteratee, context);
		const keys = !isArrayLike$1(obj) && getKeys$1(obj);
		const { length } = keys || obj;
		const results = Array(length);

		for (let index = 0; index < length; index++) {
			const currentKey = keys ? keys[index] : index;

			results[index] = iteratee(obj[currentKey], currentKey, obj);
		}

		return results;
	};

	const shallowProperty = shallowProperty$3;

	const getLength$1 = getLength$3;

	const isArrayLike = isArrayLike$4;

	const isFunction$2 = isFunction$4;

	const isObject$1 = isObject$4;

	const isArguments = isArguments$2;

	const identity$1 = identity$3;

	const getKeys = getKeys$4;

	const property$1 = property$3;

	const matcher$1 = matcher$3;

	const isMatch = isMatch$2;

	const optimizeCb$2 = optimizeCb$5;

	const cb$1 = cb$3;

	const forEach$1 = forEach$3;

	const flatten$2 = flatten_1;

	const map$1 = map$2;

	var lib = {
		shallowProperty,
		getLength: getLength$1,
		isArrayLike,
		isFunction: isFunction$2,
		isObject: isObject$1,
		isArguments,
		identity: identity$1,
		getKeys,
		property: property$1,
		matcher: matcher$1,
		isMatch,
		optimizeCb: optimizeCb$2,
		cb: cb$1,
		forEach: forEach$1,
		map: map$1,
		flatten: flatten$2
	};

	const {
		getLength,
		isFunction: isFunction$1,
		isObject,
		identity,
		property,
		matcher,
		optimizeCb: optimizeCb$1,
		cb,
		forEach,
		map,
		flatten: flatten$1
	} = lib;

	const isNumber = obj => toString.call(obj) === '[object Number]';

	const isUndefined = obj => obj === void 0;

	const constant = value => () => value;

	const keyInObj$1 = (value, key, obj) => key in obj;

	const allKeys$1 = obj => {
		if (!isObject(obj)) return [];
		const keys = [];

		for (const key in obj) keys.push(key);

		return keys;
	};

	var packageUtils = {
		getLength,
		optimizeCb: optimizeCb$1,
		isFunction: isFunction$1,
		isNumber,
		isUndefined,
		property,
		matcher,
		identity,
		constant,
		keyInObj: keyInObj$1,
		allKeys: allKeys$1,
		cb,
		forEach,
		map,
		flatten: flatten$1
	};

	const {
		keyInObj,
		allKeys,
		optimizeCb,
		isFunction,
		flatten
	} = packageUtils;

	var pickUtil = (obj, ...keys) => {
		const result = {};
		let [iteratee] = keys;

		if (!obj) {
			return result;
		}

		if (isFunction(iteratee)) {
			if (keys.length > 1) iteratee = optimizeCb(iteratee, keys[1]);
			keys = allKeys(obj);
		} else {
			iteratee = keyInObj;
			keys = flatten(keys);
			obj = Object(obj);
		}

		keys.forEach(key => {
			const value = obj[key];

			if (iteratee(value, key, obj)) {
				result[key] = value;
			}
		});

		return result;
	};

	return pickUtil;

}));
