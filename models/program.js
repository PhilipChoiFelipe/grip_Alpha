var Realm = require('realm');
const ProgramSchema = {
	name: 'Program',
	properties: {
		name: 'string',
		maxPullups: 'int',
		description: 'string',
		weeks : {type: 'list', objectType: 'Week'}
	}
};

const WeekSchema = {
	name: 'Week',
	properties: {
		week: 'int',
		days: {type: 'list', objectType:'Day'}
	}
}

const DaySchema = {
	name: 'Day',
	properties: {
		day: 'int',
		exercises: {type: 'list', objectType: 'Exercise'}
	}
}

const ExerciseSchema = {
	name: 'Exercise',
	properties: {
		name: 'string',
		qty: 'int',
		set: 'int',
	}
}

