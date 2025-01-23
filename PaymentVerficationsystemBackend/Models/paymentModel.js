const mongoose = require('mongoose');
const paymentTypeSchema = new mongoose.Schema({
  amount: {type: Number, required: true},
  bankType: {type: String,default: null},
  TTNumber: {type: String,default: null},
  penality: {type: Number,default: 0},
  isPaid: {type: Boolean,default: false},
  paidAt: {type: Date,default: null},
  daysLate: {type: Number,default: null},
});

const paymentSchema = new mongoose.Schema(
  {
    user: {type: mongoose.Schema.Types.ObjectId,ref: 'User',required: true,index: true},
    paymentSetting: {type: mongoose.Schema.Types.ObjectId,ref: 'PaymentSetting', required: true},
    userCode: {type: String,required: true,},
    fullName: {type: String,required: true,default: null},
    billCode: {type: String,required: true,unique: true},
    activeYear: {type: Number,required: true,default: new Date().getFullYear()},
    activeMonth: {type: Number,required: true,default: new Date().getMonth()},
    registrationFee: {type: Number,default: 0},
    urgent: paymentTypeSchema,
    regular: paymentTypeSchema,
    subsidy: paymentTypeSchema,
    service: paymentTypeSchema,
    penality: paymentTypeSchema,
    baseAmount: { type: Number, default: 0, required: true },
    totalExpectedAmount: {type: Number,default: 0,required: true},
    totalPaidAmount: {type: Number,default: 0,required: true},
    confirmedDate: {type: Date,default: null},
    confirmationMethod:{type:String,enum: ['Manually-imported_old Data',`Bank-confirmed`,`Admin-confirmed`],default:null},
    confirmedID:{type: mongoose.Schema.Types.ObjectId,default:null },
    status: {type: String,enum: ['pending', 'confirmed', 'overdue',"unknown"],default: 'pending',index: true},
    isPaid: {type: Boolean,default: false,index: true}, // Frequently filtered},
    latest: {type: Boolean,default: false},
    seen: { type: Boolean, default: false }, // User notification
    adminSeen: { type: Boolean, default: false }, // Admin notification

  },
{
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

paymentSchema.pre('save', function (next) {
  // Automatically calculate the total amount before saving
  let totalExpectedAmount = 0;
  ['urgent', 'regular', 'subsidy', 'service', 'penality'].forEach((type) => {
    if (this[type]) {
      totalExpectedAmount += this[type].amount;
    }
  });
  this.totalExpectedAmount = totalExpectedAmount + this.fee;
  next();
});
// Custom validation to ensure amount is positive
paymentSchema.pre('validate', function (next) {
  ['urgent', 'regular', 'subsidy', 'service', 'penality'].forEach((type) => {
    if (this[type] && this[type].amount < 0) {
      return next(new Error('Amount cannot be negative'));
    }
  })
  next();
});

paymentSchema.index({ user: 1, activeYear: 1, activeMonth: 1 });
const Payment = mongoose.model('Payment', paymentSchema);
module.exports = Payment;
