export interface authenticationRequest {
    email: string;
}

export interface authenticationValidateRequest {
    email: string;
    tempCode: string;
}

export interface signupRequest {
    email: string;
    password: string;
    nickname: string;
    birthday: Date
}

export interface loginRequest {
    email: string;
    password: string;
}