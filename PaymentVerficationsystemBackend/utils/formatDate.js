const dateString = "2024-12-26";  // Example date input

function formatDate(dateString) {
  if (!dateString) return null;
  console.log("Input date string: ", dateString);
  
  const gregorianDate = new Date(dateString);
  let year = gregorianDate.getFullYear();
  let month = gregorianDate.getMonth() + 1; // JavaScript months are 0-based, so add 1
  let day = gregorianDate.getDate();

  const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
  let ethiopianYear = year - (isLeapYear ? 8 : 7);

  let ethiopianMonth = month - 8;  // Ethiopian year starts in September
  if (ethiopianMonth <= 0) {
    ethiopianMonth += 12;  // Adjust for months before September (e.g., January-August)
    ethiopianYear -= 1;  // Adjust Ethiopian year for months before September
  }

  if (isLeapYear && month === 3 && day <= 1) {
    day -= 1; // Adjust for leap years before March 2nd
  }

  const formattedMonth = String(ethiopianMonth).padStart(2, '0');
  const formattedDay = String(day).padStart(2, '0');
  
  console.log(`Ethiopian Date: ${ethiopianYear}-${formattedMonth}-${formattedDay}`);
  return `${ethiopianYear}-${formattedMonth}-${formattedDay}`; // Return as YYYY-MM-DD
}

formatDate(dateString);

module.exports = {
  formatDate
};


//   function formatDate(dateString) {
//     if (!dateString) return null;
    
//     const d = new Date(dateString);
//     const year = d.getFullYear();
//     const month = String(d.getMonth() + 1).padStart(2, '0'); // Add leading zero
//     const day = String(d.getDate()).padStart(2, '0'); // Add leading zero
    
//     return `${year}-${month}-${day}`; // Format as YYYY-MM-DD
//   }
  

// module.exports = {
//   formatDate
// };

