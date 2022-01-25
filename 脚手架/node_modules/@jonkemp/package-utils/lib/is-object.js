module.exports = obj => {
	const type = typeof obj;

	return type === 'function' || type === 'object' && !!obj;
};
