export interface authenticationRequest {
    email: string
}

export interface authenticationValidateRequest {
    email: string,
    tempCode: string
}

export interface signupRequest {
    email: string,
    password: string,
    nickname: string,
    birthday: string
}

export interface loginRequest {
    email: string,
    password: string
}

export interface userInfoResponse {
    userId: number,
    nickname: string,
    userTag: number,
    birthday: string,
    email: string,
    profileUrl: string,
    isBirthday: boolean,
    sex: string
}