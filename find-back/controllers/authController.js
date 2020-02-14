var async = require('async');
var user = require('../models/user');
const validator = require('express-validator');
const bodyParser = require('body-parser');
var passport = require('passport');
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);
const fetch = require('node-fetch');
const axios = require('axios');

exports.signup = [
	validator.sanitizeBody('username').escape(),
	validator.sanitizeBody('password').escape(),
	validator.sanitizeBody('mail').escape(),

	async (req, res, next) => {
		try {
			let hashedPass = await bcrypt.hash(req.body.password, salt);
			await new user({
				username: req.body.username,
				password: hashedPass,
				email: req.body.email ? req.body.email : 'none'
			}).save();
			res.json('Succes');
		} catch (err) {
			res.json('Somethings wrong');
		}
	}
];
