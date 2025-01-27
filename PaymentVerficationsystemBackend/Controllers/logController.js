const mongoose = require("mongoose")
const User = require('./../Models/userModel');
const Log = require('./../Models/logModel');
const Organization = require("../Models/organizationModel")
const PaymentSetting = require("../Models/paymentSettingModel")

const { logAction } = require("../utils/logUtils")
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const { formatDate } = require("../utils/formatDate")

exports.getLogs = catchAsync(async (req, res, next) => {
  console.log("Fetching logs...");
  const { model, action, severity, startDate, endDate, page = 1, limit = 10 } = req.query;
  if (!model) {
    return next(new AppError("Model is required.", 400));
  }

  const filters = { model };

  if (action) filters.action = action;
  if (severity) filters.severity = severity;
  if (startDate || endDate) {
    filters.createdAt = {};
    if (startDate) filters.createdAt.$gte = new Date(startDate);
    if (endDate) filters.createdAt.$lte = new Date(endDate);
  }

  const skip = (page - 1) * limit;
  const logs = await Log.find(filters).sort({ createdAt: -1 }).skip(skip).limit(Number(limit));
  const totalLogs = await Log.countDocuments(filters);

  if (logs.length === 0) {
    return next(new AppError('No logs found for the given query parameters.', 404));
  }

  const formattedLogs = logs.map(log => ({
    id: log._id,
    model: log.model,
    action: log.action,
    actor: log.actor,
    description: log.description,
    affectedData: JSON.parse(log.affectedData), // Parse affectedData to JSON object
    ipAddress: log.ipAddress,
    severity: log.severity,
    createdAt: formatDate(log.createdAt), // Format date using formatDate utility
  }));

  res.status(200).json({
    status: 1,
    total: totalLogs,
    page: Number(page),
    limit: Number(limit),
    result: logs.length,
    logs: formattedLogs,
  });
});
