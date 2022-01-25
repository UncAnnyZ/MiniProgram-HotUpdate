const {
	keyInObj,
	allKeys,
	optimizeCb,
	isFunction,
	flatten
} = require('@jonkemp/package-utils');

module.exports = (obj, ...keys) => {
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
