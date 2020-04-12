const userRealm = require('../../models/user');
const _ = require('lodash');
const programs = require('../../models/programs');
const Joi = require('@hapi/joi');

/*
	POST
	/writeReflection
	(1) user writes memos and difficulty
	(2) updates currentSet / totalPullups
	(3) returns updated User
*/
exports.writeReflection = (req, res, next) => {
	const schema = Joi.object({
		memo: Joi.string()
		.min(3)
		.max(100)
		.required(),
		difficulty: Joi.number()
		.min(1)
		.max(5)
		.required()
	});
	let user = req.filteredUser;
	const { memo, difficulty } = req.body;
	const { error, value } = schema.validate({
		memo: memo,
		difficulty: difficulty
	});
	console.log("Reflection", "memo:", memo, "difficulty", difficulty);
	if(error){
		console.log(error);
		next(error);
	} else {
		const finishedDate = new Date();
		const formatDate = `${finishedDate.getFullYear()}-${finishedDate.getMonth()}-${finishedDate.getDate()}`;
		userRealm.write(() => {
			user.summary.push({memo, difficulty: parseInt(difficulty), finishedDate, formatDate});
			user.state.currentSet++;
		});
		res.send({
			user
		});
	}
}

/*
	POST
	/getProgram
	(1)user start his pullup exercise
	(2)returns user's currentset in program
*/
exports.getProgram = (req, res, next) => {
	let user = req.filteredUser;
	let {currentSet, program} = user.state;
	console.log(currentSet, program)
	let currentProgram = _.find(programs, obj => obj.name == program)['sets'][currentSet];
	res.send(
		currentProgram
	);
}











