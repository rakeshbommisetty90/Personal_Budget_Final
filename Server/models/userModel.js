const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
	{
		password: {
			type: String,
			required: true,
		},
		username: {
			type: String,
			required: true,
			unique: true,
			//match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Invalid Email Format'],
		},
	},
	{ collection: 'users' }
);

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;
