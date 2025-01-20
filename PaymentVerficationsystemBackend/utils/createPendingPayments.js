const PaymentSetting = require('../Models/paymentSettingModel');
const Payment = require('../Models/paymentModel');
const AppError = require('../utils/appError');

const createPendingPayments = async (user, activeYear, activeMonth) => {

  const paymentSetting = await PaymentSetting.findOne({ activeYear, activeMonth });
  if (!paymentSetting) {
    throw new AppError('Payment setting not found for the current active month and year', 404);
  }
  const { regularAmount, urgentAmount, subsidyAmount, serviceAmount, regFeeRate } = paymentSetting;

  let paymentTypeCode = 'RE-SE';
  let baseAmount = regularAmount + serviceAmount;

  if (urgentAmount) {
    paymentTypeCode = subsidyAmount ? 'RE-SE-UR-SU' : 'RE-SE-UR';
    baseAmount += urgentAmount;
  } 
  if (subsidyAmount) {
    paymentTypeCode = 'RE-SE-UR-SU';
    baseAmount += subsidyAmount;
  }
  const billCode = `${user.userCode}-${activeYear}-${activeMonth}-${paymentTypeCode}`;

  const existingPayment = await Payment.findOne({
    user: user._id,
    paymentSetting: paymentSetting._id,
    billCode:billCode
  });

  if (existingPayment) {
    return; // Skip creation if an existing payment is found
  }
  
  if (user.role === 'Admin') {  
    return; // Skip Admin users and move to the next user
  }

  let registrationFee = 0;

  if (!user.hasMadepayment) { 
    registrationFee = Number((regFeeRate / 100 * baseAmount).toFixed(2));
    user.hasMadepayment = true;
    await user.save();
  }

  const totalExpectedAmount = baseAmount + registrationFee;
  const totalServiceAmount=serviceAmount+registrationFee
 
  // Create or update the payment (upsert)
  await Payment.updateOne(
    { billCode: billCode }, // Find payment by billCode
    { 
      $setOnInsert: {
        user: user._id,
        paymentSetting: paymentSetting._id,
        userCode: user.userCode,
        billCode,
        fullName: user.fullName,
        activeYear,
        activeMonth,
        registrationFee,
        urgent: { amount: urgentAmount },
        regular: { amount: regularAmount },
        subsidy: { amount: subsidyAmount },
        service: { amount: totalServiceAmount },
        penality: { amount: 0 },
        baseAmount,
        totalExpectedAmount,
        daysLate: 0,
        confirmedDate: null,
        isPaid: false,
        status: 'pending',
      }
    },
    { upsert: true } // Use upsert to insert or update
  );
};

module.exports = createPendingPayments;
