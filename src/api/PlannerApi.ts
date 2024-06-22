import axiosInstance from "./AxiosInstance.ts";
import {useUserStore} from "../store/userStore.ts";
import {Page} from "../dto/PaginationDto.ts";
import {plannerCreateRequest, plannerListResponse, plannerUpdateRequest} from "../dto/PlannerDto.ts";

export const getPlannerList = async (page: number, size: number): Promise<Page<plannerListResponse>> => {
    try {
        const userStore = useUserStore();
        const userId = userStore.userInfo?.userId;

        const response = await axiosInstance.get(`/users/${userId}/planners`, {
            params: {
                page,
                size
            }
        })

        return response.data;

    } catch (e: any) {
        return e.response.data.errorCode;
    }
}

export const createPlanner = async (data: plannerCreateRequest) => {
    try {
        const userStore = useUserStore();
        const userId = userStore.userInfo?.userId;
        const response = await axiosInstance.post(`/users/${userId}/planners`, data);

        return response.status;

    } catch (e: any) {
        return e.response.data.errorCode;
    }

}

export const updatePlanner = async (data: plannerUpdateRequest, plannerId: number) => {
    try {
        const userStore = useUserStore();
        const userId = userStore.userInfo?.userId;
        const response = await axiosInstance.patch(`/users/${userId}/planners/${plannerId}`, data);

        return response.status;

    } catch (e: any) {
        return e.response.data.errorCode;
    }
}

export const deletePlanner = async (plannerId: string)=> {
    try {
        const userStore = useUserStore();
        const userId = userStore.userInfo?.userId;
        const response = await axiosInstance.delete(`/users/${userId}/planners/${plannerId}`);

        return response.status;

    } catch (e: any) {
        return e.response.data.errorCode;
    }

}