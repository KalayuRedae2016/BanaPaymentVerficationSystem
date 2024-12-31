const calculateTotalPaidAndPenalityAmount = (payment) => {
    // Ensure payment.penality is initialized
    // payment.totalPaidAmount = payment.registrationFee || 0;
    // payment.penality = payment.penality || { amount: 0 };
    payment.penality.amount= 0
    payment.totalPaidAmount =0;

    // console.log(`Initial TotalPaid: ${payment.totalPaidAmount}`);
    // console.log(`Initial TotalPenality: ${payment.penality.amount}`);

    ['urgent', 'regular', 'subsidy', 'service', 'penality'].forEach(type => {
        if (payment[type]) { // Ensure the type exists
            // console.log(`${type} Payment: ${payment[type]?.amount || 0}`);
            if (payment[type]?.isPaid) {
                payment.totalPaidAmount += payment[type].amount || 0;
            }
        }
    });

    // Ensure service.penality exists
    if (payment.service) {
        payment.service.penality = 0;
    }

    ['urgent', 'regular', 'subsidy'].forEach(type => {
        if (payment[type]) { // Ensure the type exists
            // console.log(`${type} Penalty: ${payment[type]?.penality || 0}`);
            if (payment[type]?.isPaid) {
                payment.penality.amount += payment[type].penality || 0;
            }
        }
    });

    // console.log(`Final TotalPaid: ${payment.totalPaidAmount}`);
    // console.log(`Final TotalPenality: ${payment.penality.amount}`);
    return payment;
};

module.exports = { calculateTotalPaidAndPenalityAmount };
