const uuidv4 = require('uuid/v4');
var nodemailer = require('nodemailer');
var bcrypt = require('bcryptjs');
var async = require('async');
var user = require('../models/user');
var salt = bcrypt.genSaltSync(10);
const jwt = require('jsonwebtoken');

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
		return res.json({ err: "There's no user with such email", status: '1' });
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
			return res.json({ err: "There's no user with such email", status: '1' });
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

exports.userprofileget = async (req, res) => {
	let respons = await jwt.verify(req.token, 'secretkey');
	if (!respons) {
		return res.status(400).json({ err: 'Wront token' });
	}
	let profile = await user.findById(req.params.id);
	if (!profile) {
		return res.status(400).json({ err: 'Wrong user id' });
	}
	return res.status(200).json({ err: 'User found ok', usr: profile });
};

exports.userprofileupdate = async (req, res) => {
	let respons = await jwt.verify(req.token, 'secretkey');
	if (!respons) {
		return res.status(400).json({ err: 'Wront token' });
	}
	let profile = await user.findById(respons.data.id);
	if (!profile) {
		return res.status(400).json({ err: 'Wrong user id' });
	}
	let respon = await user.findByIdAndUpdate(respons.data.id, req.body);
	return res.status(200).json({ err: 'all ok' });
};

exports.pwdchange = async (req, res) => {
	let respons = await jwt.verify(req.token, 'secretkey');
	if (!respons) {
		return res.status(200).json({ err: 'Zly token' });
	}
	let profile = await user.findById(respons.data.id);
	if (!profile) {
		return res.status(200).json({ err: 'Zle id uzytkownika' });
	}
	let checkpwd = await bcrypt.compare(req.body.password, profile.password);
	if (!checkpwd) {
		return res.status(200).json({ err: 'Niepoprawne obecne haslo' });
	}
	let pwd = await bcrypt.hash(req.body.pwd, salt);
	profile.password = pwd;
	await profile.save();
	return res.status(200).json({ err: 'Pomyslnie zmieniono haslo' });
};
