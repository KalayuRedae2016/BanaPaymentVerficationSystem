const mongoose = require('mongoose');
const { Schema } = mongoose;
const validator = require('validator');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const Joi = require("joi");

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required:true,
      default: null
    },
    middleName: {
      type: String,
      default: null
    },
    lastName: {
      type: String,
      default: null
    },
    fullName: {
      type: String,
      default: null
    },
    tigrignaName: {
      type: String,
      default: null
    },
    userCode: {
      //auto-increment
      type: String,
      required: [true, 'User code is required'],
      unique: [true, 'UserCode must be unique'],
    },
    email: {
      type: String,
      required: [true, 'Please provide your email'],
      unique: [true, 'Email must be unique'],
      minlength: [4, 'Email must contain at least 8 characters'],
      lowercase: true,
      validate: [validator.isEmail, 'Please provide a valid email'],
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: [8, 'Password must be more than 8 characters'],
      select: false,
    },
    isActive: {
      type: Boolean,
      default: true,
      select: true
    },
    reason: {
      type: String,
      default: null,
      select: false,
    },
    role: {
      type: String,
      enum: ['User', 'Admin'],
      default: 'User',
    },
    age: Number,//calculated form date of birth
    gender: {
      type: String,
      enum: ['Male', 'Female'],
      default: 'Male',
    },
    address: {
      type: String,
      default: "Mekelle"
    },
    phoneNumber: {
      type: String,
      required: true
    },
    profileImage: {
      type: String,
      default: 'default.png',
      // required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    passwordChangedAt: {
      type: Date,
      default: null
    },
    passwordResetToken: {
      type: String,
      default: null
    },
    passwordResetExpires: {
      type: Date,
      default: null
    },
    failedLoginAttempts: {
      type: Number,
      default: 0
    },
    lockUntil: {
      type: Date,
      default: null
    },
    hasMadepayment: {type: Boolean,default: false},
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    strict: true, // Enforce strict mode during save/update
    strictQuery: 'throw', // Enforce strict mode during queries
    versionKey: '_v', // Include the version key (__v)
  }
);

//Pre-save hook to set the fullName
userSchema.pre('save', async function (next) {
  // Construct the fullName from firstName, middleName, and lastName
  this.fullName = [this.firstName, this.middleName, this.lastName].filter(Boolean).join(' ');

  //object to hold fields to update payments
  const updatedFields = {}

  //check for name changes
  if (this.isModified("firstName") || this.isModified("middleName") || this.isModified("lastName")) {
    updatedFields.fullName = this.fullName
  }
  //checks for userCode
  if (this.isModified("userCode")) updatedFields.userCode = this.userCode

  //if any obejct changes it should change on the payment model
  if (Object.keys(updatedFields).length > 0) {
    const Payment = mongoose.model('Payment')
    await Payment.updateMany({ user: this._id }, updatedFields)
  }
  next(); // Continue with the save operation
});

// userSchema.pre(/^find/, function(next) {
//   this.find({ isActive:{$ne:false} });
//   next();
// });

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex')

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  //console.log(`reseteToken: ${resetToken}\nhashedResetToken:${this.passwordResetToken}`);

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

userSchema.methods.generateUserCode = async function (prefixCode, length) {
  // console.log(prefixCode,length)
  let nextNumber = 1
  const highestAssignedUser = await this.model('User')
    .findOne()
    .sort({ userCode: -1 })
    .select('userCode')
    .lean();
  // console.log(highestAssignedUser)
  if (highestAssignedUser) {
    const highestNumber = parseInt(highestAssignedUser.userCode.slice(prefixCode.length));
    nextNumber = highestNumber + 1;
  }
  // console.log(nextNumber)
  const paddedNumber = String(nextNumber).padStart(length, '0');
  const userCode = `${prefixCode}${paddedNumber}`;

  const existingUser = await this.model('User').findOne({ $and: [{ userCode }, { isActive: false }] });
  if (existingUser) {
    return this.generateUserCode(prefixCode, length);
  }
  return userCode;
};
userSchema.methods.generateRandomPassword = async function (length = 6) {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  const passwordArray = Array.from({ length }, () => alphabet[Math.floor(Math.random() * alphabet.length)]);
  return passwordArray.join('');
}
userSchema.index({ firstName: 'text' }, { userCode: 'text' }, { firstName: 'text' }, { lastName: 'text' }, { phoneNumber: 'text' },{ userCode: 'text' });
const User = mongoose.model('User', userSchema);

module.exports = User;
