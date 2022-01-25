const shallowProperty = require('./shallow-property');

const deepGet = (obj, path) => {
	const { length } = path;

	for (let i = 0; i < length; i++) {
		if (obj == null) return void 0;
		obj = obj[path[i]];
	}

	return length ? obj : void 0;
};

module.exports = path => {
	if (!Array.isArray(path)) {
		return shallowProperty(path);
	}

	return obj => deepGet(obj, path);
};
