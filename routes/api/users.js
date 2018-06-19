const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

// Load User model
const User = require('../../models/User');

const keys = require('../../config/keys');

// load input validation
const { validateLoginInput, validateRegisterInput } = require('../../validation');

// @route  GET api/users/register
// @desc   Register user
// @acess  Public
router.post('/register', (req, res) => {
	const { errors, isValid } = validateRegisterInput(req.body);

	if (!isValid) {
		return res.status(400).json(errors);
	}

	User.findOne({
		email: req.body.email
	}).then((user) => {
		if (user) {
			errors.email = 'Email already exists';
			return res.status(400).json(errors);
		}
		const { name, email, password } = req.body;
		const avatar = gravatar.url(email, {
			s: '200', // size
			r: 'pg', // rating
			d: 'mm' // default
		});
		const newUser = new User({
			name,
			email,
			password,
			avatar
		});
		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(newUser.password, salt, (err, hash) => {
				if (err) throw err;
				newUser.password = hash;
				newUser
					.save()
					.then((user) => res.json(user))
					.catch((err) => console.log(err));
			});
		});
	});
});

// @route  GET api/users/login
// @desc   Login user / Returning the token
// @acess  Public

router.post('/login', (req, res) => {
	const { errors, isValid } = validateLoginInput(req.body);

	if (!isValid) {
		return res.status(400).json(errors);
	}

	const { email, password } = req.body;

	// Find user by email
	User.findOne({ email }).then((user) => {
		if (!user) {
			errors.email = 'User email not found';
			return res.status(404).json(errors);
		}
		// Check Password
		bcrypt.compare(password, user.password).then((isMatch) => {
			if (isMatch) {
				// user matched
				const { id, name, avatar } = user;
				const payload = { id, name, avatar }; // jwt payload

				// sign token
				jwt.sign(
					payload,
					keys.secretOrKey,
					{
						expiresIn: 3600
					},
					(err, token) => {
						return res.json({
							success: true,
							token: `Bearer ${token}`
						});
					}
				);
			} else {
				errors.password = 'password incorrect';
				return res.status(400).json(errors);
			}
		});
	});
});

// @route  GET api/users/current
// @desc   get the current user
// @acess  Private
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
	const { email, name, id } = req.user;
	res.json({ id, name, email });
});

module.exports = router;
