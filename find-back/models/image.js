var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ImageSchema = new Schema({
	imageName: {
		type: String,
		required: true
	},
	imageData: {
		type: String,
		required: true
	},
	ad: { type: Schema.Types.ObjectId, ref: 'Ad' }
});

module.exports = mongoose.model('Image', ImageSchema);
