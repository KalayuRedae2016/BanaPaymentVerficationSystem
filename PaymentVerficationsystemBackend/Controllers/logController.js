const User = require('./../Models/userModel');
const ApiKey = require('../Models/apiKeyModel');
const Log = require('./../Models/logModel');

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

  const pageNum = Number(page) || 1;
  const limitNum = Number(limit) || 10;
  const skip = (pageNum - 1) * limitNum;

  const logs = await Log.find(filters).sort({ createdAt: -1 }).skip(skip).limit(limitNum);
  const totalLogs = await Log.countDocuments(filters);

  if (logs.length === 0) {
    return next(new AppError("No logs found for the given query.", 404));
  }

  // Get user details for all actors in logs
  const actorIds = logs.map(log => log.actor); 
  const users = await User.find({ _id: { $in: actorIds } }).select("_id fullName");
  const banks = await ApiKey.find({ _id: { $in: actorIds } }).select("_id bankType");

  // Create lookup maps
  const userMap = {};
  const bankMap = {};
  users.forEach(user => { userMap[user._id.toString()] = user.fullName });
  banks.forEach(bank => { bankMap[bank._id.toString()] = bank.bankType });

  const formattedLogs = logs.map(log => ({
    id: log._id,
    model: log.model,
    action: log.action,
    actor: log.actor||null,
    actorName: userMap[log.actor?.toString()] || bankMap[log.actor?.toString()] || "Unknown",
    description: log.description,
    affectedData: (() => {
      try {
        return JSON.parse(log.affectedData);
      } catch {
        return log.affectedData;
      }
    })(),
    ipAddress: log.ipAddress,
    severity: log.severity,
    createdAt: formatDate(log.createdAt),
  }));

  console.log(formattedLogs);

  res.status(200).json({
    status: 1,
    total: totalLogs,
    page: pageNum,
    limit: limitNum,
    result: logs.length,
    logs: formattedLogs,
  });
});
