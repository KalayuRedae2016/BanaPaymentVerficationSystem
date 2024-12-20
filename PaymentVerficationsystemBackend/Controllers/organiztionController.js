const Organization = require('../Models/organizationModel');
const ApiKey = require('../Models/apiKeyModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const { generateUniqueApiKey } = require('../utils/generateUniqueApiKeyToken');
const {formatDate}=require("../utils/formatDate")

exports.createOrganization = catchAsync(async (req, res, next) => {
  const { 
    companyName, 
    companyEmail, 
    companyPhoneNumber, 
    companyPrefixCode, 
    companyAddress, 
    serviceBankAccounts, 
    blockBankAccounts 
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

  // Create and save the new organization
  const organization = await Organization.create({
    companyName, 
    companyEmail, 
    companyPhoneNumber, 
    companyPrefixCode, 
    companyAddress, 
    serviceBankAccounts, 
    blockBankAccounts
  });

  console.log(organization)
  res.status(201).json({
    status: 1,
    message: 'Organizational Profile created successfully',
    organization,
  });
});

exports.getOrganization = catchAsync(async (req, res, next) => {
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
    organization: {
      ...organization._doc, // Spread the organization details
      paymentTransfers,     // Include processed payment transfers
    },
  });
});

exports.updateOrganization = catchAsync(async (req, res,next) => {
  //it is one organization
  const { id } = req.params;
  const {
    companyName,
    companyPhoneNumber,
    companyEmail,
    companyPrefixCode,
    companyAddress,
    blockBankAccounts,
    serviceBankAccounts,
  } = req.body;

  const organization = await Organization.findById(id);
  if (!organization) {
    return next(new AppError('Organization not found', 404));
  }
  // Update only provided fields
  if (companyName) organization.companyName = companyName;
  if (companyPhoneNumber) organization.companyPhoneNumber = companyPhoneNumber;
  if (companyEmail) organization.companyEmail = companyEmail;
  if (companyPrefixCode) organization.companyPrefixCode = companyPrefixCode;
  if (companyAddress) organization.companyAddress = companyAddress;
  if (blockBankAccounts) organization.blockBankAccounts = blockBankAccounts;
  if (serviceBankAccounts) organization.serviceBankAccounts = serviceBankAccounts;

  await organization.save();
  console.log(organization)
  res.status(200).json({
    status: 1,
    message: 'Organization updated',
  });
  //finally the modified data must be stored into the database for reference
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
    return res.status(400).json({
      status: 0,
      error: `Bank type '${bankType}' already exists in ${accountType} accounts`,
    });
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

  // Save the updated organization
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
