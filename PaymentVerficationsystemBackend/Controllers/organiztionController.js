const Organization = require('../Models/organizationModel');
const ApiKey = require('../Models/apiKeyModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const {logAction}=require("../utils/logUtils")
const { generateUniqueApiKey } = require('../utils/generateUniqueApiKeyToken');
const {formatDate,formatDateGC}=require("../utils/formatDate")


exports.createOrganization = catchAsync(async (req, res, next) => {
  const { 
    companyName, 
    companyEmail, 
    companyPhoneNumber, 
    companyPrefixCode, 
    companyAddress, 
    serviceBankAccounts = [], 
    blockBankAccounts = [],
    expenditure=[]
  } = req.body;

  // Check for required fields
  if (!companyName || !companyEmail || !companyPhoneNumber || !companyPrefixCode || !companyAddress) {
    return next(new AppError('Please provide all required fields', 400));
  }

  // Check if an organization already exists
  const existingOrganization = await Organization.findOne({});
  if (existingOrganization) {
    return res.status(409).json({
      status: 0,
      message: 'Organizational Profile already exists',
    });
  }

  // Extract all unique bank types from both arrays
  const allBankTypes = new Set([
    ...serviceBankAccounts.map((account) => account.bankType),
    ...blockBankAccounts.map((account) => account.bankType),
  ]);

  // Create and save the new organization
  const organization = await Organization.create({
    companyName,
    companyEmail,
    companyPhoneNumber,
    companyPrefixCode,
    companyAddress,
    serviceBankAccounts,
    blockBankAccounts,
    expenditure
  });

// console.log("all size",allBankTypes.size)
 if(allBankTypes.size!=0){
   // Generate API keys for unique bank types
   for (const bankType of allBankTypes) {
    const existingApiKey = await ApiKey.findOne({ bankType, status: 'active' });
    if (!existingApiKey) {
      const apiKey = new ApiKey({
        key: generateUniqueApiKey(), // Function to generate unique API key
        organizationId: organization._id,
        bankType,
        scope: 'read-only', // Default scope, can be adjusted as needed
      });
      await apiKey.save();
    }
  }
 }

 await logAction({
  model: 'organizations',
  action: 'Create',
  actor: req.user && req.user.id ? req.user.id : 'system',
  description: 'Organization Profie Created',
  data: { orgId:organization.id},
  ipAddress: req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress || null,
  severity: 'info',
  sessionId: req.session?.id || 'generated-session-id',
});

  res.status(201).json({
    status: 1,
    message: 'Organizational Profile created successfully',
    organization,
  });
});

exports.getOrganization = catchAsync(async (req, res, next) => {
  console.log("orgination get")
  // Fetch the organization from the database
  const organization = await Organization.findOne();

  // If no organization is found, respond with an empty array for organization
  if (!organization) {
    return res.status(200).json({
      status: 1,
      organization: [], // Send organization as an empty array
    });
  }

  // If organization is found, process the payment transfers
  const paymentTransfers = organization.paymentTransfers?.map((transfer) => {
    return {
      ...transfer._doc, // Spread the original transfer details
      formattedTransferDate: transfer.transferDate
        ? formatDate(transfer.transferDate)
        : null,
    };
  }) || []; // Default to an empty array if undefined

  // Respond with the organization details
  res.status(200).json({
    status: 1,
    serviceLength:organization.serviceBankAccounts.length,
    blockLength:organization.blockBankAccounts.length,
    organization: {
      ...organization._doc, // Spread the organization details
      paymentTransfers,     // Include processed payment transfers
    },
  });
});

exports.updateOrganization = catchAsync(async (req, res, next) => {
  const { 
    companyName, 
    companyEmail, 
    companyPhoneNumber, 
    companyPrefixCode, 
    companyAddress, 
    serviceBankAccounts = [], 
    blockBankAccounts = [] 
  } = req.body;

  // Check if organization exists
  const organization = await Organization.findOne({});
  if (!organization) {
    return next(new AppError('Organizational Profile not found', 404));
  }

  const existingBankTypesInService = new Set(organization.serviceBankAccounts.map((account) => account.bankType));
  const existingBankTypesInBlock = new Set(organization.blockBankAccounts.map((account) => account.bankType));

  const newBankTypesInService = serviceBankAccounts.map((account) => account.bankType);
  const newBankTypesInBlock = blockBankAccounts.map((account) => account.bankType);

  const duplicateServiceBankTypes = newBankTypesInService.filter(
    (bankType, index, self) => self.indexOf(bankType) !== index
  );
  const duplicateBlockBankTypes = newBankTypesInBlock.filter(
    (bankType, index, self) => self.indexOf(bankType) !== index
  );

  if (duplicateServiceBankTypes.length > 0) {
    return next(new AppError(
      `Duplicate bank types found in serviceBankAccounts: ${duplicateServiceBankTypes.join(', ')}`, 
      400
    ));
  }

  if (duplicateBlockBankTypes.length > 0) {
    return next(new AppError(
      `Duplicate bank types found in blockBankAccounts: ${duplicateBlockBankTypes.join(', ')}`, 
      400
    ));
  }

  // If the bank types in serviceBankAccounts and blockBankAccounts are not duplicates, proceed with updating
  if(companyName)organization.companyName = companyName || organization.companyName;
  if(companyEmail)organization.companyEmail = companyEmail || organization.companyEmail;
  if(companyPhoneNumber) organization.companyPhoneNumber = companyPhoneNumber || organization.companyPhoneNumber;
  if(companyPrefixCode) organization.companyPrefixCode = companyPrefixCode || organization.companyPrefixCode;
  if(companyAddress) organization.companyAddress = companyAddress || organization.companyAddress;

  if (serviceBankAccounts.length > 0) {
    organization.serviceBankAccounts = serviceBankAccounts;
  }

  if (blockBankAccounts.length > 0) {
    organization.blockBankAccounts = blockBankAccounts;
  }
  await organization.save();

  const addedBankTypes = [
    ...newBankTypesInService.filter(bankType => !existingBankTypesInService.has(bankType)),
    ...newBankTypesInBlock.filter(bankType => !existingBankTypesInBlock.has(bankType))
  ];

  for (const bankType of addedBankTypes) {
    const existingApiKey = await ApiKey.findOne({ bankType, status: 'active' });
    if (!existingApiKey) {
      const apiKey = new ApiKey({
        key: generateUniqueApiKey(), // Generate a unique API key
        organizationId: organization._id,
        bankType,
        scope: 'read-only', // Default scope
      });
      await apiKey.save();
    }
  }

  await logAction({
    model: 'organizations',
    action: 'Update',
    actor: req.user && req.user.id ? req.user.id : 'system',
    description: 'organization Profie Updated',
    data: { orgId: organization.id, body: req.body },
    ipAddress: req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress || null,
    severity: 'info',
    sessionId: req.session?.id || 'generated-session-id',
  });


  res.status(200).json({
    status: 1,
    message: 'Organizational Profile updated successfully',
    organization,
  });
});

exports.addBankAccount = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { accountType, bankType, bankAccountNumber, balance } = req.body;

  // Find the organization by ID
  const organization = await Organization.findById(id);
  if (!organization) {
    return res.status(400).json({
      status: 0,
      error: 'Organization not found',
    });
  }

  // Validate the accountType field
  if (!['block', 'service'].includes(accountType)) {
    return res.status(400).json({
      status: 0,
      error: 'Invalid account type',
    });
  }

  // Check for duplicate bankType within the accountType array
  const existingAccount = (accountType === 'block'
    ? organization.blockBankAccounts
    : organization.serviceBankAccounts
  ).find(account => account.bankType === bankType);

  if (existingAccount) {
    return next(new AppError(`Bank type '${bankType}' already exists in ${accountType} accounts`,400))
  }

  // Create a new bank account object
  const newBankAccount = {
    bankType,
    bankAccountNumber,
    balance: balance || 0,
  };

  // Add the new bank account to the correct array based on accountType
  if (accountType === 'block') {
    organization.blockBankAccounts.push(newBankAccount);
  } else if (accountType === 'service') {
    organization.serviceBankAccounts.push(newBankAccount);
  }

  await organization.save();

  // Generate API key for the new bank type if it's not already created
  const existingApiKey = await ApiKey.findOne({ bankType, status: 'active' });
  if (!existingApiKey) {
    const apiKey = new ApiKey({
      key: generateUniqueApiKey(), // Function to generate unique API key
      organizationId: organization._id,
      bankType,
      scope: 'read-only', // Default scope, you can change it based on the logic
    });
    await apiKey.save();
  }
  
  // Send a success response
  res.status(200).json({
    status: 1,
    message: 'Bank account added successfully',
    data: newBankAccount,
  });
});

exports.deleteOrgs = catchAsync(async (req, res, next) => {
  const deletedOrg = await Organization.deleteMany({});  // Deletes all documents
  if (deletedOrg.deletedCount === 0) {
    return next(new AppError("No Org found to delete", 404));
  }

  await logAction({
    model: 'organizations',
    action: 'Delete',
    actor: req.user && req.user.id ? req.user.id : 'system',
    description: 'Org Profie Deleted',
    data: {deletedOrg},
    ipAddress: req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress || null,
    severity: 'info',
    sessionId: req.session?.id || 'generated-session-id',
  });
  res.status(200).json({
    status: 'success',
    message: `${deletedOrg.deletedCount} Organization Deleted`
  });
});

exports.updateAPiKey = catchAsync(async (req, res, next) => {
  console.log(req.params);

  // Ensure you are using the correct param name based on your route definition
  const keyId = req.params.keyId || req.params.Id;
  console.log("Extracted keyId:", keyId);

  if (!keyId) {
    return next(new AppError("Key ID is not found", 404));
  }

  console.log("Updating API key for ID:", keyId);

  const apiKey = await ApiKey.findOneAndUpdate(
    { _id: keyId },
    { key: generateUniqueApiKey() }, // Ensure this function generates a valid API key
    { new: true, runValidators: true }
  );

  if (!apiKey) {
    return next(new AppError("API key is not found", 404));
  }

  console.log("Updated API Key:", apiKey);

  res.status(200).json({
    success: 1,
    data: apiKey,
  });
});
exports.viewAPiKey = catchAsync(async (req, res, next) => {
 
  const apiKey = await ApiKey.find({ status: "active" });
  if (!apiKey || apiKey.length === 0) {
    return res.status(200).json({
      success: 1,
      data: [],
    });
  }

  res.status(200).json({
    success: 1,
    data: apiKey,
  });
});


