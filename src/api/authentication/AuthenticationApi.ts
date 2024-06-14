import {ref } from "vue";
import {
    authenticationRequest,
    authenticationValidateRequest,
    loginRequest,
    signupRequest
} from "./AuthenticationDto.ts";
import axios from "axios";

export const error = ref<String | null>(null);
const API_BASE_URL = 'http://localhost:8080/api/v1/auth';

export const authenticationMailSend = async (data: authenticationRequest) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/signup/authentication/send`, data);
        return response.status;

    } catch (e: any) {
        return e.response.status;
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
        let accessToken = response.headers['authorization'];
        localStorage.setItem('Authorization', accessToken);

        return response.status;

    } catch (e: any) {
        return e.response;
    }
};