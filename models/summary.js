var Realm = require('realm');

const SummarySchema = {
	name: 'Summary',
	primaryKey: 'id',
	properties: {
		id: 'string',
		reflection: {type: 'list', objectType: 'Reflection'}
	}
};

const ReflectionSchema = {
	name: 'Reflection',
	properties: {
		finishedDate: 'date',
		formattedDate: 'string',
		memo: {type: 'string', optional: true},
		difficulty: {type: 'int', optional: true},
		programName: 'string',
		finishedSet: 'string',
		week: 'int',
		day: 'int',
		pullupCount: 'int'
	}
}

// Realm.open({
//   path: 'summary.realm',
//   schema: [SummarySchema, ReflectionSchema]
// }).then(console.log('OPENED SUMMARY REALM'));

let summaryRealm = new Realm({
	path: './realmDB/summary.realm',
	schema: [SummarySchema, ReflectionSchema],
	schemaVersion: 2,
	migration: function(oldRealm, newRealm) {
		newRealm.deleteAll();
	}
});




module.exports = summaryRealm;