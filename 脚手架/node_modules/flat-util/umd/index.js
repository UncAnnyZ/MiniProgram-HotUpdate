(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.flatten = factory());
})(this, (function () { 'use strict';

	var shallowProperty = key => obj => obj == null ? void 0 : obj[key];

	var getLength = shallowProperty('length');

	var isArrayLike = (collection) => {
		const length = getLength(collection);

		return typeof length == 'number' && length >= 0 && length <= Number.MAX_SAFE_INTEGER;
	};

	var isArguments = obj => toString.call(obj) === '[object Arguments]';

	var isObject = obj => {
		const type = typeof obj;

		return type === 'function' || type === 'object' && !!obj;
	};

	var getKeys = (obj) => {
		if (!isObject(obj)) return [];

		return Object.keys(obj);
	};

	var optimizeCb = (func, context, argCount) => {
		if (context === void 0) return func;
		switch (argCount == null ? 3 : argCount) {
			case 1: return value => func.call(context, value);
				// The 2-argument case is omitted because we’re not using it.
			case 3: return (value, index, collection) => func.call(context, value, index, collection);
			case 4: return (accumulator, value, index, collection) => func.call(context, accumulator, value, index, collection);
		}

		return (...args) => func.apply(context, args);
	};

	var forEach = (obj, iteratee, context) => {
		iteratee = optimizeCb(iteratee, context);
		if (isArrayLike(obj)) {
			let i = 0;

			for (const item of obj) {
				iteratee(item, i++, obj);
			}
		} else {
			const keys = getKeys(obj);

			for (const key of keys) {
				iteratee(obj[key], key, obj);
			}
		}

		return obj;
	};

	const flatten = (input, shallow, strict, output = []) => {
		let idx = output.length;

		forEach(input, value => {
			if (isArrayLike(value) && (Array.isArray(value) || isArguments(value))) {
				if (shallow) {
					let j = 0;
					const len = value.length;

					while (j < len) output[idx++] = value[j++];
				} else {
					flatten(value, shallow, strict, output);
					idx = output.length;
				}
			} else if (!strict) {
				output[idx++] = value;
			}
		});

		return output;
	};

	var flatten_1 = (array, shallow) => flatten(array, shallow, false);

	var flatUtil = flatten_1;

	return flatUtil;

}));
