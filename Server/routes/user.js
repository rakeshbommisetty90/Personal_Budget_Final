const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');
const express = require('express');
var app = express();
const jwt = require('jsonwebtoken');
const router = express.Router();
const cors = require('cors');
router.use(cors());

router.post('/', async (req, res) => {
	let hash = bcrypt.hashSync(req.body.password, 10);

	userModel.findOne({ username: req.body.email }, (err, user) => {
		console.log('user information', user);
		if (!user) {
			console.log(req.body);
			user = new userModel({
				username: req.body.email,
				password: hash,
			});

			user.save((err, registeredUser) => {
				if (err) {
					console.log(err);
				} else {
					let payload = { subject: registeredUser._id };
					let token = jwt.sign(payload, 'secretKey');
					console.log('hello', token);
					res.status(200).send({ token });
				}
			});
		} else {
			res.status(200).send('user exists');
		}
	});
});

module.exports = router;
