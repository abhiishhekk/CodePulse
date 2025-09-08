import axios from 'axios';


const api = axios.create({
   baseURL: `${import.meta.env.VITE_BACKENDURL}/api/v1/`, // your backend proxy
  // baseURL: `http://localhost:8000/api/v1/`,
  timeout: 90000,
});
console.log("backend url", import.meta.env.VITE_BACKENDURL);
// Optional: handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);

export default api;