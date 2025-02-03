const nodemailer = require('nodemailer');
const catchAsync = require('./catchAsync');

exports.sendEmail = catchAsync(async (options) => {
  // Configure the transporter for Gmail
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: process.env.EMAIL_HOST,
    port: 587,
    secure: false, //// Use `true` for port 465, `false` for all other port
    auth: {
      user:process.env. EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  // 2) Define the email options
  const mailOptions = {
    from: process.env.EMAIL_HOST,
    to: options.email,
    subject: options.subject,
    text: options.message,
    //html:options.message
  };
  transporter.verify((error, success) => {
    if (error) {
      //console.log(error);
    } else {
      console.log('Server is ready to take our messages');
    }
  });
  return transporter.sendMail(mailOptions)
   
});
