const userRealm = require('../../models/user');
const _ = require('lodash');
const programs = require('../../models/programs');

/*
	GET
	/check
	user recieves most updated User data
*/

exports.check = (req, res, next) => {
	console.log('Check - filteredUser', req.filteredUser);
	let user = req.filteredUser;
	// console.log('check ID:', id);
	try {
		res.send(JSON.parse(JSON.stringify((user))));
	}catch(err){
		next(err);
	}
}


/*
	POST
	/updateMax
	(1)update maxPullups based on user input 
	(2)responds filtered programs based on user's max pullups
	(3)recommends to stay if filtered program matches to current user's program
*/
exports.updateMax = (req, res, next) => {
	let stay = false;
	let user = req.filteredUser;
	const { maxPullups } = req.body;
	try {
		userRealm.write(() => {
			user.state = { maxPullups: parseInt(maxPullups), program: user.state.program, currentSet: user.state.currentSet, totalPullups: user.state.totalPullups };
		});
		//get pullup programs
		const filteredPrograms = _.filter(programs, obj => obj.maxPullups >= maxPullups);
		const programNames = _.map(filteredPrograms, 'name');
		console.log(programNames);
		//if user alraedy have set updateMax and chose program
		console.log(JSON.stringify(user.state));
		console.log(user.state.program);
		if (user.state.program) {
			const same = _.find(filteredPrograms, obj => user.state.program == obj.name);
			console.log(same);
			if (same) {
				stay = true;
			}
		}
		res.send({
			programNames,
			stay
		});
		// res.send(JSON.parse(JSON.stringify(user)));
	} catch (err) {
		next(err);
	}
};
/*
	POST
	/decideProgram
	(1)user decides pullup program from the list 
	(2)if user decides to stay, program doesn't change
	(3)returns updated User
*/
exports.decideProgram = (req, res, next) => {
	const { programName, stay } = req.body;
	if (stay == 'true') {
		res.send('User Stays');
	} else {
		let user = req.filteredUser;
		try {
			userRealm.write(() => {
				user.state.program = programName;
				user.state.currentSet = 1;
				user.state.totalPullups = 0;
			});
			res.send(user);
		} catch (err) {
			next(err);
		}
	}
};

/*
	PATCH
	/editReflection
	(1)user edits written reflection in clicked date
	(2)returns editted user
*/

exports.editReflection = (req, res, next) => {
	const { memo, difficulty, date } = req.body;
	let user = req.filteredUser;
	let targetReflection = user.summary.filtered('finishedDate == $0', new Date(date))[0];
	console.log(JSON.stringify(targetReflection));
	try {
		userRealm.write(()=>{
			targetReflection.memo = memo;
			targetReflection.difficulty = parseInt(difficulty);
		});
		res.send(user);
	}catch(err){
		next(err);
	}
}


/*
	DELETE
	/deleteReflection
	(1)user deletes specific reflection on that date with chosen date
	(2)returns updated user
*/

exports.deleteReflection = (req, res, next) => {
	const { date } = req.body;
	let user = req.filteredUser;
	const targetReflection = user.summary.filtered('finishedDate == $0', new Date(date));
	try{
		userRealm.write(() => {
			userRealm.delete(targetReflection);	
		});
		res.send(user.summary);
	}catch(err){
		next(err);
	}
}



/*
	POST
	/showReflection
	(1)user decide which reflection want to see by selecting date on calendar(formatDate)
	(2)returns reflection on that date from DB
*/
exports.showReflection = (req, res, next) => {
	const { formatDate } = req.body;
	const { id } = req.user.user;
	try {
		let user = userRealm.objects('User').filtered(`id == "${id}"`)[0];
		let targetReflections = user.summary.filtered(`formatDate == "${formatDate}"`);
		res.send(targetReflections);
	}catch(err){
		next(err);
	}
};

















