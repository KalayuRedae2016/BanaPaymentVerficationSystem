const ApiKey = require('../Models/apiKeyModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const authenticateApiKey = catchAsync(async (req, res, next) => {
  
    console.log("headers",req.headers)
    // console.log("query",req.query)
    //const apiKey = req.headers['authorization'] ? req.headers['authorization'].split(' ')[1] : req.query.apiKey;
     const apiKey = req.headers['lib_ups_token'] ? req.headers['lib_ups_token'] : req.query.apiKey;
    if (!apiKey) return next(new AppError('API Key is required'),400)

    const apiKeyData = await ApiKey.findOne({ key: apiKey, status: 'active' });
    if (!apiKeyData)  return next(new AppError('Invalid or revoked API Key'),400)

    // const bankType = apiKeyData.bankType;
    // req.bankType = bankType;
    req.apiKeyData = apiKeyData;

    // console.log("bankType",bankType)
    // console.log("apikeydata",apiKeyData)
    // console.log("apikey",apiKeyData.key)
    next();
  })

module.exports = authenticateApiKey;
