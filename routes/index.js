const express = require('express');
const router = express.Router();

//router
const auth = require('./auth/auth');
const state = require('./state/state');
const session = require('./session/session');
const reflection = require('./reflection/reflection');

//Middleware
const verifyToken = require('../lib/middleware/jwtMiddleware')
const getUserById = require('../lib/middleware/getUserById');
var path = require('path');

// router.post('/auth', (req, res) => {
// 	console.log('REALM');
// 	res.sendFile(path.join(__dirname, '../', 'default.realm.lock'));
// })
// router.get('/', (req, res) => {
// 	require('dns').lookup(require('os').hostname(), function (err, add, fam) {
//   console.log('addr: '+add);
// })
// })
router.use('/auth', auth);
router.use('/state', verifyToken, getUserById, state);
router.use('/session', verifyToken, getUserById, session);
router.use('/reflection', verifyToken, getUserById, reflection)

module.exports = router;
