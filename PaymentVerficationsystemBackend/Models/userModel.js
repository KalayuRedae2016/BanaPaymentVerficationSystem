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
        default:null
        
      },
      middleName: {
        type: String,
        default:null
        
      },
      lastName: {
        type: String,
        default:null
        
      },
      fullName: {
        type: String,
        default:null
        
      },
      tigrignaName: {
        type: String,
        default:null

      },
    userCode: {
      //auto-increment
      type: String,
      required:true,
      unique: true,
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
      //required: [true, 'Please provide a password'],
      //minlength: [8, 'Password must be more than 8 characters'],
      select: false,
    },
    isActive: {
      type: Boolean,
      default: true,
      select:true
    },
    reason:{
      type:String,
      default:null,
      select:false,
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
      type:String,
      default:"Mekelle"
    },
    phoneNumber: {
      type:String,
      required:true
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
  passwordResetToken:{
    type:String,
    default:null
  },
  passwordResetExpires: { 
    type: Date,
    default: null
},
failedLoginAttempts:{
  type:Number,
  default:0
},
lockUntil:{
  type:Date,
  default:null
},
  hasMadepayment:{
    type:Boolean,
    default:false
  },
  },
  {
    timestamps: true,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },{
    strict:true,//during save and update
    strictQuery:'throw' //during query throw an error
  },{
    versionKey: true
  }
);

//Pre-save hook to set the fullName
userSchema.pre('save', async function(next) {
  // Construct the fullName from firstName, middleName, and lastName
  this.fullName = `${this.firstName} ${this.middleName ? this.middleName + ' ' : ''}${this.lastName}`;

  // Now, update related payments with the new fullName if the user is being created or updated
  if (this.isModified('fullName')) {
    try {
      // Update related payments to reflect the change in fullName
      await Payment.updateMany(
        { user: this._id }, // Find payments related to this user
        { fullName: this.fullName } // Update the fullName in related payments
      );
      console.log(`Updated fullName in related payments for user: ${this.userCode}`);
    } catch (error) {
      console.error('Error updating fullName in payments:', error);
    }
  }

  next(); // Continue with the save operation
});


// userSchema.pre(/^find/, function(next) {
//   this.find({ isActive:{$ne:false} });
//   next();
// });

userSchema.pre('findOneAndUpdate', async function(next) {
  // Get the updated fields
  const updatedFields = this.getUpdate();

  // Check if the fullName is being updated
  if (updatedFields.firstName || updatedFields.middleName || updatedFields.lastName) {
    // Reconstruct the fullName
    const fullName = `${updatedFields.firstName} ${updatedFields.middleName ? updatedFields.middleName + ' ' : ''}${updatedFields.lastName}`;

    // Set the updated fullName for the User document
    this.set({ fullName: fullName });

    try {
      // Now, update the related payments with the new fullName
      const userId = this._conditions._id; // Get the user ID from the conditions
      await Payment.updateMany(
        { user: userId }, // Find payments related to this user
        { fullName: fullName } // Update the fullName in related payments
      );
      console.log(`Updated fullName in related payments for user: ${this._conditions.userCode}`);
    } catch (error) {
      console.error('Error updating fullName in payments:', error);
    }
  }

  next(); // Continue with the update operation
});


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

userSchema.methods.generateUserCode=async function(prefixCode,length){
 // console.log(prefixCode,length)
  let nextNumber=1
  const highestAssignedUser = await this.model('User')
    .findOne()
    .sort({ userCode: -1 })
    .select('userCode')
    .lean();
    console.log(highestAssignedUser)
    if (highestAssignedUser) {
      const highestNumber = parseInt(highestAssignedUser.userCode.slice(prefixCode.length));
      nextNumber = highestNumber + 1;
    }
    console.log(nextNumber)
    const paddedNumber = String(nextNumber).padStart(length, '0');
    const userCode = `${prefixCode}${paddedNumber}`;
  
    const existingUser = await this.model('User').findOne({ $and: [{ userCode },{isActive:false}] });
    if (existingUser) {
      return this.generateUserCode(prefixCode, length);
    }
    return userCode;
  };
userSchema.methods.generateRandomPassword=async function(length=6){
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  const passwordArray = Array.from({ length }, () => alphabet[Math.floor(Math.random() * alphabet.length)]);
  return passwordArray.join('');
}
userSchema.index({firstName:'text'},{userCode:'text'},{firstName:'text'},{lastName:'text'},{phoneNumber:'text'});
const User = mongoose.model('User', userSchema);

module.exports = User;
