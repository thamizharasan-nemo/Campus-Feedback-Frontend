import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api",
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
   
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);



api.interceptors.response.use(
  (response) => {

    const apiResponse = response.data;

    if (!apiResponse.success) {
      return Promise.reject(apiResponse.message);
    }

    return apiResponse.data;

  },

  (error) => {
    console.error(error);
    return Promise.reject(error);
  }

);

export default api;
