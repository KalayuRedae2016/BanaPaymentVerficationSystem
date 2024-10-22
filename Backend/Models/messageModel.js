const mongoose = require('mongoose');
const User=require('../Models/userModel')
const messageScehma = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref:User,
    required: true,
  },
  reciever: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Message=mongoose.model('Message',messageScehma)
module.exports=Message
