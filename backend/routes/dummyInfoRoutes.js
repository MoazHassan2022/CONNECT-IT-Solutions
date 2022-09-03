const express = require('express');
const dummyController = require('../controllers/dummyInfoController');
const router = express.Router();

router.route('/').get(dummyController.getDummyInfo);

module.exports = router;
