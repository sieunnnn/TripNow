import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/v1';

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
});

axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('Authorization');
        if (accessToken) {
            config.headers['Authorization'] = `${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        if (error.response.status === 401 && error.response.data?.errorCode === 'TOKEN_01' && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = localStorage.getItem('RefreshToken');
                if (!refreshToken) {
                    throw new Error('No refresh token available');
                }

                const response = await axios.post(`${API_BASE_URL}/auth/token/refresh`, {
                    token: refreshToken,
                });

                const { accessToken } = response.data;
                localStorage.setItem('Authorization', accessToken);
                axiosInstance.defaults.headers.common['Authorization'] = `${accessToken}`;
                originalRequest.headers['Authorization'] = `${accessToken}`;

                return axiosInstance(originalRequest);

            } catch (e) {
                console.error('Token refresh failed', e);
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;