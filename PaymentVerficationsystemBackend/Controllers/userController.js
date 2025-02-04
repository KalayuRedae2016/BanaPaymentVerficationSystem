const bcrypt = require('bcrypt');
const sharp = require('sharp');
const User = require('./../Models/userModel');
const Log = require('./../Models/logModel');
const Organization = require("../Models/organizationModel")
const PaymentSetting = require("../Models/paymentSettingModel")
const fs = require('fs');
const path = require('path');
const validator = require('validator');
const xlsx = require('xlsx'); 
const mongoose=require("mongoose")

const { sendEmail } = require('../utils/email');
const {logAction}=require("../utils/logUtils")
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const { formatDate } = require("../utils/formatDate")
const {validateExistence}=require("../utils/validateExistence")
const {normalizePhoneNumber}=require("../utils/userUtils")
const createPendingPayments = require("../utils/createPendingPayments")
const {exportToExcel,processFileData,createMulterMiddleware, processUploadFiles,deleteFile} = require('../utils/fileController');
const defaultVariables = require('../config/defaultVariables');

// Configure multer for user file uploads
const userFileUpload = createMulterMiddleware(
  'uploads/importedUsers/', // Destination folder
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

  userQuery = req.user.role === "SuperAdmin"? { role: { $in: ["Admin", "User"] } }: req.user.role === "Admin"
  ? { role: "User" }: { _id: req.user._id };
  if (isActive !== undefined) userQuery.isActive = isActive === 'true';
  console.log(userQuery)

  const users = await User.find(userQuery).lean();
  if (!users) {
    return next(new AppError('No users found', 404));
  }

const activeUsers=users.filter(user => user.isActive===true &&user.role==="User").length
// console.log("a",activeUsers)
const offsetUsers=users.filter(user => user.isActive===false).length
const adminUsers=users.filter(user => user.role==="SuperAdmin"||user.role=="Admin").length

  // Format createdAt and updatedAt for each user
  const formattedUsers = users.map(user => {
    const formattedCreatedAt = user.createdAt ? formatDate(user.createdAt) : null;
    const formattedUpdatedAt = user.updatedAt ? formatDate(user.updatedAt) : null;

    return {
      ...user,
      formattedCreatedAt,
      formattedUpdatedAt  
    };
  });

  res.status(200).json({
    status: 1,
    totalUsers: users.length,
    activeUsers:activeUsers,
    offsetUsers:offsetUsers,
    adminUsers:adminUsers,
    users: formattedUsers
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  console.log("herre")
  const userId = req.params.id;
  const user = await User.findById(userId);
  if (!user) {
    return next(new AppError('User not found', 404));
  }

  const { imageData, attachmentsData } = await processFileData(user,"user");
  
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
  
    const existingUser = await User.findById(userId);

    if (!existingUser) {
      return next(new AppError("User is not Found",400))
    }
    const originalUserData = JSON.parse(JSON.stringify(existingUser));

    const {userCode}=req.body
    let updateData ={... req.body};
    
    if (userCode) {
      const normalizedUserCode=userCode.trim().toUpperCase();
      if (!normalizedUserCode.startsWith(defaultVariables.prefixCode)) {
        return next(new AppError("User Code must start with 'BM'",400))

      }
      const userCodeExists = await User.findOne({ userCode: normalizedUserCode, _id: { $ne: userId } });
      if (userCodeExists) {
        return next(new AppError("user Code already in use",400))
      }
    updateData.userCode = normalizedUserCode;
    }
    const {profileImage,attachments}=await processUploadFiles(req.files,req.body,existingUser)
  
    existingUser.set({
      ...req.body,
      profileImage: profileImage || existingUser.profileImage,
      attachments,
    });
    await existingUser.save();
  const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });
  const { imageData, attachmentsData } = await processFileData(updatedUser,"user");
  
  const formattedCreatedAt = updatedUser.createdAt ? formatDate(updatedUser.createdAt) : null;
  const formattedUpdatedAt = updatedUser.updatedAt ? formatDate(updatedUser.updatedAt) : null;
  
  await logAction({
    model: 'users',
    action: 'Update',
    actor: req.user.id,
    description: 'User Profie Updated',
    data: { userId: updatedUser.id,BeforeUpdate:originalUserData,updatedData:existingUser},
    ipAddress: req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress || null,
    severity: 'info',
    sessionId: req.session?.id || 'generated-session-id',
  });

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
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  //const deletedPayment = await Payment.findByIdAndDelete(req.params.id);
  const deletedUser = await User.findByIdAndDelete(req.params.id)
  if (!deletedUser) {
    return next(new AppError("user entry not found", 404))
  }

  await logAction({
    model: 'users',
    action: 'Delete',
    actor: req.user.id,
    description: 'User Profie Deleted',
    data: { userId: deletedUser.id,deletedUser},
    ipAddress: req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress || null,
    severity: 'info',
    sessionId: req.session?.id || 'generated-session-id',
  });

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

  await logAction({
    model: 'users',
    action: 'Update',
    actor: req.user.id,
    description: `${user.fullName} is ${user.isActive ? 'Activated' : 'Deactivated'}`,
    data: { userId: user.id},
    ipAddress: req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress || null,
    severity: 'info',
    sessionId: req.session?.id || 'generated-session-id',
  });

  res.status(200).json({
    status: 1,
    message: `${user.fullName} is ${user.isActive ? 'Activated' : 'Deactivated'
      }`,
  });
});

exports.updateMe = catchAsync(async (req, res, next) => {
  // Step 1: Fetch the user and validate existence
  console.log("requestUser",req.user)
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
      //const oldImagePath = path.join(__dirname, '..', 'uploads', 'profileImages', user.profileImage);
      const oldImagePath =path.join(__dirname, '..', 'uploads', 'userAttachements',user.profileImage);
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
    const filePath = path.join(__dirname, '..', 'uploads', 'userAattachments', removed.fileName);
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

  await logAction({
    model: 'users',
    action: 'Update',
    actor: req.user.id,
    description: `${user.fullName} update his Profile`,
    data: { userId: user.id,filteredBody},
    ipAddress: req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress || null,
    severity: 'info',
    sessionId: req.session?.id || 'generated-session-id',
  });

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
    if (!req.file || !req.file.path) {
      return next(new AppError('File not uploaded or path is invalid.', 400));
    }
  
    if (!req.file.mimetype.includes('spreadsheetml') && !req.file.originalname.endsWith('.xlsx')) {
      return next(new AppError('Please upload a valid Excel file (.xlsx)', 400));
    }
  
    const filePath = req.file.path;
   
  const validateAndTransformUserData = async (data) => {
    console.log("Validating data:", data); // Log incoming data
    const requiredFields = ['firstName', 'middleName', 'lastName', 'phoneNumber', 'role', 'gender', 'age'];
    const missingFields = requiredFields.filter((field) => !data[field]);
    if (missingFields.length > 0) {
      return next(new AppError(`Missing required fields: ${missingFields.join(', ')}`, 400))
    }
    if (data.email && !validator.isEmail(data.email)) {
      return next(new AppError('Invalid email format', 400))
    }
    console.log("mr",missingFields)
    const organization = await validateExistence(Organization, {}, 'Create Organization Profile before creating User');
    const prefixCode = organization.companyPrefixCode;
    const length = 4;

    const user = new User(data);
    user.userCode = await user.generateUserCode(prefixCode, length); // Assuming generateUserCode is a method in User model
    const password = await user.generateRandomPassword(); // Assuming generateRandomPassword is a method in User model
    user.password = await bcrypt.hash(password, 12); // Hash the password for security
    user.phoneNumber = normalizePhoneNumber(user.phoneNumber); // Update phone number
    // console.log("uu",user)
    return user;
  };

  const importFromExcel = async () => {
    const workbook = xlsx.readFile(filePath);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = xlsx.utils.sheet_to_json(worksheet); // Convert the sheet to JSON
    // console.log("jd",jsonData)

    if (!Array.isArray(jsonData) || jsonData.length === 0) {
      throw new AppError('Excel file is empty or data is not in the correct format.', 400);
    }

    const importedData = [];
    const errors = [];

    for (const [index, data] of jsonData.entries()) {
      try {

        const userDocument = await validateAndTransformUserData(data);
        console.log("Transformed User:", userDocument); // Log transformed user data
        const savedUser = await userDocument.save(); // Save the user to the database
        importedData.push(savedUser);
        console.log("Saved User:", savedUser); // Log saved user
      } catch (error) {
        errors.push({ row: index + 1, error: error.message, data });
      }
    }
    console.log("Imported Data:", importedData); // Log final imported data
    return { importedData, errors };
  };

  const { importedData, errors } = await importFromExcel();
  console.log("imd",importedData)

  if (!importedData.length) {
    return next(new AppError('No valid users were imported from the file.', 400));
  }

  const latestSetting = await PaymentSetting.findOne({ latest: true });
  if (!latestSetting) {
    return next(new AppError('No active payment setting found.', 404));
  }

  for (const user of importedData) {
    if (user.isActive && user.role === 'User') {
      await createPendingPayments(user, latestSetting.activeYear, latestSetting.activeMonth);
    }
  }

  fs.unlinkSync(filePath); // Cleanup uploaded file

  res.status(200).json({
    status: 1,
    message: errors.length > 0 ? 'Import completed with some errors' : 'Data imported successfully',
    successCount: importedData.length,
    errorCount: errors.length,
    errors,
    importedUsers: importedData,
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
  const { userIds, editPermission,permittedBy} = req.body; // `userIds` is an array, `editPermission` is a boolean

  console.log(typeof editPermission)
  console.log("reqes per",req.body)
  console.log("reqes user",req.user)
  
  if (!Array.isArray(userIds) || userIds.length === 0) {
    return next(new AppError('Provide a valid array of user IDs', 400));
  }

  if (typeof editPermission !== 'boolean') {
    return next(new AppError('Provide a valid editPermission value (true or false)', 400));
  }

  // if (!mongoose.Types.ObjectId.isValid(permittedBy)) {
  //   return next(new AppError('Invalid Admin ID (permittedBy). Must be a valid ObjectId.', 400));
  // }

  // Validate the logged-in user's role
  const actor = await User.findById(req.user.id);
  if (!actor || !['Admin', 'SuperAdmin'].includes(actor.role)) {
    return next(new AppError('You are not authorized to perform this action.', 403));
  }
  const updatedUsers = await User.updateMany(
    { _id: { $in: userIds } }, // Target the specified users
    { $set: { canEditDetails: editPermission, PermitEditBy:req.user.id}}, // Update the edit permission
    { new: true, runValidators: true }
  );

  if (!updatedUsers.modifiedCount) {
    return next(new AppError('No users were updated. Check the provided user IDs.', 404));
  }
  // Log the action
  const userCount = updatedUsers.modifiedCount;
  await logAction({
    model: 'users',
    action: 'Update',
    actor: req.user.id,
    description: `${userCount} user(s) ${editPermission ? 'granted' : 'revoked/Disabled'} edit permissions.`,
    data: { userIds, updatedUsers },
    ipAddress: req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress || null,
    severity: 'info',
    sessionId: req.session?.id || 'generated-session-id',
  });

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
