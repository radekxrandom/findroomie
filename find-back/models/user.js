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
	},
	reset: {
		type: String,
		required: false
	},
	mobile: {
		type: String,
		reuired: false
	},
	address: {
		type: String,
		reuired: false
	},
	about: {
		type: String,
		reuired: false
	},
	lookingfor: {
		type: String,
		reuired: false
	}
});

module.exports = mongoose.model('user', UserSchema);
