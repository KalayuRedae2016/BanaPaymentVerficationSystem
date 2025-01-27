const PaymentSetting = require('../Models/paymentSettingModel');
const Payment = require('../Models/paymentModel');
const User=require("../Models/userModel")

const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const createPendingPayments=require("../utils/createPendingPayments")
const {formatDate,formatDateGC}=require("../utils/formatDate")

exports.createPaymentSetting = catchAsync(async (req, res, next) => {
  const { activeYear, activeMonth, regularAmount, serviceAmount, regFeeRate, penalityLate5Days, penalityLate10Days, penalityLateAbove10Days, startingDate, endingDate } = req.body;

  // Validate required fields
  if (!activeYear || !activeMonth || !regularAmount || !serviceAmount || !regFeeRate) {
    return next(new AppError('Missing Required Fields', 400));
  }

  // Normalize penalties
  const normalizeValue = (value) => (value > 1 ? value / 100 : value);
  const penalties = {
    penalityLate5Days: normalizeValue(penalityLate5Days),
    penalityLate10Days: normalizeValue(penalityLate10Days),
    penalityLateAbove10Days: normalizeValue(penalityLateAbove10Days),
  };

  // Set default dates
  const start = startingDate ? new Date(startingDate) : new Date(Date.UTC(activeYear, activeMonth - 1, 1));
  const end = endingDate ? new Date(endingDate) : new Date(Date.UTC(activeYear, activeMonth, 0));

  if (end <= start) {
    return next(new AppError(`Ending Date (${end}) should be greater than Starting Date (${start})!`, 400));
  }

  // Prevent duplicate settings
  if (await PaymentSetting.findOne({ activeYear, activeMonth })) {
    return next(new AppError(`Payment Setting already exists for Month-${activeMonth}-Year-${activeYear}`, 400));
  }

  // Deactivate previous settings and create new one
  await PaymentSetting.updateMany({ latest: true }, { latest: false });
  const newSetting = await PaymentSetting.create({
    ...req.body,
    ...penalties,
    startingDate: start,
    endingDate: end,
    latest: true,
  });

  /// Create pending payments for all active users
  const users = await User.find({ isActive: true, role: "User" });
  const createPayments = users.map((user) => createPendingPayments(user, activeYear, activeMonth));
  await Promise.allSettled(createPayments);

  await logAction({
    model: 'PaymentSettings',
    action: 'Create',
    actor: req.user.id,
    description: 'PaymentSetting Created',
    data: { settingId: PaymentSetting.id, body: req.body },
    ipAddress: req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress || null,
    severity: 'info',
    sessionId: req.session?.id || 'generated-session-id',
  });

  res.status(200).json({
    status: 1,
    message: `Payment Setting is created for Month-${activeMonth}-Year-${activeYear}.`,
    paymentSetting: newSetting,
  });
});

exports.getPaymentSetting = catchAsync(async (req, res, next) => {
  const { activeYear, activeMonth } = req.query;

  const settingQuery = {};
  if (activeYear) settingQuery.activeYear = activeYear;
  if (activeMonth) settingQuery.activeMonth = activeMonth;

  const paymentSettings = await PaymentSetting.findOne(settingQuery)
    .sort(settingQuery.activeYear || settingQuery.activeMonth ? { createdAt: 1 } : { createdAt: -1 });

  if (!paymentSettings) {
    return res.status(404).json({
      status: 0,
      message: `No Payment setting found for ${activeYear || "any year"}-${activeMonth || "any month"}.`,
      paymentSetting: null,
    });
  }

  const { startingDate, endingDate, penalityLate5Days, penalityLate10Days, penalityLateAbove10Days, ...rest } = paymentSettings._doc;

  res.status(200).json({
    status: 1,
    message: activeYear && activeMonth
      ? `Payment setting for ${activeMonth}/${activeYear} fetched successfully.`
      : "Latest payment setting fetched successfully.",
    paymentSetting: {
      ...rest,
      startingDate: formatDateGC(startingDate),
      endingDate: formatDateGC(endingDate),
      penalityLate5Days: Math.round(penalityLate5Days * 100),
      penalityLate10Days: Math.round(penalityLate10Days * 100),
      penalityLateAbove10Days: Math.round(penalityLateAbove10Days * 100),
      formattedStartDate: startingDate ? formatDate(startingDate) : null,
      formattedEndDate: endingDate ? formatDate(endingDate) : null,
    },
  });
});

exports.getLatestPaymentSetting = catchAsync(async (req, res, next) => {
  const latestPaymentSetting = await PaymentSetting.findOne({ latest: true });

  if (!latestPaymentSetting) {
    return res.status(200).json({
      status: 1,
      message: "No latest payment setting found.",
      latestPaymentSetting: null,
    });
  }

  const today = new Date(formatDateGC(new Date()));
  const { startingDate, endingDate, penalityLate5Days, penalityLate10Days, penalityLateAbove10Days, ...rest } = latestPaymentSetting._doc;

  const formattedStartDate = startingDate ? formatDate(startingDate) : null;
  const formattedEndDate = endingDate ? formatDate(endingDate) : null;
  const activate = today > new Date(formatDateGC(endingDate));

  res.status(200).json({
    status: 1,
    message: "Latest payment setting fetched successfully.",
    paymentSetting: {
      ...rest,
      startingDate: formatDateGC(startingDate),
      endingDate: formatDateGC(endingDate),
      penalityLate5Days: Math.round((penalityLate5Days || 0) * 100),
      penalityLate10Days: Math.round((penalityLate10Days || 0) * 100),
      penalityLateAbove10Days: Math.round((penalityLateAbove10Days || 0) * 100),
      formattedStartDate,
      formattedEndDate,
      activate,
    },
  });
});

exports.updatePaymentSettingBYId = catchAsync(async (req, res, next) => {
  const settingId = req.params.id;
  
  if (!settingId) {
    return next(new AppError('Setting ID is required', 404));
  }

  let updatedData = req.body;
  
  // Function to normalize values (from percentage to decimal)
  const normalizeValue = (value) => (value > 1 ? value / 100 : value);

  // Normalize penalties if provided
  if (updatedData.penalityLate5Days) updatedData.penalityLate5Days = normalizeValue(updatedData.penalityLate5Days);
  if (updatedData.penalityLate10Days) updatedData.penalityLate10Days = normalizeValue(updatedData.penalityLate10Days);
  if (updatedData.penalityLateAbove10Days) updatedData.penalityLateAbove10Days = normalizeValue(updatedData.penalityLateAbove10Days);

  // Set starting and ending dates if activeYear and activeMonth are provided
  if (updatedData.activeYear && updatedData.activeMonth) {
    updatedData.startingDate = new Date(Date.UTC(updatedData.activeYear, updatedData.activeMonth - 1, 1));  // First day of the month
    updatedData.endingDate = new Date(Date.UTC(updatedData.activeYear, updatedData.activeMonth, 0));  // Last day of the month
  }

  // Find and update the payment setting (must be marked as latest)
  const paymentSetting = await PaymentSetting.findOneAndUpdate(
    { _id: settingId, latest: true },
    updatedData,
    { new: true, runValidators: true }
  );

  // Handle case if the payment setting is not found
  if (!paymentSetting) {
    return next(new AppError('Payment setting not found or not marked as latest', 404));
  }

  // Format the start and end dates for the response
  const formattedStartDate = paymentSetting.startingDate ? formatDate(paymentSetting.startingDate) : null;
  const formattedEndDate = paymentSetting.endingDate ? formatDate(paymentSetting.endingDate) : null;

  await logAction({
    model: 'PaymentSettings',
    action: 'Create',
    actor: req.user.id,
    description: 'PaymentSetting Created',
    data: { orgId: organization.id, body: req.body },
    ipAddress: req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress || null,
    severity: 'info',
    sessionId: req.session?.id || 'generated-session-id',
  });

  // Send the response with the updated payment setting
  res.status(200).json({
    status: 1,
    message: `Payment setting updated for Month-${paymentSetting.activeMonth}-Year-${paymentSetting.activeYear}`,
    paymentSetting: {
      ...paymentSetting._doc,
      startingDate: formatDateGC(paymentSetting.startingDate),
      endingDate: formatDateGC(paymentSetting.endingDate),
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
  await logAction({
    model: 'PaymentSettings',
    action: 'Create',
    actor: req.user.id,
    description: 'PaymentSetting Created',
    data: { settingId: deletedSetting.id},
    ipAddress: req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress || null,
    severity: 'info',
    sessionId: req.session?.id || 'generated-session-id',
  });
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
