const Payment = require('../Models/paymentModel');
const PaymentSetting = require('../Models/paymentSettingModel');
const Organization = require('../Models/organizationModel');
const { formatDate } = require('../utils/formatDate');

exports.fetchAndProcessPayments = async (keyword) => {
  if (!keyword) {
    throw new Error('Keyword is required');
  }

  const searchPattern = new RegExp(keyword, 'i');
  const paymentQuery = {
    $or: [
      { userCode: { $regex: searchPattern } },
      { fullName: { $regex: searchPattern } },
      { firstName: { $regex: searchPattern } },
      { middleName: { $regex: searchPattern } },
      { lastName: { $regex: searchPattern } },
    ],
    isPaid: false,
  };

  const payments = await Payment.find(paymentQuery)
    .populate({
      path: 'user',
      select: 'fullName phoneNumber',
    })
    .lean();

  if (!payments.length) {
    return [];
  }

  const organization = await Organization.findOne().lean();
  if (!organization) {
    throw new Error('Organization not found');
  }

  const processedPayments = await Promise.all(
    payments.map(async (payment) => {
      const paymentSetting = await PaymentSetting.findOne({
        activeYear: payment.activeYear,
        activeMonth: payment.activeMonth,
      }).lean();

      if (!paymentSetting) {
        throw new Error(`Payment settings not found for the year ${payment.activeYear} and month ${payment.activeMonth}.`);
      }

      const paymentDetails = {};
      let totalPenaltyAmount = 0;

      // Types of payments to process
      ['regular', 'urgent', 'subsidy'].forEach((type) => {
        const dueDate = new Date(paymentSetting.endingDate);
        const currentDate = new Date();
        const amountToPay = payment[type]?.amount || 0;
        const isPaid = payment[type]?.isPaid || false;
        let penality = 0;
        let daysLate = 0;

        if (!isPaid && amountToPay > 0) {
          daysLate = Math.max(0, Math.ceil((currentDate - dueDate) / (1000 * 3600 * 24)));
          let penaltyRate = 0;

          if (daysLate > 10) {
            penaltyRate = paymentSetting.penalityLateAbove10Days;
          } else if (daysLate > 5) {
            penaltyRate = paymentSetting.penalityLate10Days;
          } else {
            penaltyRate = paymentSetting.penalityLate5Days;
          }

          penality = amountToPay * penaltyRate;
          totalPenaltyAmount += penality;
        }

        paymentDetails[type] = {
          amount: amountToPay,
          penality: amountToPay ? penality : 0,
          daysLate: amountToPay ? daysLate : 0,
          bankType: payment[type]?.bankType || null,
          TTNumber: payment[type]?.TTNumber || null,
          isPaid: isPaid,
          paidAt: payment[type]?.paidAt ? formatDate(payment[type].paidAt) : null,
        };
      });

      // Additional service and penalty information
      paymentDetails['service'] = {
        amount: payment['service']?.amount || 0,
        daysLate: 'Not Needed',
        penality: 0,
        bankType: payment['service']?.bankType || null,
        TTNumber: payment['service']?.TTNumber || null,
        isPaid: payment['service']?.amount ? payment['service'].isPaid : 'Not Needed',
        paidAt: payment["service"]?.paidAt ? formatDate(payment["service"].paidAt) : null,
      };

      paymentDetails['penality'] = {
        amount: totalPenaltyAmount,
        daysLate: paymentDetails.regular?.daysLate || 0,
        bankType: payment.penality?.bankType || null,
        TTNumber: payment.penality?.TTNumber || null,
        isPaid: payment.penality?.isPaid || false,
        paidAt: payment["penality"]?.paidAt ? formatDate(payment["penality"].paidAt) : null,
      };

      return {
        payment,
        paymentDetails,
        totalPenaltyAmount,
      };
    })
  );

  return { processedPayments, organization };
};