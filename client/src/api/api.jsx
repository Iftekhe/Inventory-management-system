import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});


// Add a request  include the token 
// api.interceptors.request.use(
//     (config) => {
//         const token = localStorage.getItem('token');
//         if (token) {
//             config.headers.Authorization = `${token}`;
//         }
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );

export default api;
