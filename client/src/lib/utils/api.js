import axios from 'axios';


const api = axios.create({
  baseURL: "http://localhost:8000/api/v1/", // your backend proxy
  timeout: 5000,
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