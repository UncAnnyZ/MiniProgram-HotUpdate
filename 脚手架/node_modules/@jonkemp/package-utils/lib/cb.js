const identity = require('./identity');

const isFunction = require('./is-function');

const optimizeCb = require('./optimize-cb');

const isObject = require('./is-object');

const matcher = require('./matcher');

const property = require('./property');

const baseIteratee = (value, context, argCount) => {
	if (value == null) return identity;
	if (isFunction(value)) return optimizeCb(value, context, argCount);
	if (isObject(value) && !Array.isArray(value)) return matcher(value);

	return property(value);
};

let iteratee;

const exportIteratee = iteratee = (value, context) => baseIteratee(value, context, Infinity);

module.exports = (value, context, argCount) => {
	if (iteratee !== exportIteratee) return iteratee(value, context);

	return baseIteratee(value, context, argCount);
};
