import {useUserStore} from "../store/userStore.ts";
import axiosInstance from "./AxiosInstance.ts";
import {friendRequest, friendRequestRequest, friendResponse} from "../dto/FriendDto.ts";

export const getFriends = async ():Promise<Array<friendResponse>> => {
    try {
        const userStore = useUserStore();
        const userId = userStore.userInfo?.userId;
        const response = await axiosInstance.get(`/users/${userId}/friends`);

        return response.data;

    } catch (e: any) {
        return e.response.data.errorCode;
    }
}

export const getWaitingAcceptFriends = async ():Promise<Array<friendResponse>> => {
    try {
        const userStore = useUserStore();
        const userId = userStore.userInfo?.userId;
        const response = await axiosInstance.get(`/users/${userId}/friends/waiting`);

        return response.data;

    } catch (e: any) {
        return e.response.data.errorCode;
    }
}

export const requestFriend = async(friendId: number) => {
    try {
        const userStore = useUserStore();
        const storedUserId: number | undefined = userStore.userInfo?.userId;

        const data: friendRequestRequest = {
            friendUserId: friendId,
            userId: storedUserId
        }

        const response = await axiosInstance.post(`/friends/request`, data);

        return response.status;

    } catch (e: any) {
        return e.response.data.errorCode;
    }
}

export const acceptFriend = async (friendId: number) => {
    try {
        const userStore = useUserStore();
        const userId = userStore.userInfo?.userId;

        const data: friendRequest = {
            friendId: friendId
        }

        const response = await axiosInstance.post(`/users/${userId}/friends/accept`, data);

        return response.status;

    } catch (e: any) {
        return e.response.data.errorCode;
    }
}

export const deleteFriend = async (friendId: number) => {
    try {
        const userStore = useUserStore();
        const userId = userStore.userInfo?.userId;

        const data: friendRequest = {
            friendId: friendId
        }

        const response = await axiosInstance.patch(`/users/${userId}/friends/delete`, data);

        return response.status;

    } catch (e: any) {
        return e.response.data.errorCode;
    }
}