var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var AdSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	body: {
		type: String,
		required: true
	},
	mobile: {
		type: String,
		required: false
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	image: { type: Schema.Types.ObjectId, ref: 'Image' }
});

module.exports = mongoose.model('Ad', AdSchema);
