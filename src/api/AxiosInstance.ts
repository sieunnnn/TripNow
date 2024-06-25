import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/v1';

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
});

axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('Authorization');
        if (accessToken) {
            config.headers['authorization'] = `${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response && error.response.status === 401 && error.response.data?.errorCode === 'TOKEN_01' && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const response = await axios.post(`${API_BASE_URL}/auth/token/refresh`, null, { withCredentials: true });
                const accessToken = response.headers['authorization'];
                localStorage.setItem('Authorization', accessToken);

                axiosInstance.defaults.headers.common['authorization'] = `${accessToken}`;
                originalRequest.headers['authorization'] = `${accessToken}`;

                return axiosInstance(originalRequest);

            } catch (e) {
                return Promise.reject(e);
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
