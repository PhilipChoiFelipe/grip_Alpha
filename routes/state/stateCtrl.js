const userRealm = require('../../models/user');
const _ = require('lodash');
const programs = require('../../models/programs');

/*
	GET
	/check
	user recieves most updated User data
*/

exports.check = (req, res, next) => {
	let user = req.filteredUser;
	console.log("\x1b[46m%s\x1b[0m", 'CHECK');
	console.log("\x1b[42m%s\x1b[0m", 'CHECKED_USER:', user.auth.email);
	try {
		res.send(JSON.parse(JSON.stringify(user)));
	} catch (err) {
		next(err);
	}
};


/*
	GET
	/getWeeks
	(1)return list of weeks of current program
*/
exports.getWeeks = (req, res, next) => {
	let user = req.filteredUser;
	try{
		let { program } = user.state;
		let wholeProgram = _.find(programs, {name: program}).sets;
		let programWeeks = _.map(wholeProgram, 'shortenedSet');
		console.log("\x1b[46m%s\x1b[0m", 'GET_WEEKS');
		console.log("\x1b[42m%s\x1b[0m", 'CURRENT_PROGRAM_NAME:', program);
		console.log("\x1b[42m%s\x1b[0m", 'PROGRAM_WEEKS:');
		console.table(programWeeks);
		res.send(programWeeks);
	}catch(err){
		next(err);
	}
}

/*
	PATCH
	/nextWeek
	(1)if nextWeek is true, week++ day = 1 else week stays and day++
	(2)returns updated user
*/
exports.nextWeek = (req, res, next) => {
	let user = req.filteredUser;
	const { nextWeek } = req.body;
	try{
		userRealm.write(() => {
			if(nextWeek == true){
				user.state.day = 1;
				user.state.week++;
			}else{
				user.state.day++;
			}
		})
		res.send(user);
	}catch(err){
		next(err);
	}
}

/*
	PATCH
	/selectWeek
	(1)recieves selectedWeek from frontend
	(2)update user's week and reset day to 0
	(3)return corresponding program and updated user
*/
exports.selectWeek = (req, res, next) => {
	let user = req.filteredUser;
	const { selectedWeek }  = req.body;
	let userProgram = user.state.program;
	let selectedProgram = _.find(programs, program => program.name == userProgram);
	selectedProgram = selectedProgram.sets[selectedWeek+''];
	
	console.log("\x1b[46m%s\x1b[0m", 'SELECT_WEEKS');
	console.log("\x1b[42m%s\x1b[0m", 'SELECTED_WEEK:', selectedWeek);
	console.log("\x1b[42m%s\x1b[0m", 'SELECTED_PROGRAM:');
	console.table(selectedProgram);
	try{
		userRealm.write(() => {
			user.state = {
					maxPullups: user.state.maxPullups,
					program: user.state.program,
					currentSet: user.state.currentSet,
					totalPullups: user.state.totalPullups,
					day: 1,
					week: selectedWeek
			}
		});
		res.send({
			user,
			program: selectedProgram
		})
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
			if (user.state) {
				user.state = {
					maxPullups: parseInt(maxPullups),
					program: user.state.program,
					currentSet: user.state.currentSet,
					totalPullups: user.state.totalPullups,
					day: user.state.day,
					week: user.state.week
				};
			} else {
				//user who just signed up doesn't have max pullups set
				user.state = { maxPullups: parseInt(maxPullups) };
			}
		});
		//get pullup programs
		const filteredPrograms = _.filter(programs, obj =>( obj.min <= maxPullups && obj.max >= maxPullups));
		const programsRec = _.map(filteredPrograms, program => {
			return {
				name: program.name,
				instruction: program.instruction.title
			}
		});
		//if user alraedy have set updateMax and chose program
		// console.log(JSON.stringify(user.state));
		// console.log(user.state.program);
		if (user.state.program) {
			const same = _.find(filteredPrograms, obj => user.state.program == obj.name);
			// console.log(same);
			if (same) {
				stay = true;
			}
		}
		console.log("\x1b[46m%s\x1b[0m", 'UPDATE_MAX');
		console.log("\x1b[42m%s\x1b[0m", 'STAY:', stay);
		console.log("\x1b[42m%s\x1b[0m", 'UPDATED_MAX:', maxPullups);
		console.log("\x1b[42m%s\x1b[0m", 'REC_PROGRAMS_NAMES:', programsRec);
		res.send({
			programs: programsRec,
			stay,
			user
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
				user.state.week = 1;
				user.state.day = 1
			});
			console.log("\x1b[46m%s\x1b[0m", 'DECIDE_PROGRAM');
			console.log("\x1b[42m%s\x1b[0m", 'CHOSEN_PROGRAM:', programName);
			res.send(user);
		} catch (err) {
			next(err);
		}
	}
};

