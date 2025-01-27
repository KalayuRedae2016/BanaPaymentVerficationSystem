const mongoose=require("mongoose")
const User = require('./../Models/userModel');
const Log = require('./../Models/logModel');
const Organization = require("../Models/organizationModel")
const PaymentSetting = require("../Models/paymentSettingModel")

const {logAction}=require("../utils/logUtils")
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const { formatDate } = require("../utils/formatDate")

exports.getLogs = catchAsync(async (req, res, next) => {
    console.log("herre logs")
    const model=req.query.model
    if(!model){
      return next(new AppError("Model is required",400))
    }
    const logs = await Log.find({model});
    if (!logs) {
      return next(new AppError('No Logs found for the given model', 404));
    }
    res.status(200).json({
      status: 1,
      result: logs.length,
      logs: logs
    });
  });