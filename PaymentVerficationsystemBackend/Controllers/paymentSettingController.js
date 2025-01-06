const PaymentSetting = require('../Models/paymentSettingModel');
const Payment = require('../Models/paymentModel');
const User=require("../Models/userModel")

const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const createPendingPayments=require("../utils/createPendingPayments")
const {formatDate,formatDateGC}=require("../utils/formatDate")

exports.createPaymentSetting = catchAsync(async (req, res, next) => {
  const { 
    activeYear, 
    activeMonth, 
    regularAmount, 
    urgentAmount, 
    serviceAmount, 
    subsidyAmount, 
    regFeeRate, 
    penalityLate5Days, 
    penalityLate10Days, 
    penalityLateAbove10Days 
  } = req.body;

  // Validate required fields
  if (!activeYear || !activeMonth || !regularAmount || !serviceAmount || !regFeeRate) {
    return next(new AppError('Please provide Required Fields', 400));
  }

  // Normalize penalty fields
  const normalizeValue = (value) => (value > 1 ? value / 100 : value);

  const normalizedData = {
    ...req.body,
    penalityLate5Days: penalityLate5Days !== undefined ? normalizeValue(penalityLate5Days) : undefined,
    penalityLate10Days: penalityLate10Days !== undefined ? normalizeValue(penalityLate10Days) : undefined,
    penalityLateAbove10Days: penalityLateAbove10Days !== undefined ? normalizeValue(penalityLateAbove10Days) : undefined,
  };

  // Set default startingDate and endingDate if not provided
  let { startingDate, endingDate } = req.body;

  if (!startingDate || !endingDate) {
    startingDate = new Date(Date.UTC(activeYear, activeMonth - 1, 1)); // First day of the month
    endingDate = new Date(Date.UTC(activeYear, activeMonth, 0)); // Last day of the month
  } else {
    startingDate = new Date(startingDate);
    endingDate = new Date(endingDate);
  }

  if (endingDate <= startingDate) {
    return next(new AppError(`Ending Date (${endingDate}) should be greater than Starting Date (${startingDate})!`, 400));
  }

  // Check for existing PaymentSetting for the active year and month
  const existingSetting = await PaymentSetting.findOne({ activeYear, activeMonth });
  if (existingSetting) {
    return next(new AppError(`Payment Setting already exists for Month-${activeMonth}-Year-${activeYear}`, 400));
  }

  // Deactivate all previous "latest" settings
  await PaymentSetting.updateMany({ latest: true }, { $set: { latest: false } });

  // Create a new PaymentSetting
  const newSetting = new PaymentSetting({
    ...normalizedData,
    startingDate,
    endingDate,
    latest: true,
  });

  await newSetting.save();

  // Fetch all active users with the "User" role
  const users = await User.find({ isActive: true, role: "User" });

  // Create pending payments for all users
  for (const user of users) {
    await createPendingPayments(user, newSetting.activeYear, newSetting.activeMonth);
  }

  res.status(200).json({
    status: 1,
    message: `Payment Setting is created for Month-${activeMonth}-Year-${activeYear}.`,
    paymentSetting: newSetting,
  });
});

exports.getPaymentSetting = catchAsync(async (req, res, next) => {
  const { activeYear, activeMonth } = req.query;
  const settingQuery = {};

  // If activeYear or activeMonth is provided, build the query
  if (activeYear) settingQuery.activeYear = activeYear;
  if (activeMonth) settingQuery.activeMonth = activeMonth;

  // Fetch the payment setting based on the query, or get the latest one if no query is provided
  let paymentSettings;
  if (!activeYear && !activeMonth) {
    paymentSettings = await PaymentSetting.findOne().sort({ createdAt: -1 }); // Get the most recent payment setting
  } else {
    paymentSettings = await PaymentSetting.findOne(settingQuery).sort({ createdAt: 1 });
  }

  // Handle case when no payment setting is found
  if (!paymentSettings) {
    return res.status(404).json({
      status: 0,
      message: "No Payment setting found. Please create one first.",
      paymentSetting: null
    });
  }

  // Format the starting and ending dates
  const formattedStartDate = paymentSettings.startingDate ? formatDate(paymentSettings.startingDate) : null;
  const formattedEndDate = paymentSettings.endingDate ? formatDate(paymentSettings.endingDate) : null;

  // console.log(paymentSettings)
  res.status(200).json({
    status: 1,
    message: paymentSettings.activeYear && paymentSettings.activeMonth
      ? `Payment setting for ${paymentSettings.activeMonth}/${paymentSettings.activeYear} fetched successfully.`
      : "Latest payment setting fetched successfully.",
    paymentSetting: {
      ...paymentSettings._doc,
      startingDate:formatDateGC(paymentSettings.startingDate),
      endingDate:formatDateGC(paymentSettings.endingDate),
      penalityLate5Days:paymentSettings.penalityLate5Days*100,
      penalityLate10Days:paymentSettings.penalityLate10Days*100,
      penalityLateAbove10Days:paymentSettings.penalityLateAbove10Days*100,
      formattedStartDate,
      formattedEndDate
    }
  });
});

exports.getLatestPaymentSetting = catchAsync(async (req, res, next) => {
    // Find the payment setting marked as latest
  const latestPaymentSetting = await PaymentSetting.findOne({ latest: true });
    if (!latestPaymentSetting) {
        return res.status(200).json({
            status: 1,
            message: "No latest payment setting found.",
            latestPaymentSetting: null
        });
    }

  const formattedStartDate = latestPaymentSetting.startingDate ? formatDate(latestPaymentSetting.startingDate) : null;
  const formattedEndDate = latestPaymentSetting.endingDate ? formatDate(latestPaymentSetting.endingDate) : null;
  let activate=false
  const today=new Date(formatDateGC(new Date()))
  if(today>new Date(formatDateGC(latestPaymentSetting.endingDate))){
    activate=true
  }

    console.log(latestPaymentSetting)
    res.status(200).json({
        status: 1,
        message: "Latest setting fetched successfullyyyyy.",
        paymentSetting: {
          ...latestPaymentSetting._doc,
          startingDate:formatDateGC(latestPaymentSetting.startingDate),
          endingDate:formatDateGC(latestPaymentSetting.endingDate),
          penalityLate5Days:latestPaymentSetting.penalityLate5Days*100,
          penalityLate10Days:latestPaymentSetting.penalityLate10Days*100,
          penalityLateAbove10Days:latestPaymentSetting.penalityLateAbove10Days*100,
          formattedStartDate,
          formattedEndDate,
          activate
        }
    });
});

exports.updatePaymentSettingBYId = catchAsync(async (req, res,next) => {
    const settingId= req.params.id;
    let updatedData=req.body

    if(!settingId){
      return next(new AppError('Setting ID is required', 404));
    }
    updatedData = normalizePenalties(updatedData);

    if(updatedData.activeMonth && updatedData.activeYear){
    updatedData.startingDate = new Date(Date.UTC(updatedData.activeYear, updatedData.activeMonth-1, 1)); // First day of the month
    updatedData.endingDate = new Date(Date.UTC(updatedData.activeYear, updatedData.activeMonth-1, 30));  // 30th day of the month
    }

    const paymentSetting = await PaymentSetting.findOneAndUpdate({ _id: settingId,latest:true}, updatedData,{ new: true, runValidators: true });
    if (!paymentSetting) {
      return next(new AppError('Payment setting is not found', 404))
    }
  const formattedStartDate = paymentSetting.startingDate ? formatDate(paymentSetting.startingDate) : null;
  const formattedEndDate = paymentSetting.endingDate ? formatDate(paymentSetting.endingDate) : null;

    res.status(200).json({
      status:1,
      message:`Payment Setting is Updated for Month-${paymentSetting.activeMonth}-Year-${paymentSetting.activeYear}`,
      paymentSetting:{
        ...paymentSetting._doc,
        startingDate:formatDateGC(paymentSetting.startingDate),
        endingDate:formatDateGC(paymentSetting.endingDate),
        formattedStartDate,
        formattedEndDate
      }
    });

});

exports.deleteSetting = catchAsync(async (req, res, next) => {
  //const deletedPayment = await Payment.findByIdAndDelete(req.params.id);
  const deletedSetting = await PaymentSetting.findByIdAndDelete(req.query.id)
  if (!deletedSetting) {
    return next(new AppError("Payment entry not found", 404))
  }
  res.status(200).json({
    status: 'success',
    //data: null,
    message: `Payment Deleted`
  });
});
exports.deleteSettings = catchAsync(async (req, res, next) => {
  const deletedSettings = await PaymentSetting.deleteMany({});  // Deletes all documents
  if (deletedSettings.deletedCount === 0) {
    return next(new AppError("No Setting entries found to delete", 404));
  }
  res.status(200).json({
    status: 'success',
    message: `${deletedSettings.deletedCount} Settings Deleted`
  });
});
