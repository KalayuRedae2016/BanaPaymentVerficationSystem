const ApiKey = require('../Models/apiKeyModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const dotenv = require("dotenv");
// Load environment variables based on the NODE_ENV
const envFile = process.env.NODE_ENV === "production" ? ".env.production" : ".env.development";
dotenv.config({ path: envFile });

exports.authenticateApiKey = catchAsync(async (req, res, next) => {
  console.log("AuthenticatedPage....")
  
    console.log("headers",req.headers)
    // console.log("query",req.query)
    //const apiKey = req.headers['authorization'] ? req.headers['authorization'].split(' ')[1] : req.query.apiKey;
     const apiKey = req.headers['lib_ups_token'] ? req.headers['lib_ups_token'] : req.query.apiKey;
    if (!apiKey) return next(new AppError('API Key is required'),400)

    const apiKeyData = await ApiKey.findOne({ key: apiKey, status: 'active' });

    if (!apiKeyData)  return next(new AppError('Invalid or revoked API Key'),400)

    const bankType = apiKeyData.bankType;
    req.bankType = bankType;
    req.apiKeyData = apiKeyData;
    console.log(req.apiKeyData)
    next();
  })

exports.protectWithPassword = (req, res, next) => {
  //console.log("passowrd from reqbody")=req.body.password;
    const password = req.query.password||req.body.password;
    console.log("password is",password);
    const correctPassword = process.env.apiKey_ROUTE_PASSWORD || "mySecretPassword";
  
    if (!password || password !== correctPassword) {
      return res.status(401).json({
        success: 0,
        message: "Unauthorized: Invalid APIKey password",
      });
    }
    next();
  };
  
