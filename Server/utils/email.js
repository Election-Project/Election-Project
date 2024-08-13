const nodemailer = require("nodemailer");
const crypto = require("crypto");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: "kior hcmy mspa bjwi",
  },
});

const generateOTP = () => {
  return crypto.randomInt(100000, 999999);
};

const sendOTPEmail = async (email, otp) => {
  const mailOptions = {
    from: "JO_ELECTION",
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
