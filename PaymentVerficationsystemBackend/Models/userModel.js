const mongoose = require('mongoose');
const { Schema } = mongoose;
const validator = require('validator');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const { type } = require('os');

const attachmentSchema = new mongoose.Schema({
  fileName: { type: String, required: true },
  fileType: { type: String, required: true },
  description: { type: String },
  uploadedDate: { type: Date, default: Date.now },
});

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
    // balance:{type:String,default:0,required:true,min:0},
    userCode: {
      //auto-increment
      type: String,
      required: [true, 'User code is required'],
      unique: [true, 'UserCode must be unique'],
    },
    email: {
      type: String,
      // required: [true, 'Please provide your email'],
      default:null,
      unique: [true, 'Email must be unique'],
      minlength: [4, 'Email must contain at least 8 characters'],
      lowercase: true,
      validate: {
        validator: function (value) {
          return value === null || validator.isEmail(value);// Only validate if email is not null
        },
        message: 'Please provide a valid email',
      },
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: [8, 'Password must be more than 8 characters'],
      select: false,
    },
   changePassword:{
    type: Boolean,
    default: true
  },
  canEditDetails: {
    type: Boolean,
    default: false, // Default to false; admin must enable this for editing
  },
  permittedEditBy: {
    type: String,
    default: 'SuperAdmin', // Default role that can allow editing
    enum: ['Admin', 'SuperAdmin'] // Validate against specific roles
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
      enum: ['User', 'Admin',"SuperAdmin"],
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
      required: [true, 'Phone number is required'],
      unique: true, // Mongoose automatically creates a unique index for this field
      validate: {
        validator: function (v) {
          // Regex to match a phone number that starts with a non-zero digit and is exactly 9 digits long
          return /^\+251[0-9]{9}$/.test(v);
        },
       message: 'Phone number must start with +251 and contain 9 additional digits'
      },
    },
    profileImage: {
      type: String,
      default: 'default.png',
      // required: true,
    },
    attachments: [attachmentSchema], // Array of attachments
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
  this.fullName = [this.firstName, this.middleName, this.lastName].filter(Boolean).join(' ');
  
  const updatedFields = {}
  if (this.isModified("firstName") || this.isModified("middleName") || this.isModified("lastName")) {
    updatedFields.fullName = this.fullName
  }
  if (this.isModified("userCode")) updatedFields.userCode = this.userCode

  if (Object.keys(updatedFields).length > 0) {
    const Payment = mongoose.model('Payment')
    await Payment.updateMany({ user: this._id }, updatedFields)
  }
  next(); 
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
userSchema.index({ email: 1 }, { phoneNumber: 1 },{ unique: true, sparse: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
