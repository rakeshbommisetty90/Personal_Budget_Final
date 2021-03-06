const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const budgetModel = require('../models/budgetModel');
const exjwt = require('express-jwt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
router.use(cors());

const secretKey = 'My secret key';
const jwtMW = exjwt({
	secret: secretKey,
	algorithms: ['HS256'],
});

router.get('/', jwtMW, (req, res) => {
	console.log(req.query);
	user_id = String(req.query.username);
	console.log(username);
	budgetModel
		.find({ username: username })
		.then((data) => {
			console.log(data);
			res.status(200).send(data);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).send();
		});
});

router.post('/', jwtMW, async (req, res) => {
	console.log('inside post');
	console.log(req.body);
	let record = await budgetModel.findOne({ title: req.body.title });
	if (record) {
		return res.status(400).send('That expense already exists!');
	} else {
		budgetinfo = new budgetModel({
			title: req.body.title,
			budget: req.body.budget,
			color: req.body.color,
			username: req.body.username,
		});

		await budgetinfo.save();
		res.send(budgetinfo);
	}
});

module.exports = router;
