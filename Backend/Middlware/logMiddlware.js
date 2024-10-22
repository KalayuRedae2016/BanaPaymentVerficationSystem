const Log = require('../Models/logModel');
exports.log = (req, res, next) => {
  if (req.path === '/api/pa/verify') {
    const { paymentId, amount } = req.body;

    const log = new Log({
      activity: 'Payment Verification',
      details: { paymentId, amount },
    });

    log
      .save()
      .then(() => console.log('Payment verification logged'))
      .catch((err) =>
        console.error('Failed to log payment verification:', err)
      );
  } else if (req.path === '/api/user/register') {
    const { username, email } = req.body;

    const log = new Log({
      activity: 'User Registration',
      details: { username, email },
    });

    log
      .save()
      .then(() => console.log('User registration logged'))
      .catch((err) => console.error('Failed to log user registration:', err));
  } else if (req.path === '/api/v1/users/signup') {
    const { username } = req.body;

    const log = new Log({
      activity: 'User Authentication',
      details: { username },
    });

    log
      .save()
      .then(() => console.log('User authentication logged'))
      .catch((err) => console.error('Failed to log user authentication:', err));
  } else if (req.path === '/api/setting/update') {
    const { settingId, value } = req.body;

    const log = new Log({
      activity: 'Setting Update',
      details: { settingId, value },
    });

    log
      .save()
      .then(() => console.log('Setting update logged'))
      .catch((err) => console.error('Failed to log setting update:', err));
  } else if (req.path === '/api/setting/request') {
    const { settingId } = req.body;

    const log = new Log({
      activity: 'Setting Request',
      details: { settingId },
    });

    log
      .save()
      .then(() => console.log('Setting request logged'))
      .catch((err) => console.error('Failed to log setting request:', err));
  } else if (req.path === '/api/v1/users') {
    const { users } = req.body;
    const log = new Log({
      activity: 'User Export',
      details: users,
    });

    log
      .save()
      .then(() => console.log('User export logged'))
      .catch((err) => console.error('Failed to log user export:', err));
  }

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
