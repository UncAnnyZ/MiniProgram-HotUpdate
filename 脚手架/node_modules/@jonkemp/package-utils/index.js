const {
	getLength,
	isFunction,
	isObject,
	identity,
	property,
	matcher,
	optimizeCb,
	cb,
	forEach,
	map,
	flatten
} = require('./lib');

const isNumber = obj => toString.call(obj) === '[object Number]';

const isUndefined = obj => obj === void 0;

const constant = value => () => value;

const keyInObj = (value, key, obj) => key in obj;

const allKeys = obj => {
	if (!isObject(obj)) return [];
	const keys = [];

	for (const key in obj) keys.push(key);

	return keys;
};

module.exports = {
	getLength,
	optimizeCb,
	isFunction,
	isNumber,
	isUndefined,
	property,
	matcher,
	identity,
	constant,
	keyInObj,
	allKeys,
	cb,
	forEach,
	map,
	flatten
};
