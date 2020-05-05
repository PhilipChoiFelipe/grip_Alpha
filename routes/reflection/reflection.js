const express = require('express');
const router = express.Router();
const reflectionCtrl = require('./reflectionCtrl');


router.get('/getReflections', reflectionCtrl.getReflections);
router.post('/getDayReflection', reflectionCtrl.getDayReflection);
router.post('/writeReflection', reflectionCtrl.writeReflection);
router.patch('/editReflection', reflectionCtrl.editReflection);
router.delete('/deleteReflection', reflectionCtrl.deleteReflection);
// router.post('/getQuote', sessionCtrl.getQuote);

module.exports = router;