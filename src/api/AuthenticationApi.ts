import {ref } from "vue";
import {
    authenticationRequest,
    authenticationValidateRequest,
    loginRequest,
    signupRequest
} from "../dto/AuthenticationDto.ts";
import axios from "axios";
import axiosInstance from "./AxiosInstance.ts";
import {useUserStore} from "../store/userStore.ts";

export const error = ref<String | null>(null);
const API_BASE_URL = 'https://24fb-1-215-153-253.ngrok-free.app/api/v1/auth';

export const authenticationMailSend = async (data: authenticationRequest) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/signup/authentication/send`, data);
        return response;

    } catch (e: any) {
        return e.response;
    }
};

export const authenticationValidate = async (data: authenticationValidateRequest) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/signup/authentication/check`, data);
        return response.status;

    } catch (e: any) {
        return e.response.status;
    }
};

export const signup = async (data: signupRequest)=> {
    try {
        const response = await axios.post(`${API_BASE_URL}/signup`, data);
        return response.status;

    } catch (e: any) {
        return e.response.status;
    }
};

export const login = async (data: loginRequest) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/login`, data);
        const accessToken = response.headers['authorization'];
        localStorage.setItem('Authorization', accessToken);

        return response.status;

    } catch (e: any) {
        return e.response.status;
    }
};

export const logout = async () => {
    try {
        const response = await axiosInstance.post(`auth/logout`);
        localStorage.removeItem("Authorization")

        const userStore = useUserStore();
        userStore.clearUserInfo();

        return response.status;

    } catch (e: any) {
        return e.response.status;
    }
};

export const getUserInfo = async () => {
    try {
        const response = await axiosInstance.get('/auth/user');

        const userStore = useUserStore();
        userStore.setUserInfo(response.data);

        return response;

    } catch (e: any) {
        return e.response.data.errorCode;
    }
};