const validateRegisterInput = require('./register');
const validateLoginInput = require('./login');
const validateProfileInput = require('./profile');
const validateExperienceInput = require('./experience');
const validateEducationInput = require('./education');
const validatePostInput = require('./post');

module.exports = {
	validateRegisterInput,
	validateLoginInput,
	validateProfileInput,
	validateExperienceInput,
	validateEducationInput,
	validatePostInput
};
