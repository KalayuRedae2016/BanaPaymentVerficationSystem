// const {formatDate}=require("../utils/formatDate")
// function calculateBalances(payments,org) {
//     const organization = {
//       totalRegularBalance: 0,
//       totalUrgentBalance: 0,
//       totalSubsidyBalance: 0,
//       totalServiceBalance: 0,
//       totalPenalityBalance: 0,
//       totalBlockBankAccount: 0,
//       totalServiceBankAccount: 0,
//       TotalOrgBalance: 0,
//       blockTransfered: 0,
//       serviceTransfered: 0,
//     };
  
//     const categorizedPayments = {};
//     const notifications = []; // Initialize as an array to hold multiple notifications if needed
  
//     payments.forEach((payment) => {
//       const paymentStatus = payment.status || 'Undefined';
//       const userCode = payment.userCode.toString();
//       const billCode = payment.billCode.toString();
  
//       if (!categorizedPayments[paymentStatus]) {
//         categorizedPayments[paymentStatus] = {
//           uniqueUsers: new Set(),
//           totalPayments: new Set(),
//           totalExpectedAmount: 0,
//           totalRegistrationAmount: 0,
//           totalRegularAmountPaid: 0,
//           totalRegularAmountNotPaid: 0,
//           totalUrgentAmountPaid: 0,
//           totalUrgentAmountNotPaid: 0,
//           totalSubsidyAmountPaid: 0,
//           totalSubsidyAmountNotPaid: 0,
//           totalServiceAmountPaid: 0,
//           totalServiceAmountNotPaid: 0,
//           totalPenalityAmountPaid: 0,
//           totalPenalityAmountNotPaid: 0,
//           totalBlockBankAccountPaid: 0,
//           totalBlockBankAccountNotPaid: 0,
//           totalServiceBankAccountPaid: 0,
//           totalServiceBankAccountNotPaid: 0,
//           bankTypes: {},
//           payments: [],
//         };
//       }
  
//       const statusObj = categorizedPayments[paymentStatus];
//       statusObj.uniqueUsers.add(userCode);
//       statusObj.totalPayments.add(billCode);
//       statusObj.totalExpectedAmount += payment.totalExpectedAmount || 0;
//       statusObj.totalRegistrationAmount += payment.registrationFee || 0;
  
//       const amounts = {
//         totalRegularAmountPaid: payment.regular?.isPaid ? payment.regular.amount : 0,
//         totalRegularAmountNotPaid: !payment.regular?.isPaid ? payment.regular?.amount || 0 : 0,
//         totalUrgentAmountPaid: payment.urgent?.isPaid ? payment.urgent.amount : 0,
//         totalUrgentAmountNotPaid: !payment.urgent?.isPaid ? payment.urgent?.amount || 0 : 0,
//         totalSubsidyAmountPaid: payment.subsidy?.isPaid ? payment.subsidy.amount : 0,
//         totalSubsidyAmountNotPaid: !payment.subsidy?.isPaid ? payment.subsidy?.amount || 0 : 0,
//         totalServiceAmountPaid: payment.service?.isPaid ? payment.service.amount : 0,
//         totalServiceAmountNotPaid: !payment.service?.isPaid ? payment.service?.amount || 0 : 0,
//         totalPenalityAmountPaid: payment.penality?.isPaid ? payment.penality.amount : 0,
//         totalPenalityAmountNotPaid: !payment.penality?.isPaid ? payment.penality?.amount || 0 : 0,
//       };
  
//       for (const key in amounts) {
//         statusObj[key] += amounts[key];
//       }
  
//       statusObj.totalBlockBankAccountPaid += amounts.totalRegularAmountPaid + amounts.totalUrgentAmountPaid + amounts.totalSubsidyAmountPaid;
//       statusObj.totalBlockBankAccountNotPaid += amounts.totalRegularAmountNotPaid + amounts.totalUrgentAmountNotPaid + amounts.totalSubsidyAmountNotPaid;
  
//       statusObj.totalServiceBankAccountPaid += amounts.totalServiceAmountPaid + amounts.totalPenalityAmountPaid;
//       statusObj.totalServiceBankAccountNotPaid += amounts.totalServiceAmountNotPaid + amounts.totalPenalityAmountNotPaid;
  
//       const paymentTypes = ['regular', 'urgent', 'subsidy', 'service', 'penality'];
//       paymentTypes.forEach((type) => {
//         const paymentType = payment[type];
//         if (paymentType) {
//           const bankType = paymentType.bankType || 'unKnown';
  
//           if (!statusObj.bankTypes[bankType]) {
//             statusObj.bankTypes[bankType] = {
//               regularBalance: 0,
//               urgentBalance: 0,
//               subsidyBalance: 0,
//               serviceBalance: 0,
//               penalityBalance: 0,
//               totalBlockBalance: 0,
//               totalServiceBalance: 0,
//             };
  
//             if (paymentStatus !== 'confirmed') {
//               statusObj.bankTypes['unpaidBalances'] = {
//                 regular: 0,
//                 urgent: 0,
//                 subsidy: 0,
//                 service: 0,
//                 penality: 0,
//               };
//             }
//           }
  
//           const bankDetails = statusObj.bankTypes[bankType];
//           if (paymentType.isPaid) {
//             bankDetails[`${type}Balance`] += paymentType.amount || 0;
//             organization[`total${type.charAt(0).toUpperCase() + type.slice(1)}Balance`] += paymentType.amount || 0;
  
//             if (['service', 'penality'].includes(type)) {
//               organization.totalServiceBankAccount += paymentType.amount || 0;
//               bankDetails.totalServiceBalance += paymentType.amount || 0;
//             } else {
//               organization.totalBlockBankAccount += paymentType.amount || 0;
//               bankDetails.totalBlockBalance += paymentType.amount || 0;
//             }
//           } else if (paymentStatus !== 'confirmed') {
//             statusObj.bankTypes.unpaidBalances[type] += paymentType.amount || 0;
//           }
          
//         }
//       }
//     );
    
//     payments.forEach((payment) => {
//       // Payment types that can have a paidAt field
//       const paymentTypes = ['regular', 'urgent', 'subsidy', 'service', 'penality'];
    
//       // Format paidAt for each payment type if it exists
//       const formattedPayment = { ...payment }; // Spread the payment to retain all fields
    
//       paymentTypes.forEach((type) => {
//         // Check if the payment type exists before formatting dates
//         if (payment[type]) {
//           if (payment[type].paidAt) {
//             formattedPayment[type] = { ...payment[type], paidAt: formatDate(payment[type].paidAt) }; // Format paidAt field
//           }
//           if (payment[type].createdAt) {
//             formattedPayment[type].createdAt = formatDate(payment[type].createdAt); // Format createdAt field
//           }
//           if (payment[type].updatedAt) {
//             formattedPayment[type].updatedAt = formatDate(payment[type].updatedAt); // Format updatedAt field
//           }
//         }
//       });
    
//       // Optionally, format other date fields outside payment types (e.g., createdAt, updatedAt)
//       if (payment.createdAt) {
//         formattedPayment.createdAt = formatDate(payment.createdAt); // Format createdAt field
//       }
//       if (payment.updatedAt) {
//         formattedPayment.updatedAt = formatDate(payment.updatedAt); // Format updatedAt field
//       }
//       if (payment.confirmedDate) {
//         formattedPayment.confirmedDate = formatDate(payment.confirmedDate); // Format confirmedDate field
//       }
    
//       // Push the formatted payment into statusObj.payments
//       statusObj.payments.push(formattedPayment);
//     });

//     // statusObj.payments.push({
//     //   payment
//     // })


//     });
  
//     Object.values(categorizedPayments).forEach((statusObj) => {
//       statusObj.uniqueUsers = statusObj.uniqueUsers.size;
//       statusObj.totalPayments = statusObj.totalPayments.size;
//     });
  
//     for (const status in categorizedPayments) {
//       if (categorizedPayments[status].bankTypes['unKnown']) {
//         delete categorizedPayments[status].bankTypes['unKnown'];
//       }
//     }
  
//     for (const status in categorizedPayments) {
//       if (status === 'confirmed') {
//         for (const key in categorizedPayments[status]) {
//           if (key.includes('NotPaid') && categorizedPayments[status][key] === 0) {
//             delete categorizedPayments[status][key];
//           }
//         }
  
//         for (const bankType in categorizedPayments[status].bankTypes) {
//           if (categorizedPayments[status].bankTypes[bankType].unpaidBalances) {
//             delete categorizedPayments[status].bankTypes[bankType].unpaidBalances;
//           }
//         }
//       }
//     }
//     organization.TotalOrgBalance = organization.totalBlockBankAccount + organization.totalServiceBankAccount;
//     //console.log("initial Balances",categorizedPayments.confirmed.bankTypes);
  
//   // Destructure transfers from org, defaulting to empty arrays if undefined
//   // const { blockTransfers = [], serviceTransfers = [] } = org;
//   // const allTransfers = [...blockTransfers, ...serviceTransfers];

//   const {paymentTransfers = []} = org;
//   // Combine both transfer arrays into a single array for processing
//   const allTransfers = [...paymentTransfers];

//   // Iterate over each transfer to update balances
//   allTransfers.forEach((transfer, index) => {
//     const {transferType,fromBankType, toBankType, amount} = transfer;

//     // Determine the balance type based on transferType
//     let balanceType;
//     if (transferType === "block") {
//       balanceType = "totalBlockBalance";
//     } else if (transferType === "service") {
//       balanceType = "totalServiceBalance";
//     } else {
//       console.error(`Transfer at index ${index} has an unknown transferType: ${transferType}`);
//       return; // Skip this transfer
//     }

//     // Validate existence of fromBankType and toBankType
//     const fromBank = categorizedPayments.confirmed.bankTypes[fromBankType];
//     const toBank = categorizedPayments.confirmed.bankTypes[toBankType];

//     if (!fromBank ||!toBank) {
//       console.error(`Transfer at index ${index} has an invalid fromBankType: ${fromBankType} or toBankType: ${toBankType}`);
//       return; // Skip this transfer
//     }

//     // Ensure the balance fields exist
//     if (typeof fromBank[balanceType] !== "number" ||typeof toBank[balanceType] !== "number") {
//       console.error(`Transfer at index ${index} refers to non-numeric balanceType: ${balanceType}`);
//       return; // Skip this transfer
//     }
//       transferType==="block"?organization.blockTransfered+=amount:organization.serviceTransfered+=amount
//     // Perform the balance updates
//     fromBank[balanceType] -= amount;
//     toBank[balanceType] += amount;

   
//     const notifyMessage = `${transferType} Amount at ${index + 1} with ${amount} is transferred from ${fromBankType} to ${toBankType}`;
//     notifications.push({ message: notifyMessage }); // Add the notification to the array
//     //console.log(notifyMessage);

//   }); 

//   //console.log("updated Balances",categorizedPayments.confirmed.bankTypes);
//     return {
//       Organization: organization,
//       notifications,
//       categorizedPayments: {
//         confirmed: categorizedPayments.confirmed || {},
//         pending: categorizedPayments.pending || {},
//         overdue: categorizedPayments.overdue || {},
//         //Undefined: categorizedPayments.Undefined || {},
//       },
//     };
//   }
  
//   module.exports = {
//     calculateBalances,
//   };
const {formatDate}=require("../utils/formatDate")
function calculateBalances(payments, org) {
  const organization = {
    totalRegularBalance: 0,
    totalUrgentBalance: 0,
    totalSubsidyBalance: 0,
    totalServiceBalance: 0,
    totalPenalityBalance: 0,
    totalBlockBankAccount: 0,
    totalServiceBankAccount: 0,
    TotalOrgBalance: 0,
    blockTransfered: 0,
    serviceTransfered: 0,
  };

  const categorizedPayments = {};
  const notifications = []; // Initialize as an array to hold multiple notifications if needed

  payments.forEach((payment) => {
    const paymentStatus = payment.status || 'Undefined';  // Categorize by status (confirmed, pending, etc.)
    const userCode = payment.userCode.toString();
    const billCode = payment.billCode.toString();

    // Initialize categorizedPayments for the current status (confirmed, pending, etc.)
    if (!categorizedPayments[paymentStatus]) {
      categorizedPayments[paymentStatus] = {
        uniqueUsers: new Set(),
        totalPayments: new Set(),
        totalExpectedAmount: 0,
        totalRegistrationAmount: 0,
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

    // Use the initialized statusObj for this payment's status
    const statusObj = categorizedPayments[paymentStatus];
    statusObj.uniqueUsers.add(userCode);
    statusObj.totalPayments.add(billCode);
    statusObj.totalExpectedAmount += payment.totalExpectedAmount || 0;
    statusObj.totalRegistrationAmount += payment.registrationFee || 0;

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
    };

    // Update amounts for the current payment's status
    for (const key in amounts) {
      statusObj[key] += amounts[key];
    }

    statusObj.totalBlockBankAccountPaid += amounts.totalRegularAmountPaid + amounts.totalUrgentAmountPaid + amounts.totalSubsidyAmountPaid;
    statusObj.totalBlockBankAccountNotPaid += amounts.totalRegularAmountNotPaid + amounts.totalUrgentAmountNotPaid + amounts.totalSubsidyAmountNotPaid;

    statusObj.totalServiceBankAccountPaid += amounts.totalServiceAmountPaid + amounts.totalPenalityAmountPaid;
    statusObj.totalServiceBankAccountNotPaid += amounts.totalServiceAmountNotPaid + amounts.totalPenalityAmountNotPaid;

    const paymentTypes = ['regular', 'urgent', 'subsidy', 'service', 'penality'];
    paymentTypes.forEach((type) => {
      const paymentType = payment[type];
      if (paymentType) {
        const bankType = paymentType.bankType || 'unKnown';

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
          if (paymentStatus !== 'confirmed') {
            statusObj.bankTypes['unpaidBalances'] = {
              regular: 0,
              urgent: 0,
              subsidy: 0,
              service: 0,
              penality: 0,
            };
          }
        }

        const bankDetails = statusObj.bankTypes[bankType];
        if (paymentType.isPaid) {
          bankDetails[`${type}Balance`] += paymentType.amount || 0;
          organization[`total${type.charAt(0).toUpperCase() + type.slice(1)}Balance`] += paymentType.amount || 0;

          if (['service', 'penality'].includes(type)) {
            organization.totalServiceBankAccount += paymentType.amount || 0;
            bankDetails.totalServiceBalance += paymentType.amount || 0;
          } else {
            organization.totalBlockBankAccount += paymentType.amount || 0;
            bankDetails.totalBlockBalance += paymentType.amount || 0;
          }
        } else if (paymentStatus !== 'confirmed') {
          statusObj.bankTypes.unpaidBalances[type] += paymentType.amount || 0;
        }
      }
    });

    // Format payment dates and push the payment under the correct status
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
    if (payment.createdAt) {
      formattedPayment.createdAt = formatDate(payment.createdAt);
    }
    if (payment.updatedAt) {
      formattedPayment.updatedAt = formatDate(payment.updatedAt);
    }
    if (payment.confirmedDate) {
      formattedPayment.confirmedDate = formatDate(payment.confirmedDate);
    }

    // Finally, push the payment to its respective statusObj under the correct paymentStatus
    statusObj.payments.push(formattedPayment);
  });

  // Process notifications, transfers, etc., here...

  // Clean up categorizedPayments and return the result
  Object.values(categorizedPayments).forEach((statusObj) => {
    statusObj.uniqueUsers = statusObj.uniqueUsers.size;
    statusObj.totalPayments = statusObj.totalPayments.size;
  });

  for (const status in categorizedPayments) {
    if (categorizedPayments[status].bankTypes['unKnown']) {
      delete categorizedPayments[status].bankTypes['unKnown'];
    }
  }

  // Remove unnecessary "NotPaid" fields for confirmed payments
  for (const status in categorizedPayments) {
    if (status === 'confirmed') {
      for (const key in categorizedPayments[status]) {
        if (key.includes('NotPaid') && categorizedPayments[status][key] === 0) {
          delete categorizedPayments[status][key];
        }
      }

      for (const bankType in categorizedPayments[status].bankTypes) {
        if (categorizedPayments[status].bankTypes[bankType].unpaidBalances) {
          delete categorizedPayments[status].bankTypes[bankType].unpaidBalances;
        }
      }
    }
  }

  organization.TotalOrgBalance = organization.totalBlockBankAccount + organization.totalServiceBankAccount;

  return {
    Organization: organization,
    notifications,
    categorizedPayments: {
      confirmed: categorizedPayments.confirmed || {},
      pending: categorizedPayments.pending || {},
      overdue: categorizedPayments.overdue || {},
    },
  };
}
 
  module.exports = {
    calculateBalances,
  };