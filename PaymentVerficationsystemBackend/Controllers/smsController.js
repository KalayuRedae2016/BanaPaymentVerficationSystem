// smsController.js

const twilio = require('twilio');
const catchAsync = require('../utils/catchAsync');

const accountSid = 'ACc4a180b7cd44bc274e45be12279f1068';
const authToken = 'f060ff2ba31af34d3a2b5056ececffba';

const client = twilio(accountSid, authToken);

// Controller function to send an SMS notification
exports.sendSMS = catchAsync(async (req, res) => {
    const { phoneNumber, message } = req.query;
    const sms = await client.messages.create({
      body: message,
      from: '+14157693279',
      to: phoneNumber,
    });

   // console.log(`SMS sent: ${sms.sid}`);
    res.status(200).json({ success: true });
 
});