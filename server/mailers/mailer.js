// mailer.js
const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE, 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Optional: Verify the connection on startup
transporter.verify(function (error, success) {
  if (error) {
    console.error('❌ Error connecting to email server:', error.message);
  } else {
    console.log('✅ Mailer is ready to send messages.');
  }
});

module.exports = transporter;
