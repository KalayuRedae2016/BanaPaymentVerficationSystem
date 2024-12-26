  function formatDate(dateString) {
    if (!dateString) return null;
    
    const d = new Date(dateString);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0'); // Add leading zero
    const day = String(d.getDate()).padStart(2, '0'); // Add leading zero
    
    return `${year}-${month}-${day}`; // Format as YYYY-MM-DD
  }
  

module.exports = {
  formatDate
};

// function formatEthiopianDate(dateString) {
//   if (!dateString) return null;

//   const gregorianDate = new Date(dateString);
//   let year = gregorianDate.getFullYear();
//   let month = gregorianDate.getMonth() + 1; // Months are 0-indexed in JavaScript
//   let day = gregorianDate.getDate();

//   // Determine if the Gregorian year is a leap year
//   const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);

//   // Convert Gregorian year to Ethiopian year
//   let ethiopianYear = year - (isLeapYear ? 8 : 7);

//   // Adjust for Ethiopian month start
//   let ethiopianMonth = month + 1;
//   if (ethiopianMonth > 13) {
//     ethiopianMonth -= 13; // Ethiopian calendar has 13 months
//     ethiopianYear += 1; // Increment Ethiopian year when months wrap around
//   }

//   // If Gregorian year is a leap year and day is affected, adjust day
//   if (isLeapYear && month === 3 && day <= 1) {
//     day -= 1; // Adjust only for dates before March 2nd in leap years
//   }

//   // Format Ethiopian date with leading zeros for month and day
//   const formattedMonth = String(ethiopianMonth).padStart(2, '0');
//   const formattedDay = String(day).padStart(2, '0');

//   return `${ethiopianYear}-${formattedMonth}-${formattedDay}`; // Format as YYYY-MM-DD
// }

// module.exports = {
//   formatEthiopianDate
// };
