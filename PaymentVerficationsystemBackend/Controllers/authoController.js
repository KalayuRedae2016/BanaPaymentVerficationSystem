const User = require('../Models/userModel');
const Organization = require("../Models/organizationModel")
const defaultVariables= require("../config/defaultVariables");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const sharp = require('sharp');
const PaymentSetting = require('../Models/paymentSettingModel');
const createPendingPayments = require("../utils/createPendingPayments")

const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const {validateExistence}=require("../utils/validateExistence")
const {createInstance,sendResponse}=require("../utils/instanceUtil")
const { sendEmail,sendWelcomeEmail} = require('../utils/email');
const {logAction}=require("../utils/logUtils")
const { deleteFile, createMulterMiddleware,processUploadFiles} = require('../utils/fileController');

const signInToken = (user) => {
  const payload = { id: user._id, role: user.role };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
};

const userAttachments = createMulterMiddleware(
  'uploads/userAttachements', // Destination folder
  'Att', // Prefix for filenames
  ['image/jpeg', 'image/png', 'image/gif', 'application/pdf', 'application/msword'] // Allowed types
);

exports.uploadFilesMiddleware = userAttachments.fields([
  { name: 'profileImage', maxCount: 1 }, // Single file for profileImage
  { name: 'attachments', maxCount: 10 }, // Up to 10 files for attachments
]);

exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();
  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/users/${req.file.filename}`);

  next();
});

exports.signup = catchAsync(async (req, res, next) => {
    const organization=await validateExistence(Organization,{},"Create Organization Profile before creating User",next)
    const prefixCode = organization.companyPrefixCode;
    const length = 4;
    console.log("uploadingFIles",req.files)
    const {profileImage,attachments}=await processUploadFiles(req.files,req.body)
    console.log("processedFIles",attachments)
    // if(profileImage===null) profileImage="default.png"
   
    const customProbs={...req.body,profileImage,attachments}
    const defaultsProbs={isActive: true,changePassword: false,hasMadePayment: false,}
    const user=createInstance(User,customProbs,defaultsProbs)

    if (user.email||user.phoneNumber) {
    const existingUser = await User.findOne({$or: [{ email: user.email }, { phoneNumber: user.phoneNumber}]});
      if (existingUser) {
        if (req.files) deleteFile(req.files.path); 
        if (existingUser.email === user.email) {
          return next(new AppError('Email already exists', 400));
        }
        if (existingUser.phoneNumber === user.phoneNumber) {
          return next(new AppError('Phone Number already exists', 400));
        }
       
      }
    }
    
    user.userCode = await user.generateUserCode(prefixCode, length);
    const password=req.body.password || (await user.generateRandomPassword())
    user.password = await bcrypt.hash(password,12);    

await user.save();
 
await logAction({
  model: 'users',
  action: 'Create',
  actor: req.user && req.user.id ? req.user.id : 'system',
  description: 'User created successfully',
  data: { userId: user.id,createdData:user},
  ipAddress: req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress || null,
  severity: 'info',
  sessionId: req.session?.id || 'generated-session-id',
});
    // Create pending payments if the user role is 'User'
    //const latestSetting=await validateExistence(PaymentSetting,{latest:true},"No active Payment Setting Found",next)
  const latestSetting=await PaymentSetting.findOne({latest:true})
  if(!latestSetting){
    return next(new AppError('User Registered But,No active payment setting found.', 404));
  }
    if (user.role === 'User') {
      await createPendingPayments(user, latestSetting.activeYear, latestSetting.activeMonth);
    }
    if (!user.email) {
      return res.status(200).json({
        status:1,
        user:user,
        message:'User registered successfully.No Email Sent.Contact for Admin for credentials.'
      })
      //return sendResponse(res,200,user,'User registered successfully.No Email Sent.Contact for Admin for credentials.')
    }

    // await sendWelcomeEmail(user,password)
    return res.status(200).json({
      status:1,
      user:user,
      message:'User registered, pending payments created, and welcome email sent successfully.'
    })
    //return sendResponse(res,200,user,'User registered, pending payments created, and welcome email sent successfully.')
});

//tried t enter but some error by tadios
exports.insertMultipleUsers = catchAsync(async (req, res, next) => {
  console.log("Signup request body:", req.body.users);
  
  try {
    const organization = await Organization.findOne();
    console.log("Organization:", organization);

    if (!organization) {
      return next(new AppError("Create Organization profile before creating users", 400));
    }

    const prefixCode = organization.companyPrefixCode;
    const length = 4;

    const users = req.body.users; // Expecting an array of users in the request body

    if (!Array.isArray(users) || users.length === 0) {
      return next(new AppError("Invalid or empty users array", 400));
    }

  
    for (const userData of users) {
      const existingUser = await User.findOne({ email: userData.email });

      if (existingUser) {
        console.log(`Email already exists: ${userData.email}`);
        continue; // Skip creating this user
      }

      const user = new User({
        ...userData,
        isActive: true,
        hasMadePayment: false, // New user hasn't made a payment yet
      });

      const userCode = await user.generateUserCode(prefixCode, length);
      user.userCode = userCode;

      const password = userData.password || (await user.generateRandomPassword());
      user.password = await bcrypt.hash(password, 12);

      await user.save();

      // Find the payment setting marked as latest
      const latestSetting = await PaymentSetting.findOne({ latest: true });
      if (!latestSetting) {
        return next(new AppError("No active payment setting found.", 404));
      }
      
      if (user.role === "User") {
        await createPendingPayments(user, latestSetting.activeYear, latestSetting.activeMonth);
      }
    
    }

    res.status(200).json({
      status: 1,
      message: "Users registered successfully with pending payments created",
    });
  } catch (error) {
    console.error("Signup process error:", error);
    return res.status(500).json({ message: "Error saving users: " + error.message });
  }
});
//end of tadios

exports.login = catchAsync(async (req, res, next) => {
  const { userCode, password } = req.body

  // Input validation
  if (!userCode) {
    return res.status(200).json({
      status: 0,
      message: 'Please provide Valid userCode',
    });
  }

  if (!password) {
    return res.status(200).json({
      status: 0,
      message: 'Please provide valid password',
    });
  }
  const Upper_userCode = userCode.toUpperCase();
  const user = await User.findOne({ userCode:Upper_userCode }).select('+password');
  if (!user) {
    return res.status(200).json({
      status: 0,
      message: 'User is not found,Please Try agian with valid userCode',
    });
  }

  // Check if account is locked
  if (user.lockUntil && user.lockUntil > Date.now()) {
    const waitTime = Math.ceil((user.lockUntil - Date.now()) / 60000);
    return res.status(403).json({ message: `Account locked. Try again in ${waitTime} minutes.` });
  }

  const correct = await bcrypt.compare(password, user.password);
  //console.log(correct);
  if (!correct) {
    //If password doesn't match, increment failedLoginAttempts
    user.failedLoginAttempts += 1;
    if (user.failedLoginAttempts >= 10) {
      user.lockUntil = new Date(Date.now() + 60 * 60 * 1000); // Lock the account for 1 hour
    }

    const email = user.email;
    const subject = 'Account Locked Due to Too Many Failed Login Attempts';
    const message = `Your account has been locked due to too many failed login attempts
  Please wait for 1 hour before trying again. If this wasn't you, please contact support.`

    await sendEmail({ email, message, subject })
    await user.save()
    return res.status(401).json({ message: 'Invalid or Incorrect password' });
  }

  user.failedLoginAttempts = 0;
  user.lockUntil = null;
  await user.save();

  const token = signInToken(user._id);
   res.status(200).json({
    status: 1,
    token: token,
    role: user.role,
    userId: user._id,
    email:user.email,
    userCode:user.userCode,
    fullName:user.fullName,
    message: user.changePassword
    ? 'Login successful, but you must change your password.'
    : 'Login successful.',
    changePassword: user.changePassword
  });
});

exports.logout = catchAsync(async(req, res,next) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  });
  res.status(200).json({ status: 'success' });
});

exports.authenticationJwt = catchAsync(async (req, _, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new AppError('Unauthorized: No token provided', 403));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      return next(new AppError('The user belonging to this token no longer exists', 404));
    }
    // Attach the user to the request object for further use in the route handler
    req.user = user;  // You can also pass only selected fields like { id: decoded.id, role: decoded.role }
    next();
  } catch (err) {
    return next(new AppError('Session expired or invalid token', 401));
  }
});

exports.requiredRole = (requiredrole) => {
  return async (req, res, next) => {
   const userRole=req.user.role
    if (userRole !== requiredrole) {
      return next(new AppError('Access Denied', 404));
    }
    next();
  };
};
exports.forgetPassword = catchAsync(async (req, res, next) => {
  //console.log(req.body.email)
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError('There is no User with the email address', 404));
  }
  //console.log(user)
  
  const resetToken = user.createPasswordResetToken(); //generate token
  await user.save(); // save the update document reset token & time expiration into database
  //console.log(`Resettoemail:`, resetToken);
  try {
    //const resetURL = `${req.protocol}://${req.get('host')}/api/v1/users/resetPassword/${resetToken}`;
    const resetURL = `${process.env.BASE_URL}/resetPassword/${resetToken}`
    const message = `Forgot your password? Submit a request with your new password to: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`;
    const email = user.email;
    const subject = 'Your password reset token (valid for 10 minutes)'
    //console.log(email,subject,message)
    await sendEmail({ email, subject, message });
    res.status(200).json({
      status: 1,
      message: 'Reset token Sent to Email Succeffully',
    });
  } catch (err) {
    //console.log(err);
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    return next(
      new AppError('There was an error sending the email. Try again later!'), 500);
  }
});
exports.resetPassword = catchAsync(async (req, res, next) => {
  // console.log(req.body.password)
  // console.log(req.body.token)
  const hashedToken = crypto.createHash('sha256').update(req.body.token).digest('hex');
  const user = await User.findOne({ passwordResetToken: hashedToken, passwordResetExpires: { $gt: Date.now() } });
  if (!user) {
    return next(new AppError('Token is invalid or expires', 404));
  }
  //console.log(user)
  newPassword = req.body.password;
  user.password = await bcrypt.hash(newPassword, 12);
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  user.changePassword=false
  await user.save();
  const token = signInToken(user._id);

  res.status(200).json({
    status: 1,
    userCode: user.userCode,
    userId: user._id,
    role: user.role,
    token: token,
    message: "Password Reseted Succeffully",
  })
});

exports.resetPasswordByAdmin = catchAsync(async (req, res, next) => {
  const userId = req.params.userId;

  const user = await User.findById(userId);

  console.log("reseted userId", userId);
  console.log("reseted user", user);

  if (!user) {
    return next(new AppError('User is not found', 404));
  }

  // Generate a new password and update the user
  const password = await user.generateRandomPassword();
  user.password = await bcrypt.hash(password, 12);
  user.changePassword = true;
  await user.save();

  // If the user has no email, send response and return
  if (!user.email) {
    return res.status(200).json({
      status: 1,
      userId: user._id,
      role: user.role,
      resetedPassword: password,
      message: 'Password reset successfully. The password will be provided by the admin. Please contact support.',
      changePassword: user.changePassword,
    });
  }

  try {
    // Send email to user
    const subject = 'Your Password Has Been Reset';
    const email = user.email;
    const loginLink = process.env.NODE_ENV === "development" ? "http://localhost:5173" : "https://banapvs.com";
    const message = `Hi ${user.fullName},

        Your password has been reset by an administrator. Here are your new login credentials:

      - User Code: ${user.userCode}
      - Email: ${user.email}
      - Temporary Password: ${password}

      Please log in and change your password immediately.

      -Login Link: ${loginLink}

      If you did not request this change, please contact our support team.

      Best regards,
      The Bana Marketing Group Team`;

    await sendEmail({ email, subject, message });

    // Return response after email is sent
    return res.status(200).json({
      status: 1,
      userId: user._id,
      role: user.role,
      resetedPassword: password,
      message: 'Password reset successfully. Check your email for details.',
      changePassword: user.changePassword,
    });

  } catch (error) {
    console.log(error);
    return next(new AppError('There was an error sending the email. Try again later!', 500));
  }
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  const userId= req.params.userId
  const { currentPassword, newPassword} = req.body;
  
  // Validate if currentPassword and newPassword are provided
  if (!currentPassword || !newPassword) {
    return res.status(400).json({ message: 'Please provide both current and new passwords' });
  }
  
  const user = await User.findById(userId).select('+password');
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  // Check if the provided current password matches the stored password
  const correct = await bcrypt.compare(currentPassword, user.password);
  if (!correct) {
    return res.status(401).json({ message: 'Incorrect current password' });
  }

  if (newPassword.length < 8) {
    return res.status(400).json({ message: 'New password must be at least 8 characters long' });
  }
  
  const salt = await bcrypt.genSalt(10);// Hash the new password before saving it
  const hashedNewPassword = await bcrypt.hash(newPassword, salt);
  user.password = hashedNewPassword
  user.changePassword=false
  await user.save();

  await logAction({
    model: 'users',
    action: 'Update',
    actor: req.user && req.user.id ? req.user.id : 'system',
    description: 'User Password Updated',
    data: { userId: user.id,orginalData:user.password,updatedData:req.body},
    ipAddress: req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress || null,
    severity: 'info',
    sessionId: req.session?.id || 'generated-session-id',
  });

  res.status(200).json({
    status: 1,
    message: 'Password updated successfully'
  });

});
