// // smsController.js

// const twilio = require('twilio');
// const catchAsync = require('../utils/catchAsync');

// const twilioSID = process.env.TWILIO_ACCOUNT_SID;  // Twilio Account SID from env
// const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;  // Twilio Auth Token from env
// const twilioNumber = process.env.TWILIO_NUMBER;  // Twilio Number from env

// // Initialize Twilio client with credentials from environment variables
// const client = twilio(twilioSID, twilioAuthToken);

// // Controller function to send an SMS notification
// exports.sendSMS = catchAsync(async (req, res) => {
//     const { phoneNumber, message } = req.query;

//     const sms = await client.messages.create({
//         body: message,
//         from: twilioNumber,
//         to: phoneNumber,
//     });

//     // Optional: Logging the SMS SID for reference
//     // console.log(`SMS sent: ${sms.sid}`);

//     res.status(200).json({ success: true });
// });
