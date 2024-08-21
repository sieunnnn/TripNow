// src/axios.ts
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://5161-1-215-153-253.ngrok-free.app',
    timeout: 1000,
});

export default axiosInstance;
