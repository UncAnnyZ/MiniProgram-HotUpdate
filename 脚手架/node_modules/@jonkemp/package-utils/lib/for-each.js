const getKeys = require('./get-keys');
const isArrayLike = require('./is-array-like');
const optimizeCb = require('./optimize-cb');

module.exports = (obj, iteratee, context) => {
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
