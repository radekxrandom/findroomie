var async = require('async');
var user = require('../models/user');
const validator = require('express-validator');
const bodyParser = require('body-parser');
var passport = require('passport');
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);
const fetch = require('node-fetch');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const validatorlog = require('./validatorlog');
const validatorreg = require('./validatorreg');

exports.signup = async (req, res, next) => {
	try {
		const { errors, isValid } = validatorreg(req.body);
		if (!isValid) {
			return res.status(400).json(errors);
		}

		let hashedPass = await bcrypt.hash(req.body.password, salt);
		await new user({
			username: req.body.username,
			password: hashedPass,
			email: req.body.email
		}).save();
		console.log('suc');
		res.json('Succes');
	} catch (err) {
		console.log('you suck');
		res.json('Somethings wrong');
	}
};

exports.signup_get = async (req, res, next) => {
	try {
		let users = await user.find();
		res.json({ showusers: users });
	} catch (err) {
		res.json('pies' + err);
	}
};
exports.signin_get = async (req, res, next) => {
	try {
		let us = await req.user;
		res.json({ showusers: us });
	} catch (err) {
		res.json('pies' + err);
	}
};
exports.signin = async (req, res, next) => {
	const { errors, isValid } = validatorlog(req.body);
	if (!isValid) {
		return res.status(400).json(errors);
	}
	let us = await user.findOne({ username: req.body.username });
	req.currentUser = us;
	if (!us) {
		return res.status(400).json('Wrong username');
	}
	//res.json('User');
	let resp = await bcrypt.compare(req.body.password, us.password);
	//res.json('Pwd');
	if (!resp) {
		return res.status(400).json('Wrong password');
	}
	const payload = {
		id: us.id,
		name: us.username
	};
	let token = jwt.sign({ data: payload }, 'secretkey', {
		expiresIn: 31556926
	});
	return res.json({ success: true, token: 'Bearer' + token });
};
