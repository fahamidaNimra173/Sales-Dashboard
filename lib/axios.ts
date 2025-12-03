import axios from "axios";

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_POSTAPI_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});
// Add request interceptor to log requests (for debugging)
// axiosInstance.interceptors.request.use(
//     (config) => {
//         console.log('Making request to:', config.baseURL + config.url);
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );

// Add response interceptor to log errors
// axiosInstance.interceptors.response.use(
//     (response) => response,
//     (error) => {
//         console.error('API Error:', {
//             url: error.config?.url,
//             method: error.config?.method,
//             status: error.response?.status,
//             message: error.message,
//         });
//         return Promise.reject(error);
//     }
// );
export default axiosInstance;
