exports.createInstance=(model,customProbs,defaultsProbs={})=>{
    return new model({...customProbs,...defaultsProbs})
}

exports.sendResponse = (res, statusCode, data = {}, message = '') => {
    return res.status(statusCode).json({
      status: statusCode === 200 ? 1 : 0, // Consider 1 for success and 0 for error
      data, // Spread to include the user or any additional data
      message,
    });
  };
  
 