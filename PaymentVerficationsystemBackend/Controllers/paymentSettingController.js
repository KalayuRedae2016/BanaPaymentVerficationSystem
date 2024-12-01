const PaymentSetting = require('../Models/paymentSettingModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const User=require("../Models/userModel")
const createPendingPayments=require("../utils/createPendingPayments")
const {formatDate}=require("../utils/formatDate")

// Create a new payment setting
exports.createPaymentSetting = catchAsync(async (req, res,next) => {
  const {activeYear,activeMonth,regularAmount,urgentAmount,serviceAmount,subsidyAmount,regFeeRate}=req.body
  
  // Validate required fields
  if (!activeYear || !activeMonth || !regularAmount || !urgentAmount || !serviceAmount || !subsidyAmount || !regFeeRate) {
    return next(new AppError('Please provide Required Fields', 400));
  }
  // Set default startingDate and endingDate if not provided
  let { startingDate, endingDate } = req.body;

  if (!startingDate || !endingDate) {
    startingDate = new Date(Date.UTC(activeYear, activeMonth-1, 1)); // First day of the month
    endingDate = new Date(Date.UTC(activeYear, activeMonth-1, 30));  // 30th day of the month
  } else {
    startingDate = new Date(startingDate);
    endingDate = new Date(endingDate);
  }
  if (endingDate <= startingDate) {
    return next(new AppError(`Ending Date (${endingDate}) should be greater than Starting Date (${startingDate})!`, 400));
  }
    // Check if there's an existing PaymentSetting for the activeYear and Month
    const existingSetting = await PaymentSetting.findOne({
      activeYear:activeYear,
      activeMonth:activeMonth,
    });
    if (existingSetting) {
      return next(new AppError('Setting is exist ,Please Update it', 404));
    }
    // Deactivate the previous latest settings
    const latestSetting=await PaymentSetting.find({latest:true});
    if(latestSetting){
      for (const setting of latestSetting) {
        setting.latest=false
        await setting.save();
      }
    }
   const newSetting = new PaymentSetting({
    ...req.body,
    startingDate: new Date(req.body.startingDate),
    endingDate: new Date(req.body.endingDate),
    latest: true
});
    await newSetting.save();
    console.log(newSetting)

    const userQuery={isActive:true,role:"User"}
    const users = await User.find(userQuery);
    console.log(users)
    // Create pending payments for all users
    for (const user of users) {
      await createPendingPayments(user, newSetting.activeYear, newSetting.activeMonth);
    }

    console.log(newSetting)
    res.status(200).json({
      status:1,
      message:`Payment Setting is created for Month-${req.body.activeMonth}-Year-${req.body.activeYear}`,
      paymentSetting:newSetting
    });

});

exports.getOnePaymentSettings = catchAsync(async (req, res, next) => {
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
  
  console.log(paymentSettings)
  // Respond with the payment setting if found
  res.status(200).json({
    status: 1,
    message: paymentSettings.activeYear && paymentSettings.activeMonth
      ? `Payment setting for ${paymentSettings.activeMonth}/${paymentSettings.activeYear} fetched successfully.`
      : "Latest payment setting fetched successfully.",
    paymentSetting: {
      ...paymentSettings._doc,
      formattedStartDate,
      formattedEndDate}
  });
});

exports.getLatestPaymentSetting = catchAsync(async (req, res, next) => {
    // Find the payment setting marked as latest
    const paymentSetting = await PaymentSetting.findOne();
    if (!paymentSetting) {
        return res.status(200).json({
          status: 1,
          message: "No Payment setting,Please create first.",
          paymentSetting: null
      });
    }
    // Find the payment setting marked as latest
    const latestPaymentSetting = await PaymentSetting.findOne({ latest: true });
     // Format the starting and ending dates
  const formattedStartDate = latestPaymentSetting.startingDate ? formatDate(latestPaymentSetting.startingDate) : null;
  const formattedEndDate = latestPaymentSetting.endingDate ? formatDate(latestPaymentSetting.endingDate) : null;
    
    if (!latestPaymentSetting) {
        return res.status(200).json({
            status: 1,
            message: "No latest payment setting found.",
            paymentSetting: null
        });
    }

    console.log(latestPaymentSetting)
    res.status(200).json({
        status: 1,
        message: "Latest setting fetched successfullyyyyy.",
        paymentSetting: {
          ...latestPaymentSetting._doc,
          formattedStartDate,
          formattedEndDate
        }
    });
});

// Update a payment setting by ID
exports.updatePaymentSettingBYId = catchAsync(async (req, res) => {
  console.log(req.params.id);
    const settingId= req.params.id;
    if(!settingId){
      return next(new AppError('Setting ID is required', 404));
    }
    const paymentSetting = await PaymentSetting.findOneAndUpdate(
      { _id: settingId}, 
      req.body, // Update data from the request body
      { new: true, runValidators: true } // Options to return the updated document and to run validators
    );
    if (!paymentSetting) {
      return next(new AppError('Payment setting is not found', 404))
    }

    // Format the starting and ending dates
  const formattedStartDate = paymentSetting.startingDate ? formatDate(paymentSetting.startingDate) : null;
  const formattedEndDate = paymentSetting.endingDate ? formatDate(paymentSetting.endingDate) : null;

  console.log(paymentSetting)
    res.status(200).json({
      status:1,
      message:`Payment Setting is Updated for Month-${paymentSetting.activeMonth}-Year-${paymentSetting.activeYear}`,
      paymentSetting:{
        ...paymentSetting._doc,
        formattedStartDate,
        formattedEndDate
      }
    });

});

