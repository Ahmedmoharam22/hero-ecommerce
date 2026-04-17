import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://ecommerce.routemisr.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor عشان نهندل التوكن تلقائياً
axiosInstance.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('userToken');
    if (token) {
      config.headers.token = token;
    }
  }
  return config;
});