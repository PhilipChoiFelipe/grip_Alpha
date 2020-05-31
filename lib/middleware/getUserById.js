const userRealm = require('../../models/user');
const _ = require('lodash');

//get most updated user data from jwt token verified user. 
const getUserById = (req, res, next) => {
	const { id } = req.user.user;
	try{
		let user = userRealm.objects('User').filtered(`id == "${id}"`)[0];
		
		// console.log('filteredUser', JSON.stringify(user));
		req.filteredUser = user;
		next();
	}catch(err){
		next(err);
	}
}

module.exports = getUserById;