import {useUserStore} from "../store/userStore.ts";
import {groupMemberAddRequest, groupMemberResponse} from "../dto/GroupMemberDto.ts";
import axiosInstance from "./AxiosInstance.ts";

export const getGroupMembers = async (plannerId: number):Promise<Array<groupMemberResponse>> => {
    try {
        const userStore = useUserStore();
        const userId = userStore.userInfo?.userId;

        const response = await axiosInstance.get(`/users/${userId}/planners/${plannerId}/group`)

        return response.data;

    } catch (e: any) {
        return e.response.data.errorCode;
    }
}

export const addGroupMembers = async (data: groupMemberAddRequest, plannerId: number):Promise<Array<groupMemberResponse>> => {
    try {
        const userStore = useUserStore();
        const userId = userStore.userInfo?.userId;

        const response = await axiosInstance.post(`/users/${userId}/planners/${plannerId}/group`, data);

        return response.data;

    } catch (e: any) {
        return e.response.data.errorCode;
    }
}

export const deleteGroupMember = async (plannerId: number, groupMemberId: number):Promise<Array<groupMemberResponse>> => {
    try {
        const userStore = useUserStore();
        const userId = userStore.userInfo?.userId;

        const response = await axiosInstance.patch(`/users/${userId}/planners/${plannerId}/group/${groupMemberId}`)

        return response.data;

    } catch (e: any) {
        return e.response.data.errorCode;
    }
}