const express = require('express');
const app = express();
const path = require('path');
const authoController = require('../Controllers/authoController');
const verifyToken = require('../Middlware/verifyToken');
const authenticateApiKey=require('../Middlware/verifyApiKey')

const paymentController = require('../Controllers/paymentController');
const router = express.Router();

router.use(function (req, res, next) {
  res.header(
    'Access-Control-Allow-Headers',
    'x-access-token, Origin, Content-Type, Accept'
  );
  next();
});

router.route('/resetAll').delete(paymentController.resetAll);//reset all files

// Protect all routes after this middleware
router.use(authoController.authenticationJwt);

router.use(paymentController.updateStatusAndPenality);//router.use(authoController.requiredRole('admin'));
router.route('/create/bills').post(paymentController.createUnconfirmedPayments);// Route to create unconfirmed payments (initiated but not yet confirmed)

// ========== Routes for managing payments via the system ==========
router.route('/search').get(paymentController.searchPayments);//search Bank Statement payment
router.route('/confirm').patch(paymentController.confirmPayments);//confirm Bank Statement payment
router.route('/update') .patch(paymentController.editPayments);//update Bank Statement payment

/// ========== Routes for Payments Management for all from Bank and from System ==========
router.route('/getAllPayments').get(paymentController.getAllPayments); // Fetch all payments
router.route('/latestPayment').get(paymentController.getLatestPayment);// Fetch the latest payment
 
router.route('/deletePayment/:id').delete(paymentController.deletePayment);// Delete payment
router.route('/deletePayments').delete(paymentController.deletePayments);// Delete payments
router.route('/penality').get(paymentController.getPenality); // Handle penalties

router.route('/transferFunds')
  .post(authoController.uploadFilesMiddleware,paymentController.createTransferFunds)
  .get(paymentController.getTransferFunds)
router.route('/transferFunds/:id')
  .patch(authoController.uploadFilesMiddleware,paymentController.updateTransferFunds)
  .delete(paymentController.deleteTransferFunds);

// ========== Routes for Reporting ,reciept and Notifications ==========
router.route('/paymentbyMonth').get(paymentController.getPaymentByMonth); // Payments grouped by month (for reports)
router.route('/getNotifications').get(paymentController.getPaymentNotifications); 
router.route('/markPaymentAsSeen/:paymentId').put(paymentController.markPaymentAsSeen); 

router.route('/reports').get(paymentController.reports); // Generate various reports
router.route('/reciept').get(paymentController.generateReceipt); // Generate receipts

// ========== Routes for Balance Calculations ==========
router.route('/userBalance').get(paymentController.calculateUserBalances); // Calculate individual user balances
router.route('/orgBalance').get(paymentController.calculateOrganizationBalances); // Calculate organization balances

// ========== Routes for Data Import and Export ==========
router.post('/importPayments', paymentController.uploadPaymentFile, paymentController.importPayments); // Import payments
router.get('/exportPayments', paymentController.exportPayments); // Export payments

// =====Routes for managing payments via integrated 3rd party BankAPI========
router.route('/search/bills') .get(authenticateApiKey,paymentController.searchBills);//search payments
router.route('/query_more_bill/:paymentTypeIds').get(authenticateApiKey,paymentController.getMoreBills);//getMoreBills
router.route('/c2b-payment-validation-request').post(authenticateApiKey,paymentController.confirmBills);//confirm payment

module.exports = router;
