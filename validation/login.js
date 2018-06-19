const { isLength, isEmpty, equals, isEmail } = require('validator');
const isEmptyFn = require('./is_empty');

module.exports = function validateLoginInput({ email, password }) {
	let errors = {};

	email = !isEmptyFn(email) ? email : '';
	password = !isEmptyFn(password) ? password : '';

	if (!isEmail(email)) {
		errors.email = 'Email is invalid';
	}

	if (isEmpty(email)) {
		errors.email = 'Email field is required';
	}

	if (isEmpty(password)) {
		errors.password = 'Password field is required';
	}

	return { errors, isValid: isEmptyFn(errors) };
};
