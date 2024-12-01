const mongoose = require('mongoose');
const validator = require('validator');
const Payment = require('./paymentModel');

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

paymentSettingSchema.pre('save', async function (next) {
  console.log("herre")
  // If this setting is marked as latest, ensure all previous PaymentSettings are marked as not latest
  if (this.isModified() && this.latest) {
    // Update all other PaymentSettings to not be latest
    await mongoose.model('PaymentSetting').updateMany(
      { _id: { $ne: this._id }, latest: true },
      { $set: { latest: false } }
    );
  }
  console.log(this.latest)

  // Object to hold fields to update in associated payments
  const updatedFields = {};

  // Check if `activeYear`, `activeMonth`, or `regularAmount...` has been modified
  if (this.isModified('activeYear')) updatedFields['activeYear'] = this.activeYear;
  if (this.isModified('activeMonth')) updatedFields['activeMonth'] = this.activeMonth;
  if (this.isModified('regularAmount')) updatedFields['regular.amount'] = this.regularAmount;
  if (this.isModified('urgentAmount')) updatedFields['urgent.amount'] = this.urgentAmount;
  if (this.isModified('subsidyAmount')) updatedFields['subsidy.amount'] = this.subsidyAmount;

  // Only proceed if there are modifications to apply to associated payments
  if (Object.keys(updatedFields).length > 0) {
    const Payment = mongoose.model('Payment'); // Get the Payment model
    console.log("Begine")
    console.log("Begine",Payment)
    console.log("finsih")
  // Update all payments that match the updated `activeYear` and `activeMonth`
  await Payment.updateMany({ paymentSetting: this._id},updatedFields)}

  console.log("end",Payment)
  console.log("updatedFields",updatedFields)
  console.log("ll",Object.keys(updatedFields).length )
  next(); // Proceed with the save operation
});

paymentSettingSchema.index({activeMonth:1})

const PaymentSetting = mongoose.model('PaymentSetting', paymentSettingSchema);
module.exports = PaymentSetting;
