module.exports = function(app, express, passport) {
	var router = express.Router();
	var auth = require('../controllers/authController');

	router.post('/signup', auth.signup);
	router.get('/signup', auth.signup_get);
	router.post('/signin', auth.signin);
	router.get('/signin', auth.signin_get);

	return router;
};
