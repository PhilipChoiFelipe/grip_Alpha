const express = require('express');
const router = express.Router();
const stateCtrl = require('./stateCtrl');

router.get('/getWeeks', stateCtrl.getWeeks);
router.patch('/selectWeek', stateCtrl.selectWeek);

router.patch('/nextWeek', stateCtrl.nextWeek);

router.patch('/updateMax', stateCtrl.updateMax);
router.patch('/decideProgram', stateCtrl.decideProgram);

// router.post('/showReflection', stateCtrl.showReflection);
// router.delete('/deleteReflection', stateCtrl.deleteReflection);
// router.patch('/editReflection', stateCtrl.editReflection);


router.get('/check', stateCtrl.check);

module.exports = router;

