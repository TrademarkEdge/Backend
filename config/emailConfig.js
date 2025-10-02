const nodemailer = require("nodemailer");
require("dotenv").config();

// 1. Create transporter first
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // App password
  },
});

// 2. Verify transporter
transporter.verify((error, success) => {
  if (error) {
    console.log("Email config error:", error);
  } else {
    console.log("Email server ready to take messages");
  }
});

module.exports = transporter;
