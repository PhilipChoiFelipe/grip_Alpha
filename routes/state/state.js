const express = require('express');
const router = express.Router();
const stateCtrl = require('./stateCtrl');

router.post('/updateMax', stateCtrl.updateMax);
router.post('/decideProgram', stateCtrl.decideProgram);

// router.post('/showReflection', stateCtrl.showReflection);
router.delete('/deleteReflection', stateCtrl.deleteReflection);
router.patch('/editReflection', stateCtrl.editReflection);


router.get('/check', stateCtrl.check);

module.exports = router;

