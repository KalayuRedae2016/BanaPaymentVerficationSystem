const express = require('express');
const app = express();
const multer = require('multer');
const path = require('path');
const authoController = require('../Controllers/authoController');
const verifyToken = require('../Middlware/verifyToken');
const paymentController = require('../Controllers/paymentController');

const router = express.Router();

router.use(function (req, res, next) {
  res.header(
    'Access-Control-Allow-Headers',
    'x-access-token, Origin, Content-Type, Accept'
  );
  next();
});

// Route to create unconfirmed payments (initiated but not yet confirmed)
router.route('/create/bills').post(paymentController.createUnconfirmedPayments);


// =====Routes for managing payments via integrated 3rd party BankAPI========
router
  .route('/search/bills') //search payments
  .get(paymentController.searchBills);
router
  .route('/query_more_bill/:paymentTypeIds')//getMoreBills
  .get(paymentController.getMoreBills);
router
  .route('/c2b-payment-validation-request') //confirm payment
  .post(paymentController.confirmBills);


// ========== Routes for managing payments via the system ==========
router
  .route('/search') //search payments
  .get(paymentController.searchPayments);
router
  .route('/confirm') //confirm Bank Statement payment
  .patch(paymentController.confirmPayments);

  router
  .route('/update') //update Bank Statement payment
  .patch(paymentController.updatePayments);

// ========== Routes for handling fund transfers, penalties, and receipts =========
router.route('/transferFunds').post(paymentController.transferFunds);
router.route('/penality').get(paymentController.getPenality);
router.route('/reciept').get(paymentController.generateReceipt); 


// ========== Routes for generating reports and calculating balances ==========
router.route('/reports').get(paymentController.reports);
router.route('/userBalance').get(paymentController.calculateUserBalances);
router.route('/orgBalance').get(paymentController.calculateOrganizationBalances);
router.route('/paymentbyMonth').get(paymentController.getPaymentByMonth);// Route to get payments grouped by month (for reporting purposes
router.route('/getAllPayments').get(paymentController.getAllPayments);
router.route('/latestPayment').get(paymentController.getLatestPayment);
router.get('/paymentnotifications', paymentController.handlePaymentNotifications);


// ========== Routes for importing and exporting payments data ==========
router.post('/importPayments',paymentController.uploadPaymentFile,paymentController.importPayments);
router.get('/exportPayments', paymentController.exportPayments);

module.exports = router;
