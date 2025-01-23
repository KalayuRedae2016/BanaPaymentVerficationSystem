console.log("We paractice any code in this file")
// Merging two array of objects
const array1 = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" }
  ];
  
  const array2 = [
    { id: 3, name: "Charlie" },
    { id: 4, name: "Diana" }
  ];

  //Method 1 using concat method
  //Does not modify the original arrays.
  const mergedArray=(array1,array2)=>{
    return array1.concat(array2)
  }
  const result =mergedArray(array1,array2)
  console.log(result)

  //Method 2 using spreed operator
  const result2=[...array1,...array2]
  console.log(result)


  const TransferFunds = [
    {
      transferCase: 'bankTransfer',
      transferType: 'block',
      orgId: '678f9e805513cf803c09dc57',
      toWhat: '678f9e805513cf803c09dc57',
      fromBankType: 'CBE',
      toBankType: 'LIB',
      amount: 300,
      reason: 'gift',
      refNumber: 'lll',
      transferDate: new Date('2025-01-23T08:12:36.624Z'),
      attachments: [{ attachmentId: '123', fileName: 'file1.pdf' }],
      _id: '6791f9f427404af1c226869f'
    }
  ];
  
  const AttachmentData = [
    {
      imageData: null,
      attachmentsData: [
        { 
          attachmentId: '123', 
          filePath: '/uploads/file1.pdf', 
          fileData: 'base64stringofFile1'
        }
      ]
    }
  ];
  
  /// Utility function to merge TransferFunds and AttachmentData
exports.mergeTransferFundsAndAttachments = (TransferFunds, AttachmentData) => {
  const mergedTransferFunds = TransferFunds.map((transfer) => {
    // Find the related attachment data
    const relatedAttachment = AttachmentData.find((attachment) =>
      transfer.attachments.some((transferAttachment) =>
        attachment.attachmentsData.some(
          (attachmentData) => attachmentData.attachmentId === transferAttachment.attachmentId
        )
      )
    );

    // Map over attachments and include fileData if it exists
    const attachments = transfer.attachments.map((transferAttachment) => {
      const extraData =
        relatedAttachment?.attachmentsData.find(
          (attachmentData) => attachmentData.attachmentId === transferAttachment.attachmentId
        ) || {};
      return {
        fileName: transferAttachment.fileName || null,
        fileType: extraData.fileType || null,
        description: extraData.description || null,
        _id: transferAttachment._id,
        uploadedDate: extraData.uploadedDate || null,
      };
    });

    // Return the structured transfer object
    return {
      transferCase: transfer.transferCase,
      transferType: transfer.transferType,
      orgId: transfer.orgId,
      toWhat: transfer.toWhat,
      fromBankType: transfer.fromBankType,
      toBankType: transfer.toBankType,
      amount: transfer.amount,
      reason: transfer.reason,
      refNumber: transfer.refNumber,
      transferDate: transfer.transferDate,
      attachments,
    };
  });

  // Return the final response structure
  return {
    status: 1,
    transferFunds: mergedTransferFunds,
  };
};

const m=this.mergeTransferFundsAndAttachments(TransferFunds,AttachmentData);
console.log(m)
  