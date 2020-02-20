const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const user = require('../models/user');
const opts = {};

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secretkey';

module.exports = (passport) => {
	passport.use(
		new JwtStrategy(opts, (jwt_payload, done) => {
			user
				.findById(jwt_payload.id)
				.then((us) => {
					if (us) {
						return done(null, us);
					}
					return done(null, false);
				})
				.catch((err) => console.log(err));
		})
	);
};
