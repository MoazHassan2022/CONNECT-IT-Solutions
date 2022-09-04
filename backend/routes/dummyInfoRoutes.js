const express = require('express');
const dummyController = require('../controllers/dummyInfoController');
const router = express.Router();

router.route('/fives').get(dummyController.getDummyInfo);
router.route('/isAuth').get(dummyController.getIsAuth);

module.exports = router;
