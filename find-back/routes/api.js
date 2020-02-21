module.exports = function(app, express, passport) {
	var router = express.Router();
	var auth = require('../controllers/authController');
	var ad = require('../controllers/adController');
	const uuidv4 = require('uuid/v4');
	const path = require('path');
	var multer = require('multer');

	var storage = multer.diskStorage({
		destination: function(req, file, cb) {
			cb(null, 'public');
		},
		filename: function(req, file, cb) {
			const newFilename = `${uuidv4()}${path.extname(file.originalname)}`;
			cb(null, newFilename);
		}
	});

	var upload = multer({ storage: storage });

	router.post('/signup', auth.signup);
	router.get('/signup', auth.signup_get);
	router.post('/signin', auth.signin);
	router.get('/signin', auth.signin_get);
	router.post('/add', upload.single('selectedFile'), ad.adpost);
	router.get('/ads', ad.adget);
	router.get('/single/:uid', ad.singleadget);
	return router;
};
