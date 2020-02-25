module.exports = function(app, express, passport) {
	var router = express.Router();
	var auth = require('../controllers/authController');
	var ad = require('../controllers/adController');
	const uuidv4 = require('uuid/v4');
	const path = require('path');
	var multer = require('multer');
	var useractions = require('../controllers/UserActionsController');
	var storage = multer.diskStorage({
		destination: function(req, file, cb) {
			cb(null, 'public');
		},
		filename: function(req, file, cb) {
			const newFilename = `${uuidv4()}${path.extname(file.originalname)}`;
			cb(null, newFilename);
		}
	});

	const checkToken = (req, res, next) => {
		const header = req.headers['authorization'];

		if (typeof header !== 'undefined') {
			const bearer = header.split(' ');
			const token = bearer[1];

			req.token = token;
			next();
		} else {
			//If header is undefined return Forbidden (403)
			res.sendStatus(403);
		}
	};
	var upload = multer({ storage: storage });

	router.post('/signup', auth.signup);
	router.get('/signup', auth.signup_get);
	router.post('/signin', auth.signin);
	router.get('/signin', auth.signin_get);
	router.post('/add', upload.single('selectedFile'), ad.adpost);
	router.get('/ads', ad.adget);
	router.get('/single/:uid', ad.singleadget);
	router.post('/sentcode', useractions.sentcode);
	router.post('/resetpwd', useractions.resetpwd);
	router.get('/user/:id', checkToken, useractions.userprofileget);
	router.post('/user/:id', checkToken, useractions.userprofileupdate);
	router.post('/pwdchange', checkToken, useractions.pwdchange);
	return router;
};
