import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
    state: () => ({
        userId: '',
        nickname: '',
        userTag: '',
        profileImgUrl: ''
    }),
    actions: {
        setUser(userData: { userId: string, nickname: string, userTag: string, profileImgUrl: string }) {
            this.userId = userData.userId;
            this.nickname = userData.nickname;
            this.userTag = userData.userTag;
            this.profileImgUrl = userData.profileImgUrl;
        }
    }
});
