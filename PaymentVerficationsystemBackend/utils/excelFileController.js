const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx'); //for import user from excel
const ExcelJS = require('exceljs'); //for export users into excel

const multer = require('multer');
const catchAsync = require('./catchAsync');
const AppError = require('./appError');

exports.importFromExcel = catchAsync(async (filePath, Model, transformFn) => {
  const workbook = xlsx.readFile(filePath);
  const worksheet = workbook.Sheets[workbook.SheetNames[0]];
  const jsonData = xlsx.utils.sheet_to_json(worksheet);

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
        console.log('File downloaded successfully');
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
  // Ensure the destination folder exists
  if (!fs.existsSync(destinationFolder)) {
    fs.mkdirSync(destinationFolder, { recursive: true });
  }
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      // Specify the directory where you want to save the uploaded files
      cb(null, destinationFolder);
    },
    filename: (req, file, cb) => {
      // Generate a unique filename for the uploaded file
      const now = new Date();
      const year = now.getFullYear(); // Full year (e.g., 2024)
      const month = String(now.getMonth() + 1).padStart(2, '0'); // Month as a 2-digit string (01-12)
      const date = String(now.getDate()).padStart(2, '0'); // Day of the month as a 2-digit string (01-31)

      const uniqueSuffix = `${year}-${month}-${date}-${now.getTime()}`; // Combine date and timestamp
      const { name } = path.parse(file.originalname);
      const fileExt = path.extname(file.originalname);
      cb(null, `${filenamePrefix}-${name}-${uniqueSuffix}${fileExt}`);
    },
  });

  const fileFilter = (req, file, cb) => {
    // Accept only specified file types
    if (fileTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('File type not allowed'), false);
    }
  };

  return multer({ storage, fileFilter });
};

exports.deleteFile = (filePath) => {
  if (filePath) {
    fs.unlink(filePath, (err) => {
      if (err) console.error('Failed to delete file:', err);
      else console.log('File deleted:', filePath);
    });
  }
};

