const User = require('../Models/userModel');
const Organization = require("../Models/organizationModel")
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const sharp = require('sharp');
const PaymentSetting = require('../Models/paymentSettingModel');
const createPendingPayments = require("../utils/createPendingPayments")

const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const { sendEmail } = require('../utils/email');
const { deleteFile, createMulterMiddleware } = require('../utils/excelFileController');

const signInToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
};

const userImageUpload = createMulterMiddleware('uploads/users/','User',['image/jpeg', 'image/png', 'image/gif'])
exports.uploadUserImage = userImageUpload.single('profileImage');

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
  console.log('Request body:', req.body);
  console.log('Uploaded file:', req.file);
  try {
    const organization = await Organization.findOne()
    //console.log("org",organization)
    if (!organization) {
      return next(new AppError("Create Organization profile before Creating User", 400));
    }
    
    const prefixCode = organization.companyPrefixCode;
    const length = 4;
    
    const user = new User({
      ...req.body,
      isActive: true,
      hasMadePayment: false, // New user hasn't made a payment yet
      profileImage: req.file ? req.file.filename : undefined,
    });

    const existingUser = await User.findOne({ email: user.email });
    if (existingUser) {
      if (req.file) {
        deleteFile(req.file.path);
      }
      return next(new AppError('Email already exists', 400));
    }
    ;
    const userCode = await user.generateUserCode(prefixCode, length);
    user.userCode = userCode;

    const password = req.body.password || await user.generateRandomPassword()
    user.password = await bcrypt.hash(password, 12);

    await user.save();
    // Call the payment creation function to create pending payments for the new user

    // Find the payment setting marked as latest
    const latestSetting = await PaymentSetting.findOne({ latest: true });
    if (!latestSetting) {
      return next(new AppError('No active payment setting found.', 404));
    }

    if (user.role === "User") {
      await createPendingPayments(user, latestSetting.activeYear, latestSetting.activeMonth);
    }

    const subject = 'Welcome to Our Platform, Bana Mole Marketing Group!';
    const email = user.email;
    const message = `Hi ${user.fullName},
      Welcome to Our Platform! We're excited to have you on board.
      Here are your account details:
      -LoginLink:http://localhost:5173
      - User Code/Name: ${user.userCode}
      - Email: ${email}
      - Password: ${password}
      
    Please visit our platform to explore and start using our services.
    If you have any questions or need assistance, feel free to contact our support team.

    Best regards,
    The Bana Marketing Group Team;`
    //await sendEmail({ email, subject, message });
    res.status(200).json({
      status: 1,
      user: user,
      message: 'User registered & pending payments created successfully',
    });
  } catch (error) {
    console.error('Signup process error:', error);
    if (req.file) {
      deleteFile(req.file.path);
    }
    if (error.code === 11000) {
      return next(new AppError('Email already exists', 400));
    } else {
      return res.status(500).json({ message: 'Error saving user: ' + error.message });
    }
  }
});

exports.login = catchAsync(async (req, res, next) => {
  console.log("ss",req.body)
  const { userCode, password } = req.body
  if (!userCode || !password) {
    return res.status(200).json({
      status: 0,
      message: 'Please provide valid userCode or password',
    });
  }
  const Upper_userCode = userCode.toUpperCase();
  const user = await User.findOne({ userCode:Upper_userCode }).select('+password');
  if (!user) {
    return res.status(200).json({
      status: 0,
      message: 'User is not found',
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
    if (user.failedLoginAttempts >= 20) {
      user.lockUntil = new Date(Date.now() + 60 * 60 * 1000); // Lock the account for 1 hour
    }

    const email = user.email;
    const subject = 'Account Locked Due to Too Many Failed Login Attempts';
    const message = `Your account has been locked due to too many failed login attempts
 Please wait for 1 hour before trying again. If this wasn't you, please contact support.`

    await sendEmail({ email, message, subject })
    await user.save()
    return res.status(401).json({ message: 'Invalid UserCode or password' });
  }

  user.failedLoginAttempts = 0;
  user.lockUntil = null;
  await user.save();
  
  const token = signInToken(user._id);
  //If user is an admin and the password is still the default, ask for a password change
  if (user.role === 'Admin' && password === 'admin1234') {
    return res.status(200).json({
      status: 1,
      token:token,
      role: user.role,
      userId: user._id,
      userCode:user.userCode,
      email:user.email,
      message: 'Please change your password',
      changePassword: true,  // Indicating that the frontend should redirect to the password change page
    });
  }
   res.status(200).json({
    status: 1,
    token: token,
    role: user.role,
    userId: user._id,
    userCode:user.userCode,
    email:user.email,
    Message: 'Login Succeffullly',
  });
});

exports.logout = catchAsync(async(req, res,next) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  });
  res.status(200).json({ status: 'success' });
});

exports.authenticationJwt = catchAsync(async (req, res, next) => {
  let token;
  if (req.headers.authorization &&req.headers.authorization.startsWith('Bearer') ) {
    token = req.headers.authorization.split(' ')[1];
  }
  // console.log(req.headers)
  if (!token) {
    return next(new AppError('Token is missed! Unauthorized user,Please log in again', 401,1));
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return next(new AppError('Token Session expired or invalid,Please log in again', 401,1));
    }

    req.user = decoded;
    next();
  });
});

// Only for rendered pages, no errors!
// exports.isLoggedIn = async (req, res, next) => {
//   if (req.cookies.jwt) {
//     try {
//       // 1) verify token
//       const decoded = await promisify(jwt.verify)(
//         req.cookies.jwt,
//         process.env.JWT_SECRET
//       );

//       // 2) Check if user still exists
//       const currentUser = await User.findById(decoded.id);
//       if (!currentUser) {
//         return next();
//       }

//       // 3) Check if user changed password after the token was issued
//       if (currentUser.changedPasswordAfter(decoded.iat)) {
//         return next();
//       }

//       // THERE IS A LOGGED IN USER
//       res.locals.user = currentUser;
//       return next();
//     } catch (err) {
//       return next();
//     }
//   }
//   next();
// };

//see also for mulitile roles with argument ...requiredrole
exports.requiredRole = (requiredrole) => {
  return async (req, res, next) => {
    const UserId = req.user.id;
    const user = await User.findById(UserId);
    if (user.role !== requiredrole) {
      return next(new AppError('Unautorized candidate', 404));
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
    // console.log(email)
    // console.log(message)
    // console.log(subject)
    // console.log(resetURL)
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
  const userId = req.body.id
  const user = await User.findById(userId)
  if (!user) {
    return next(new AppError('User is not found', 404));
  }
  //console.log(user)
  password = await user.generateRandomPassword();
  user.password = await bcrypt.hash(password, 12);
  await user.save();
  res.status(200).json({
    status: 1,
    userId: user._id,
    role: user.role,
    resetedPassword: password,
    message: "Password Reseted Succeffully",

  });
  try {
    const subject = 'Welcome to Our Platform, Bana Mole Marketing Group!';
    const email = user.email;
    const message = `Hi ${user.fullName},
        Welcome to Our Platform! We're excited to have you on board.
        Here are your account details:
        - User Code: ${user.userCode}
        - Email: ${user.email}
        - NewPassword: ${newPassword}
        -LoginLink:http://localhost:5173

      Please visit our platform to explore and start using our services.
      If you have any questions or need assistance, feel free to contact our support team.

      Best regards,
      The Bana Marketing Group Team`;

    await sendEmail({ email, subject, message });
  } catch (error) {
    // console.log(error)
    return next(new AppError('There was an error sending the email. Try again later!', 500));
  }
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  // console.log(req.body)
  const { currentPassword, newPassword,userId } = req.body;

  // Fetch the user from the database with the existing password
  //const user = await User.findById(req.user._id).select('+password');
  const user = await User.findById(userId).select('+password');
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  // Check if the provided current password matches the stored password
  const correct = await bcrypt.compare(currentPassword, user.password);
  if (!correct) {
    return res.status(401).json({ message: 'Incorrect current password' });
  }
  // Hash the new password before saving it
  const salt = await bcrypt.genSalt(10);
  const hashedNewPassword = await bcrypt.hash(newPassword, salt);
  // Update the user's password
  user.password = hashedNewPassword;
  await user.save();
  res.status(200).json({
    status: 1,
    message: 'Password updated successfully'
  });

});
