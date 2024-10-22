// smsController.js

const twilio = require('twilio');
const catchAsync = require('../utils/catchAsync');



const twilioSID = process.env.TWILIO_ACCOUNT_SID;
const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;


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