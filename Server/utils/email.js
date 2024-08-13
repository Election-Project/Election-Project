const nodemailer = require("nodemailer");
const crypto = require("crypto");

// Create a Nodemailer transporter object
const transporter = nodemailer.createTransport({
  service: "gmail", // Service name should be lowercase
  auth: {
    user: process.env.EMAIL_USER,
    pass: "kior hcmy mspa bjwi",
  },
});

// Generate a 6-digit OTP
const generateOTP = () => {
  return crypto.randomInt(100000, 999999);
};

// Send OTP email
const sendOTPEmail = async (email, otp) => {
  const mailOptions = {
    from: "JO_ELECTION", // Use environment variable for sender email
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP code is ${otp}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("OTP email sent successfully");
  } catch (error) {
    console.error("Error sending OTP email:", error);
    throw error;
  }
};

module.exports = { generateOTP, sendOTPEmail };
