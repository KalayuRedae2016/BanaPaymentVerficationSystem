const Log=require('../Models/logModel')
const AppError = require('./appError')
const catchAsync = require('./catchAsync')

exports.logAction=catchAsync(async(model,action,actor,description,data={},ipAddress,severity = 'info')=>{
    console.log("model",model)
    console.log("action",action)
    console.log("actor",actor)
    console.log("description",description)
    console.log("data",data)
    console.log("ipaddress",ipAddress)
    console.log("severity",severity)
    console.log("sessionId",sessionId)
    if (!model || !action || !actor) {
        return next(new AppError("'Model, action, and actor are required for logging.'",400))
    }
    const timeStamp = new Date().toISOString();
    const logMessage = `Time-${timeStamp}-Model${model}-Action${action}-Data${JSON.stringify(data)}-actor-${actor}-ipaddress-${ipAddress}`;
    // console.log(logMessage)

    const log = new Log({
        model,
        action,
        actor,
        description,
        affectedData: JSON.stringify(data),
        ipAddress,
        severity,
    });

    await log.save()

    console.log(`[${severity.toUpperCase()}] ${model} - ${action}: Log saved.`);
})

exports.logError = async (error, req) => {
    try {
      const log = new Log({
        model: 'error',
        action: 'error',
        actor: req.user?.id || 'system',
        description: error.message,
        affectedData: JSON.stringify({
          stack: error.stack,
          method: req.method,
          route: req.originalUrl,
          headers: req.headers,
          body: req.body,
        }),
        ipAddress: req.ip,
        severity: 'error',
      });
  
      await log.save();
      console.error(`[ERROR] ${error.message} - ${req.originalUrl}`);
    } catch (err) {
      console.error(`Failed to log error: ${err.message}`);
    }
  };
  