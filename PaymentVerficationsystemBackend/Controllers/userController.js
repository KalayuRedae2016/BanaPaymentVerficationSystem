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
const { importFromExcel, exportToExcel, deleteFile,convertFileToBase64,createMulterMiddleware } = require('../utils/fileController');


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

  // Prepare profile image data and attachments data (if available)
  let imageData = null;
  if (user.profileImage) {
    const imageFilePath = path.join(__dirname, '..', 'uploads', 'attachments', user.profileImage);
    imageData = await convertFileToBase64(imageFilePath); // Handle base64 conversion of profile image
  }
  
  let attachmentsData = null;
  if (user.attachments) {
    attachmentsData = await Promise.all(user.attachments.map(async (attachment) => {
      const attachmentPath = path.join(__dirname, '..', 'uploads', 'attachments', attachment.fileName);
      attachment.fileData = await convertFileToBase64(attachmentPath); // Handle base64 conversion of attachments
      return attachment;
    }));
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
    attachmentsData
  });
});

exports.updateUser = catchAsync(async (req, res) => {
    const userId = req.params.id;
    // Retrieve the existing user
    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Initialize update data
    let updateData = req.body;
    
    // Handle userCode validation
    if (updateData.userCode) {
      let userCode = updateData.userCode.trim().toUpperCase();  // Trim any spaces and upper case

      const prefix = userCode.slice(0, 2);  // Ensure the userCode starts with "BM"
      if (prefix !== "BM") {
        return res.status(400).json({
          status: 'fail',
          message: 'User code must start with "BM".',
        });
      }
      updateData.userCode = userCode; // Update the user data with the normalized userCode
      const userCodeRegex = new RegExp('^' + userCode + '$', 'i'); // 'i' makes it case-insensitive
      const userCodeExists = await User.findOne({ userCode: userCodeRegex, _id: { $ne: userId } });
      if (userCodeExists) {
        return res.status(400).json({
          status: 'fail',
          message: 'User code already in use by another user.',
        });
      }
    }
   
    // Handle profile image upload
    if (req.files && req.files.profileImage && req.files.profileImage[0]) {
      updateData.profileImage = req.files.profileImage[0].filename;
      if (existingUser.profileImage && existingUser.profileImage !== 'default.png') {
          const oldImagePath = path.join(__dirname, '../uploads/attachments', existingUser.profileImage);
          await deleteFile(oldImagePath);  // Using async version of deleteFile
        }

      }

      const updatedAttachments = req.body.attachments || []; // Final attachments provided by the client
    let attachmentsToSave = [...updatedAttachments]; // Prepare the updated list of attachments
      const removedAttachments = existingUser.attachments.filter(
        (attachment) => !updatedAttachments.some((updated) => updated.fileName === attachment.fileName)
      );
  
      removedAttachments.forEach((removed) => {
        const filePath = path.join(__dirname, '../uploads/attachments', removed.fileName);
        deleteFile(filePath); // Unlink removed files from storage
      });
    if (req.files && req.files.attachments && req.files.attachments.length > 0) {
      const newAttachments = req.files.attachments.map(file => ({
        fileName: file.filename,
        fileType: file.mimetype,
        description: req.body.description || '',
        uploadDate: new Date(),
      }));

      // Add new attachments to the list to save
      updateData.attachments = [...attachmentsToSave, ...newAttachments];
    
    // Apply updates to the existing user object
    Object.assign(existingUser, updateData);
    const updatedUser = await existingUser.save();

    // Prepare profile image data and attachments data (if available)
  let imageData = null;
  if (updatedUser.profileImage) {
    const imageFilePath = path.join(__dirname, '..', 'uploads', 'attachments', updatedUser.profileImage);
    imageData = await convertFileToBase64(imageFilePath); // Handle base64 conversion of profile image
  }
  
  let attachmentsData = null;
  if (updatedUser.attachments) {
    attachmentsData = await Promise.all(updatedUser.attachments.map(async (attachment) => {
      const attachmentPath = path.join(__dirname, '..', 'uploads', 'attachments', attachment.fileName);
      attachment.fileData = await convertFileToBase64(attachmentPath); // Handle base64 conversion of attachments
      return attachment;
    }));
  }
    // Prepare formatted dates
    const formattedCreatedAt = updatedUser.createdAt ? formatDate(updatedUser.createdAt) : null;
    const formattedUpdatedAt = updatedUser.updatedAt ? formatDate(updatedUser.updatedAt) : null;

    // Send the response with updated user data and image/attachments data
    res.status(200).json({
      status: 1,
      message: `${updatedUser.fullName} updated successfully`,
      updatedUser: {
        ...updatedUser._doc,
        formattedCreatedAt,
        formattedUpdatedAt
      },
      imageData,
      attachmentsData, // Add the attachments data in the response
    });
  }
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  //const deletedPayment = await Payment.findByIdAndDelete(req.params.id);
  const deleteUser = await User.findByIdAndDelete(req.params.id)
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
  const { userId} = req.params;
  const {isActive, reason } = req.body;
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
  // Step 1: Fetch the user and validate existence
  const user = await User.findById(req.user._id);
  if (!user) {
    return next(new AppError('User not found', 404));
  }

  // Step 2: Check if the user has permission to edit details
  if (!user.canEditDetails) {
    return next(new AppError('Editing access is not enabled. Please contact Admin.', 403));
  }

  // Step 3: Prevent password updates through this route
  if (req.body.password) {
    return next(
      new AppError('This route is not for password updates. Please use /updateMyPassword.', 400)
    );
  }

  // Step 4: Filter allowed fields to update
  const filteredBody = filterObj(
    req.body,
    'firstName',
    'middleName',
    'lastName',
    'tigrignaName',
    'phoneNumber',
    'address',
    'email',
    'age',
    'gender'
  );

  // Step 5: Handle profile image upload
  if (req.files && req.files.profileImage) {
    const newProfileImage = req.files.profileImage[0].filename;

    // Delete the existing profile image from the server, if not default
    if (user.profileImage && user.profileImage !== 'default.png') {
      const oldImagePath = path.join(__dirname, '..', 'uploads', 'profileImages', user.profileImage);
      deleteFile(oldImagePath);
    }

    // Update profile image in the filtered body
    filteredBody.profileImage = newProfileImage;
  }

  // Step 6: Handle attachments update
  const updatedAttachments = req.body.attachments
    ? JSON.parse(req.body.attachments) // Parse if attachments are sent as JSON
    : [];
  const existingAttachments = user.attachments || [];

  // Determine attachments to remove (those not in the updated list)
  const removedAttachments = existingAttachments.filter(
    (attachment) => !updatedAttachments.some((updated) => updated.fileName === attachment.fileName)
  );

  // Delete removed attachments from the storage
  for (const removed of removedAttachments) {
    const filePath = path.join(__dirname, '..', 'uploads', 'attachments', removed.fileName);
    deleteFile(filePath);
  }

  // Prepare the final list of attachments
  let attachmentsToSave = [...updatedAttachments];

  // Add new attachments from req.files.attachments
  if (req.files && req.files.attachments && req.files.attachments.length > 0) {
    const newAttachments = req.files.attachments.map((file) => ({
      fileName: file.filename,
      fileType: file.mimetype,
      description: req.body.description || '',
      uploadDate: new Date(),
    }));

    attachmentsToSave.push(...newAttachments); // Combine existing with new attachments
  }

  // Update attachments in the filtered body
  filteredBody.attachments = attachmentsToSave;

  // Step 7: Update user details in the database
  const updatedUser = await User.findByIdAndUpdate(
    req.user._id,
    { $set: filteredBody },
    { new: true, runValidators: true }
  );

  // Step 8: Revoke edit permission after successful update
  user.canEditDetails = false;
  await user.save();

  // Step 9: Format timestamps for the response
  const formattedCreatedAt = updatedUser.createdAt ? formatDate(updatedUser.createdAt) : null;
  const formattedUpdatedAt = updatedUser.updatedAt ? formatDate(updatedUser.updatedAt) : null;

  // Step 10: Send success response
  res.status(200).json({
    status: 'success',
    message: {
      ...updatedUser._doc,
      formattedCreatedAt,
      formattedUpdatedAt,
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
  const { emailList, subject, message } = req.body;

  // Ensure subject and message are provided
  if (!subject && !message) {
    return next(new AppError('Subject and message are required', 400));
  }

  // Validate emailList is an array if provided
  if (emailList && !Array.isArray(emailList)) {
    return next(new AppError('emailList must be an array', 400));
  }

  let users;
  if (emailList && emailList.length > 0) {
    // Validate and filter emails in emailList
    const validEmails = emailList.filter(email => validator.isEmail(email));
    if (validEmails.length === 0) {
      return next(new AppError('No valid email addresses found in the provided list', 400));
    }
    users = await User.find({ email: { $in: validEmails } }, { email: 1, fullName: 1 }).sort({ createdAt: 1 });
  } else {
    // Fetch all users with valid emails
    users = await User.find({ email: { $ne: null } }, { email: 1, fullName: 1 }).sort({ createdAt: 1 });
  }

  // Handle case where no users are found
  if (!users || users.length === 0) {
    return next(new AppError('No users found with valid email addresses', 404));
  }

  // Prepare email sending promises
  const emailPromises = users.map(user => {
    const emailSubject = subject || 'Welcome to Our Platform, Bana Mole Marketing Group!';
    const emailMessage = message
      ? `Dear ${user.fullName},\n\n${message}`
      : `Hi ${user.fullName},\n\nWelcome to Our Platform! We're excited to have you on board.\n\nPlease use the following link to access our platform:\n- Login Link: ${
          process.env.NODE_ENV === 'development' ? 'http://localhost:5173' : 'https://banapvs.com'
        }\n\nIf you have any questions or need assistance, feel free to contact our support team.\n\nBest regards,\nThe Bana Marketing Group Team`;

    return sendEmail({ email: user.email, subject: emailSubject, message: emailMessage });
  });

  try {
    await Promise.all(emailPromises);
    res.status(200).json({
      status: 1,
      message: 'Emails sent successfully to users with valid emails.',
    });
  } catch (error) {
    console.error('Error sending emails:', error);
    return next(new AppError('Failed to send one or more emails', 500));
  }
});

exports.toggleEdiUserPermission= catchAsync(async (req, res, next) => {
  const { userIds, editPermission } = req.body; // `userIds` is an array, `editPermission` is a boolean

  if (!Array.isArray(userIds) || userIds.length === 0) {
    return next(new AppError('Provide a valid array of user IDs', 400));
  }

  if (typeof editPermission !== 'boolean') {
    return next(new AppError('Provide a valid editPermission value (true or false)', 400));
  }

  const updatedUsers = await User.updateMany(
    { _id: { $in: userIds } }, // Target the specified users
    { $set: { canEdit: editPermission } }, // Update the edit permission
    { new: true, runValidators: true }
  );

  if (!updatedUsers.modifiedCount) {
    return next(new AppError('No users were updated. Check the provided user IDs.', 404));
  }

  res.status(200).json({
    status: 'success',
    message: `Edit permissions have been ${editPermission ? 'granted' : 'revoked/Disabled'} for the specified users.`,
    updatedCount: updatedUsers.modifiedCount,
  });
});

// // Upload attachments
// exports.uploadAttachments = [
//   uploadAttachmentsMiddleware,
//   catchAsync(async (req, res, next) => {
//     const userId= req.body.userId; // Optional userId to upload for another user (admin use)
    
//     // Ensure the user is authenticated and has the necessary role
//     if (!req.user || !req.user.role) {
//       return next(new AppError('User role is missing. Unauthorized.', 401));
//     }

//     const userToUploadFor = (req.user.role === 'SuperAdmin'&& userId || (req.user.role === 'Admin' && userId))
//       ? await User.findById(userId) // If SuperAdmin or Admin with userId, use userId, else use current user
//       : await User.findById(req.user._id); // Regular user uploads for themselves

//     console.log("userID", userId);
//     console.log("reqUser", req.user.id);
//     console.log("user to upload for", userToUploadFor)
//     if (!userToUploadFor) {
//       return next(new AppError('User not found', 404));
//     }

//     const { files } = req;
//     console.log("attachenements",files)
//     if (!files || files.length === 0) {
//       return next(new AppError('No files uploaded', 400));
//     }

//     files.forEach(file => {
//       userToUploadFor.attachments.push({
//         fileName: file.filename,
//         fileType: file.mimetype,
//         description: req.body.description || '', // Optional description for each file
//         uploadDate: new Date(),
//       });
//     });

//   console.log(userToUploadFor.attachments)
//     await userToUploadFor.save();

//     res.status(200).json({
//       status: 'success',
//       message: 'Attachments uploaded successfully',
//       attachments: userToUploadFor.attachments,
//     });
//   }),
// ];

// // Delete attachments
// exports.deleteAttachments = catchAsync(async (req, res, next) => {
//   const userId = req.body.userId || req.user._id; // If admin, pass userId, else use current user's ID
//   const userToDeleteFrom = req.user.role === 'SuperAdmin' || req.user.role === 'Admin'
//     ? await User.findById(userId)
//     : await User.findById(req.user._id); // Only allow self-delete if the user is deleting their own attachments

//   if (!userToDeleteFrom) {
//     return next(new AppError('User not found', 404));
//   }

//   console.log("rrrrrr",req.body)
//   const { filenames } = req.body;
//   if (!filenames || !Array.isArray(filenames) || filenames.length === 0) {
//     return next(new AppError('No filenames provided for deletion', 400));
//   }

//   filenames.forEach(filename => {
//     const attachmentIndex = userToDeleteFrom.attachments.findIndex(att => att.fileName === filename);
    
//     if (attachmentIndex !== -1) {
//       const filePath = path.join(__dirname, '../uploads/attachments', filename);
      
//       if (fs.existsSync(filePath)) {
//         fs.unlinkSync(filePath);
//       }

//       userToDeleteFrom.attachments.splice(attachmentIndex, 1);
//     }
//   });

//   await userToDeleteFrom.save();

//   res.status(200).json({
//     status: 'success',
//     message: 'Attachments deleted successfully',
//     attachments: userToDeleteFrom.attachments,
//   });
// });
