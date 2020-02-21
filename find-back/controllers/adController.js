var Img = require('../models/image');
var Ad = require('../models/ad');
var fs = require('fs');

exports.adpost = async (req, res) => {
	try {
		if (req.file !== undefined) {
			await new Ad({
				type: req.body.typeofadd,
				title: req.body.title,
				message: req.body.message,
				mobile: req.body.mobile,
				img: req.file.filename,
				user: 'pies'
			}).save();
		} else {
			await new Ad({
				type: req.body.typeofadd,
				title: req.body.title,
				message: req.body.message,
				mobile: req.body.mobile,
				user: 'pies'
			}).save();
		}
		res.status(200).json('Ok boomer');
	} catch (err) {
		res.status(400).json('smrod');
	}
};

exports.adget = async (req, res) => {
	try {
		let ads = await Ad.find();
		return res.json({ ads: ads });
	} catch (err) {
		return res.json('Pies' + err);
	}
};
exports.singleadget = async (req, res) => {
	try {
		let ad = await Ad.findById(req.params.uid);
		return res.status(200).json({ ad });
	} catch (err) {
		return res.status(400).json('Pies' + err);
	}
};
