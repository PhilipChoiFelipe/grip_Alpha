//RealmDB
const summaryRealm = require('../../models/summary');
const userRealm = require('../../models/user');

const programs = require('../../models/programs');

//util
const Joi = require('@hapi/joi');
const errorHandler = require('../../lib/errorHandler/errorHandler');
const _ = require('lodash');
const formatDate = require('../../lib/formatDate');

/*
	GET
	/getReflections
	(1)returns all user's reflections
*/
exports.getReflections = (req, res, next) => {
    const { id } = req.user.user;
    console.log('user ID:', id);
    try {
        let reflections = summaryRealm.objects('Summary').filtered(`id == "${id}"`)[0].reflection;
		console.log('\x1b[46m%s\x1b[0m', 'GET_REFLECTIONS');
        console.log('\x1b[42m%s\x1b[0m', 'REFLECTIONS:');
		console.table(JSON.parse(JSON.stringify(reflections)));
        res.send(reflections);
    } catch (err) {
        next(err);
    }
};

/*
	POST
	/getOneReflection
	(1)user decide which reflection want to see by selecting date on calendar(formatDate)
	(2)returns reflection on that date from DB
*/
exports.getDayReflection = (req, res, next) => {
    const { formattedDate } = req.body;
    const { id } = req.user.user;
    try {
        let reflections = summaryRealm.objects('Summary').filtered(`id == "${id}"`)[0];
        let targetReflections = reflections.reflection.filtered(`formattedDate == "${formattedDate}"`);
		console.log('\x1b[46m%s\x1b[0m', 'DAY_REFLECTIONS');
        console.log('\x1b[42m%s\x1b[0m', 'REFLECTIONS:');
		console.table(JSON.parse(JSON.stringify(targetReflections)));
        res.send(targetReflections);
    } catch (err) {
        next(err);
    }
};

/*
	POST
	/writeReflection
	(1) user writes memos and difficulty
	(2) updates currentSet / totalPullups
	(3) returns updated reflections
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
    const { id } = req.filteredUser;
    const user = req.filteredUser;
    const { memo, difficulty, programName, finishedSet, week, day } = req.body;
    const { error, value } = schema.validate({
        memo: memo,
        difficulty: difficulty
    });
    console.log('Reflection', 'memo:', memo, 'difficulty', difficulty, 'week', week);
    if (error) {
        next(errorHandler(400, error.message));
    } else {
        const finishedDate = new Date();
		const formattedDate = formatDate(finishedDate);
		let result = summaryRealm.objects('Summary').filtered(`id == "${id}"`)[0];
        summaryRealm.write(() => {
            result.reflection.push({
                finishedDate: finishedDate,
				formattedDate: formattedDate,
                memo: memo,
                difficulty: parseInt(difficulty),
                programName: programName,
                finishedSet: finishedSet,
                week: parseInt(week),
                day: parseInt(day)
            });
        });
        console.log('\x1b[46m%s\x1b[0m', 'WRITE_REFLECTION');
        console.log('\x1b[42m%s\x1b[0m', 'REFLECTION_MEMO:', memo);
        console.log('\x1b[42m%s\x1b[0m', 'REFLECTION_DIFFICULTY:', difficulty);
        console.log('\x1b[42m%s\x1b[0m', 'REFLECTION_DATE:', formattedDate);
        console.log(
            '\x1b[42m%s\x1b[0m',
            'REFLECTION_PROGRAM:',
            programName,
            finishedSet,
            week,
            day
        );
        res.send({
			reflections: result.reflection
        });
    }
};

/*
	PATCH
	/editReflection
	(1)user edits written reflection in clicked date
	(2)returns editted version of reflections
*/

exports.editReflection = (req, res, next) => {
    const { memo, difficulty, date } = req.body;
    let { id } = req.filteredUser;
	console.log(id);
	let reflections = summaryRealm.objects('Summary').filtered(`id == "${id}"`)[0];
    let targetReflection = reflections.reflection.filtered('finishedDate == $0', new Date(date))[0];
    try {
        summaryRealm.write(() => {
            targetReflection.memo = memo;
            targetReflection.difficulty = parseInt(difficulty);
        });
		console.log('\x1b[46m%s\x1b[0m', 'EDIT_REFLECTION');
        console.log('\x1b[42m%s\x1b[0m', 'EDITTED_REFLECTION:');
		console.table(JSON.parse(JSON.stringify(targetReflection)));
        res.send(reflections);
    } catch (err) {
        next(err);
    }
};

/*
	DELETE
	/deleteReflection
	(1)user deletes specific reflection on that date with chosen date
	(2)returns updated user's reflections
*/

exports.deleteReflection = (req, res, next) => {
    const { date } = req.body;
	console.log("DATE:", req.body);
    const { id } = req.filteredUser;
	let reflections = summaryRealm.objects('Summary').filtered(`id == "${id}"`)[0];
    const targetReflection = reflections.reflection.filtered('finishedDate == $0', new Date(date));
    try {
        summaryRealm.write(() => {
            summaryRealm.delete(targetReflection);
        });
        res.send(reflections.reflection);
    } catch (err) {
        next(err);
    }
};