module.exports = function(app, express, passport) {
	var router = express.Router();
	var auth = require('../controllers/authController');

	router.post('/signup', auth.signup);

	return router;
};
