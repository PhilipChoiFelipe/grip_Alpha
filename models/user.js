var Realm = require('realm');
const UserSchema = {
	name: 'User',
	primaryKey: 'id',
	properties: {
		id: 'string',
		auth: {type: 'Auth'},
		state: {type: 'State'},
		summary: {type: 'list', objectType: 'Reflection'}
	}
};

const AuthSchema = {
	name: 'Auth',
	properties: {
		email: 'string',
		username: 'string',
		hashedPassword: 'string',
		activated: { type: 'bool', default: false },
		signupDate: 'date',
	}
}

const StateSchema = {
	name: 'State',
	properties: {
		program: {type: 'string', optional: true},
		currentSet: {type: 'int', optional: true},
		totalPullups: {type: 'int', optional: true},
		maxPullups: {type: 'int', optional: true}
	}
};

const ReflectionSchema = {
	name: 'Reflection',
	properties: { 
		finishedDate: 'date',
		formatDate: 'string',
		memo: 'string',
		difficulty: 'int'
	}
}

// Initialize a Realm with Car and Person models
let userRealm = new Realm({
	schema: [UserSchema, AuthSchema, StateSchema, ReflectionSchema],
	schemaVersion: 5,
	migration: function(oldRealm, newRealm) {
		newRealm.deleteAll();
	}
});

module.exports = userRealm;