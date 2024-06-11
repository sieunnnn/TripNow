import {ref } from "vue";
import {authenticationRequest, authenticationValidateRequest, signupRequest} from "./AuthenticationDto.ts";
import axios from "axios";

export const error = ref<String | null>(null);

export const authenticationMailSend = async (data: authenticationRequest) => {
    try {
        const response = await axios.post('http://localhost:8080/api/v1/auth/signup/authentication/send', data);
        return response.status;

    } catch (e: any) {
        return e.response.status;
    }
};

export const authenticationValidate = async (data: authenticationValidateRequest) => {
    try {
        const response = await axios.post('http://localhost:8080/api/v1/auth/signup/authentication/check', data);
        return response.status;

    } catch (e: any) {
        return e.response.status;
    }
};

export const signup = async (data: signupRequest)=> {
    try {
        const response = await axios.post('http://localhost:8080/api/v1/auth/signup', data);
        return response.status;

    } catch (e: any) {
        return e.response.status;
    }
};
