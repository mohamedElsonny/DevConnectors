const { isEmpty } = require('validator');
const isEmptyFn = require('./is_empty');

module.exports = function validatePostInput({ text, imageUrl, videoUrl }) {
	let errors = {};

	text = !isEmptyFn(text) ? text : '';
	imageUrl = !isEmptyFn(imageUrl) ? imageUrl : '';
	videoUrl = !isEmptyFn(videoUrl) ? videoUrl : '';

	if (isEmpty(text) && isEmpty(imageUrl) && isEmpty(videoUrl)) {
		errors.text = 'Text field is required';
	}

	return { errors, isValid: isEmptyFn(errors) };
};
