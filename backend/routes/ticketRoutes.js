const express = require("express");
const ticketController = require("../controllers/ticketController");
const authController = require("./../controllers/authController");
const router = express.Router();

router
  .route("/")
  .get(authController.protect, ticketController.getAllTickets)
  .post(
    authController.protect,
    ticketController.uploadTicketFiles,
    ticketController.createTicket
  );

router
  .route("/:id")
  .get(authController.protect, ticketController.getTicket)
  .patch(authController.protect, ticketController.updateTicket);

module.exports = router;
