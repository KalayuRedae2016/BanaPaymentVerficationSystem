const bcrypt = require('bcrypt');
const sharp = require('sharp');
const User = require('./../Models/userModel');
const Organization=require("../Models/organizationModel")
const PaymentSetting=require("../Models/paymentSettingModel")
const fs = require('fs');
const path = require('path');
const validator = require('validator'); // Ensure you have this library installed

const { sendEmail } = require('../utils/email');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const {formatDate}=require("../utils/formatDate")
const createPendingPayments=require("../utils/createPendingPayments")
const {importFromExcel,exportToExcel,deleteFile,createMulterMiddleware} = require('../utils/excelFileController');

const factory = require('./handlerFactoryController'); //implement latter for next factory function

// Configure multer for user file uploads
const userFileUpload = createMulterMiddleware(
  'uploads/users/', // Destination folder
  'User', // Prefix for filenames
  ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'] // Allowed file types
);

exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  // req.file.filename = `user-${userId}-${Date.now()}.jpeg`;
  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/users/${req.file.filename}`);

  next();
});

// Middleware for handling single file upload
exports.uploadUserFile = userFileUpload.single('file');

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const { isActive } = req.query;
  let userQuery = {};
  if (isActive) {
    userQuery.isActive = isActive === 'true';
  }
  userQuery.role="User"
  const users = await User.find(userQuery).lean();
  if (!users) {
    return next(new AppError('No users found', 404));
  }

  // Format createdAt and updatedAt for each user
  const formattedsers = users.map(user => {
    const formattedCreatedAt = user.createdAt ? formatDate(user.createdAt) : null;
    const formattedUpdatedAt = user.updatedAt ? formatDate(user.updatedAt) : null;
    
    return {
      ...user,  // Spread the original user data
      formattedCreatedAt,  // Add formatted createdAt
      formattedUpdatedAt   // Add formatted updatedAt
    };
  });

  res.status(200).json({
    status: 1,
    result: users.length,
    users:formattedsers
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const userId = req.params.id;
  const user = await User.findById(userId);
  if (!user) {
    return next(new AppError('User not found', 404));
  }

  const encoding = 'base64';
  // If the user has a profile image, attempt to read it
  if (user.profileImage) {
    const imageFilePath = path.join(__dirname, '..', 'uploads', 'users', user.profileImage);

    try {
      // Try reading the image file
      imageData = fs.readFileSync(imageFilePath, encoding);
    } catch (err) {
      // If the file doesn't exist, log the error and set imageData to null
      console.error(`Error reading image file: ${imageFilePath}`, err.message);
      imageData = null;
    }
  }

  const formattedCreatedAt = user.createdAt ? formatDate(user.createdAt) : null;
  const formattedUpdatedAt = user.updatedAt ? formatDate(user.updatedAt) : null;

  res.status(200).json({
    status: 1,
    clientProfile:{ 
      ...user._doc,
      formattedCreatedAt,
      formattedUpdatedAt
    },
    imageData,
  });
});

exports.updateUser = catchAsync(async (req, res) => {
  try{
      const userId = req.params.id;
      console.log(userId)
    // Retrieve the existing user
    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    // Initialize update data
    let updateData = req.body;

    if (req.file) {
      updateData.profileImage = req.file.filename; // Set new profile image filename to update

      let oldImagePath;
      // Check if the profile image is not the default image
      if (existingUser.profileImage &&existingUser.profileImage !== 'default.png') {
        oldImagePath = path.join(__dirname,'../uploads/users',existingUser.profileImage
        );
         // Check if the old image file exists and then delete it
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
    }
    // // Update user data in the database
    // const updatedUser = await User.findByIdAndUpdate(
    //   userId,
    //   { $set: updateData },
    //   { new: true, runValidators: true }
    // );

    // Apply updates to the existing user object
    Object.assign(existingUser, updateData);

    // Save the updated user document
    const updatedUser = await existingUser.save();

    const formattedCreatedAt = updatedUser.createdAt ? formatDate(updatedUser.createdAt) : null;
    const formattedUpdatedAt = updatedUser.updatedAt ? formatDate(updatedUser.updatedAt) : null;
    
    res.status(200).json({
      status: 1,
      Message: `${updatedUser.fullName} updated successfully`,
      updatedUser: {
        ...updatedUser._doc,
        formattedCreatedAt,
        formattedUpdatedAt
      },
      profileImage: updatedUser.profileImage,
    });
  }catch (error) {
    deleteFile(req.file?.path);
    res.status(500).json({ message: 'Error saving user: ' + error.message });
  }
});

exports.activateDeactiveUser = catchAsync(async (req, res) => {
  console.log(req.body)
  const { userId, isActive, reason } = req.body;
  // Validate if userId and isActive are provided
  if (!userId || typeof isActive === 'undefined') {
    return res.status(400).json({
      status: 0,
      message: 'User ID and isActive status are required',
    });
  }
  // Find the user by ID
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({
      status: 0,
      message: 'User not found',
    });
  }
  // Update the user's active status
  user.isActive = isActive ===true ? true : false;
  user.reason = reason;
  await user.save();
  res.status(200).json({
    status: 1,
    message: `${user.fullName} is ${
      user.isActive ? 'Activated user' : 'Deactivated user'
    }`,
  });
});

exports.updateMe = catchAsync(async (req, res, next) => {
  // Prevent updating password or userCode
  if (req.body.password || req.body.userCode) {
    return res.status(401).json({
      status: 0,
      message:
        'Unauthorized to change userCode. Use /updatePassword to change password.',
    });
  }
  // Extract updated data from request body
  const updatedData = { ...req.body };
  // Check if there is an uploaded file for the profile image
  if (req.file) {
    updatedData.profileImage = req.file.filename;
  }
  // Update the user with new data
  const updatedUser = await User.findByIdAndUpdate(
    req.user._id,
    { $set: updatedData },
    { new: true, runValidators: true }
  );

  const formattedCreatedAt = user.createdAt ? formatDate(user.createdAt) : null;
  const formattedUpdatedAt = user.updatedAt ? formatDate(user.updatedAt) : null;

  // Respond with the updated user data
  res.status(200).json({
    status: 1,
    message: {
      ...updatedUser._doc,
      formattedCreatedAt,
      formattedUpdatedAt
    },
  });
});

exports.importUsers = catchAsync(async (req, res) => {
  // Transform function to add user code and hashed password
  const transformUserData = async (data) => {
    const organization=await Organization.findOne()
    const prefixCode =organization.companyPrefixCode
    const length = 4; // Length of user code

    if (!data.firstName||!data.middleName||!data.lastName||!data.email||!data.tigrignaName||!data.phoneNumber) {
      throw new Error('Required fields are missing.');
    }
    const user = new User(data);
    user.userCode = await user.generateUserCode(prefixCode, length);
    const password = await user.generateRandomPassword();
    user.password = await bcrypt.hash(password, 12);
    return user; // Return the transformed user instance
  };
  const filePath = req.file.path; // Path to the uploaded file

  // Use the utility function to import data from the Excel file
  const importedUsers = await importFromExcel(filePath, User, transformUserData);

  // Find the payment setting marked as latest
  const latestSetting = await PaymentSetting.findOne({ latest: true });
  if (!latestSetting) {
    return next(new AppError('No active payment setting found.', 404));
  }

   // Create pending payments for all imported users
  for (const user of importedUsers) {
    if (!user.isActive||!user.role==="User") continue;
    await createPendingPayments(user, latestSetting.activeYear, latestSetting.activeMonth);
  }
  // Clean up the file after processing
  //fs.unlinkSync(filePath);
  // Optionally: Schedule a task or set up logic to manage file cleanup later

  res.status(200).json({
    status: 1,
    message: 'Data imported successfully',
  });
});
exports.exportUsers = catchAsync(async (req, res) => {
    const users = await User.find({}); // Fetching data from MongoDB
    await exportToExcel(users, 'Users', 'userData.xlsx', res);
});

exports.sendEmailMessages = catchAsync(async (req, res, next) => {
  const { emailList, subject, message } = req.body;

  if (!subject || !message) {
    return next(new AppError('Subject and message are required', 400));
  }

  if (emailList && !Array.isArray(emailList)) {
    return next(new AppError('emailList must be an array', 400));
  }

  let users;
  if (emailList && emailList.length > 0) {
    if (!emailList.every(email => validator.isEmail(email))) {
      return next(new AppError('Invalid email address in the list', 400));
    }
    users = await User.find({ email: { $in: emailList } }, { email: 1, fullName: 1 }).sort({ createdAt: 1 });
  } else {
    users = await User.find({}, { email: 1, fullName: 1 }).sort({ createdAt: 1 });
  }

  if (!users || users.length === 0) {
    return next(new AppError('No users found to send emails to', 404));
  }

  const emailPromises = users.map(user => {
    const personalizedMessage = 
      `Dear, ${user.fullName},

      ${message}`;

    return sendEmail({email: user.email,subject: subject,message: personalizedMessage});
  });

  try {
    await Promise.all(emailPromises);
    console.log(`Messages successfully sent to all users.`);
    res.status(200).json({
      status: 1,
      message: 'Messages were sent to the specified email list or all users.',
    });
  } catch (error) {
    console.error('Error sending emails:', error);
    return next(new AppError('Failed to send one or more emails', 500));
  }
});
