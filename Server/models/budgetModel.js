const mongoose = require('mongoose');

const budgetSchema = mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
			trim: true,
		},
		budget: {
			type: Number,
			required: true,
		},
		color: {
			type: String,
			required: true,
			validate: [isValid, 'Please enter color in Hexadecimal'],
		},
		username: {
			type: String,
			required: true,
			trim: true,
		},
	},
	{ collection: 'budget' }
);

function isValid(s) {
	return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(s);
}

const budgetModel = mongoose.model('budget', budgetSchema);

module.exports = budgetModel;
