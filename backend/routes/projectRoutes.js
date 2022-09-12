const express = require('express');
const projectController = require('../controllers/projectController');
const authController = require('./../controllers/authController');
const router = express.Router();

router
  .route('/')
  .get(authController.protect, projectController.getAllProjects)
  .post(authController.protect, projectController.createProject);

router.route('/:id').get(authController.protect, projectController.getProject);

module.exports = router;
