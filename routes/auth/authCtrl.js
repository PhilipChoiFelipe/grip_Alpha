//Realm Database
const userRealm = require('../../models/user');
const summaryRealm = require('../../models/summary');

//util
const sendMail = require('../../lib/email/email');
const errorHandler = require('../../lib/errorHandler/errorHandler');
const _ = require('lodash');

//authentication
const bcrypt = require('bcrypt');
const Joi = require('@hapi/joi');
const uuidv4 = require('uuid');
const jwt = require('jsonwebtoken');


/*
	generates JWT token with user information
*/
const generateToken = user => {
	const omittedAuth = _.omit(user.auth, 'hashedPassword');
	user = {
		id: user.id,
		auth: omittedAuth
	};
	const token = jwt.sign(
		{
			user
		},
		process.env.JWT_SECRET,
		{
			expiresIn: '30d'
		}
	);
	return token;
};

/*
	POST
	/login
	login user through verifications
*/

exports.logIn = (req, res, next) => {
	const schema = Joi.object({
		email: Joi.string()
			.email({ minDomainSegments: 2 })
			.required(),
		password: Joi.string()
			.pattern(new RegExp('^[a-zA-Z0-9!@#$%&*]{3,30}$'))
			.required()
	});
	const { email, password } = req.body;
	const { error, value } = schema.validate({
		email: email,
		password: password
	});
	if (error) {
		next(errorHandler(400, error.message));
	} else {
		let user = userRealm.objects('User').filtered(`auth.email == "${email}"`)[0];
		if (!user) {
			// console.log(`No such user with email ${email}`);
			// res.send(`No such user with email ${email}`);
			next(errorHandler(400, `No such user with email ${email}`));
		} else {
			if (user.auth.activated == false) {
				// console.log(JSON.stringify(user));
				next(errorHandler(400, `verification email sent to ${email}, please verify to login`));
			} else {
				bcrypt.compare(password, user.auth.hashedPassword, (err, result) => {
					if (err) {
						next(err);
					} else {
						if (!result) {
							 next(errorHandler(400, 'Type correct password!'));
						} else {
							console.log('Successfully Logged in');
							const jwtToken = generateToken(user);
							const omittedAuth = _.omit(user.auth, 'hashedPassword');
							user = {
								id: user.id,
								auth: omittedAuth,
								state: user.state,
								summary: user.summary
							};
							console.log("\x1b[46m%s\x1b[0m", 'LOGIN');
							console.log("\x1b[42m%s\x1b[0m", 'LOGGED_IN_USER:', user.auth.email);
							console.log("\x1b[42m%s\x1b[0m", 'USER_TOKEN:', jwtToken);
							res.send({
								jwtToken,
							});
						}
					}
				});
			}
		}
	}
};

/*
	POST
	/signup
	signup user with through verifications
*/
exports.signUp = (req, res, next) => {
	//verify if user input is valid
	const schema = Joi.object({
		email: Joi.string()
			.email({ minDomainSegments: 2 })
			.required(),
		username: Joi.string()
			.alphanum()
			.min(3)
			.max(30)
			.required(),
		password: Joi.string()
			.pattern(new RegExp('^[a-zA-Z0-9!@#$%&*]{3,30}$'))
			.required()
	});

	const { email, username, password } = req.body;
	const { error, value } = schema.validate({
		email: email,
		username: username,
		password: password
	});
	if (error) {
		console.log(error);
		next(error);
	} else {
		//verify if user email is not taken
		let user = userRealm.objects('User').filtered(`auth.email == "${email}"`);
		if (!user.isEmpty()) {
			console.log(`${email} is already signed in`);
			// res.send(`${email} is already signed in: ${username}`);
			const error = new Error(`${email} is already signed in: ${username}`);
			// error.massage = `${email} is already signed in: ${username}`;
			error.status = 400;
			next(error);
		} else {
			bcrypt.hash(password, 10, (err, hash) => {
				if (err) {
					next(err);
				}
				const userID = uuidv4.v4();
				userRealm.write(() => {
					userRealm.create('User', {
						id: userID,
						auth: {
							email: email,
							username: username,
							hashedPassword: hash,
							signupDate: new Date()
						}
					});
				});
				summaryRealm.write(() => {
					summaryRealm.create('Summary', {
						id: userID
					})
				})
				// console.log('user:', user);
				// console.log('userDB length:', user.length);
				req.user = user;
				next();
			});
		}
	}
};

/*
	MiddleWare
	sends verification email based on user's unique id
*/

exports.sendVerifyingMail = (req, res, next) => {
	let user = req.user[0];
	// console.log('email User:', JSON.stringify(user));
	const link = `"https://grip-alpha.herokuapp.com/auth/verify/${user.id}"`;
	console.log('verifying link: ', link);
	sendMail.sendMail(
		`${user.auth.email}`,
		'PullUp verification email',
		`<h1>Hello ${user.auth
			.username}</h1> <p>This is verification email for you!</p> <a href=${link}><button>click to verify</button></a>`
	);
	res.send({
		emailSent: true,
		reciever: user.auth.email,
	});
};

/*
	GET
	/verify
	from email activate user 
*/
exports.verify = (req, res, next) => {
	const { id } = req.params;
	// console.log(id);
	try {
		let user = userRealm.objects('User').filtered(`id == "${id}"`)[0];
		console.log('verified user: ', JSON.stringify(user));
		userRealm.write(() => {
			// userRealm.create('User', { id: id, activated: true }, true);
			user.auth.activated = true;
		});
		const jwtToken = generateToken(user);
		console.log(`${user.auth.username}'s token: ${jwtToken}`);
		const omittedAuth = _.omit(user.auth, 'hashedPassword');
		user = {
			id: user.id,
			auth: omittedAuth,
			state: user.state,
			summary: user.summary
		};
		// res.redirect('https://pullup-reactnative-ehuzf.run.goorm.io');
		res.send('your account is verified! Go back to the app and login with your email!')
	} catch (error) {
		next(error);
	}
};

/*
	DELETE
	/delete
	delete all users
*/
exports.removeUsers = (req, res, next) => {
	try {
		let user = userRealm.objects('User');
		userRealm.write(() => {
			userRealm.delete(user);
		});
	} catch (err) {
		next(err);
	}
	res.send('successfully deleted');
};

/*
	GET
	/users
	show all users with cleaned JSON style
*/
exports.getUsers = (req, res, next) => {
	try {
		let users = userRealm.objects('User');
		let userArray = [];
		for (let user of users) {
			userArray.push(JSON.parse(JSON.stringify(user)));
		}
		// console.table([JSON.stringify(user[0]), JSON.stringify(user[1])]);
		console.table(userArray);
		res.send(JSON.parse(JSON.stringify(users)));
	} catch (err) {
		next(err);
	}
};