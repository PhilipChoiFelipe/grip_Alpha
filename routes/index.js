const express = require('express');
const router = express.Router();
const auth = require('./auth/auth');
const state = require('./state/state');
const session = require('./session/session');
const verifyToken = require('../lib/middleware/jwtMiddleware')
const getUserById = require('../lib/middleware/getUserById');

router.use('/auth', auth);
router.use('/state', verifyToken, getUserById, state);
router.use('/session', verifyToken, getUserById, session);

module.exports = router;
