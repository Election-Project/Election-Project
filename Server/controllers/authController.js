const jwt = require("jsonwebtoken");
const { User } = require("../models");
const { generateOTP, sendOTPEmail } = require("../utils/email");

let otpStore = {}; // Simple in-memory store for OTPs; consider using a database or Redis in production

exports.login = async (req, res) => {
  const { national_id } = req.body;

  try {
    const user = await User.findOne({ where: { national_id } });
    if (!user) return res.status(404).json({ message: "User not found" });

    const otp = generateOTP();
    otpStore[national_id] = otp;

    await sendOTPEmail(user.email, otp);

    res.status(200).json({ message: "OTP sent to your email" });
  } catch (error) {
    console.error("Error in login:", error); // Log the error details
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.verifyOTP = (req, res) => {
  const { national_id, otp } = req.body;

  try {
    if (otpStore[national_id] !== parseInt(otp, 10)) {
      return res.status(401).json({ message: "Invalid OTP" });
    }

    delete otpStore[national_id]; // OTP is used once

    const user = { national_id };
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1h",
    });

    res.json({ accessToken });
  } catch (error) {
    console.error("Error in verifyOTP:", error); // Log the error details
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.setNewPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const { national_id } = decoded;

    // Find the user
    const user = await User.findOne({ where: { national_id } });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Set and save the new password
    user.password = newPassword; // The `beforeSave` hook will handle hashing
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error in setNewPassword:", error); // Log the error details
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
