// api.js
import axios from "axios";

// Backend base URL
const API_URL = process.env.REACT_APP_API_URL

// Create Axios instance
const api = axios.create({
  baseURL: API_URL,
});

// Add request interceptor to attach token automatically
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken"); // get token from localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor to handle 401 globally
api.interceptors.response.use(
  (response) => response, // pass through successful responses
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem("authToken"); // clear token
      window.location.href = "/login"; // redirect to login page
    }
    return Promise.reject(error);
  }
);

export default api;
