const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');
const express = require('express');
const router = express.Router();
const jwt_decode = require('jwt-decode');
const exjwt = require('express-jwt');
const cors = require('cors');
router.use(cors());

const accessTokenKey = 'My super secret key';

const jwtMW = exjwt({
	secret: accessTokenKey,
	algorithms: ['HS256'],
});

router.post('/', (req, res) => {
	console.log('hello entered to search');
	value = req.body.email;

	userModel.findOne({ username: value }, (err, user) => {
		console.log('user information', user);
		if (!user) {
			res.status(401).send('Invalid Email');
		} else {
			console.log('entered the token page');
			var phase = bcrypt.compareSync(req.body.password, user.password);
			console.log(phase);
			if (phase == false) {
				res.status(401).send('Invalid Password');
			} else {
				let payload = { subject: user._id };
				let token = jwt.sign(payload, 'secretKey');
				console.log('hello', token);
				res.status(200).send({ token });
			}
		}
	});
});

// router.post('/', async (req, res) => {
// 	//  Now find the user by their email address
// 	let user = await User.findOne({ username: req.body.username });
// 	if (!user) {
// 		return res.status(206).send('Incorrect username or password.');
// 	}

// 	// Then validate the Credentials in MongoDB match
// 	// those provided in the request
// 	const validPassword = await bcrypt.compare(req.body.password, user.password);
// 	if (!validPassword) {
// 		return res.status(204).send('Incorrect email or password.');
// 	}
// 	const token = jwt.sign(
// 		{ _id: user._id, username: user.username },
// 		accessTokenKey,
// 		{ expiresIn: '60s' }
// 	);
// 	loginStatus = true;
// 	var decoded_token = jwt_decode(token);
// 	res.status(200).json({
// 		success: true,
// 		err: null,
// 		exp: decoded_token.exp,
// 		token,
// 		loginStatus,
// 	});
// });

module.exports = router;
