const mongoose = require('mongoose');
const { Schema } = mongoose;

const PaymentLogSchema = new Schema({
  paymentId: {
    type: Schema.Types.ObjectId,
    ref: 'Payment',
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  billCode: {
    type: String,
    required: true,
  },
  urgent: {
    amount: Number,
    bankType: String,
    TTNumber: String,
    isPaid: Boolean,
    paidAt: Date,
    daysLate: Number,
  },
  regular: {
    amount: Number,
    bankType: String,
    TTNumber: String,
    isPaid: Boolean,
    paidAt: Date,
    daysLate: Number,
  },
  subsidy: {
    amount: Number,
    bankType: String,
    TTNumber: String,
    isPaid: Boolean,
    paidAt: Date,
    daysLate: Number,
  },
  service: {
    amount: Number,
    bankType: String,
    TTNumber: String,
    isPaid: Boolean,
    paidAt: Date,
    daysLate: Number,
  },
  penality: {
    amount: Number,
    bankType: String,
    TTNumber: String,
    isPaid: Boolean,
    paidAt: Date,
  },
  registrationFee: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

const PaymentLog = mongoose.model('PaymentLog', PaymentLogSchema);

module.exports = PaymentLog;
