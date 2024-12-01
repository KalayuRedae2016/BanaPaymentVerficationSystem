const mongoose = require('mongoose');
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
  this.startingDate = new Date(Date.UTC(activeYear, activeMonth-1, 1)); // First day of the month
  this.endingDate = new Date(Date.UTC(activeYear, activeMonth-1, 30));  // 30th day of the month
  next();
});

paymentSettingSchema.index({activeMonth:1})

const PaymentSetting = mongoose.model('PaymentSetting', paymentSettingSchema);
module.exports = PaymentSetting;
