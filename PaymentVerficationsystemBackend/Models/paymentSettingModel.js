const mongoose = require('mongoose');

const paymentSettingSchema = new mongoose.Schema(
  {
    activeYear:{
      type:Number,
      required:true,
      validate:{
        validator:function(value){
          return value>2000
        },
        message:"activeYear must be greater than 200"
      }
    },
    activeMonth:{
      type:Number,
      enum:[1,2,3,4,5,6,7,8,9,10,11,12],
      validate:{
        validator:function(value){
          return value>=1&& value<=12
        },
        message:"activeMonth must be between 1 and 12"
      },
      required:true,
    },
    regFeeRate:{
      type:Number,
      default:0
    },
    urgentAmount:{
      type:Number,
      default:0
    },
    regularAmount:{
      type:Number,
      required:true,
      default:0
    },
    serviceAmount:{
      type:Number,
      required:true,
      default:0
    },
    subsidyAmount:{
      type:Number,
      default:0
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
      //default: 0.05,
    },
    penalityLate10Days:{
      type: Number,
      //default: 0.07,
    },
    penalityLateAbove10Days:{
      type: Number,
      //default: 0.1,
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

paymentSettingSchema.pre('findOneAndUpdate', async function (next) {
  const updatedFields = this._update;
  const paymentSetting = this._conditions;
  if (updatedFields.latest === true) {
    await mongoose.model('PaymentSetting').updateMany(
      { _id: { $ne: paymentSetting._id }, latest: true },
      { $set: { latest: false } }
    );
  }
  
  // Apply changes to associated payments
  const updatedPaymentFields = {};
  if (updatedFields.activeYear) updatedPaymentFields['activeYear'] = updatedFields.activeYear;
  if (updatedFields.activeMonth) updatedPaymentFields['activeMonth'] = updatedFields.activeMonth;
  if (updatedFields.regularAmount) updatedPaymentFields['regular.amount'] = updatedFields.regularAmount;
  if (updatedFields.urgentAmount) updatedPaymentFields['urgent.amount'] = updatedFields.urgentAmount;
  if (updatedFields.subsidyAmount) updatedPaymentFields['subsidy.amount'] = updatedFields.subsidyAmount;
  if (updatedFields.serviceAmount) updatedPaymentFields['service.amount'] = updatedFields.serviceAmount;

  if (Object.keys(updatedPaymentFields).length > 0) {
    const Payment = mongoose.model('Payment');
    await Payment.updateMany(
      { paymentSetting: paymentSetting._id,isPaid:false },
      updatedPaymentFields
    );
  }

  next();
});

paymentSettingSchema.index({activeMonth:1})

const PaymentSetting = mongoose.model('PaymentSetting', paymentSettingSchema);
module.exports = PaymentSetting;
