const isObject = require('./is-object');

module.exports = (obj) => {
	if (!isObject(obj)) return [];

	return Object.keys(obj);
};
