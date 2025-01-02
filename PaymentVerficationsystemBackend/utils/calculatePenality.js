const calculatePenalty = (paymentSetting,paymentType, amount,paymentDate) => {
  if (!paymentType || paymentType.isPaid) {
    return {
        penality: paymentType?.penality || 0, // Use existing penalty or default to 0
        daysLate: paymentType?.daysLate || 0 // Use existing daysLate or default to 0
    };
}
  const {endingDate,penalityLate5Days = 0,penalityLate10Days = 0,penalityLateAbove10Days = 0} = paymentSetting;
  
    const dueDate = new Date(endingDate);
    const daysLate = Math.max(0, Math.floor((paymentDate - dueDate) / (1000 * 3600 * 24))); // Days late calculation
    let penality = 0;

    if (daysLate > 0 && daysLate <= 5) {
      penality = parseFloat((amount * penalityLate5Days).toFixed(2)); // Fixed to two decimal places
    } else if (daysLate > 5 && daysLate <= 10) {
      penality = parseFloat((amount * penalityLate10Days).toFixed(2));
    } else if (daysLate > 10) {
      penality = parseFloat((amount * penalityLateAbove10Days).toFixed(2));
    }

    return { penality, daysLate };
  };
  module.exports = { calculatePenalty };