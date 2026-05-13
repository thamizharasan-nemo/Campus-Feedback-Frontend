import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api/v1",
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    // const token = "eyJhbGciOiJIUzM4NCJ9.eyJyb2xlIjoiQURNSU4iLCJpbnN0aXR1dGlvbklkIjoxLCJ1c2VySWQiOjEsInN1YiI6InRoYW1pemhhcmFzYW4uZGV2LmluQGdtYWlsLmNvbSIsImlhdCI6MTc2OTg4MzQxOSwiZXhwIjoxNzcwNzQ3NDE5fQ.VFnAPFd9t7gRjqReOQnOpY72dWxTlralppq_-FN3_-A-GkPH-jLjH7T1zUAKXNbo";
   // const token = "eyJhbGciOiJIUzM4NCJ9.eyJpbnN0aXR1dGlvbklkIjoxLCJyb2xlcyI6WyJBRE1JTiJdLCJ1c2VySWQiOjEsInN1YiI6InRoYW1pemhhcmFzYW4uZGV2LmluQGdtYWlsLmNvbSIsImlhdCI6MTc3Nzc3Nzc0NSwiZXhwIjoxNzc4NjQxNzQ1fQ.w_vfTFZCULVZyrmPYB4vJH4-W-ShXuGHtBv6XBpnxF6GczmRox8LFScgpqlZ3Eg8";

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      // config.headers.Authorization = "Bearer eyJhbGciOiJIUzM4NCJ9.eyJpbnN0aXR1dGlvbklkIjoxLCJyb2xlcyI6WyJBRE1JTiJdLCJ1c2VySWQiOjEsInN1YiI6InRoYW1pemhhcmFzYW4uZGV2LmluQGdtYWlsLmNvbSIsImlhdCI6MTc3Nzc3Nzc0NSwiZXhwIjoxNzc4NjQxNzQ1fQ.w_vfTFZCULVZyrmPYB4vJH4-W-ShXuGHtBv6XBpnxF6GczmRox8LFScgpqlZ3Eg8";
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
