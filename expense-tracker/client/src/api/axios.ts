// api/axios.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:6969',
});

// Add token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // or wherever you store the token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;