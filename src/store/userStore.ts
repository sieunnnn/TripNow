import { defineStore } from 'pinia';

export interface UserInfo {
    userId: number,
    nickname: string,
    userTag: number,
    birthday: Date,
    email: string,
    profileImgUrl: string,
    isBirthday: boolean,
    sex: string
}

export const useUserStore = defineStore('user', {
    state: () => ({
        userInfo: null as UserInfo | null,
    }),
    actions: {
        setUserInfo(userInfo: UserInfo) {
            this.userInfo = userInfo;
        },
        clearUserInfo() {
            this.userInfo = null;
        }
    },
    getters: {
        isUserLoggedIn: (state) => !!state.userInfo,
    },
})