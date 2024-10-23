const { required } = require('joi');
const mongoose = require('mongoose');
const { NumberInstance } = require('twilio/lib/rest/pricing/v2/voice/number');
const validator = require('validator');

const paymentSettingSchema = new mongoose.Schema(
  {
    activeYear:{
      type:Number,
      required:true,
    },
    activeMonth:{
      type:Number,
      required:true,
    },
    regFeeRate:{
      type:Number,
      required:true,
    },
    urgentAmount:{
      type:Number,
      required:true,
    },
    regularAmount:{
      type:Number,
      required:true,
    },
    serviceAmount:{
      type:Number,
      required:true,
    },
    subsidyAmount:{
      type:Number,
      required:true,
    },
    startingDate:{
      type:Date,
      required:true,
    },
    endingDate:{
      type:Date,
      required:true,
    },
    currency:{
      type:String,
      default:"Birr"
    },
    penalityLate5Days:{
      type: Number,
      default: 0.05,
    },
    penalityLate10Days:{
      type: Number,
      default: 0.07,
    },
    penalityLateAbove10Days:{
      type: Number,
      default: 0.1,
    },
    latest:{
      type:Boolean,
      default:true
    }
  },
  {
    timestamps: true,
  },
);

paymentSettingSchema.pre('validate', function (next) {
  const { activeYear, activeMonth } = this;
  
  // Set the first day of the month (activeMonth is zero-indexed, so no need to subtract 1)
  this.startingDate = new Date(activeYear, activeMonth, 1);
  
  // Set the last day of the month (activeMonth + 1 and day set to 0 gives the last day of activeMonth)
  this.endingDate = new Date(activeYear, activeMonth + 1, 0);

  next();
});


paymentSettingSchema.index({activeMonth:1})

const PaymentSetting = mongoose.model('PaymentSetting', paymentSettingSchema);
module.exports = PaymentSetting;
