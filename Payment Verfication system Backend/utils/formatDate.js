// // Utility function to format date in YYYY-MM-DD format
// function formatDate(dateString) {
//   const dateObj = new Date(dateString); // Create a Date object from the input string

//   // // Validate if the date is a valid Date object
//   // if (isNaN(dateObj.getTime())) {
//   //     throw new Error("Invalid date string provided");
//   // }
//   console.log(dateObj)
//   // Function to convert Gregorian date to Ethiopian date
//   function gregorianToEthiopian(gDate) {
//     const gYear = gDate.getUTCFullYear();
//     const gMonth = gDate.getUTCMonth() + 1; // Months are 0-indexed, so we add 1
//     const gDay = gDate.getUTCDate();

//     let eYear, eMonth, eDay;

//     // Determine Ethiopian year and month
//     if (gMonth <= 8) {
//         eYear = gYear - 8; // January to August
//         eMonth = gMonth + 4; // January (1) to May (5)
//         eDay = gDay; // Day remains the same
//     } else if (gMonth === 9) { // September
//         eYear = gYear - 8; // Same year
//         eMonth = 1; // Transition to Ethiopian year (Meskerem)
//         eDay = gDay; // Day remains the same
//     } else { // October to December
//         eYear = gYear - 7; // Next Ethiopian year
//         eMonth = gMonth - 9; // October (2), November (3), December (4)
//         eDay = gDay; // Day remains the same
//     }

//     // Adjust day for Ethiopian calendar; for October 4, it should reflect to 24
//     if (eMonth === 1) { // Meskerem
//         eDay = gDay; // October 4 maps directly to 24 in the Ethiopian calendar context
//     }

//     // Cap eDay to 30 for Ethiopian months
//     if (eDay > 30) {
//         eDay = 30; // Capping at 30 for Ethiopian months
//     }
//     return {
//         year: eYear,
//         month: String(eMonth).padStart(2, '0'), // Pad month with leading zero
//         day: String(eDay).padStart(2, '0') // Pad day with leading zero
//     };
// }

// // Convert to Ethiopian date
// const { year, month, day } = gregorianToEthiopian(dateObj);
// console.log(year,month,day)

// // Return formatted date in yyyy-mm-dd format (Ethiopian)
// return `${year}-${month}-${day}`;
// }


// module.exports = {
//   formatDate
// };


// // Utility function to format date in MM/DD/YYYY format
// function formatDate(dateString) {
//     const dateObj = new Date(dateString);
//     //const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
//     //return dateObj.toLocaleDateString('en-US', options);

//     // Get year, month, and day in UTC
//   const year = dateObj.getUTCFullYear();
//   const month = String(dateObj.getUTCMonth() + 1).padStart(2, '0'); // Months are 0-indexed, so add 1
//   const day = String(dateObj.getUTCDate()).padStart(2, '0');

//     //   // Return formatted date in MM/DD/YYYY format
//     //   return `${month}/${day}/${year}`;

//     // Return formatted date in d-m-yyyy format
//     //return `${day}-${month}-${year}`;

//    // Return formatted date in yyyy-m-d format
//    return `${year}-${month}-${day}`;
//   }
  
//   module.exports = {
//     formatDate
//   };
  

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
