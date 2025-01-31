const { formatDate } = require("../utils/formatDate");
const mongoose = require('mongoose');

function calculateBalances(payments, org,users={}) {

  let organization = {
    totalRegularBalance: 0,
    totalUrgentBalance: 0,
    totalSubsidyBalance: 0,

    totalServiceBalance: 0,
    totalPenalityBalance: 0,

    blockBankTransfered: 0,
    serviceBankTransfered: 0,

    blockUserWithdrawal:0,
    serviceUserWithdrawal:0,

    blockExpenditure:0,
    serviceExpenditure:0,
   
    totalBlockBankAccount: 0,
    totalServiceBankAccount: 0,

    TotalOrgBalance: 0,
  };

  const categorizedPayments = {};
  const totalBalanceBankType = {}; // To hold the summarized bank balances across all statuses
  const userBalances=[]

  payments.forEach((payment) => {
    const paymentStatus = payment.status || "Undefined"; // Categorize by status (confirmed, pending, etc.)
    const userCode = payment.userCode?.toString();
    const billCode = payment.billCode?.toString();

    // Initialize categorizedPayments for the current status
    if (!categorizedPayments[paymentStatus]) {
      categorizedPayments[paymentStatus] = {
        uniqueUsers: new Set(),
        totalPayments: new Set(),
        totalExpectedAmount: 0,
        totalPaidAmount: 0,
        totalRegistrationAmount: 0,
        totalRegFeeAmountPaid: 0,
        totalRegFeeAmountNotPaid: 0,
        totalRegularAmountPaid: 0,
        totalRegularAmountNotPaid: 0,
        totalUrgentAmountPaid: 0,
        totalUrgentAmountNotPaid: 0,
        totalSubsidyAmountPaid: 0,
        totalSubsidyAmountNotPaid: 0,
        totalServiceAmountPaid: 0,
        totalServiceAmountNotPaid: 0,
        totalPenalityAmountPaid: 0,
        totalPenalityAmountNotPaid: 0,
        totalBlockBankAccountPaid: 0,
        totalBlockBankAccountNotPaid: 0,
        totalServiceBankAccountPaid: 0,
        totalServiceBankAccountNotPaid: 0,
        bankTypes: {},
        payments: [], // Payments specific to this status
      };
    }

    // Initialize userBalances for the current user
    if (!userBalances[userCode]) {
      userBalances[userCode] = {
        totalRegularBalance: 0,
        totalUrgentBalance: 0,
        totalSubsidyBalance: 0,

        totalServiceBalance: 0,
        totalPenalityBalance: 0,

        blockUserWithdrawal:0,
        serviceUserWithdrawal:0,

        totalServiceBankAccount:0,
        totalBlockBankAccount:0

        // totalPaidAmount: 0,
        // totalExpectedAmount: 0,
        // payments: [], // Payments specific to this user
      };
    }

    const statusObj = categorizedPayments[paymentStatus];
    const userObj = userBalances[userCode];

    statusObj.uniqueUsers.add(userCode);
    statusObj.totalPayments.add(billCode);
    statusObj.totalExpectedAmount += payment.totalExpectedAmount || 0;
    statusObj.totalPaidAmount += payment.totalPaidAmount || 0;
    statusObj.totalRegistrationAmount += payment.registrationFee || 0;

    // Update userBalances
    // userObj.totalExpectedAmount += payment.totalExpectedAmount || 0;
    // userObj.totalPaidAmount += payment.totalPaidAmount || 0;

    // Calculate different amounts based on the payment types
    const amounts = {
      totalRegularAmountPaid: payment.regular?.isPaid ? payment.regular.amount : 0,
      totalRegularAmountNotPaid: !payment.regular?.isPaid ? payment.regular?.amount || 0 : 0,
      totalUrgentAmountPaid: payment.urgent?.isPaid ? payment.urgent.amount : 0,
      totalUrgentAmountNotPaid: !payment.urgent?.isPaid ? payment.urgent?.amount || 0 : 0,
      totalSubsidyAmountPaid: payment.subsidy?.isPaid ? payment.subsidy.amount : 0,
      totalSubsidyAmountNotPaid: !payment.subsidy?.isPaid ? payment.subsidy?.amount || 0 : 0,
      totalServiceAmountPaid: payment.service?.isPaid ? payment.service.amount : 0,
      totalServiceAmountNotPaid: !payment.service?.isPaid ? payment.service?.amount || 0 : 0,
      totalPenalityAmountPaid: payment.penality?.isPaid ? payment.penality.amount : 0,
      totalPenalityAmountNotPaid: !payment.penality?.isPaid ? payment.penality?.amount || 0 : 0,
      totalRegFeeAmountPaid: payment.isPaid ? payment.registrationFee : 0,
      totalRegFeeAmountNotPaid: !payment.isPaid ? payment.registrationFee || 0 : 0,
    };

    // Update the totals for each payment type
    for (const key in amounts) {
      statusObj[key] += amounts[key];
    }

    // Block and Service Account amounts
    statusObj.totalBlockBankAccountPaid += amounts.totalRegularAmountPaid + amounts.totalUrgentAmountPaid + amounts.totalSubsidyAmountPaid;
    statusObj.totalBlockBankAccountNotPaid += amounts.totalRegularAmountNotPaid + amounts.totalUrgentAmountNotPaid + amounts.totalSubsidyAmountNotPaid;

    statusObj.totalServiceBankAccountPaid += amounts.totalServiceAmountPaid + amounts.totalPenalityAmountPaid;
    statusObj.totalServiceBankAccountNotPaid += amounts.totalServiceAmountNotPaid + amounts.totalPenalityAmountNotPaid;

    // Payment types and bank types handling
    const paymentTypes = ["regular", "urgent", "subsidy", "service", "penality"];
    paymentTypes.forEach((type) => {
      const paymentType = payment[type];
      if (paymentType) {
        const bankType = paymentType.bankType || "unKnown"; // Ensure `bankType` is defined

        if (!statusObj.bankTypes[bankType]) {
          statusObj.bankTypes[bankType] = {
            regularBalance: 0,
            urgentBalance: 0,
            subsidyBalance: 0,
            serviceBalance: 0,
            penalityBalance: 0,

            totalBlockBalance: 0,
            totalServiceBalance: 0,
          };
        }

        const bankDetails = statusObj.bankTypes[bankType];

        if (paymentType.isPaid) {
          // Update balances for each bankType and paymentType
          bankDetails[`${type}Balance`] += paymentType.amount || 0;
          organization[`total${type.charAt(0).toUpperCase() + type.slice(1)}Balance`] += paymentType.amount || 0;
          userObj[`total${type.charAt(0).toUpperCase() + type.slice(1)}Balance`] += paymentType.amount || 0;
          if (["service", "penality"].includes(type)) {
            organization.totalServiceBankAccount += paymentType.amount || 0;
            bankDetails.totalServiceBalance += paymentType.amount || 0;
            userObj[`totalServiceBankAccount`] += paymentType.amount || 0;
          } else {
            organization.totalBlockBankAccount += paymentType.amount || 0;
            bankDetails.totalBlockBalance += paymentType.amount || 0;
            userObj[`totalBlockBankAccount`] += paymentType.amount || 0;
          }
        }
      }
    });

    // Format payment dates
    const formattedPayment = { ...payment };
    paymentTypes.forEach((type) => {
      if (payment[type]) {
        if (payment[type].paidAt) {
          formattedPayment[type] = { ...payment[type], paidAt: formatDate(payment[type].paidAt) };
        }
        if (payment[type].createdAt) {
          formattedPayment[type].createdAt = formatDate(payment[type].createdAt);
        }
        if (payment[type].updatedAt) {
          formattedPayment[type].updatedAt = formatDate(payment[type].updatedAt);
        }
      }
    });

    if (payment.createdAt) formattedPayment.createdAt = formatDate(payment.createdAt);
    if (payment.updatedAt) formattedPayment.updatedAt = formatDate(payment.updatedAt);
    if (payment.confirmedDate) formattedPayment.confirmedDate = formatDate(payment.confirmedDate);

    // Push the payment to its respective statusObj
    statusObj.payments.push(formattedPayment);
    // userObj.payments.push(payment);
  });

  // Clean up categorizedPayments for final output
  Object.values(categorizedPayments).forEach((statusObj) => {
    statusObj.uniqueUsers = statusObj.uniqueUsers.size;
    statusObj.totalPayments = statusObj.totalPayments.size;
  });

  // Remove 'unKnown' bankTypes for each status
  for (const status in categorizedPayments) {
    if (categorizedPayments[status].bankTypes["unKnown"]) {
      delete categorizedPayments[status].bankTypes["unKnown"];
    }
  }

  // Remove unnecessary "NotPaid" fields for confirmed payments
  for (const status in categorizedPayments) {
    if (status === "confirmed") {
      for (const key in categorizedPayments[status]) {
        if (key.includes("NotPaid") && categorizedPayments[status][key] === 0) {
          delete categorizedPayments[status][key];
        }
      }

      // Remove unpaidBalances for confirmed payments
      for (const bankType in categorizedPayments[status].bankTypes) {
        if (categorizedPayments[status].bankTypes[bankType].unpaidBalances) {
          delete categorizedPayments[status].bankTypes[bankType].unpaidBalances;
        }
      }
    }
  }

  // Calculate totalBalanceBankType based on all statuses
  Object.values(categorizedPayments).forEach((statusObj) => {
    Object.entries(statusObj.bankTypes).forEach(([bankType, bankDetails]) => {
      if (!totalBalanceBankType[bankType]) {
        totalBalanceBankType[bankType] = {
          regularBalance: 0,
          urgentBalance: 0,
          subsidyBalance: 0,
          serviceBalance: 0,
          penalityBalance: 0,

          // blockIncoming:0,
          // blockOutcoming:0,
          // serviceIncoming:0,
          // serviceOutcoming:0,
          
            blockBankIncoming: 0,
            blockBankOutcoming: 0,
            serviceBankIncoming: 0,
            serviceBankOutcoming: 0,

            blockUserWithdrawal:0,
            serviceUserWithdrawal:0,

            blockExpenditure:0,
            serviceExpenditure:0,
          
            totalBlockBalance:0,
            totalServiceBalance:0,
            totalBalance:0

          
        };
      }
     
      // Summing up balances across all statuses
      totalBalanceBankType[bankType].regularBalance += bankDetails.regularBalance || 0;
      totalBalanceBankType[bankType].urgentBalance += bankDetails.urgentBalance || 0;
      totalBalanceBankType[bankType].subsidyBalance += bankDetails.subsidyBalance || 0;
      totalBalanceBankType[bankType].serviceBalance += bankDetails.serviceBalance || 0;
      totalBalanceBankType[bankType].penalityBalance += bankDetails.penalityBalance || 0;
        });
  });

  // Process organization paymentTransfers
  if (org.paymentTransfers && Array.isArray(org.paymentTransfers)) {
    org.paymentTransfers.forEach((transfer) => {
      
      const {transferCase,transferType,fromBankType,toWhat,toBankType, amount } = transfer;
          // Validate transferCase and transferType
        const validTransferCases = ["bankTransfer", "userWithdrawal", "expenditure"];
        const validTransferTypes = ["block", "service"];
        if (!validTransferCases.includes(transferCase)) {
          throw new Error(`Invalid transferCase: ${transferCase}`);
        }
        if (!validTransferTypes.includes(transferType)) {
          throw new Error(`Invalid transferType: ${transferType}`);
        }

        if (!totalBalanceBankType[fromBankType]) {
          totalBalanceBankType[fromBankType] = {
            regularBalance: 0,
            urgentBalance: 0,
            subsidyBalance: 0,
            serviceBalance: 0,
            penalityBalance: 0,
        
            blockBankIncoming: 0,
            blockBankOutcoming: 0,
            serviceBankIncoming: 0,
            serviceBankOutcoming: 0,

            blockUserWithdrawal:0,
            serviceUserWithdrawal:0,

            blockExpenditure:0,
            serviceExpenditure:0,
        
            totalBlockBalance: 0,
            totalServiceBalance: 0,
            totalBalance: 0
          };
        }
        
        if (!totalBalanceBankType[toBankType]) {
          totalBalanceBankType[toBankType] = {
            regularBalance: 0,
            urgentBalance: 0,
            subsidyBalance: 0,
            serviceBalance: 0,
            penalityBalance: 0,
        
            blockBankIncoming: 0,
            blockBankOutcoming: 0,
            serviceBankIncoming: 0,
            serviceBankOutcoming: 0,

            blockUserWithdrawal:0,
            serviceUserWithdrawal:0,

            blockExpenditure:0,
            serviceExpenditure:0,
        
            totalBlockBalance: 0,
            totalServiceBalance: 0,
            totalBalance: 0
          };
        }
        
        
      if(transferCase==="bankTransfer"){
        if (transferType === "block") {
          totalBalanceBankType[fromBankType].blockBankOutcoming+= amount;
          totalBalanceBankType[toBankType].blockBankIncoming+= amount;
          organization.blockBankTransfered+=amount
        }
        else if (transferType === "service") {
          totalBalanceBankType[fromBankType].serviceBankOutcoming+= amount;
          totalBalanceBankType[toBankType].serviceBankIncoming += amount;
          organization.serviceBankTransfered+=amount
        }
      }
      else if(transferCase==="expenditure"){
        if (transferType === "block") {
          totalBalanceBankType[fromBankType].blockExpenditure += amount;
          organization.blockExpenditure+=amount
        }
        else if (transferType === "service") {
          totalBalanceBankType[fromBankType].serviceExpenditure += amount;
          organization.serviceExpenditure+=amount
        }
      }
      else if(transferCase==="userWithdrawal"){
          let user;
          if (Array.isArray(users)) {
              user = users.find((u) => u._id.toString() === toWhat.toString()); // If users is an array
          } else {
              user = users; // If users is a single user object, assign it directly
          }

          // console.log("Found user:", user);
        if (!user) throw new Error(`User with ID ${toWhat} not found`);
        const userCode = user.userCode;
        // Ensure userBalances[userCode] exists and is initialized
      if (!userBalances[userCode]) {
      userBalances[userCode] = {
          blockUserWithdrawal: 0,
          serviceUserWithdrawal: 0,
          totalBlockBankAccount: 0,
          totalServiceBankAccount: 0,
      };
       }
      
        if (transferType === "block") {
          totalBalanceBankType[fromBankType].blockUserWithdrawal+= amount;
          organization.blockUserWithdrawal+=amount
          organization.totalBlockBankAccount-=amount
          userBalances[userCode].blockUserWithdrawal+=amount
          userBalances[userCode].totalBlockBankAccount-=amount
        }
        else if (transferType === "service") {
          totalBalanceBankType[fromBankType].serviceUserWithdrawal+= amount;
          organization.serviceUserWithdrawal+=amount
          organization.totalServiceBankAccount-=amount
          userBalances[userCode].totalServiceBankAccount-=amount
        }
    }
    
    });
  }

  Object.keys(totalBalanceBankType).forEach((bank) => {
       
    totalBalanceBankType[bank].totalBlockBalance +=
      totalBalanceBankType[bank].regularBalance +
      totalBalanceBankType[bank].subsidyBalance +
      totalBalanceBankType[bank].urgentBalance+
      totalBalanceBankType[bank].blockBankIncoming-
      totalBalanceBankType[bank].blockBankOutcoming-
      totalBalanceBankType[bank].blockUserWithdrawal-
      totalBalanceBankType[bank].blockExpenditure

    totalBalanceBankType[bank].totalServiceBalance +=
      totalBalanceBankType[bank].serviceBalance +
      totalBalanceBankType[bank].penalityBalance+
      totalBalanceBankType[bank].serviceBankIncoming-
      totalBalanceBankType[bank].serviceBankOutcoming-
      totalBalanceBankType[bank].serviceUserWithdrawal-
      totalBalanceBankType[bank].serviceExpenditure

    totalBalanceBankType[bank].totalBalance += totalBalanceBankType[bank].totalBlockBalance+ totalBalanceBankType[bank].totalServiceBalance 
   
  });

  if (totalBalanceBankType["null"]) {
    delete totalBalanceBankType["null"]; // Remove the "null" key
}

  organization.TotalOrgBalance = (organization.totalBlockBankAccount || 0) + (organization.totalServiceBankAccount || 0);

  const userBalanceArray = Object.entries(userBalances).map(([key, value]) => ({
    userCode: key,
    ...value,
  }));
  console.log(totalBalanceBankType)
  return {
    Organization: organization,
    userBalances:userBalanceArray,
    totalBalanceBankType,
    categorizedPayments: {
      confirmed: categorizedPayments.confirmed || {},
      pending: categorizedPayments.pending || {},
      overdue: categorizedPayments.overdue || {},
    },
  };
}

// calculateBalances(payments, org);

module.exports={calculateBalances}