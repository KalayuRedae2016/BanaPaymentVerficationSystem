import axios from "axios"; // Import apiClient and baseUrl from globals

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
        status = error.response.status;
        if (status >= 100 && status < 200) {
            message = `Informational response: ${status}. Please wait...`;
        } else if (status >= 300 && status < 400) {
            message = `Redirection: ${status}. The resource has moved.`;
        } else if (status >= 400 && status < 500) {
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
    const token = localStorage.getItem("token"); // Access the token from Vuex or localStorage
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
    const apiClient = getApiClient(); // Get the API client instance
    try {
        const headers = getDefaultHeaders(customHeaders);
        const response = await apiClient.patch(`${url}/${id}`, data, { headers });
        return response.data;
    } catch (error) {
        const handledError = handleApiError(error); // Handle error
        throw handledError; // Re-throw the error so the caller can catch it
    }
}
