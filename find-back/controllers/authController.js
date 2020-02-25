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
const uuidv4 = require('uuid/v4');
var nodemailer = require('nodemailer');

exports.signup = async (req, res, next) => {
	try {
		const { errors, isValid } = validatorreg(req.body);
		if (!isValid) {
			return res.status(400).json({ err: errors });
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
		res.json({ err: 'Somethings wrong' });
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
		return res.status(400).json({ err: errors });
	}
	let us = await user.findOne({ username: req.body.username });
	req.currentUser = us;
	if (!us) {
		return res.status(400).json({ err: 'Wrong username' });
	}
	//res.json('User');
	let resp = await bcrypt.compare(req.body.password, us.password);
	//res.json('Pwd');
	if (!resp) {
		return res.status(400).json({ err: 'Wrong password' });
	}
	const payload = {
		id: us.id,
		name: us.username
	};
	let token = jwt.sign({ data: payload }, 'secretkey', {
		expiresIn: 31556926
	});
	return res.json({ success: true, token: 'Bearer ' + token });
};

var transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: 'trwaloscteraz@gmail.com',
		pass: 'placek123'
	}
});

exports.sentcode = async (req, res) => {
	let usr = await user.findOne({ email: req.body.email });
	if (!usr) {
		return res.json({ err: 'There\'s no user with such email', status: '1' });
	} else {
		let code = uuidv4();
		var mailOptions = {
			from: 'trwaloscteraz@gmail.com',
			to: req.body.email,
			subject: 'Password reset request',
			text: code
		};
		transporter.sendMail(mailOptions, async (e, i) => {
			if (e) {
				return res.status(400).json({ err: 'Smth wrong with email sending' });
			} else {
				let hashedCode = await bcrypt.hash(code, salt);
				usr.reset = hashedCode;
				await usr.save();
				return res.status(200).json({ mes: 'Reset code sent.', code: code });
			}
		});
	}
};
exports.resetpwd = async (req, res) => {
	if (req.body.case === '0') {
		let usr = await user.findOne({ email: req.body.email });
		if (!usr) {
			return res.json({ err: 'There\'s no user with such email', status: '1' });
		}
		return res.json({ mes: 'user found', status: '0' });
	} else if (req.body.case === '1') {
		let usr = await user.findOne({ email: req.body.email });
		let checkCode = await bcrypt.compare(req.body.code, usr.reset);
		if (!checkCode) {
			return res.json({ err: 'Wrong code', status: '1', show: 1 });
		}
		return res.json({ mes: 'code ok', status: '0', show: 2 });
	} else if (req.body.case === '2') {
		let usr = await user.findOne({ email: req.body.email });
		let checkCode = await bcrypt.compare(req.body.code, usr.reset);
		if (!checkCode) {
			return res.json({ err: 'Wrong code', status: '1' });
		}
		let pwd = await bcrypt.hash(req.body.pwd, salt);
		usr.password = pwd;
		await usr.save();
		return res.json({ mes: 'ok', status: '0' });
	}
};
