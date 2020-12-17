const mongoose = require('mongoose');

mongoose.connect(
	'mongodb+srv://rakesh:rakesh@cluster0.qctgi.mongodb.net/personalbudget?retryWrites=true&w=majority',
	{
		useNewUrlParser: true,
		useCreateIndex: true,
	}
);
