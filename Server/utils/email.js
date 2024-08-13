const nodemailer = require("nodemailer");
const crypto = require("crypto");

const transporter = nodemailer.createTransport({
  service: "Gmail", // or another email service
  auth: {
    user: "islamomarhafith@gmail.com",
    pass: "Islam2003@",
  },
});

const generateOTP = () => {
  return crypto.randomInt(100000, 999999); // Generate a 6-digit OTP
};

const sendOTPEmail = async (email, otp) => {
  const mailOptions = {
    from: "JO_Election@gmail.com",
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP code is ${otp}`,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending OTP email:", error); // Log the error details
    throw error;
  }
};

module.exports = { generateOTP, sendOTPEmail };
