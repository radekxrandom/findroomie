function SessionConstructor(userId, userGroup, details) {
	this.userId = userId;
	this.userGroup = userGroup;
	this.details = details;
}

module.exports = function(passport) {
	var LocalStrategy = require('passport-local').Strategy;
	var CustomStrategy = require('passport-custom').Strategy;
	var adminuser = require('../models/adminuser');
	var bcrypt = require('bcryptjs');
	var salt = bcrypt.genSaltSync(10);
	var accescode = require('../models/accescode');

	passport.serializeUser((userObject, done) => {
		// userObject could be a Model1 or a Model2... or Model3, Model4, etc.
		let userGroup = 'model1';
		let userPrototype = Object.getPrototypeOf(userObject);

		if (userPrototype === adminuser.prototype) {
			userGroup = 'admin';
		} else if (userPrototype === accescode.prototype) {
			userGroup = 'regular';
		}

		let sessionConstructor = new SessionConstructor(
			userObject.id,
			userGroup,
			''
		);
		done(null, sessionConstructor);
	});

	passport.deserializeUser((sessionConstructor, done) => {
		if (sessionConstructor.userGroup == 'admin') {
			adminuser.findOne(
				{
					_id: sessionConstructor.userId
				},
				'-localStrategy.password',
				(err, user) => {
					// When using string syntax, prefixing a path with - will flag that path as excluded.
					done(err, user);
				}
			);
		} else if (sessionConstructor.userGroup == 'regular') {
			accescode.findOne(
				{
					_id: sessionConstructor.userId
				},
				'-localStrategy.password',
				(err, user) => {
					// When using string syntax, prefixing a path with - will flag that path as excluded.
					done(err, user);
				}
			);
		}
	}); /*
  passport.use(
    "local-login",
    new LocalStrategy((username, password, done) => {
      adminuser.findOne(
        {
          username: username
        },
        (err, user) => {
          if (err) {
            return done(err);
          }
          if (!user) {
            2`2`;
            return done(null, false, {
              msg: "Incorrect username"
            });
          }
          bcrypt.compare(password, user.password, (err, res) => {
            if (res) {
              // passwords match! log user in
              return done(null, user);
            } else {
              // passwords do not match!
              return done(null, false, {
                msg: "Incorrect password"
              });
            }
          });
        }
      );
    })

  passport.use(
    "acces-code",
    new CustomStrategy((req, done) => {
      var login = req.body.acces.toString().slice(0, 4);
      var cd = req.body.acces.toString().slice(4);
      accescode.findOne(
        {
          log: login
        },
        (err, user) => {
          if (err) {
            return done(err);
          }
          if (!user || user.valid > 0) {
            return done(null, false, {
              msg: "Inccorect code"
            });
          }
          bcrypt.compare(cd, user.code)
          user, (err, res) => {
            if (res) {
              user.valid = 1;
              user.save(function(err, user) {
                if (err) {
                  return done(null, false);
                } else {
                  return done(null, user);
                }
              });
            } else {
              return done(null, false, {
                msg: "Incorrect code"
              });
            }
          });
        }
      );
    })
  );
  */

	passport.use(
		'acces-code',
		new CustomStrategy(async (req, done) => {
			try {
				var login = req.body.acces.toString().slice(0, 4);
				var cd = req.body.acces.toString().slice(4);
				let user = await accescode.findOne({ log: login });
				if (!user) {
					throw new Error();
				}
				if (user.valid > 1) {
					throw new Error();
				}
				let res = await bcrypt.compare(cd, user.code);
				user.valid++;
				await user.save();
				return done(null, user);
			} catch (err) {
				done(err);
			}
		})
	);

	passport.use(
		'local-login',
		new LocalStrategy(async (username, password, done) => {
			let user = await adminuser.findOne({ username: username });
			if (!user) {
				/* return done(null, false, {
            msg: "Incorrect username"
          });*/
				throw new Error('There is no such user');
			}
			let res = await bcrypt.compare(password, user.password);
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
