import axios from "axios";

export default {
  async install(app) {
    // Check environment and set base URL
    const isProduction = import.meta.env.MODE === "production";
    const baseUrl = isProduction
      ? import.meta.env.VITE_APP_BASE_URL_PRODUCTION
      : import.meta.env.VITE_APP_BASE_URL_LOCAL;

    // Create the API client
    const apiClient = axios.create({
      baseURL: baseUrl,
    });

    // Log to verify that the apiClient is correctly created
    console.log('API Client:', apiClient);  // This should show the axios instance

    // Fetch organization data to get banks
    // let blockBanks = [];
    // let serviceBanks = [];
    let banks = [];
    // try {
    //   const response = await apiClient.get("/api/v1/organization");
    //   console.log("Org response in globals", response);

    //   if (response.data.status === 1 && response.data.organization) {
    //     blockBanks = response.data.organization.blockBankAccounts || [];
    //     serviceBanks = response.data.organization.serviceBankAccounts || [];
    //     console.log("Services and blocks", serviceBanks, blockBanks);
    //   } else {
    //     console.warn("No banks found or organization data is null.");
    //   }
    // } catch (error) {
    //   console.error("Error fetching organization data:", error.message);
    // }

    // Fallback if no banks are fetched
    banks = [
      { value: "LIB", name: "LIB" },
      { value: "WEGAGEN", name: "WEGAGEN" },
      { value: "ABSINIA", name: "ABSINIA" },
      { value: "CBE", name: "CBE" },
    ];

    // Generate the array of years (from now - 5 years up to now + 50 years)
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 56 }, (v, i) => currentYear - 5 + i);

    const months = [
      { value: 1, name: "January" },
      { value: 2, name: "February" },
      { value: 3, name: "March" },
      { value: 4, name: "April" },
      { value: 5, name: "May" },
      { value: 6, name: "June" },
      { value: 7, name: "July" },
      { value: 8, name: "August" },
      { value: 9, name: "September" },
      { value: 10, name: "October" },
      { value: 11, name: "November" },
      { value: 12, name: "December" },
    ];

    const reportTypes = [
      { value: "annually", name: "Annually" },
      { value: "semiAnnually", name: "Semi-Annually" },
      { value: "monthly", name: "Monthly" },
      { value: "weekly", name: "Weekly" },
      { value: "daily", name: "Daily" },
    ];

    const days = Array.from({ length: 31 }, (v, i) => i + 1);

    // Add the global variables
    const globalProperties = {
      $apiClient: apiClient,
      $otherVariable: "othervariable",
      $years: years,
      $months: months,
      $days: days,
      $banks: banks,
    //   $blockBanks: blockBanks,
    //   $serviceBanks: serviceBanks,
      $reportTypes: reportTypes,
    };

    // Assign to the global properties in the Vue app
    app.config.globalProperties = {
      ...app.config.globalProperties,
      ...globalProperties,
    };
  },
};
