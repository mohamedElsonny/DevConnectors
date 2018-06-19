const { isEmpty } = require('validator');
const isEmptyFn = require('./is_empty');

module.exports = function validatePostInput({ text, password }) {
	let errors = {};

	text = !isEmptyFn(text) ? text : '';

	if (isEmpty(text)) {
		errors.text = 'Text field is required';
	}

	return { errors, isValid: isEmptyFn(errors) };
};
