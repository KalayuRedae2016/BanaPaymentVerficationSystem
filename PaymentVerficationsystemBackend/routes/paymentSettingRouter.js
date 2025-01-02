const express = require('express');
const app = express();
const authoController = require('../Controllers/authoController');
const paymentSettingController = require('../Controllers/paymentSettingController');
const router = express.Router();


// Protect all routes after this middleware
router.use(authoController.authenticationJwt);

router
  .route('/')
  .get(paymentSettingController.getPaymentSetting)
  .post(paymentSettingController.createPaymentSetting)
  .delete(paymentSettingController.deleteSettings);

  router
  .route('/latest')
  .get(paymentSettingController.getLatestPaymentSetting)
router
  .route('/:id')
  .put(paymentSettingController.updatePaymentSettingBYId)
  .delete(paymentSettingController.deleteSetting);

module.exports = router;
