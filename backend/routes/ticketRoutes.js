const express = require('express');
const ticketController = require('../controllers/ticketController');
const router = express.Router();

router
  .route('/')
  .get(ticketController.getAllTickets)
  .post(ticketController.createTicket);

module.exports = router;
