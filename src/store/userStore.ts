// stores/user.ts
import { defineStore } from 'pinia';
import { getUserInfo } from "../api/AuthenticationApi.ts";

export interface UserInfo {
    userId: number;
    nickname: string;
    userTag: number;
    birthday: Date;
    email: string;
    profileImgUrl: string;
    isBirthday: boolean;
    sex: string;
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
        },
        async fetchUserInfo() {
            const accessToken = localStorage.getItem("Authorization");
            if (accessToken == null) {
                // await router.push("/login");

            } else {
                const response = await getUserInfo();
                if (response.data) {
                    this.setUserInfo(response.data);
                }
            }
        }
    },
    getters: {
        isUserLoggedIn: (state) => !!state.userInfo,
    },
});
