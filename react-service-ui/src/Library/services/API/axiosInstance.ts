import axios, { AxiosHeaders } from 'axios';
import { GlobalHeaders } from './GlobalHeaders';

const axiosInstance = axios.create({
  headers: GlobalHeaders,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');

    // Create a proper AxiosHeaders instance
    const mergedHeaders = new AxiosHeaders({
      ...GlobalHeaders,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...config.headers, // preserve user-passed headers
    });

    config.headers = mergedHeaders;

    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
