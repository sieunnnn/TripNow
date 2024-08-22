// src/axios.ts
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://69aa-1-215-153-253.ngrok-free.app',
    withCredentials: true,
    timeout: 1000,
});

export default axiosInstance;
