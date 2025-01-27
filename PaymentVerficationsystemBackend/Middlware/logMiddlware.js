log = require('../Models/logModel');
exports.logMiddleware = async (req, res, next) => {
    const { method, originalUrl, ip, user, body } = req;
    console.log(req)
    // Basic information about the request
    const logData = {
      model: 'request',
      action: `${method} ${originalUrl}`,
      actor: user?.id || 'anonymous',
      description: 'Request received',
      data: {
        body,
      },
      ipAddress: ip,
      severity: 'info',
      sessionId: req.sessionID || null,
    };

    // Save the log
    const log = new log(logData);
    await log.save();
    next();
};


//Simplified Version for the above middleware
// exports.log = (req, res, next) => {
//   const { body, path } = req;

//   const activity = {
//     '/api/payment/verify': 'Payment Verification',
//     '/api/user/register': 'User Registration',
//     '/api/user/login': 'User Authentication',
//     '/api/setting/update': 'Setting Update',
//     '/api/setting/request': 'Setting Request'
//   }[path];

//   if (activity) {
//     const log = new Log({
//       activity,
//       details: body
//     });

//     log.save()
//       .then(() => console.log(`${activity} logged`))
//       .catch(err => console.error(`Failed to log ${activity}:`, err));
//   }

//   next();
// };
