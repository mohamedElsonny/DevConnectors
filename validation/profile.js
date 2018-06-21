const { isLength, isEmpty, isURL, isEmail } = require('validator');
const isEmptyFn = require('./is_empty');

module.exports = function validateProfileInput({
	status,
	skills,
	website,
	twitter,
	youtube,
	facebook,
	linkedin,
	instagram
}) {
	let errors = {};

	status = !isEmptyFn(status) ? status : '';
	skills = !isEmptyFn(skills) ? skills : '';

	if (isEmpty(status)) {
		errors.status = 'Status field is required';
	}

	if (isEmpty(skills)) {
		errors.skills = 'Skills field is required';
	}

	if (!isEmptyFn(website)) {
		if (!isURL(website)) {
			errors.website = 'Not vaild URL';
		}
	}
	if (!isEmptyFn(twitter)) {
		if (!isURL(twitter)) {
			errors.twitter = 'Not vaild URL';
		}
	}
	if (!isEmptyFn(facebook)) {
		if (!isURL(facebook)) {
			errors.facebook = 'Not vaild URL';
		}
	}
	if (!isEmptyFn(linkedin)) {
		if (!isURL(linkedin)) {
			errors.linkedin = 'Not vaild URL';
		}
	}
	if (!isEmptyFn(instagram)) {
		if (!isURL(instagram)) {
			errors.instagram = 'Not vaild URL';
		}
	}
	if (!isEmptyFn(youtube)) {
		if (!isURL(youtube)) {
			errors.youtube = 'Not vaild URL';
		}
	}

	return { errors, isValid: isEmptyFn(errors) };
};
