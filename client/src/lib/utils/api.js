import axios from 'axios';


const api = axios.create({
  baseURL: "https://leetpulse.onrender.com/api/v1/", // your backend proxy
  timeout: 60000,
});

// Optional: handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);

export default api;