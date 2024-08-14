const jwt = require("jsonwebtoken");
const { User } = require("../models");
const { generateOTP, sendOTPEmail } = require("../utils/email");
const bcrypt = require("bcryptjs");

let otpStore = {};

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
      expiresIn: "1d",
    });

    res.json({ accessToken });
  } catch (error) {
    console.error("Error in verifyOTP:", error); // Log the error details
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.setNewPassword = async (req, res) => {
  const { newPassword } = req.body;
  const token = req.headers.authorization?.split(" ")[1]; // Extract the token from the Authorization header

  if (!token) {
    return res.status(400).json({ message: "Token is required" });
  }

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

exports.loginWithPassword = async (req, res) => {
  const { national_id, password } = req.body;

  try {
    // Find the user by national_id
    const user = await User.findOne({ where: { national_id } });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid password" });

    // If the password is correct, generate a JWT token
    const tokenPayload = { national_id: user.national_id };
    const accessToken = jwt.sign(
      tokenPayload,
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );

    // Return the access token to the client
    res.status(200).json({ accessToken });
  } catch (error) {
    console.error("Error in loginWithPassword:", error); // Log the error details
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
