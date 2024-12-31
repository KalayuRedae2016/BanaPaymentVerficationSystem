const bcrypt = require('bcrypt');
const sharp = require('sharp');
const User = require('./../Models/userModel');
const Organization = require("../Models/organizationModel")
const PaymentSetting = require("../Models/paymentSettingModel")
const fs = require('fs');
const path = require('path');
const validator = require('validator'); // Ensure you have this library installed
const xlsx = require('xlsx'); //for import user from excel

const { sendEmail } = require('../utils/email');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const { formatDate } = require("../utils/formatDate")
const createPendingPayments = require("../utils/createPendingPayments")
const { importFromExcel, exportToExcel, deleteFile, createMulterMiddleware } = require('../utils/excelFileController');

const factory = require('./handlerFactoryController'); //implement latter for next factory function

// Configure multer for user file uploads
const userFileUpload = createMulterMiddleware(
  'uploads/users/', // Destination folder
  'User', // Prefix for filenames
  ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'] // Allowed file types
);

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach(el => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

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
  userQuery.role = "User"
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
    users: formattedsers
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
    clientProfile: {
      ...user._doc,
      formattedCreatedAt,
      formattedUpdatedAt
    },
    imageData,
  });
});

exports.updateUser = catchAsync(async (req, res) => {
  try {
    const userId = req.params.id;
    // console.log(userId)
    // Retrieve the existing user
    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    // Initialize update data
    let updateData = req.body;

    if (updateData.userCode) {
      let userCode = updateData.userCode.trim().toUpperCase();  // Trim any spaces and upper case

      const prefix = userCode.slice(0, 2)  // Ensure the userCode starts with "BM"
      if (prefix !== "BM") {
        return res.status(400).json({
          status: 'fail',
          message: 'User code must start with "BM".',
        });
      }

      updateData.userCode = userCode;// Update the user data with the normalized userCode

      const userCodeRegex = new RegExp('^' + userCode + '$', 'i'); // 'i' makes it case-insensitive
      const userCodeExists = await User.findOne({ userCode: userCodeRegex, _id: { $ne: userId } });
      
      if (userCodeExists) {
        return res.status(400).json({
          status: 'fail',
          message: 'User code already in use by another user.',
        });
      }
    }

    if (req.file) {
      updateData.profileImage = req.file.filename; // Set new profile image filename to update

      let oldImagePath;
      if (existingUser.profileImage && existingUser.profileImage.trim() !== '' && existingUser.profileImage !== 'default.png') {
        const profileImage = existingUser.profileImage.trim();
        if (['.png', '.jpg', '.jpeg'].some(ext => profileImage.toLowerCase().endsWith(ext))) {
          oldImagePath = path.join(__dirname, '../uploads/users', profileImage);
          if (fs.existsSync(oldImagePath)) {
            try {
              fs.unlinkSync(oldImagePath);
            } catch (error) {
              console.error(`Error deleting file: ${error.message}`);
            }
          }
        }
      }
    }

    Object.assign(existingUser, updateData);// Apply updates to the existing user object
    const updatedUser = await existingUser.save();// Save the updated user document

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
  } catch (error) {
    deleteFile(req.file?.path);
    res.status(500).json({ message: 'Error saving user: ' + error.message });
  }
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  //const deletedPayment = await Payment.findByIdAndDelete(req.params.id);
  const deleteUser = await User.findByIdAndDelete(req.query.id)
  if (!deleteUser) {
    return next(new AppError("user entry not found", 404))
  }
  res.status(200).json({
    status: 'success',
    //data: null,
    message: `User Deleted`
  });
});
exports.deleteUsers = catchAsync(async (req, res, next) => {
  const deletedUsers= await User.deleteMany({});  // Deletes all documents
  if (deletedUsers.deletedCount === 0) {
    return next(new AppError("No User entries found to delete", 404));
  }
  res.status(200).json({
    status: 'success',
    message: `${deletedUsers.deletedCount} Users Deleted`
  });
});
exports.activateDeactiveUser = catchAsync(async (req, res) => {
  // console.log(req.body)
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
  user.isActive = isActive === true ? true : false;
  user.reason = reason;
  await user.save();
  res.status(200).json({
    status: 1,
    message: `${user.fullName} is ${user.isActive ? 'Activated' : 'Deactivated'
      }`,
  });
});

exports.updateMe = catchAsync(async (req, res, next) => {
  // 1) Create error if user POSTs password data
  if (req.body.password) {
    return next(
      new AppError(
        'This route is not for password updates. Please use /updateMyPassword.',
        400
      )
    );
  }
  // 2) Filtered out unwanted fields names that are not allowed to be updated
  const filteredBody = filterObj(req.body, 'firstName', 'middleName', 'lastName', 'tigrignaName', 'phoneNumber', 'address', 'email', 'age', 'gender');
  if (req.file) filteredBody.profileImage = req.file.filename;

  // 3) Update user document
  const updatedUser = await User.findByIdAndUpdate(
    req.user._id,
    { $set: filteredBody },
    { new: true, runValidators: true }
  );

  const formattedCreatedAt = updatedUser.createdAt ? formatDate(updatedUser.createdAt) : null;
  const formattedUpdatedAt = updatedUser.updatedAt ? formatDate(updatedUser.updatedAt) : null;

  res.status(200).json({
    status: 'success',
    message: {
      ...updatedUser._doc,
      formattedCreatedAt,
      formattedUpdatedAt
    },
  });
});

exports.importUsers = catchAsync(async (req, res, next) => {
  const filePath = req.file.path;

  const transformUserData = async (data) => {
    // console.log("Processing Row Data:", data); // Log input data for debugging
  
    const organization = await Organization.findOne();
    if (!organization) throw new AppError('Organization not found', 404);

    const prefixCode = organization.companyPrefixCode;
    const length = 4; // Length for the generated userCode

    const requiredFields = ['firstName', 'middleName', 'lastName', 'email', 'tigrignaName', 'phoneNumber', 'role', 'gender', 'age'];
    const missingFields = requiredFields.filter(field => !data[field]);
    if (missingFields.length > 0) {
      console.error(`Row skipped. Missing fields: ${missingFields.join(', ')}`);
      throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
    }

    const user = new User(data);
    user.userCode = await user.generateUserCode(prefixCode, length); // Assuming generateUserCode is a method in User model
    const password = await user.generateRandomPassword(); // Assuming generateRandomPassword is a method in User model
    user.password = await bcrypt.hash(password, 12); // Hash the password for security

    // console.log("Transformed User Data:", user); // Log the transformed user data for debugging
    return user;
  };

  const importFromExcel = async (filePath, Model, transformFn) => {
    const workbook = xlsx.readFile(filePath);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = xlsx.utils.sheet_to_json(worksheet); // Convert the sheet to JSON
    if (!Array.isArray(jsonData) || jsonData.length === 0) {
      throw new AppError("Excel file is empty or data is not in the correct format.", 400);
    }

    const importedData = [];
    for (const [index, data] of jsonData.entries()) {
      try {
        const userDocument = await transformFn(data);
        const savedUser = await userDocument.save(); // Save the user to the database
        importedData.push(savedUser); // Push the saved user to the imported data array
      } catch (error) {
        console.error(`Error processing row ${index + 1}: ${error.message}`);
        continue; // Continue processing the next row if there's an error
      }
    }
    return importedData; // Return the list of saved users
  };

  let importedUsers = await importFromExcel(filePath, User, transformUserData);
  console.log("After calling importFromExcel:", importedUsers);

  importedUsers = Array.isArray(importedUsers) ? importedUsers : [];
  // console.log("Final Imported Users after validation:", importedUsers);

  if (importedUsers.length === 0) {
    return next(new AppError('No valid users were imported from the file.', 400));
  }

  const latestSetting = await PaymentSetting.findOne({ latest: true });
  if (!latestSetting) {
    return next(new AppError('No active payment setting found.', 404));
  }

  for (const user of importedUsers) {
    if (user.isActive && user.role === 'User') {
      await createPendingPayments(user, latestSetting.activeYear, latestSetting.activeMonth);
    }
  }

  // fs.unlinkSync(filePath);
  res.status(200).json({
    status: 1,
    message: 'Data imported successfully',
    data: { importedUsers },
  });
});

exports.exportUsers = catchAsync(async (req, res) => {
  const users = await User.find({}); // Fetching data from MongoDB
  await exportToExcel(users, 'Users', 'userData.xlsx', res);
});

exports.sendEmailMessages = catchAsync(async (req, res, next) => {
  // console.log(req.body)
  // console.log("email")
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

    return sendEmail({ email: user.email, subject: subject, message: personalizedMessage });
  });

  try {
    await Promise.all(emailPromises);
    // console.log(`Messages successfully sent to all users.`);
    res.status(200).json({
      status: 1,
      message: 'Messages sent to the specified email list or all users.',
    });
  } catch (error) {
    console.error('Error sending emails:', error);
    return next(new AppError('Failed to send one or more emails', 500));
  }
});
