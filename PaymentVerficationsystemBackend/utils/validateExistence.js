const AppError = require("./appError");

const validateExistence=async(model,query={},message)=>{
    const document=await model.findOne(query);
    if(!document) return next(new AppError(message,400))
    return document
}
module.exports={validateExistence}