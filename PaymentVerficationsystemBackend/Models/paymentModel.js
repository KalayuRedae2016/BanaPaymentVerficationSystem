const mongoose = require('mongoose');
const validator = require('validator');

const Organization = require('./organizationModel');
const PaymentSetting =require('./paymentSettingModel');

const User = require('./userModel');

const paymentTypeSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  bankType: {
    type: String,
    default: null,
  },
  TTNumber: {
    type: String,
    default: null,
  },
  penalty: {
    type: Number,
    default: 0,
  },
  isPaid: {
    type: Boolean,
    default: false,
  },
  paidAt: {
    type: Date,
    default: null,
  },
  daysLate: {
    type: Number,
    default: null,
  },
});

const paymentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',//Reference to the User Model
      required: true,
      index: true
    },
    paymentSetting: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'PaymentSetting', // Reference to the paymentsetting model
      required: true,
    },
    userCode: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
      default: null,
    },
    billCode: {
      type: String,
      required: true,
      unique: true,
    },
    activeYear: {
      type: Number,
      default: new Date().getFullYear(),
    },
    activeMonth: {
      type: Number,
      required: true,
      default: new Date().getMonth(),
    },
    registrationFee: {
      type: Number,
      default: 0,
    },
    urgent: paymentTypeSchema,
    regular: paymentTypeSchema,
    subsidy: paymentTypeSchema,
    service: paymentTypeSchema,
    penality: paymentTypeSchema,
    baseAmount: { type: Number, default: 0, required: true },
    totalExpectedAmount: {
      type: Number,
      default: 0,
      required: true,
    },
    confirmedDate: {
      type: Date,
      default: null,
    },
    barCode: {
      type: String,
      default: null,
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'overdue'],
      default: 'pending',
      index: true, // Frequently filtered
    },
    isPaid: {type: Boolean,default: false,index: true, // Frequently filtered},
    latest: {type: Boolean,default: false},
    seen: { type: Boolean, default: false } // New field for notifications
  }
},
{
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Populate user details dynamically (optional for querying)
paymentSchema.virtual('userDetails').get(function () {
  return {
    userCode: this.user?.userCode,
    fullName: this.user?.fullName,
  };
});
paymentSchema.pre('save', function (next) {
  // Automatically calculate the total amount before saving
  let totalExpectedAmount = 0;
  ['urgent', 'regular', 'subsidy', 'service', 'penalty'].forEach((type) => {
    if (this[type]) {
      totalExpectedAmount += this[type].amount;
    }
  });
  this.totalExpectedAmount = totalExpectedAmount + this.fee;
  next();
});
// Custom validation to ensure amount is positive
paymentSchema.pre('validate', function (next) {
  ['urgent', 'regular', 'subsidy', 'service', 'penalty'].forEach((type) => {
    if (this[type] && this[type].amount < 0) {
      return next(new Error('Amount cannot be negative'));
    }
  })
  next();
});

// Virtual field to calculate the total PaiddAmount
paymentSchema.virtual('totalPaidAmount').get(function () {
  let total = 0;
  ['urgent', 'regular', 'subsidy', 'service', 'penalty'].forEach((type) => {
    if (this[type] && this[type].isPaid) {
      total += this[type].amount;
    }
  });
  total += this.registrationFee;
  return total;
});

// paymentSchema.post('save', async function () {
//   const PaymentSetting = require('../models/paymentSetting'); // Lazy import
//   const now = new Date();
//   const paymentSetting = await PaymentSetting.findOne({
//     activeYear: this.activeYear,
//     activeMonth: this.activeMonth,
//   });

//   let status = 'unknown';
//   if (!paymentSetting) {
//     status = 'unknown';
//   } else if (this.confirmedDate) {
//     status = 'confirmed';
//   } else if (now >= paymentSetting.startingDate && now <= paymentSetting.endingDate) {
//     status = 'pending';
//   } else if (now > paymentSetting.endingDate) {
//     status = 'overdue';
//   }
//   await this.constructor.findByIdAndUpdate(this._id, { status });// Update the document with the computed status
// });
paymentSchema.index({ user: 1, activeYear: 1, activeMonth: 1 });
const Payment = mongoose.model('Payment', paymentSchema);
module.exports = Payment;
