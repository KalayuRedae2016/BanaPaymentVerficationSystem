const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
    model:{ type:String,required:true},
    action:{type:String,required:true},
    actor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    description: { type: String, required:true},
    affectedData:{type:String,required:true},
    ipAddress:{type:String,required:true},
    environment: { type: String, default: process.env.NODE_ENV || 'development' },
    severity: { type: String, default: 'info' }, // e.g., 'info', 'error', 'debug'
    sessionId: { type: String, default: null }, // Optional session/correlation ID
    },
    {
      timestamps: true,
      toJSON: { virtuals: true },
      toObject: { virtuals: true }
    } 
  )
  module.exports=mongoose.model('Log',logSchema)