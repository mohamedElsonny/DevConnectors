const { isLength, isEmpty, equals, isEmail } = require('validator');
const isEmptyFn = require('./is_empty');

module.exports = function validateRegisterInput({ name, email, password, password2 }) {
	let errors = {};

	name = !isEmptyFn(name) ? name : '';
	email = !isEmptyFn(email) ? email : '';
	password = !isEmptyFn(password) ? password : '';
	password2 = !isEmptyFn(password2) ? password2 : '';

	if (!isLength(name, { min: 2, max: 30 })) {
		errors.name = 'Name must be between 2 and 30 characters';
	}

	if (isEmpty(name)) {
		errors.name = 'Name field is required';
	}

	if (!isEmail(email)) {
		errors.email = 'Email is invalid';
	}

	if (isEmpty(email)) {
		errors.email = 'Email field is required';
	}

	if (!equals(password, password2)) {
		errors.password2 = 'Password must match';
	}

	if (!isLength(password, { min: 6, max: 30 })) {
		errors.password = 'Password must be at Least 6 characters and max 30';
	}

	if (isEmpty(password2)) {
		errors.password2 = 'Confirm Password field is required';
	}

	if (isEmpty(password)) {
		errors.password = 'Password field is required';
	}
	return { errors, isValid: isEmptyFn(errors) };
};
