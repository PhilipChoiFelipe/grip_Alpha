const express = require('express');
const router = express.Router();
const sessionCtrl = require('./sessionCtrl');

router.post('/writeReflection', sessionCtrl.writeReflection);
router.get('/getProgram', sessionCtrl.getProgram);
// router.post('/getQuote', sessionCtrl.getQuote);

module.exports = router;