const { required } = require('joi');
const mongoose = require('mongoose');
const validator = require('validator');

const bankAccountSchema = new mongoose.Schema({
  bankType: {
    type: String,
    unique: true,
    required: true,
  },
  bankAccountNumber: {
    type: String,
    required: true,
    unique: true,
  },
  balance: {
    type: Number,
    default: 0,
  },
});

const transferSchema = new mongoose.Schema({
  transferType:{
    type:String,
    enum:["block","service"],
    required:true
  },
  fromBankType: {
    type: String,
    required: true,
  },
  toBankType: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  reason:{
    type:String,
  },
  transferDate: {
    type: Date,
    default: Date.now,
  },
});

const organizationSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
    unique:true
  },
  companyPhoneNumber: {
    type: String,
    required: true,
  },
  companyEmail: {
    type: String,
    required: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  companyPrefixCode: {
    type: String,
    required: true,
  },
  companyAddress: {
    type: String,
    required: true,
  },
  blockBankAccounts:[bankAccountSchema],
  blockBalance:{
    type:Number,
    default:0
  },
  serviceBankAccounts:[bankAccountSchema],
  serviceBalance:{
    type:Number,
    default:0
  },
  paymentTransfers: [transferSchema],  // New field
  //serviceTransfers: [transferSchema],  // New field
  orgBalance:{
    type: Number,
    default:0
  }
  
  
  //add some other specific to the organization
});

module.exports = mongoose.model('Organization', organizationSchema);