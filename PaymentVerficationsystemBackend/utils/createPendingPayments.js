const PaymentSetting = require('../Models/paymentSettingModel');
const Payment = require('../Models/paymentModel');
const AppError = require('../utils/appError');

const createPendingPayments = async (user, activeYear, activeMonth) => {

  const paymentSetting = await PaymentSetting.findOne({ activeYear, activeMonth });
  if (!paymentSetting) {
    throw new AppError('Payment setting not found for the current active month and year', 404);
  }
  const { regularAmount, urgentAmount, subsidyAmount, serviceAmount, regFeeRate } = paymentSetting;

  let paymentTypeCode;
  let baseAmount;
  if (!urgentAmount && !subsidyAmount) {
    paymentTypeCode = 'RE-SE';
    baseAmount = regularAmount + serviceAmount;
  } else if (!urgentAmount) {
    paymentTypeCode = 'RE-SE-SU';
    baseAmount = regularAmount + serviceAmount + subsidyAmount;
  } else if (!subsidyAmount) {
    paymentTypeCode = 'RE-SE-EM';
    baseAmount = regularAmount + serviceAmount + urgentAmount;
  } else {
    paymentTypeCode = 'RE-SE-EM-SU';
    baseAmount = regularAmount + serviceAmount + urgentAmount + subsidyAmount;
  }

  const existingPayment = await Payment.findOne({
    user: user._id,
    paymentSetting: paymentSetting._id
  });

  if (existingPayment) {
    if (existingPayment.isPaid === true) {
      // console.log('payment for the specifed month and years is Paid for user:', user.userCode);
    }
    else {
      // console.log('Unconfirmed payment already exists for user:', user.userCode);
    }
    return; // Skip this user if an unconfirmed payment exists
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
  const billCode = `${user.userCode}-${activeYear}-${activeMonth}-${paymentTypeCode}`;

  // Create the payment record
  const payment = new Payment({
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
    service: { amount:totalServiceAmount},
    penality: { amount: 0 },
    baseAmount,
    totalExpectedAmount,
    daysLate: 0,
    confirmedDate: null,
    isPaid: false,
    status: 'pending',
  });
  // console.log("unconfirmed Payment created for user:", user.userCode)
  await payment.save();
};
module.exports = createPendingPayments;
