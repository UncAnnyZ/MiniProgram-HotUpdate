module.exports = (func, context, argCount) => {
	if (context === void 0) return func;
	switch (argCount == null ? 3 : argCount) {
		case 1: return value => func.call(context, value);
			// The 2-argument case is omitted because we’re not using it.
		case 3: return (value, index, collection) => func.call(context, value, index, collection);
		case 4: return (accumulator, value, index, collection) => func.call(context, accumulator, value, index, collection);
	}

	return (...args) => func.apply(context, args);
};
