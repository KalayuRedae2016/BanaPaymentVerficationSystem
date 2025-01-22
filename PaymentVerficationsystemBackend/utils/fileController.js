const fs = require('fs');
const fss = require('fs').promises;  // Use fs.promises for async file reading
const sharp = require('sharp');
const path = require('path');
const xlsx = require('xlsx'); //for import user from excel

const multer = require('multer');
const catchAsync = require('./catchAsync');
const AppError = require('./appError');

exports.importFromExcel = catchAsync(async (filePath, Model, transformFn) => {
  const workbook = xlsx.readFile(filePath);
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  const jsonData = xlsx.utils.sheet_to_json(worksheet);
  // console.log(jsonData)
  if (!Array.isArray(jsonData) || jsonData.length === 0) {
    throw new AppError("Excel file is empty or data is not in the correct format.", 400);
  }

  const importedData = [];
  for (const [index, data] of jsonData.entries()) {
    try {
      const document = transformFn ? await transformFn(data) : new Model(data);
      const savedDocument = await document.save();
      importedData.push(savedDocument);
    } catch (error) {
      console.error(`Error processing row ${index + 1}: ${error.message}`);
      continue; // Ensure processing continues for subsequent rows
    }
  }
  // console.log(importedData)
  return importedData; // Always return an array
});

// Utility function to export data to Excel
exports.exportToExcel = async (data, sheetName, fileName, res) => {
  try {
    // Convert data to plain JavaScript objects, ensuring subdocuments are included
    const dataObjects = data.map(item => item.toObject({ flattenMaps: true, minimize: false }));
    // minimize: false ensures empty objects or arrays are not removed.

    // Convert JSON data to worksheet
    const worksheet = xlsx.utils.json_to_sheet(dataObjects);
    const workbook = xlsx.utils.book_new(); // Create a new workbook
    xlsx.utils.book_append_sheet(workbook, worksheet, sheetName); // Append worksheet to workbook
    const filePath = path.join(__dirname, '../uploads', fileName); // Define file path

    // Ensure the directory exists
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Write workbook to file
    xlsx.writeFile(workbook, filePath);

    // Initiate download
    res.download(filePath, fileName, (err) => {
      if (err) {
        console.error('Failed to download file:', err);
        res.status(500).send('Failed to download file');
      } else {
        // console.log('File downloaded successfully');
        fs.unlinkSync(filePath); // Optionally delete the file after download
      }
    });

  } catch (err) {
    console.error('Failed to export data to Excel file:', err);
    res.status(500).send('Failed to export data to Excel file');
  }
};

exports.uploadFile = async (req, res) => {
  try {
    const { originalname, buffer } = req.file;

    const file = new File({
      fileName: req.file.filename,
      originalName: originalname,
      data: req.file.buffer, // Ensure this line is correct
    });

    await file.save();
    //console.log(req.file.buffer);

    res.send('File uploaded and saved to the database.');
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).send('Error uploading file.');
  }
};
exports.uploadMultipleFiles = (req, res) => {
  // Use the "upload.array" method to handle multiple file uploads
  upload.array('files')(req, res, (err) => {
    if (err) {
      // Handle any error that occurred during file upload
      console.error(err);
      return res.status(500).json({ error: 'Error uploading files' });
    }

    // Access uploaded files through "req.files" array
    const files = req.files;

    // Process the uploaded files as needed

    // Return a response indicating successful file upload
    res
      .status(200)
      .json({ message: 'Files uploaded successfully', files: files });
  });
};

// Utility function to configure multer for file uploads
exports.createMulterMiddleware = (destinationFolder, filenamePrefix, fileTypes) => {
  console.log("Middleware initialization started");
  if (!fs.existsSync(destinationFolder)) {
    fs.mkdirSync(destinationFolder, { recursive: true });
  }
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      try {
        cb(null, destinationFolder); // Ensure callback is invoked with the destination folder
      } catch (err) {
        console.error("Error in destination callback:", err.message);
        cb(err, null); // Pass error to callback
      }
    },
    filename: (req, file, cb) => {
      try {
        console.log("Processing file:", file);
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const date = String(now.getDate()).padStart(2, '0');
        const uniqueSuffix = `${year}-${month}-${date}-${now.getTime()}`;
        const { name } = path.parse(file.originalname);
        const fileExt = path.extname(file.originalname);
        const uniqueFilename = `${filenamePrefix}-${name}-${uniqueSuffix}${fileExt}`;
        cb(null, uniqueFilename); // Ensure callback is invoked with the unique filename
      } catch (err) {
        console.error("Error in filename callback:", err.message);
        cb(err, null); // Pass error to callback
      }
    },
  });

  console.log("Storage configured");

  // Configure file filter
  const fileFilter = (req, file, cb) => {
    console.log('File upload middleware hit');
    console.log('File type:', file.mimetype);
    try {
      if (fileTypes.includes(file.mimetype)) {
        console.log("requested fileType tadese", file.mimetype)
        console.log("Allowed FileTypes kalayu", fileTypes)
        cb(null, true); // Accept the file
      } else {
        cb(new Error('File type not allowed'), false); // Reject the file
      }
    } catch (err) {
      console.error("Error in fileFilter:", err.message);
      cb(err, false); // Pass error to callback
    }
  };

  return multer({ storage, fileFilter });
};

exports.deleteFile = async (filePath) => {
  if (!filePath) {
    console.error('No file path provided for deletion.');
    return;
  }

  try {
    await fs.promises.unlink(filePath); // Using fs.promises.unlink to return a promise
    console.log('File deleted:', filePath);
  } catch (err) {
    console.error(`Failed to delete file at ${filePath}:`, err);
  }
};

exports.processFileData = async (user) => {
  console.log("TTT,",user)
  const convertFileToBase64 = async (filePath) => {
    console.log("filePath", filePath)
    try {
      const fileBuffer = await fss.readFile(filePath); // Read file as binary
      return fileBuffer.toString('base64'); // Convert to Base64
    } catch (error) {
      console.error(`Error reading file at ${filePath}:`, error);
      throw error;
    }
  }
  console.log("userProfile", user.attachments)
  // Prepare profile image data (if available)
  const imageData = user.profileImage
    ? await convertFileToBase64(path.join(__dirname, '..', 'uploads', 'attachments', user.profileImage))
    : null;

  // Process attachments
  let attachmentsData = [];
  if (user.attachments && user.attachments.length > 0) {
    attachmentsData = await Promise.all(user.attachments.map(async (attachment) => {
      const attachmentPath = path.join(__dirname, '..', 'uploads', 'attachments', attachment.fileName);
      console.log(attachment)
      try {
          const fileData = await convertFileToBase64(attachmentPath)
          const filename = attachment.fileName
          const fileType = attachment.fileType
          const description = attachment.description
          const uploadedDate = attachment.uploadedDate
          const id = attachment.id
          const filePath=attachmentPath
        
        console.log('File successfully encoded for:', attachment.fileName);

        return {filename,fileType,description,uploadedDate,id,fileData,filePath}; // Return a new object with fileData
      } catch (error) {
        console.error(`Error processing attachment ${attachment.fileName}:`, error.message);
        return { error: error.message }; // Include error details
      }
    }));
  } else {
    console.log('No attachments found.');
  }

  // console.log('Processed Attachments Data:', attachmentsData); // Debug final result
  return { imageData, attachmentsData };
};

exports.processUploadFiles = async (files, body, existingUser = null) => {
  const profileImage = files?.profileImage?.[0]?.filename || null;

  if (existingUser && profileImage) {
    if (existingUser.profileImage && existingUser.profileImage !== 'default.png') {
      const oldImagePath = path.join(__dirname, '../uploads/attachments', existingUser.profileImage);
      // await deleteFile(oldImagePath);  
      await exports.deleteFile(oldImagePath);  // Explicitly reference deleteFile using exports
    }
  }

  const newAttachments = files?.attachments
    ? files.attachments.map((file,index) => ({
      fileName: file.filename,
      fileType: file.mimetype,
      description: body?.attachments?.[index]?.description || '',
      uploadDate: new Date(),
    }))
    : [];

  // For updates, merge existing attachments
  const attachments = existingUser
    ? [
      ...(body.attachments || []), // Attachments retained by the client
      ...newAttachments, // Newly uploaded attachments
    ]
    : newAttachments; // For signup, only new attachments

  return { profileImage, attachments };
};

