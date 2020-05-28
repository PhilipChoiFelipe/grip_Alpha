const userRealm = require('../models/user');
const _ = require('lodash');

const omitPrivate = user => {
	const omittedAuth = _.omit(user.auth, 'hashedPassword');
	let omittedUser = {
		id: user.id,
		auth: omittedAuth,
		state: user.state,
		summary: user.summary
	};
	return omittedUser;
};

module.exports = omitPrivate;