var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var AdSchema = new Schema({
	type: {
		type: String,
		required: true
	},
	title: {
		type: String,
		required: true
	},
	message: {
		type: String,
		required: true
	},
	mobile: {
		type: String,
		required: false
	},
	user: {
		type: String,
		required: true
	},
	img: { type: String, required: false }
});

module.exports = mongoose.model('Ad', AdSchema);
