var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
	username: {
		type: String,
		reuired: true
	},
	password: {
		type: String,
		required: true
	},
	email: {
		type: String,
		reuired: false
	}
});

module.exports = mongoose.model('user', UserSchema);
