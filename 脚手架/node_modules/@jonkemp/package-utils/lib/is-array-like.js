const getLength = require('./get-length');

module.exports = (collection) => {
	const length = getLength(collection);

	return typeof length == 'number' && length >= 0 && length <= Number.MAX_SAFE_INTEGER;
};
