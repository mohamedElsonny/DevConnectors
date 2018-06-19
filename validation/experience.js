const { isLength, isEmpty, equals, isEmail } = require('validator');
const isEmptyFn = require('./is_empty');

module.exports = function validateExperienceInput({ title, company, location, from }) {
	let errors = {};

	title = !isEmptyFn(title) ? title : '';
	company = !isEmptyFn(company) ? company : '';
	from = !isEmptyFn(from) ? from : '';

	if (isEmpty(title)) {
		errors.title = 'Job title field is required';
	}

	if (isEmpty(company)) {
		errors.company = 'Company field is required';
	}

	if (isEmpty(from)) {
		errors.from = 'From date field is required';
	}

	return { errors, isValid: isEmptyFn(errors) };
};
