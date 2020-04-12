const express = require('express');
const router = express.Router();
const authCtrl = require('./authCtrl');

//users
router.post('/signUp', authCtrl.signUp, authCtrl.sendVerifyingMail);
router.post('/logIn', authCtrl.logIn);
router.get('/verify/:id', authCtrl.verify);

//admin
router.delete('/delete', authCtrl.removeUsers);
router.get('/users', authCtrl.getUsers);

module.exports = router;