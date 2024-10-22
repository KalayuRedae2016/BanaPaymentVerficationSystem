const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
    // log: {type: String,required: true}, it same as activity
    timestamp: {type: Date,default: Date.now,required: true},
    activity: {
        type: String,
        required: true,
        enum: ['Payment Verification', 'User Registration', 'User Authentication', 'Setting Update', 'Setting Request'],
      },
    details:mongoose.Schema.Types.Mixed
    
})
const Log=mongoose.model('Log',logSchema)