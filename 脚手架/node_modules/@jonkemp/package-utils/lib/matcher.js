const isMatch = require('./is-match');

module.exports = attrs => {
	attrs = Object.assign({}, attrs);

	return obj => isMatch(obj, attrs);
};
