const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Login route
router.post("/login", authController.login);

// Verify OTP route
router.post("/verify-otp", authController.verifyOTP);

//set new password
router.post("/set-new-password", authController.setNewPassword);

module.exports = router;
