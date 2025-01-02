import axios from "axios"; // Import apiClient and baseUrl from globals
// import { formSchema } from "./formSchema";
export function reloadPage() {
    setTimeout(() => {
        window.location.reload();
    }, 2000);
}

export function getApiClient() {
    const isProduction = import.meta.env.MODE === "production";
    const baseUrl = isProduction
      ? import.meta.env.VITE_APP_BASE_URL_PRODUCTION
      : import.meta.env.VITE_APP_BASE_URL_LOCAL;

    // Create the API client
    const apiClient = axios.create({
      baseURL: baseUrl,
    });

    return apiClient; // Return the axios client instance
}

function handleApiError(error) {


    let status = 0;
    let message = "An unexpected error occurred.";
    if (error.response) {
      console.log("error code and error and status", error.response.status,error, error.response.data.error.option);


        status = error.response.status;
        if (status >= 100 && status < 200) {
            message = `Informational response: ${status}. Please wait...`;
        } else if (status >= 300 && status < 400) {
            message = `Redirection: ${status}. The resource has moved.`;
        }         
        else if (status === 403 && error.response.data.error.option == 1) {
          //alert("hiii")
          console.log("enters in to the 401 and 403 with option")
          this.$store.dispatch("logout");
          this.$router.push("/login");
          return;
        }


        else if (status >= 400 && status < 500) {
            const errorMessages = {
                400: "Bad Request. Please check your input.",
                401: "Unauthorized. Please log in.",
                403: "Forbidden. You don't have permission.",
                404: "Resource not found.",
                405: "Method not allowed.",
                408: "Request timed out.",
                409: "Conflict with current resource state.",
                410: "The resource is no longer available.",
                429: "Too many requests. Slow down!",
            };
            message =
                error.response.data.message ||
                errorMessages[status] ||
                `Client Error: ${status}. Please check your request.`;
        } else if (status >= 500 && status < 600) {
            const errorMessages = {
                500: "Internal server error.",
                501: "Not implemented.",
                502: "Bad gateway.",
                503: "Service unavailable.",
                504: "Gateway timeout.",
                505: "HTTP version not supported.",
            };
            message =
                error.response.data.message ||
                errorMessages[status] ||
                `Server Error: ${status}. Please try again later.`;
        } else {
            message = `Unexpected Error: ${status}. Please contact support.`;
        }
    } else if (error.request) {
        message = "No response received from the server. Please check your connection.";
    } else if (error.message) {
        message = `Error: ${error.message}`;
    }
    console.error("API Error:", { status, message, error });
  
    throw { status, message };
}

function getDefaultHeaders(customHeaders = {}) {
    const token = '';
    //localStorage.getItem("token"); // Access the token from Vuex or localStorage
    return {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        ...customHeaders, // Include any custom headers passed to the function
    };
}

// Function to make a GET request
export async function apiGet(url, params = {}, customHeaders = {}) {
    const apiClient = getApiClient(); // Get the API client instance
    try {
        const headers = getDefaultHeaders(customHeaders);
        const response = await apiClient.get(url, { params, headers });
        return response.data;
    } catch (error) {
        const handledError = handleApiError(error); // Handle error
        throw handledError; // Re-throw the error so the caller can catch it
    }
}

// Function to make a GET request by ID
export async function apiGetById(url, id, customHeaders = {}) {
    const apiClient = getApiClient(); // Get the API client instance
    try {
        const headers = getDefaultHeaders(customHeaders);
        const response = await apiClient.get(`${url}/${id}`, { headers });
        console.log("response in byId",response)
        return response.data;
    } catch (error) {
        console.log("getById error is",handleApiError(error))
        const handledError = handleApiError(error); // Handle error
        throw handledError; // Re-throw the error so the caller can catch it
    }
}

// Function to make a POST request
export async function apiPost(url, data, customHeaders = {}) {
    const apiClient = getApiClient(); // Get the API client instance
    try {
        const headers = getDefaultHeaders(customHeaders);
        const response = await apiClient.post(url, data, { headers });
        return response.data;
    } catch (error) {
        const handledError = handleApiError(error); // Handle error
        throw handledError; // Re-throw the error so the caller can catch it
    }
}



// Function to make a PUT request
export async function apiPut(url, id, data, customHeaders = {}) {
    const apiClient = getApiClient(); // Get the API client instance
    try {
            const headers = getDefaultHeaders(customHeaders);
            const response = await apiClient.put(`${url}/${id}`, data, { headers });
            return response.data;
        
    } catch (error) {
        const handledError = handleApiError(error); // Handle error
        throw handledError; // Re-throw the error so the caller can catch it
    }
}

// Function to make a PATCH request
export async function apiPatch(url, id, data, customHeaders = {}) {
   
    console.log("in api patch url,id,data",url,id,data);

    const apiClient = getApiClient(); // Get the API client instance
    try {
        const headers = getDefaultHeaders(customHeaders);
        const response = await apiClient.patch(`${url}/${id}`, data, { headers });
        console.log("response: " , response)
        return response.data;
    } catch (error) {
        console.log("error in patch,")
        const handledError = handleApiError(error); // Handle error
        console.log("error in patch", handledError)
        throw handledError; // Re-throw the error so the caller can catch it
    }
    // Define this function in a file like utils.js or directly in your Vue app setup

  
  // Export for reuse in other file
}
export function isStrongPassword(password) {
    const minLength = 8; // Minimum length requirement
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    
    if (!password || password.length < minLength) {
      return {
        valid: false,
        message: `Password must be at least ${minLength} characters long`,
      };
    }
  
    if (!regex.test(password)) {
      return {
        valid: false,
        message: 'Password must include uppercase, lowercase, number, and special character',
      };
    }
  
    return {
      valid: true,
      message: 'Password is strong',
    };
  }

  // utils/validation.js
// utils/validate.js



// utils/validation.js

// Assuming this is the 'validateField.js' file
export function validateField(formName, fieldName, value, formSchema) {
    const fieldSchema = formSchema[formName]?.fields[fieldName];
  
    if (!fieldSchema) {
      console.error('No schema found for this field');
      return { valid: true, message: '' };
    }
  
    // Default error message handler
    const generateErrorMessage = (rule) => {
      switch (rule) {
        case 'required':
          return `${fieldName} is required`;
        case 'minLength':
          return `${fieldName} must be at least ${fieldSchema.minLength} characters long`;
        case 'maxLength':
          return `${fieldName} cannot exceed ${fieldSchema.maxLength} characters`;
        case 'pattern':
          return `Please enter a valid ${fieldName}`;
        case 'match':
          return `${fieldName} must match the password`;
        default:
          return `${fieldName} is invalid`;
      }
    };
  
    // Validation: Required
    if (fieldSchema.rules.required && !value) {
      return { valid: false, message: generateErrorMessage('required') };
    }
  
    // Validation: Min Length
    if (fieldSchema.rules.minLength && value.length < fieldSchema.rules.minLength) {
      return { valid: false, message: generateErrorMessage('minLength') };
    }
  
    // Validation: Max Length
    if (fieldSchema.rules.maxLength && value.length > fieldSchema.rules.maxLength) {
      return { valid: false, message: generateErrorMessage('maxLength') };
    }
  
    // Validation: Pattern (Regex)
    if (fieldSchema.rules.pattern && !fieldSchema.rules.pattern.test(value)) {
      return { valid: false, message: generateErrorMessage('pattern') };
    }
  
    // Validation: Match (for fields like confirmPassword)
    if (fieldSchema.rules.match && value !== fieldSchema.rules.match) {
      return { valid: false, message: generateErrorMessage('match') };
    }
  
    // If all validations pass
    return { valid: true, message: '' };
  }
  

  export function gregorianToEthiopian(today) {
    // Constants
    const ETHIOPIAN_EPOCH_OFFSET = 8; // Ethiopian year lags Gregorian by 7-8 years
    const GREGORIAN_NEW_YEAR = new Date(today.getFullYear(), 8, 11); // September 11
  
    // Calculate Ethiopian year
    let ethiopianYear = today.getFullYear() - ETHIOPIAN_EPOCH_OFFSET;
  
    // Check if the date is before the Ethiopian New Year
    if (today < GREGORIAN_NEW_YEAR) {
      ethiopianYear -= 1;
    }
  
    // Calculate days since Ethiopian New Year
    const ethiopianNewYear = new Date(ethiopianYear + ETHIOPIAN_EPOCH_OFFSET, 8, 11);
    const daysSinceNewYear = Math.floor((today - ethiopianNewYear) / (1000 * 60 * 60 * 24));
  
    // Determine Ethiopian month and day
    let ethiopianMonth = Math.floor(daysSinceNewYear / 30) + 1;
    let ethiopianDay = (daysSinceNewYear % 30) + 1;
  
    // Handle Pagumē (13th month)
    if (ethiopianMonth > 13) {
      ethiopianMonth = 13;
      ethiopianDay = daysSinceNewYear - 360 + 1;
    }
  
    // Return formatted string
    return `${ethiopianYear}-${ethiopianMonth.toString().padStart(2, "0")}-${ethiopianDay
      .toString()
      .padStart(2, "0")}`;
  }