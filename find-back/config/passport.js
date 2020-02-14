function SessionConstructor(userId, userGroup, details) {
	this.userId = userId;
	this.userGroup = userGroup;
	this.details = details;
}

module.exports = function(passport) {
	var LocalStrategy = require('passport-local').Strategy;
	var user = require('../models/user');
	var bcrypt = require('bcryptjs');
	var salt = bcrypt.genSaltSync(10);

	passport.serializeUser((userObject, done) => {
		// userObject could be a Model1 or a Model2... or Model3, Model4, etc.
		let userGroup = 'model1';
		let userPrototype = Object.getPrototypeOf(userObject);

		if (userPrototype === user.prototype) {
			userGroup = 'user';
		}
		let sessionConstructor = new SessionConstructor(
			userObject.id,
			userGroup,
			''
		);
		done(null, sessionConstructor);
	});

	passport.deserializeUser((sessionConstructor, done) => {
		if (sessionConstructor.userGroup == 'user') {
			user.findOne(
				{
					_id: sessionConstructor.userId
				},
				'-localStrategy.password',
				(err, us) => {
					// When using string syntax, prefixing a path with - will flag that path as excluded.
					done(err, us);
				}
			);
		}
	});
	passport.use(
		'local-login',
		new LocalStrategy(async (username, password, done) => {
			let us = await user.findOne({ username: username });
			if (!us) {
				/* return done(null, false, {
            msg: "Incorrect username"
          });*/
				throw new Error('There is no such user');
			}
			let res = await bcrypt.compare(password, us.password);
			if (res) {
				return done(null, user);
			} else {
				throw new Error(
					'Wrong passwrod you dummy. If you forgot your password go to /resetpwd'
				);
			}
		})
	);
};
