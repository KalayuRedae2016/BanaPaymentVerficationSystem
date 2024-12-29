const { required } = require('joi');
const mongoose = require('mongoose');
const validator = require('validator');
const ApiKey = require('../Models/apiKeyModel');

const bankAccountSchema = new mongoose.Schema({
  bankType: {
    type: String,
    unique: true,
  },
  bankAccountNumber: {
    type: String,
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

organizationSchema.methods.generateApiKey = async function() {
  const bankTypes = [...new Set([...this.serviceBankAccounts.map(acc => acc.bankType), ...this.blockBankAccounts.map(acc => acc.bankType)])];

  for (const bankType of bankTypes) {
    const apiKey = new ApiKey({
      key: generateUniqueApiKey(),
      organizationId:this._id,
      bankType,
      scope: 'read-only', // default scope
    });
    await apiKey.save();
  }
};

module.exports = mongoose.model('Organization', organizationSchema);
