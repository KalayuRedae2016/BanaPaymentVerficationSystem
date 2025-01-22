const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
    timestamp: {type: Date,default: Date.now,required: true},
    model:{ type:String,required:true},
    action:{type:String,required:true},
    affectedData:{type:String,required:true},
    actor:{type:mongoose,required:true},
    ipAddress:{type:String,default:null},
    },
    {
      timestamps: true,
      toJSON: { virtuals: true },
      toObject: { virtuals: true }
    } 
  )
  module.exports=mongoose.model('Log',logSchema)