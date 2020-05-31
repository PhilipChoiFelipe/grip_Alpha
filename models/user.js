var Realm = require('realm');
const UserSchema = {
	name: 'User',
	primaryKey: 'id',
	properties: {
		id: 'string',
		auth: {type: 'Auth'},
		state: {type: 'State'},
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
		totalPullups: {type: 'int', optional: true, default: 0},
		maxPullups: {type: 'int', optional: true},
		week:{type: 'int', optional: true},
		day:{type: 'int', optional: true},
	}
};


let userRealm = new Realm({
	path: './realmDB/user.realm',
	schema: [UserSchema, AuthSchema, StateSchema],
	schemaVersion: 7,
	migration: function(oldRealm, newRealm) {
		newRealm.deleteAll();
	}
});

module.exports = userRealm;