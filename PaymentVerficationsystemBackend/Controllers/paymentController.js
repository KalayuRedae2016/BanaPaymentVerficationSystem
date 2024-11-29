const Organization = require('../Models/organizationModel');
const PaymentSetting = require('../Models/paymentSettingModel');
const User = require('../Models/userModel');
const Payment = require('../Models/paymentModel');
const PaymentLog = require('../Models/paymentLog'); // Import the PaymentLog model

const { calculateBalances } = require('../utils/calculateBalances')
const { fetchAndProcessPayments } = require('../utils/paymentUtils');
const { processPaymentItems} = require('../utils/paymentUtils');
const {formatDate}=require("../utils/formatDate")
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const createPendingPayments=require("../utils/createPendingPayments")
const { exportToExcel,importFromExcel,createMulterMiddleware } = require('../utils/excelFileController');
const jwt = require('jsonwebtoken');

const fs = require('fs');
const QRCode = require('qrcode');
const path = require('path');
// Configure multer for payment file uploads
const paymentFileUpload = createMulterMiddleware(
  'uploads/payments/', // Destination folder
  'Payment', // Prefix for filenames
  ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'] // Allowed file types
);
// Middleware for handling single file upload
exports.uploadPaymentFile = paymentFileUpload.single('file');
// Function to create unconfirmed payments

exports.createUnconfirmedPayments = catchAsync(async (req, res, next) => {
  const { activeYear, activeMonth } = req.body;

  // Check if activeYear or activeMonth is missing
  if (!activeYear || !activeMonth) {
    return next(new AppError("Active Year or Active Month is not provided",400))
  }

  // Find all active users
  const users = await User.find({ isActive: true });
  if (users.length === 0) {
    return next(new AppError('Users not found', 404));
  }

  // Initialize counters for results
  let createdCount = 0;
  let existingCount = 0;
  let skippedCount = 0;
  const createdExamples = [];
  const existingExamples = [];
  const skippedExamples = [];

  // Iterate over each user and create unconfirmed payments if they don't exist
  for (const user of users) {
    if (user.role=="Admin") {  
      skippedCount++;
      if (skippedExamples.length < 3) skippedExamples.push(user.userCode); // Limit to 3 user IDs in the response
      continue; // Skip admin users
    }

    const paymentExists = await Payment.findOne({userCode:user.userCode, activeYear, activeMonth}); // Function to check if a payment already exists

    if (paymentExists) {
      existingCount++;
      if (existingExamples.length < 3) existingExamples.push(user.userCode); // Limit to 3 user IDs in the response
    } else {
      await createPendingPayments(user, activeYear, activeMonth); // Create the payment if it doesn't exist
      createdCount++;
      if (createdExamples.length < 3) createdExamples.push(user.userCode); // Limit to 3 user IDs in the response
    }
  }

  // Construct response message based on results
  let message;
  if (createdCount > 0 && existingCount > 0) {
    message = `Unconfirmed payments created for ${createdCount} users (${createdExamples.join(', ')}...), ` +
              `payments already exist for ${existingCount} users (${existingExamples.join(', ')}...), ` +
              `and ${skippedCount} admin users were skipped (${skippedExamples.join(', ')}...).`;
  } else if (createdCount > 0) {
    message = `Unconfirmed payments created successfully for ${createdCount} users (${createdExamples.join(', ')}...). ` +
              `${skippedCount} admin users were skipped (${skippedExamples.join(', ')}...).`;
  } else if (existingCount > 0) {
    message = `Unconfirmed payments already exist for ${existingCount} users (${existingExamples.join(', ')}...). ` +
              `${skippedCount} admin users were skipped ( ${skippedExamples.join(', ')}...).`;
  } else {
    message = `${skippedCount} admin users were skipped, but no payments were created or already exist.`;
  }

  // Return success response
  res.status(200).json({
    status: 'Success',
    message,
  });
});
exports.searchBills = async (req, res) => {
  try {
    const { keyword } = req.query;
    if (!keyword) {
      return res.status(400).json({ message: 'Keyword is required' });
    }

    const searchPattern = new RegExp(keyword, 'i');
    const paymentQuery = {
      $or: [
        { userCode: { $regex: searchPattern } },
        { fullName: { $regex: searchPattern } },
      ],
      isPaid: false,
    };

    const payments = await Payment.find(paymentQuery)
      .populate('user', 'fullName phoneNumber')
      .lean();

    if (!payments.length) {
      return res.status(200).json({
        error: true,
        statusCode: 500,
        items: [],
        message: 'No payments found matching the criteria',
      });
    }

    const organization = await Organization.findOne().lean();
    if (!organization) {
      return res.status(404).json({
        status: 'error',
        message: 'Organization not found',
      });
    }

    const items = [];

    for (const payment of payments) {
      const paymentTypes = ['regular', 'urgent', 'subsidy', 'service', 'penality'];
      const paymentSetting = await PaymentSetting.findOne({
        activeYear: payment.activeYear,
        activeMonth: payment.activeMonth,
      });

      let totalPenality = 0; // Initialize totalPenality here

      for (const type of paymentTypes) {
        if (payment[type] && payment[type].amount&&payment[type].isPaid!=true) {
          const dueDate = new Date(paymentSetting.endingDate);
          const paymentDate = new Date();
          const daysLate = Math.max(0, Math.ceil((paymentDate - dueDate) / (1000 * 3600 * 24)));
          const amountToPay = payment[type].amount;

          // Determine penalty rate based on late days
          const penaltyRate = paymentSetting[
            `penalityLate${daysLate > 10 ? 'Above10' : daysLate > 5 ? '10' : '5'}Days`
          ] || 0;

          // Calculate penalty only if there are late days
          const penalty = amountToPay * (daysLate > 0 ? penaltyRate : 0);

          // Accumulate penalty for totalPenality
          totalPenality += penalty;

          // console.log("Penalty:", penalty);
          // console.log("Amount to Pay:", amountToPay);
          // console.log("Days Late:", daysLate);
          // console.log("Total Penalty:", totalPenality);

          items.push({
            _id: payment._id,
            customerName: payment.user.fullName,
            mobile: payment.user.phoneNumber || '',
            amount: amountToPay,
            penality: type === 'service' ? totalPenality :penalty || 0, // Use accumulated penalty for service type
            servicefee: 0,
            billCCY: 'ETB',
            PaymentTerm: `${type} Payment for active month ${payment.activeMonth} is ${payment.status}`,
            regisitrationFee: type === 'service' ? payment.registrationFee : 0,
            transportationfee: 0,
            otherFee: 0,
            isPaid: payment[type].isPaid,
            orgId: organization._id,
            orgName: organization.companyName,
            customer: payment.user._id,
            customerOrgId: payment.user._id,
            billCode: payment[type]._id,
          });
        }
      }
    }

    return res.status(200).json({
      error: false,
      status: 1,
      items: items,
    });
  } catch (error) {
    console.error('Error searching bills:', error);
    return res.status(500).json({
      error: true,
      items: [],
    });
  }
};
exports.getMoreBills = async (req, res) => {
  try {
    // Extract the payment type IDs from the request parameters
    const paymentTypeIdsArray = req.params.paymentTypeIds.split('*');

    const token = req.headers['token'];
    if (!token) {
      return res
        .status(400)
        .json({ error: true, statusCode: 400, message: 'Token is required' });
    }

    const decoded = jwt.decode(token);
    if (!decoded) {
      return res
        .status(400)
        .json({ error: true, statusCode: 400, message: 'Invalid token' });
    }

    const bankType = decoded.bankName;

    // Build the query to search within each embedded payment type
    const billQuery = {
      isPaid: false,
      $or: paymentTypeIdsArray.map((id) => ({
        $or: [
          { 'urgent._id': id },
          { 'regular._id': id },
          { 'subsidy._id': id },
          { 'service._id': id },
          { 'penality._id': id },
        ],
      })),
    };

    // Retrieve unpaid bills matching the query
    const unPaidBills = await Payment.find(billQuery).lean();

    if (!unPaidBills.length) {
      return res.status(404).json({
        error: true,
        statusCode: 404,
        message: 'No unpaid bills found',
      });
    }

    const organization = await Organization.findOne().lean();
    if (!organization) {
      return res.status(404).json({
        error: true,
        statusCode: 404,
        message: 'Organization not found',
      });
    }

    const billDetails = [];

    // Use for...of loop to handle async/await properly
    for (const bill of unPaidBills) {
      const paymentSetting = await PaymentSetting.findOne({
        activeYear: bill.activeYear,
        activeMonth: bill.activeMonth,
      });

      let totalPenality = 0; // Initialize totalPenality

      for (const type of ['urgent', 'regular', 'subsidy', 'service', 'penality']) {
        const paymentType = bill[type];

        if (paymentType && paymentType.amount) {
          const dueDate = new Date(paymentSetting.endingDate);
          const paymentDate = new Date();
          const daysLate = Math.max(0, Math.ceil((paymentDate - dueDate) / (1000 * 3600 * 24)));
          const amountToPay = paymentType.amount;

          // Determine penalty rate based on late days
          const penaltyRate = paymentSetting[
            `penalityLate${daysLate > 10 ? 'Above10' : daysLate > 5 ? '10' : '5'}Days`
          ] || 0;

          // Calculate penalty only if there are late days
          const penalty = amountToPay * (daysLate > 0 ? penaltyRate : 0);

          // Accumulate penalty for totalPenality
          totalPenality += penalty;
        }

        // Check if paymentType ID matches the request, and it's not paid
        if (paymentType && paymentTypeIdsArray.includes(paymentType._id.toString()) && !paymentType.isPaid) {
          let orgAccountNumber;

          if (type === 'service') {
            orgAccountNumber = organization.serviceBankAccounts.find(
              (account) =>
                account.bankType.toUpperCase() === bankType.toUpperCase()
            );
          } else {
            orgAccountNumber = organization.blockBankAccounts.find(
              (account) =>
                account.bankType.toUpperCase() === bankType.toUpperCase()
            );
          }

          if (!orgAccountNumber) {
            throw new Error(`Bank account not found for bank type: ${bankType}`);
          }

          // Push bill details into the array
          billDetails.push({
            _id: bill._id,
            customerName: bill.fullName,
            amount:type === 'service'
                ? paymentType.amount + bill.registrationFee + totalPenality
                : paymentType.amount,
            billCCY: 'ETB',
            paymentTerm: `${
              type.charAt(0).toUpperCase() + type.slice(1)
            } Payment for active month ${bill.activeMonth} is ${bill.status}`,
            isPaid: paymentType.isPaid,
            orgId: organization._id,
            orgName: organization.companyName,
            customer: bill.user,
            customerOrgId: 0,
            billCode: paymentType._id,
            orgAccountNumber: orgAccountNumber.bankAccountNumber,
          });
        }
      }
    }

    // Return the bill details
    res.status(200).json({
      error: false,
      statusCode: 200,
      items: billDetails,
    });
  } catch (error) {
    console.error('Error fetching bills:', error);
    res.status(500).json({
      error: true,
      statusCode: 500,
      items: [],
      message: error.message,
    });
  }
};
exports.confirmBills = async (req, res) => {
  try {
    const { token } = req.headers;
    const transactions = req.body; // Array of transactions
    if (!token) {
      return res.status(400).json({ error: 'Token not provided' });
    }
    if (!Array.isArray(transactions) || transactions.length === 0) {
      return res.status(400).json({ error: 'No transactions provided' });
    }

    // Validate each transaction for missing fields
    const missingFieldsArray = transactions.map((transaction, index) => {
      const missingFields = [];
      if (!transaction.transType) missingFields.push('transType');
      if (!transaction.amount) missingFields.push('amount');
      if (!transaction.transactionNumber) missingFields.push('transactionNumber');
      if (!transaction.billCode) missingFields.push('billCode');
      
      if (missingFields.length > 0) {
        return `Transaction ${index + 1} is missing: ${missingFields.join(', ')}`;
      }
      return null;
    }).filter(Boolean);

    if (missingFieldsArray.length > 0) {
      return res.status(400).json({
        error: 'Some transactions have missing or empty fields: ',
        details: missingFieldsArray
      });
    }

    // Decode token to get bankName
    const decoded = jwt.decode(token);
    if (!decoded || !decoded.bankName) {
      return res.status(400).json({ error: 'Invalid token' });
    }

    const bankType = decoded.bankName;  // This is the bank from the token

    // Process each transaction
    for (const transaction of transactions) {
      const { transType, amount, transactionNumber, billCode } = transaction;
      
      // Find the corresponding payment document with the matching billCode
      const unpaidBill = await Payment.findOne({
        isPaid: false,
        $or: [
          { 'urgent._id': billCode },
          { 'regular._id': billCode },
          { 'subsidy._id': billCode },
          { 'service._id': billCode },
          { 'penality._id': billCode },
        ],
      });

      if (!unpaidBill) {
        console.error(`Payment with paymentID ${billCode} not found`);
        continue;
      }

      // Determine which subdocument (urgent, regular, subsidy, service, penality) to update
      let subdocumentField;
      if (unpaidBill.urgent && unpaidBill.urgent._id == billCode) {
        subdocumentField = 'urgent';
      } else if (unpaidBill.regular && unpaidBill.regular._id == billCode) {
        subdocumentField = 'regular';
      } else if (unpaidBill.subsidy && unpaidBill.subsidy._id == billCode) {
        subdocumentField = 'subsidy';
      } else if (unpaidBill.service && unpaidBill.service._id == billCode) {
        subdocumentField = 'service';
      } else if (unpaidBill.penality && unpaidBill.penality._id == billCode) {
        subdocumentField = 'penality';
      } else {
        console.error(`Subdocument with PaymentId ${billCode} not found`);
        continue;
      }
      // Check if the payment type is already paid
      if (unpaidBill[subdocumentField].isPaid) {
        console.log(`${subdocumentField} payment is already paid for billCode: ${billCode}`);
        // continue; // Skip this payment type if it's already paid
        return res.status(500).json({
          error: true,
          statusCode: 500,
          ResultCode: 0,
          message: `${subdocumentField} payment is already paid for billCode: ${billCode}`
        });
      }
      if(subdocumentField==="service"){
        const serviceAmount = unpaidBill.service.amount
        const penalityAmount = amount - serviceAmount - unpaidBill.registrationFee;

        console.log(unpaidBill.registrationFee)
        console.log(serviceAmount)
        console.log(penalityAmount)

        unpaidBill["service"].amount = serviceAmount;
        unpaidBill["service"].bankType = bankType;
        unpaidBill["service"].TTNumber = transactionNumber;
        unpaidBill["service"].penalty = unpaidBill["service"].penalty || 0;
        unpaidBill["service"].isPaid = true;
        unpaidBill["service"].paidAt = new Date();
        unpaidBill["service"].daysLate = unpaidBill["service"].daysLate || 0;

        unpaidBill["penality"].amount = penalityAmount;
        unpaidBill["penality"].bankType = bankType;
        unpaidBill["penality"].TTNumber = transactionNumber;
        unpaidBill["penality"].penalty = unpaidBill["penality"].penalty || 0;
        unpaidBill["penality"].isPaid = true;
        unpaidBill["penality"].paidAt = new Date();

        // Ensure daysLate is always a number
        unpaidBill["penality"].daysLate = unpaidBill["penality"].daysLate || 0;
      }else{
      // Update fields in the subdocument directly in-memory
      unpaidBill[subdocumentField].amount = amount;
      unpaidBill[subdocumentField].bankType = bankType;
      unpaidBill[subdocumentField].TTNumber = transactionNumber;
      unpaidBill[subdocumentField].penalty = unpaidBill[subdocumentField].penalty || 0;
      unpaidBill[subdocumentField].isPaid = true;
      unpaidBill[subdocumentField].paidAt = new Date();
      // Ensure daysLate is always a number
      unpaidBill[subdocumentField].daysLate = unpaidBill[subdocumentField].daysLate || 0;
      // Save the updated bill
      }
      await unpaidBill.save();

      // Filter out payment types that have a non-zero amount
      const paymentsToCheck = [
        unpaidBill.urgent,
        unpaidBill.regular,
        unpaidBill.subsidy,
        unpaidBill.service,
        unpaidBill.penality,
      ].filter(payment => payment.amount > 0);

      // Check if all relevant payment types (with non-zero amounts) are paid
      const allPaid = paymentsToCheck.every(payment => payment.isPaid);

      if (allPaid) {
        // Generate QR code content
        const qrContent = JSON.stringify({
          billCode: unpaidBill.billCode,
          userCode: unpaidBill.userCode,
          fullName: unpaidBill.fullName,
          totalAmount: unpaidBill.totalExpectedAmount,
          confirmedDate: new Date().toISOString(),
        });

        // Ensure no other payments are marked as latest
        const latestPayments = await Payment.find({ latest: true });
        if (latestPayments) {
          for (const payment of latestPayments) {
            payment.latest = false;
            await payment.save();
          }
        }

        // Generate QR code as data URL
        const qrCodeDataUrl = await QRCode.toDataURL(qrContent);

        // Convert data URL to a buffer
        const base64Data = qrCodeDataUrl.replace(/^data:image\/png;base64,/, '');
        const buffer = Buffer.from(base64Data, 'base64');

        // Directory to save QR code images
        const qrCodesDir = path.join(__dirname, 'qr_codes');
        if (!fs.existsSync(qrCodesDir)) {
          fs.mkdirSync(qrCodesDir);
        }

        // Define the file name and path
        const fileName = `qr_${billCode}.png`;
        const filePath = path.join(qrCodesDir, fileName);

        // Save the buffer to a file
        fs.writeFileSync(filePath, buffer);

        // Return the URL where the QR code is accessible
        const qrCodeUrl = `/qr_codes/${fileName}`;

        // Update the unpaid bill with the QR code URL and other details
        unpaidBill.barCode = qrCodeUrl;
        unpaidBill.isPaid = true;
        unpaidBill.status = 'confirmed';
        unpaidBill.confirmedDate = new Date();
        unpaidBill.latest = true;
      }

      // Save the updated bill
      await unpaidBill.save();
    }

    // Send success response after processing all transactions
    res.status(200).json({
      error: false,
      statusCode: 200,
      ResultCode: 0,
      message: 'Payment types updated successfully',
      items: transactions,
    });
  } catch (error) {
    console.error('Error confirming payments:', error);
    res.status(500).json({
      error: true,
      statusCode: 500,
      ResultCode: 0,
      message: error.message,
    });
  }
};

exports.searchPayments = catchAsync(async (req, res, next) => {
  const { keyword,isPaid} = req.query;
  if (!keyword) {
    return next(new AppError('Keyword is required', 400));
  }
  const searchPattern = new RegExp(keyword, 'i');
  const paymentQuery = {
    $or: [
      { userCode: { $regex: searchPattern } },
      { billCode: { $regex: searchPattern } },
      { fullName: { $regex: searchPattern } },
      { firstName: { $regex: searchPattern } },
      { middleName: { $regex: searchPattern } },
      { lastName: { $regex: searchPattern } },
    ],
    isPaid:false//for status:pending or status: overdue
  };
  if (isPaid) paymentQuery.isPaid=isPaid
  const payments = await Payment.find(paymentQuery)
    .populate({
      path: 'user',
      select: 'fullName',
    })
    .sort({ activeMonth: 1 });

  if (!payments.length) {
    return res.status(200).json({
      error: true,
      statusCode: 500,
      status: 1,
      items: [],
      message: 'No payments found matching the criteria',
    });
  }

  
  const paymentDetails = await Promise.all(
    payments.map(async (payment) => {
      const paymentDetails = {};
      let totalPenaltyAmount = 0;
      // let totalExpectedAmount = payment.totalExpectedAmount; // Start with the registration fee
      // let baseAmount = payment.baseAmount;
      const paymentTypeSettings = await PaymentSetting.findOne({activeYear:payment.activeYear,activeMonth:payment.activeMonth});

      ['regular', 'urgent', 'subsidy'].forEach((type) => {
        const amountToPay = payment[type].amount || 0;
        const isPaid = payment[type].isPaid || false;
        let penality = 0;
        let daysLate = 0;

        if (!isPaid && paymentTypeSettings && amountToPay > 0) {
          const dueDate = new Date(paymentTypeSettings.endingDate);
          const paymentDate = new Date();
          daysLate = Math.max(0,Math.ceil((paymentDate - dueDate) / (1000 * 3600 * 24)));
          let penaltyRate = 0;
          if (daysLate > 0) {
            if (daysLate > 10) {
              penaltyRate = paymentTypeSettings.penalityLateAbove10Days;
            } else if (daysLate > 5) {
              penaltyRate = paymentTypeSettings.penalityLate10Days;
            } else {
              penaltyRate = paymentTypeSettings.penalityLate5Days;
            }

            penality = amountToPay * penaltyRate;
            
          }

          totalPenaltyAmount += penality;
          //totalExpectedAmount += totalPenaltyAmount;
        }

        paymentDetails[type] = {
          amount: amountToPay,
          penality: amountToPay ? penality : 0,
          daysLate: amountToPay ? daysLate : 0,
          bankType: payment[type].bankType || null,
          TTNumber: payment[type].TTNumber || null,
          isPaid: amountToPay ? isPaid : 'Not Needed',
          paidAt: payment[type].paidAt?formatDate(payment[type].paidAt):null,
        };

        paymentDetails['service'] = {
          amount: payment['service'].amount || 0,
          daysLate: 'Not Needed',
          penality: 0,
          bankType: payment['service'].bankType || null,
          TTNumber: payment['service'].TTNumber || null,
          isPaid: payment['service'].amount? payment['service'].isPaid:'Not Needed',
          paidAt: payment["penality"].paidAt?formatDate(payment["penality"].paidAt):null,
        };

        paymentDetails['penality'] = {
          amount: totalPenaltyAmount,
          daysLate: paymentDetails.regular.daysLate || 0,
          bankType: payment.penality.bankType || null,
          TTNumber: payment.penality.TTNumber || null,
          isPaid: payment.penality.isPaid || false,
          paidAt: payment["penality"].paidAt?formatDate(payment["penality"].paidAt):null,
        };
      });
      // let baseAmount=payment.baseAmount
      // let totalExpectedAmount=payment.totalExpectedAmount+totalPenaltyAmount
      return {
        id: payment._id,
        billCode: payment.billCode,
        fullName: payment.fullName,
        userCode: payment.userCode,
        activeYear: payment.activeYear,
        activeMonth: payment.activeMonth,
        paymentSelected: false, // Only for frontend
        regular: paymentDetails.regular,
        urgent: paymentDetails.urgent,
        subsidy: paymentDetails.subsidy,
        service: paymentDetails.service,
        penality: paymentDetails.penality,
        baseAmount: payment.baseAmount,
        registrationFee:payment.registrationFee,
        totalPenality:totalPenaltyAmount,
        totalExpectedAmount: payment.totalExpectedAmount + totalPenaltyAmount,
        isPaid: payment.isPaid,
        status: payment.status,
        latest:payment.latest,
        createdAt:payment.createdAt?formatDate(payment.createdAt):null,
        updatedAt:payment.updatedAt?formatDate(payment.updatedAt):null
      };
    })
  );
  
  console.log(paymentDetails)
  return res.status(200).json({
    error: false,
    statusCode: 200,
    status: 1,
    result:paymentDetails.length,
    fullName: paymentDetails[0].fullName,
    userCode: paymentDetails[0].userCode,
    items:paymentDetails
  });
});
exports.confirmPayments = catchAsync(async (req, res,next) => {
    const { billCode, urgent, regular, subsidy, service, penality } = req.body;

    // Find the unpaid bill by billCode
    const unpaidBill = await Payment.findOne({ isPaid: false, billCode });
    if (!unpaidBill) {
      return res.status(404).json({ error: 'No unpaid bill found' });
    }

    // Function to update specific payment fields if provided
    const updatePaymentField = (existing, updates) => {
      const isPaid = updates.isPaid !== undefined ? updates.isPaid : existing.isPaid;
      const paidAt = isPaid ? existing.paidAt || Date.now() : null;
      return {
        amount: updates.amount ?? existing.amount,
        bankType: isPaid ? updates.bankType ?? existing.bankType : null,
        TTNumber: isPaid ? updates.TTNumber ?? existing.TTNumber : null,
        penality: updates.penality ?? existing.penality,
        isPaid,
        paidAt,
        daysLate: updates.daysLate ?? existing.daysLate,
      };
    };

    // Update specific payment fields if provided
    if (urgent) unpaidBill.urgent = updatePaymentField(unpaidBill.urgent, urgent);
    if (regular) unpaidBill.regular = updatePaymentField(unpaidBill.regular, regular);
    if (subsidy) unpaidBill.subsidy = updatePaymentField(unpaidBill.subsidy, subsidy);
    if (service) unpaidBill.service = updatePaymentField(unpaidBill.service, service);
    if (penality) unpaidBill.penality = updatePaymentField(unpaidBill.penality, penality);

    // Filter out payment types that have a non-zero amount
    const paymentsToCheck = [
      unpaidBill.urgent,
      unpaidBill.regular,
      unpaidBill.subsidy,
      unpaidBill.service,
      unpaidBill.penality,
    ].filter(payment => payment.amount > 0);

    // Check if all relevant payment types (with non-zero amounts) are paid
    const allPaid = paymentsToCheck.every(payment => payment.isPaid);

    if (allPaid) {
      // Generate QR code content
      const qrContent = JSON.stringify({
        billCode: unpaidBill.billCode,
        userCode: unpaidBill.userCode,
        fullName: unpaidBill.fullName,
        totalAmount: unpaidBill.totalExpectedAmount,
        confirmedDate: new Date().toISOString(),
      });

      const latestPayments=await Payment.find({latest:true});
      if(latestPayments){
      for (const payment of latestPayments) {
        payment.latest=false
        await payment.save();
      }
    }
      // Generate QR code as data URL
      const qrCodeDataUrl = await QRCode.toDataURL(qrContent);

      // Convert data URL to a buffer
      const base64Data = qrCodeDataUrl.replace(/^data:image\/png;base64,/, '');
      const buffer = Buffer.from(base64Data, 'base64');

      // Directory to save QR code images
      const qrCodesDir = path.join(__dirname, 'qr_codes');
      if (!fs.existsSync(qrCodesDir)) {
        fs.mkdirSync(qrCodesDir);
      }

      // Define the file name and path
      const fileName = `qr_${billCode}.png`;
      const filePath = path.join(qrCodesDir, fileName);

      // Save the buffer to a file
      fs.writeFileSync(filePath, buffer);

      // Return the URL where the QR code is accessible
      const qrCodeUrl = `/qr_codes/${fileName}`;

      // Update the unpaid bill with the QR code URL
      unpaidBill.barCode = qrCodeUrl;
      unpaidBill.isPaid = true;
      unpaidBill.status = 'confirmed';
      unpaidBill.confirmedDate = new Date()
      unpaidBill.latest=true
    }

    // Save the updated bill
    await unpaidBill.save();
    const formattedCreatedAt = unpaidBill.createdAt ? formatDate(unpaidBill.createdAt) : null;
    const formattedUpdatedAt = unpaidBill.updatedAt ? formatDate(unpaidBill.updatedAt) : null;
    const formattedConfirmedAt = unpaidBill.confirmedDate ? formatDate(unpaidBill.confirmedDate): null;

    console.log(unpaidBill)
    res.status(200).json({
      message: 'Payment types updated successfully',
      items: {...unpaidBill._doc,
        formattedCreatedAt,
        formattedUpdatedAt,
        formattedConfirmedAt
      }
    });
});
exports.updatePayments = catchAsync(async (req, res,next) => {
    const { billCode, urgent, regular, subsidy, service, penality,isPaid,status} = req.body;

    // Find the unpaid bill by billCode
    const payment = await Payment.findOne({ isPaid: true, billCode });
    if (!payment) {
      return res.status(404).json({ error: 'No Paid bill found' });
    }
    // Function to update specific payment fields if provided
    const updatePaymentField = (existing, updates) => {
      const isPaid = updates.isPaid !== undefined ? updates.isPaid : existing.isPaid;
      const paidAt = isPaid ? formatDate(existing.paidAt)|| Date.now() : null;
      return {
        amount: updates.amount ?? existing.amount,
        bankType: isPaid ? updates.bankType ?? existing.bankType : null,
        TTNumber: isPaid ? updates.TTNumber ?? existing.TTNumber : null,
        penality: updates.penality ?? existing.penality,
        isPaid,
        paidAt,
        daysLate: updates.daysLate ?? existing.daysLate,
      };
    };

    // Update specific payment fields if provided
    if (urgent) payment.urgent = updatePaymentField(payment.urgent, urgent);
    if (regular) payment.regular = updatePaymentField(payment.regular, regular);
    if (subsidy) payment.subsidy = updatePaymentField(payment.subsidy, subsidy);
    if (service) payment.service = updatePaymentField(payment.service, service);
    if (penality) payment.penality = updatePaymentField(payment.penality, penality);

    // Filter out payment types that have a non-zero amount
    const paymentsToCheck = [
      payment.urgent,
      payment.regular,
      payment.subsidy,
      payment.service,
      payment.penality,
    ].filter(payment => payment.amount > 0);

    // Check if all relevant payment types (with non-zero amounts) are paid
    const allPaid = paymentsToCheck.every(payment => payment.isPaid);

    if (allPaid) {
      // Generate QR code content
      const qrContent = JSON.stringify({
        billCode: payment.billCode,
        userCode: payment.userCode,
        fullName: payment.fullName,
        totalAmount: payment.totalExpectedAmount,
        confirmedDate: formatDate(new Date().toISOString()),
      })

    //   const latestPayments=await Payment.find({latest:true});
    //   if(latestPayments){
    //   for (const payment of latestPayments) {
    //     payment.latest=false
    //     await payment.save();
    //   }

    // }
      // Generate QR code as data URL
      const qrCodeDataUrl = await QRCode.toDataURL(qrContent);

      // Convert data URL to a buffer
      const base64Data = qrCodeDataUrl.replace(/^data:image\/png;base64,/, '');
      const buffer = Buffer.from(base64Data, 'base64');

      // Directory to save QR code images
      const qrCodesDir = path.join(__dirname, 'qr_codes');
      if (!fs.existsSync(qrCodesDir)) {
        fs.mkdirSync(qrCodesDir);
      }

      // Define the file name and path
      const fileName = `qr_${billCode}.png`;
      const filePath = path.join(qrCodesDir, fileName);

      // Save the buffer to a file
      fs.writeFileSync(filePath, buffer);

      // Return the URL where the QR code is accessible
      const qrCodeUrl = `/qr_codes/${fileName}`;

      // Update the unpaid bill with the QR code URL
      payment.barCode = qrCodeUrl;
      payment.isPaid = true;
      payment.status = 'confirmed';
      payment.confirmedDate = new Date();
    }else{
      // Update the unpaid bill with the QR code URL
      payment.barCode = null;
      payment.isPaid = false;
      payment.status = 'pending';
      payment.confirmedDate = null;
      payment.latest=false//which one is the latest then

  /// Identify the nearest relevant bill to mark as latest
  const nearestRelevantBill = await Payment.findOne({userCode: payment.userCode,isPaid:true,_id: { $ne: payment._id }, // Exclude the current bill
  }).sort({ paidAt: -1, createdAt: -1 }) .exec();// Sort by paidAt or createdAt, descending
 
  // Assign the latest flag to the nearest relevant bill
  if (nearestRelevantBill) {
    nearestRelevantBill.latest = true;
    await nearestRelevantBill.save();
  }
  // console.log(nearestRelevantBill)
    }
      // Save the updated bill
    await payment.save();

    const formattedCreatedAt = payment.createdAt ? formatDate(payment.createdAt) : null;
    const formattedUpdatedAt = payment.updatedAt ? formatDate(payment.updatedAt) : null;
    const formattedConfirmedAt = payment.confirmedDate ? formatDate(payment.confirmedDate): null;
console.log(payment)
    res.status(200).json({
      message: 'Payment updated successfully',
      items: {...payment._doc,
        formattedCreatedAt,
        formattedUpdatedAt,
        formattedConfirmedAt
      }
    });

});

exports.getPenality = catchAsync(async (req, res,next) => {
    const { paymentType, activeYear, activeMonth, paymentDate } = req.query;
    console.log(paymentType, activeYear, activeMonth, paymentDate);
    // Fetch payment setting
    const paymentSetting = await PaymentSetting.findOne({
      activeYear,
      activeMonth,
    });
    if (!paymentSetting) {
      return res.status(404).json({
        status: 'Error',
        message:`Payment setting not found for the specified ${activeYear} and ${activeMonth}`,
      });
    }
    // Destructure necessary fields from the payment setting
    const {
      penalityLate5Days,
      penalityLate10Days,
      penalityLateAbove10Days,
      endingDate,
      regularAmount,
      urgentAmount,
      subsidyAmount,
      serviceAmount,
    } = paymentSetting;
    // Calculate the days late
    // Set default paymentDate to current date if not provided
  const dueDate = new Date(paymentSetting.endingDate);
  const paymentDateObj = paymentDate ? new Date(paymentDate) : new Date();

    let daysLate = Number(
      Math.ceil((paymentDateObj - dueDate) / (1000 * 3600 * 24))
    );
    daysLate = daysLate > 0 ? daysLate : 0;
    // Calculate the penalty
    let penality, amount;
    // Determine the amount based on the payment type
    switch (paymentType) {
      case 'regular':
        amount = regularAmount;
        break;
      case 'urgent':
        amount = urgentAmount;
        break;
      case 'subsidy':
        amount = subsidyAmount;
        break;
      case 'service':
        amount = serviceAmount;
        break;
      default:
        return res.status(400).json({
          status: 'Error',
          message: 'Invalid payment type',
        });
    }

    // Calculate the penalty based on the days late
    if (daysLate > 0 && daysLate <= 5) {
      penality = amount * penalityLate5Days;
    } else if (daysLate > 5 && daysLate <= 10) {
      penality = amount * penalityLate10Days;
    } else if (daysLate > 10) {
      penality = amount * penalityLateAbove10Days;
    } else {
      penality = 0; // No penalty if not late
    }

    console.log(`Penality:${penality},dasyLate:${daysLate},amount:${amount}`)
    // Send the response
    res.status(200).json({
      status: 'Success',
      dueDate: formatDate(dueDate.toLocaleDateString()),
      paymentDate: formatDate(paymentDateObj.toLocaleDateString()),
      daysLate,
      penality,
      amount,
    });
});
exports.getPaymentByMonth = catchAsync(async (req, res, next) => {
  const { userCode, activeYear, activeMonth } = req.query;

  if (!userCode || !activeYear || !activeMonth) {
    return next(new AppError("either userCode or activeYear or activeMonth is missed, please try again.", 400));
  }

  const searchPattern = new RegExp(userCode, 'i');

  // Construct filter object for querying payments
  const paymentQueryWithYear = {
    userCode: { $regex: searchPattern },
    activeYear: parseInt(activeYear, 10),
    activeMonth: parseInt(activeMonth, 10),
    isPaid: true,
    status: 'confirmed'
  };

  const paymentsWithYear = await Payment.findOne(paymentQueryWithYear);

  if (!paymentsWithYear) {
    return next(new AppError(`No payments for Year ${activeYear}-Month ${activeMonth}`, 400));
  }

  // Convert Mongoose document to plain JavaScript object
  let formattedPayment = paymentsWithYear.toObject();

  const paymentTypes = ['regular', 'urgent', 'subsidy', 'service', 'penality'];

  // Format payment dates and push the payment under the correct status
  paymentTypes.forEach((type) => {
    if (formattedPayment[type]) {
      if (formattedPayment[type].paidAt) {
        formattedPayment[type].paidAt = formatDate(formattedPayment[type].paidAt); // Format paidAt date
      }
      if (formattedPayment[type].createdAt) {
        formattedPayment[type].createdAt = formatDate(formattedPayment[type].createdAt); // Format createdAt date
      }
      if (formattedPayment[type].updatedAt) {
        formattedPayment[type].updatedAt = formatDate(formattedPayment[type].updatedAt); // Format updatedAt date
      }
    }
  });

  // Format general payment-level dates
  if (formattedPayment.createdAt) {
    formattedPayment.createdAt = formatDate(formattedPayment.createdAt); // Format createdAt
  }
  if (formattedPayment.updatedAt) {
    formattedPayment.updatedAt = formatDate(formattedPayment.updatedAt); // Format updatedAt
  }
  if (formattedPayment.confirmedDate) {
    formattedPayment.confirmedDate = formatDate(formattedPayment.confirmedDate); // Format confirmedDate
  }

  console.log(formattedPayment)
  // Respond with the found payments
  res.status(200).json({
    status: 'success',
    message: `Payments fetched successfully for Year ${activeYear}-Month ${activeMonth}`,
    payment: formattedPayment, // This already contains the formatted dates
  });
});
exports.handlePaymentNotifications = catchAsync(async (req, res, next) => {
  const { seen } = req.query; // Get the `seen` parameter from the query

  if (seen === 'false') {
    // Fetch unseen payments
    const unseenPayments = await Payment.find({ seen: false, status: 'confirmed' });

    return res.status(200).json({
      status: 'success',
      message: 'Unseen payments fetched successfully',
      payments: unseenPayments,
    });
  } 
  else if (seen === 'true') {
    // Update all unseen payments to seen
    await Payment.updateMany({ seen: false, status: 'confirmed' }, { seen: true });

    // Fetch all payments (both seen and unseen)
    const allPayments = await Payment.find({ status: 'confirmed' });
console.log(allPayments)
    return res.status(200).json({
      status: 'success',
      message: 'All payments fetched successfully',
      payments: allPayments,
    });
  } else {
    return next(new AppError('Invalid query parameter. Use `seen=false` or `seen=true`.', 400));
  }
});

exports.getAllPayments = catchAsync(async (req, res, next) => {
  const { keyword,isPaid } = req.query;
  if (!keyword) {
    return next(new AppError("Keyword is needed, Please try again <latestPayments or allPayments>"));
  }

  const searchPattern = new RegExp(keyword, 'i');
  const paymentQuery = {};
  if (isPaid) paymentQuery.isPaid=isPaid
  console.log(paymentQuery)
  switch (keyword) {
    case "latestPayments":
      const latestSetting = await PaymentSetting.findOne({ latest: true });
      if (!latestSetting) {
        return next(new AppError("No Latest setting", 400));
      }
      paymentQuery.activeYear = latestSetting.activeYear;
      paymentQuery.activeMonth = latestSetting.activeMonth;
      break;

    case "allPayments":
      // No additional query criteria needed
      break;

    default:
      return res.status(400).json({ error: 'Invalid Keyword -> use(latestPayments or allPayments)' });
  }

  const payments = await Payment.find(paymentQuery);
  if (payments.length === 0) {
    return res.status(200).json({
      status: 'success',
      payments: null,
      message: "No Payments found"
    });
  }

  const formattedPayments = payments.map(payment => {
    const formattedCreatedAt = payment.createdAt ? formatDate(payment.createdAt) : null;
    const formattedUpdatedAt = payment.updatedAt ? formatDate(payment.updatedAt) : null;
    const formattedConfirmedAt = payment.confirmedDate ? formatDate(payment.confirmedDate) : null;

    return {
      ...payment._doc,
      formattedCreatedAt,
      formattedUpdatedAt,
      formattedConfirmedAt
    };
  });

  console.log(formattedPayments)
  res.status(200).json({
    status: 'success',
    message: `${keyword} fetched successfully`,
    payments: formattedPayments
  });
});

exports.getLatestPayment= catchAsync(async (req, res,next) => {
  const { userCode} = req.query;
  const searchPattern = new RegExp(userCode, 'i');
  
  if (!userCode) {
    return next(new AppError( 'User code is missed, please try again.',400))
  }
  const paymentQuery = { userCode: { $regex: searchPattern }, isPaid: true, status: 'confirmed'};
  const payments = await Payment.findOne(paymentQuery);
  if (!payments) {
    return res.status(200).json({ status: 1, message: `${userCode} has no confirmed payment`,payment:null });
  }
  paymentQuery.latest=true
  const latestPayments=await Payment.findOne(paymentQuery)
  if (!latestPayments) {
    return res.status(200).json({
        status: 1,
        message: `${userCode} has no Latest confirmed Payments`,
        payment: null
    });
}
const formattedCreatedAt = latestPayments.createdAt ? formatDate(latestPayments.createdAt) : null;
const formattedUpdatedAt = latestPayments.updatedAt ? formatDate(latestPayments.updatedAt) : null;
const formattedConfirmedAt = latestPayments.confirmedDate ? formatDate(latestPayments.confirmedDate): null;

console.log(latestPayments)
res.status(200).json({
    status: 'success',
    message: `Latest Payments fetched successfully for ${userCode}`,
    payment: {
      ...latestPayments._doc,
      formattedCreatedAt,
      formattedUpdatedAt,
      formattedConfirmedAt
    }
  })
});
exports.deletePayment = catchAsync(async (req, res,next) => {
    const deletedPayment = await Payment.findByIdAndDelete(req.params.id);
    if (!deletedPayment) {
      return next(new AppError("Payment entry not found",404))
    }
    res.status(200).json({
      status: 'success',
      //data: null,
      message:`Payment with ${deletedPayment._id} is Deleted`
    });
});
exports.generateReceipt = catchAsync(async (req, res,next) => {
    const { billCode } = req.query;
    if (!billCode){
      return next(new AppError("BillCode is not provided,Please try again"))
    }
  
    const confirmedpayments = await Payment.find({ billCode: billCode,isPaid:true,status:"confirmed" });
    if (confirmedpayments.length===0) {
      return next(new AppError('Confirmed payment Not found for this bill', 404));
    } 
    const confirmedpayment=confirmedpayments[0]
    // Assuming we are only interested in the first confirmed payment
    const user = await User.findOne({ userCode: confirmedpayment.userCode});
 
    if (!user) {
      return next(new AppError('User Not found for this bill', 404));
    }
    const formattedCreatedAt = confirmedpayment.createdAt ? formatDate(confirmedpayment.createdAt) : null;
    const formattedUpdatedAt = confirmedpayment.updatedAt ? formatDate(confirmedpayment.updatedAt) : null;
    const formattedConfirmedAt = confirmedpayment.confirmedDate ? formatDate(confirmedpayment.confirmedDate): null;

    console.log(confirmedpayment)
    res.status(200).json({
      status:1,
      message: 'Receipt generated successfully',
      confirmedPayment:{
        ...confirmedpayment._doc,
        formattedConfirmedAt,
        formattedCreatedAt,
        formattedUpdatedAt
      }
    })    
});

exports.importPayments = catchAsync(async (req, res,next) => {
    const filePath = req.file.path; // Path to the uploaded file
    await importFromExcel(filePath, Payment);
    res.status(200).send('Data Imported Successfully');
});
exports.exportPayments = catchAsync(async (req, res,next) => {
    const payments = await Payment.find({});
    await exportToExcel(payments, 'Payments', 'paymentData.xlsx', res);
});

exports.calculateUserBalances = catchAsync(async (req, res,next) => {
    const { userCode, activeYear} = req.query;    
    if (!userCode||!activeYear) {
      return next(new AppError('User Code or Active Year has not been provided, please try again.',400))
    }
    
    const searchPattern = new RegExp(userCode, 'i')
    // Construct filter object for querying payments
  const paymentQuery= {
    userCode: { $regex: searchPattern },
    activeYear: parseInt(activeYear, 10),
    isPaid: true,
    status: 'confirmed'
  };
  
  const paymentsWithYear = await Payment.find(paymentQuery);
  if (!paymentsWithYear.length) {
      return next(new AppError(`No payments for Year ${activeYear}`),400)
    }
 
    // Initialize payments breakdown for the specified year
    const paymentsPerYear = paymentsWithYear.map(payment => {
      const regularAmount = payment.regular?.isPaid ? payment.regular.amount : 0;
      const regularPenality = payment.regular?.isPaid ? payment.regular.penalty : 0;
      const urgentAmount = payment.urgent?.isPaid ? payment.urgent.amount : 0;
      const urgentPenality = payment.urgent?.isPaid ? payment.urgent.penalty : 0;

      const subsidyAmount = payment.subsidy?.isPaid ? payment.subsidy.amount : 0;
      const subsidyPenality = payment.subsidy?.isPaid ? payment.subsidy.penalty : 0;

      const serviceAmount = payment.service?.isPaid ? payment.service.amount : 0;
      const servicePenality = payment.service?.isPaid ? payment.service.penalty : 0;

      const penalityAmount = payment.penality?.isPaid ? payment.penality.amount : 0;
      const registrationAmount = payment.registrationFee||0;

      const blockBankAccountPaid = regularAmount + urgentAmount + subsidyAmount;
      const serviceBankAccountPaid = serviceAmount + penalityAmount+registrationAmount;
      const totalAmountPaid = blockBankAccountPaid + serviceBankAccountPaid;
      return {
        userCode:payment.userCode,
        billCode:payment.billCode,
        activeYear:payment.activeYear,
        activeMonth: payment.activeMonth,
        regularAmountPaid: regularAmount,
        regularPenality:regularPenality,

        urgentAmountPaid: urgentAmount,
        urgentPenality:urgentPenality,

        subsidyAmountPaid: subsidyAmount,
        subsidyPenality:subsidyPenality,

        serviceAmountPaid: serviceAmount,
        servicePenality:servicePenality,

        penalityAmountPaid: penalityAmount,
        registrationFee:registrationAmount,

        blockBankAccountPaid,
        serviceBankAccountPaid,
        totalAmountPaid
      };
    });
    
    // Initialize user balance totals for all years
    const userBalances = {
      totalRegistrationPaid:0,
      totalRegularAmountPaid: 0,
      totalUrgentAmountPaid: 0,
      totalSubsidyAmountPaid: 0,
      totalServiceAmountPaid: 0,
      totalPenalityAmountPaid: 0,
      totalBlockBankAccountPaid: 0,
      totalServiceBankAccountPaid: 0,
      totalAmountPaid: 0
    };

    // Calculate balances for all payments (across all years)
    paymentsWithYear.forEach(payment => {
      const regularAmount = payment.regular?.isPaid ? payment.regular.amount : 0;
      const urgentAmount = payment.urgent?.isPaid ? payment.urgent.amount : 0;
      const subsidyAmount = payment.subsidy?.isPaid ? payment.subsidy.amount : 0;
      const serviceAmount = payment.service?.isPaid ? payment.service.amount : 0;
      const penalityAmount = payment.penality?.isPaid ? payment.penality.amount : 0;
      const registrationAmount = payment.registrationFee||0;

      userBalances.totalRegularAmountPaid += regularAmount;
      userBalances.totalUrgentAmountPaid += urgentAmount;
      userBalances.totalSubsidyAmountPaid += subsidyAmount;
      userBalances.totalServiceAmountPaid += serviceAmount;
      userBalances.totalPenalityAmountPaid += penalityAmount;
      userBalances.totalRegistrationPaid+=registrationAmount;

       userBalances.totalBlockBankAccountPaid += regularAmount + urgentAmount + subsidyAmount;
      userBalances.totalServiceBankAccountPaid += serviceAmount + penalityAmount+registrationAmount;
      userBalances.totalAmountPaid +=regularAmount + urgentAmount + subsidyAmount + serviceAmount + penalityAmount+registrationAmount;
        
    });
    
    console.log(`UserBalances:${userBalances},payments:${paymentsPerYear}`)
    res.status(200).json({
      status: 'success',
      message: `User balance report generated for userCode: ${userCode}`,
      userBalances:userBalances,
      payments: paymentsPerYear
    });
});
exports.calculateOrganizationBalances = catchAsync(async (req, res,next) => {
  console.log("reqeust for calculated org balances")
  const payments = await Payment.find({});
  if (!payments.length) {
    return res.status(404).json({ error: 'No payments found for the given criteria' });
  }
  const organization=await Organization.findOne()
  const bankBalances= calculateBalances(payments,organization);
  const organizationBalance=bankBalances.Organization
  // Get the bank type balances for the organization
   const orgBalancesBasedBankType = bankBalances.categorizedPayments.confirmed.bankTypes;
  console.log(organizationBalance)
  console.log(orgBalancesBasedBankType)
  res.status(200).json({
    status: 'success',
    message: `Reports generated for ${organization.companyName}`,
    items:{organizationBalance,
    orgBalancesBasedBankType
    }
  });
});
exports.transferFunds = catchAsync(async (req, res, next) => {
  console.log(req.body)
  const {transferType,fromBankType, toBankType, amount,reason,transferDate} = req.body;

  // Validate input
  if (!transferType||!fromBankType || !toBankType || !amount || !reason||!transferDate) {
    return next(new AppError('Missing required fields for transfer', 400));
  }

  // Validate amount is a positive number
if (typeof amount !== 'number' || amount <= 0) {
  return next(new AppError('Amount must be a positive number', 400));
}

// Validate transferDate is a valid date (optional)
if (isNaN(new Date(transferDate).getTime())) {
  return next(new AppError('Invalid transfer date', 400));
}

  // Fetch the organization document
  const organization = await Organization.findOne();

  // Determine which transfer type it is (block or service)
  //const transferCollection = transferType === 'block' ? 'blockTransfers' : 'serviceTransfers';
  const transferCollection="paymentTransfers"
  const paymentQuery = { isPaid: true, status: 'confirmed' };
  const payments = await Payment.find(paymentQuery);

  // Calculate the balances
  const bankBalances = calculateBalances(payments,organization);
  
  // Get the bank type balances for the transfer type
  const bankTypes = bankBalances.categorizedPayments.confirmed.bankTypes;

  // Determine the balance type to check based on the transfer type
  const balanceType = transferType === 'block' ? 'totalBlockBalance' : 'totalServiceBalance';
  console.log(bankTypes[fromBankType]?.[balanceType] )

  const banks = transferType === 'block' ? organization.blockBankAccounts || [] : organization.serviceBankAccounts || []

// Check if `fromBankType and toBankType` exists in the `blockBankAccounts`
const fromBankExists = banks.some(account => account.bankType === fromBankType);
const toBankExists = banks.some(account => account.bankType === toBankType);

// If either doesn't exist, return a specific error message
if (!fromBankExists) {
  return next(new AppError(`Invalid bank type: ${fromBankType} does not exist`, 400));
}

if (!toBankExists) {
  return next(new AppError(`Invalid bank type: ${toBankType} does not exist`, 400));
}
  // Check if there are sufficient funds in fromBankType
  if ((bankTypes[fromBankType]?.[balanceType] || 0) < amount) {
    return next(new AppError('Insufficient funds', 400));
  }
  // Add the transfer to the organization's transfer collection
  organization[transferCollection].push({
    transferType,
    fromBankType,
    toBankType,
    amount,
    reason,
  });

  // Save the updated organization document
  await organization.save();
  console.log(`Successfully transferred ${amount} from ${fromBankType} to ${toBankType}`,)
  res.status(200).json({
    status: 1,
    message: `Successfully transferred ${amount} from ${fromBankType} to ${toBankType}`,
  });
});
exports.reports = catchAsync(async (req, res,next) => {
    const { paymentType, userCode, fullName, isPaid, status, bankType, year, month, timeRange } = req.query;
    const paymentQuery = {};

    if (paymentType) paymentQuery.paymentType = new RegExp(paymentType, 'i');
    if (userCode) paymentQuery.userCode = new RegExp(userCode, 'i');
    if (fullName) paymentQuery.fullName = new RegExp(fullName, 'i');
    if (isPaid !== undefined) paymentQuery.isPaid = isPaid === 'true';
    if (status) paymentQuery.status = status;
    if (bankType) paymentQuery.bankType = new RegExp(bankType, 'i');

    let startDate, endDate;
    const specifiedYear = parseInt(year, 10);
    const currentDate = new Date();

    switch (timeRange) {
      case 'annually':
        if (!specifiedYear) return res.status(400).json({ error: 'Year is required for yearly time range' });
        startDate = new Date(specifiedYear, 0, 1);
        endDate = new Date(specifiedYear + 1, 0, 1);
        break;
      case 'semiAnnually':
        if (!specifiedYear) return res.status(400).json({ error: 'Year is required for semiannual time range' });
        if (!month || month < 1 || month > 12)
          return res.status(400).json({ error: 'Valid month is required for semiannual time range' });
        startDate = new Date(specifiedYear, month - 1, 1);
        endDate = new Date(specifiedYear, month + 5, 0);
        break;
      case 'monthly':
        if (!specifiedYear || !month)
          return res.status(400).json({ error: 'Year and month are required for monthly time range' });
        startDate = new Date(specifiedYear, month - 1, 1);
        endDate = new Date(specifiedYear, month, 1);
        break;
      case 'weekly':
        const startOfWeek = currentDate.getDate() - currentDate.getDay();
        startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), startOfWeek);
        endDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), startOfWeek + 7);
        break;
      case 'daily':
        startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
        endDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1);
        break;
      case 'allTime':
          startDate = new Date(1970, 0, 1);  // Unix epoch start date (or any other earlier date)
          endDate = new Date();  // Current date
          break;
      default:
        return res.status(400).json({ error: 'Invalid time range' });
    }

    paymentQuery.createdAt = { $gte: startDate, $lt: endDate };
    console.log(paymentQuery)
    const payments = await Payment.find(paymentQuery).populate('user', 'phoneNumber').lean()
    if (!payments.length) {
      return res.status(404).json({ error: 'No payments found for the given criteria' });
    }
    const organization=await Organization.findOne()
    const categorizedPayments = calculateBalances(payments,organization);

    console.log(categorizedPayments)
    res.status(200).json({
      status: 'success',
      message: `Reports generated for ${timeRange}`,
      startDate: startDate.toISOString().slice(0, 10),
      endDate: endDate.toISOString().slice(0, 10),
      totalAllPayments: payments.length,
      items: categorizedPayments,
    });
  });

  