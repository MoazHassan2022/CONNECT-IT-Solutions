const express = require("express");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const router = express.Router();

router.post(
  "/signup",
  userController.uploadUserPhoto,
  userController.resizeUserPhoto,
  authController.signup
);
router.post("/login", authController.login);
router.patch(
  "/updateMe",
  authController.protect,
  userController.uploadUserPhoto,
  userController.resizeUserPhoto,
  userController.updateMe
);
router.delete("/deleteMe", authController.protect, userController.deleteMe);
router.get("/myTickets", authController.protect, userController.getMyTickets);

router.route("/").get(userController.getAllUsers); /////////////////////// DELETE WHEN PRODUCTION //////////////////////////

module.exports = router;
