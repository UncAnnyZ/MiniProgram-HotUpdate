const getKeys = require('./get-keys');

module.exports = (object, attrs) => {
	const keys = getKeys(attrs);
	const {length} = keys;

	if (object == null) return !length;
	const obj = Object(object);

	for (let i = 0; i < length; i++) {
		const key = keys[i];

		if (attrs[key] !== obj[key] || !(key in obj)) return false;
	}

	return true;
};
