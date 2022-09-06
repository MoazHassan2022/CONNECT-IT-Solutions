const nodemailer = require('nodemailer');
const catchAsync = require('./catchAsync');

const sendEmail = catchAsync(async (options) => {
  // Create a transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // define email options
  const emailOptions = {
    from: 'Admin 1 <admin1@omAhmed2.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
  };
  // actually send the email
  await transporter.sendMail(emailOptions);
});

module.exports = sendEmail;
