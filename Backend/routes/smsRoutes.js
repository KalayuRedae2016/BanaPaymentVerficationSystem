// routes.js

const express = require('express');
const smsController = require('../Controllers/smsController');

const router = express.Router();

// Route to send an SMS notification
router.post('/sendSms', smsController.sendSMS);

module.exports = router;