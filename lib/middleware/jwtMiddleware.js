var jwtVerify = require('express-jwt');

//Middleware to verify user's token
const verifyToken = jwtVerify({
	secret: process.env.JWT_SECRET
});

module.exports = verifyToken;