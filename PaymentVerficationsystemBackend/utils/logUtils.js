const Log=require('../Models/logModel')
const AppError = require('./appError')
const catchAsync = require('./catchAsync')

const logAction=catchAsync((model,action,data,actor,ipaddress){
    const timeStamp=new Date().toISOString
    const logMessage=`Time-${timeStamp}-Model${model}-Action${action}-Data${JSON.stringify(data)}-actor-${actor}-ipaddress-${ipaddress}`
    console.log(logMessage)
    const log=await Log.find()
    if(!log){
        return next(new AppError("Log is not found",400))
    }
    await log.create()
    res.status(200).JSON({
        status:1,
        message:`log for ${model} is saved Succeffully`,
        log
    })
})