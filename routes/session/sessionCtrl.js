const userRealm = require('../../models/user');
const _ = require('lodash');
const programs = require('../../models/programs');
const Joi = require('@hapi/joi');
const errorHandler = require('../../lib/errorHandler/errorHandler');



/*
	POST
	/getProgram
	(1)user start his pullup exercise
	(2)returns user's currentset in program
*/
exports.getProgram = (req, res, next) => {
	let user = req.filteredUser;
	let {week, program} = user.state;
	let currentProgram = _.find(programs, obj => obj.name == program)['sets'][week];
	console.log("\x1b[46m%s\x1b[0m", 'GET_PROGRAM');
	console.log("\x1b[42m%s\x1b[0m", 'CURRENT_PROGRAM:', program);
	res.send(
		currentProgram
	);
}











