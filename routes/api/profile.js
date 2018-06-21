const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// load profile and user model
const Profile = require('../../models/Profile');
const User = require('../../models/User');
// validation
const {
	validateProfileInput,
	validateExperienceInput,
	validateEducationInput
} = require('../../validation');

// @route  GET api/profile
// @desc   get current users profile
// @acess  private
router.get(
	'/',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		const errors = {};
		Profile.findOne({ user: req.user.id })
			.populate('user', ['name', 'avatar'])
			.then(profile => {
				if (!profile) {
					errors.noprofile = 'There is no profile for this user';
					return res.status(404).json(errors);
				}
				res.json(profile);
			})
			.catch(err => res.status(404).json(err));
	}
);

// @route  GET api/profile/user/:user_id
// @desc   get profile by user_id
// @acess  public
router.get('/user/:user_id', (req, res) => {
	const errors = {};

	Profile.findOne({ user: req.params.user_id })
		.populate('user', ['name', 'avatar'])
		.then(profile => {
			if (!profile) {
				errors.noprofile = 'There is no profile for this user';
				return res.status(404).json(errors);
			}
			res.json(profile);
		})
		.catch(err =>
			res.status(400).json({ noprofile: 'There is no profile for this user' })
		);
});

// @route  GET api/profile/all
// @desc   get all profiles
// @acess  public
router.get('/all', (req, res) => {
	const errors = {};
	Profile.find({})
		.populate('user', ['name', 'avatar'])
		.then(profiles => {
			if (!profiles) {
				errors.noprofiles = 'There are no profiles';
				return res.status(404).json(errors);
			}
			res.json(profiles);
		})
		.catch(err =>
			res.status(404).json({ noprofiles: 'There are no profiles' })
		);
});

// @route  Post api/profile
// @desc   create user profile
// @acess  private
router.post(
	'/',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		const { errors, isValid } = validateProfileInput(req.body);

		// Check Validation
		if (!isValid) {
			// Return any errors with 400 status
			return res.status(400).json(errors);
		}

		// Get fields
		const profileFields = {};
		profileFields.user = req.user.id;
		if (req.body.company) profileFields.company = req.body.company;
		if (req.body.website) profileFields.website = req.body.website;
		if (req.body.location) profileFields.location = req.body.location;
		if (req.body.bio) profileFields.bio = req.body.bio;
		if (req.body.status) profileFields.status = req.body.status;
		if (req.body.githubusername)
			profileFields.githubusername = req.body.githubusername;
		// Skills - Spilt into array
		if (typeof req.body.skills !== 'undefined') {
			profileFields.skills = req.body.skills.split(',');
		}

		// Social
		profileFields.social = {};
		if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
		if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
		if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
		if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
		if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

		Profile.findOne({ user: req.user.id }).then(profile => {
			if (profile) {
				// Update

				// there is a bug here!!

				Profile.findOneAndUpdate(
					{ user: req.user.id },
					{ $set: profileFields },
					{ new: true }
				).then(profileExp => res.json(profileExp));
			} else {
				// create new Profile

				new Profile(profileFields).save().then(profile => res.json(profile));
			}
		});
	}
);

// @route  Post api/profile/experience
// @desc   add experience to profile
// @acess  private
router.post(
	'/experience',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		const { errors, isValid } = validateExperienceInput(req.body);

		// Check validation
		if (!isValid) {
			return res.status(400).json(errors);
		}
		Profile.findOne({ user: req.user.id }).then(profile => {
			const {
				title,
				company,
				location,
				from,
				to,
				current,
				description
			} = req.body;
			const newExp = {
				title,
				company,
				location,
				from,
				to,
				current,
				description
			};
			profile.experience.unshift(newExp);
			profile.save().then(newProfile => res.json(newProfile));
		});
	}
);

// @route  Post api/profile/education
// @desc   add education to profile
// @acess  private
router.post(
	'/education',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		const { errors, isValid } = validateEducationInput(req.body);

		// Check validation
		if (!isValid) {
			return res.status(400).json(errors);
		}
		Profile.findOne({ user: req.user.id }).then(profile => {
			const {
				school,
				degree,
				fieldofstudy,
				from,
				to,
				current,
				description
			} = req.body;
			const newEdu = {
				school,
				degree,
				fieldofstudy,
				from,
				to,
				current,
				description
			};
			profile.education.unshift(newEdu);
			profile.save().then(newProfile => res.json(newProfile));
		});
	}
);

// @route  DELETE api/profile/experience/:exp_id
// @desc   delete experience from profile
// @acess  private
router.delete(
	'/experience/:exp_id',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		Profile.findOne({ user: req.user.id })
			.then(profile => {
				// get remove index
				const removeIndex = profile.experience
					.map(item => item.id)
					.indexOf(req.params.exp_id);
				console.log(removeIndex);

				if (removeIndex > -1) {
					// splice out from the array
					profile.experience.splice(removeIndex, 1);

					// save the profile after removing
					return profile.save().then(newPro => res.json(newPro));
				}
				res
					.status(404)
					.json({ profile: 'there is no experience with that id' });
			})
			.catch(err => res.status(404).json(err));
	}
);

// @route  DELETE api/profile/education/:exp_id
// @desc   delete education from profile
// @acess  private
router.delete(
	'/education/:edu_id',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		Profile.findOne({ user: req.user.id })
			.then(profile => {
				// get remove index
				const removeIndex = profile.education
					.map(item => item.id)
					.indexOf(req.params.edu_id);
				console.log(removeIndex);
				if (removeIndex > -1) {
					// splice out from the array
					profile.education.splice(removeIndex, 1);

					// save the profile after removing
					return profile.save().then(newPro => res.json(newPro));
				}
				res.status(404).json({ profile: 'there is no education with that id' });
			})
			.catch(err => res.status(404).json(err));
	}
);

// @route  DELETE api/profile
// @desc   delete user and profile
// @acess  private
router.delete(
	'/',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		Profile.findOneAndRemove({ user: req.user.id })
			.then(profile => {
				User.findOneAndRemove({ _id: req.user.id }).then(() =>
					res.json({ success: true })
				);
			})
			.catch(err => res.status(404).json(err));
	}
);

module.exports = router;
