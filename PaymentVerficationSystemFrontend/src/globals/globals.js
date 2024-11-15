import axios from 'axios';

export default {
  install(app) {
    // Create the API client
    //const baseUrl = 'http://49.13.235.6:3000';

    const baseUrlLocal = 'http://localhost:8081';

    const apiClient = axios.create({
      baseURL:baseUrlLocal, // Set your base URL here
    });
    // Generate the array of years (from now - 5 years up to now + 50 years)
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 56 }, (v, i) => currentYear - 5 + i);
    // Define the months array
    const months = [
      { value: 1, name: 'January' },
      { value: 2, name: 'February' },
      { value: 3, name: 'March' },
      { value: 4, name: 'April' },
      { value: 5, name: 'May' },
      { value: 6, name: 'June' },
      { value: 7, name: 'July' },
      { value: 8, name: 'August' },
      { value: 9, name: 'September' },
      { value: 10, name: 'October' },
      { value: 11, name: 'November' },
      { value: 12, name: 'December' }
    ];
  const banks =[
    { value: "LIB", name: 'LIB' },
    { value: "WEGAGEN", name: 'WEGAGEN' },
    { value: "ABSINIA", name: 'ABSINIA' },
    { value: "CBE", name: 'CBE' },
  
  ];
  const reportTypes =[
    { value: "annually", name: 'Annaully' },
    { value: "semiAnnually", name: 'semiAnnually' },
    { value: "monthly", name: 'monthly' },
    { value: "weekly", name: 'weekly' },
    { value: "daily", name: 'daily' },
  ];
    // Generate the array of days from 1 to 31
    const days = Array.from({ length: 31 }, (v, i) => i + 1);

    // Add the global variables
    const globalProperties = {
      $apiClient: apiClient,
      $otherVariable: "othervariable",
      $years: years,
      $months: months,
      $days: days,
      $banks:banks,
      $reportTypes:reportTypes,
    };

    // Assign to the global properties in the Vue app
    app.config.globalProperties = {
      ...app.config.globalProperties,
      ...globalProperties,
    };
  },
};


