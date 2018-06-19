const { isLength, isEmpty, equals, isEmail } = require('validator');
const isEmptyFn = require('./is_empty');

module.exports = function validateEducationInput({ school, degree, fieldofstudy, from }) {
	let errors = {};

	school = !isEmptyFn(school) ? school : '';
	degree = !isEmptyFn(degree) ? degree : '';
	fieldofstudy = !isEmptyFn(fieldofstudy) ? fieldofstudy : '';
	from = !isEmptyFn(from) ? from : '';

	if (isEmpty(school)) {
		errors.school = 'school field is required';
	}

	if (isEmpty(degree)) {
		errors.degree = 'degree field is required';
	}

	if (isEmpty(fieldofstudy)) {
		errors.fieldofstudy = 'fieldofstudy field is required';
	}

	if (isEmpty(from)) {
		errors.from = 'From date field is required';
	}

	return { errors, isValid: isEmptyFn(errors) };
};
