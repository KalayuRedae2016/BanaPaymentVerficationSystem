const express = require('express');
const app = express();
const authoController = require('../Controllers/authoController');
const paymentSettingController = require('../Controllers/paymentSettingController');
const router = express.Router();

router
  .route('/')
  .get(paymentSettingController.getOnePaymentSettings)
  .post(paymentSettingController.createPaymentSetting)

  router
  .route('/latest')
  .get(paymentSettingController.getLatestPaymentSetting)
router
  .route('/:id')
  .put(paymentSettingController.updatePaymentSettingBYId)

module.exports = router;
