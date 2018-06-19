const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const mongoose = require('mongoose');
const User = mongoose.model('users');
const { secretOrKey } = require('./keys');
const opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = secretOrKey;

module.exports = (passport) => {
	passport.use(
		new JwtStrategy(opts, (jwt_payload, done) => {
			User.findById(jwt_payload.id)
				.then((user) => {
					if (user) {
						return done(null, user);
					}
					return done(null, false);
				})
				.catch((err) => done(err, false));
		})
	);
};
