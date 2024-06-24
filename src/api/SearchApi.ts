import axiosInstance from "./AxiosInstance.ts";
import {Page} from "../dto/PaginationDto.ts";
import { plannerListResponse } from "../dto/PlannerDto.ts";
import {useUserStore} from "../store/userStore.ts";

export const searchPlanners = async (page: number, size: number, input: string): Promise<Page<plannerListResponse>> => {
    try {
        const response = await axiosInstance.get(`/search/planners`, {
            params: {
                query: input,
                page: page,
                size: size
            }
        });
        return response.data;

    } catch (e: any) {
        console.error("Error fetching planners:", e);
        return e.response.data.errorCode;
    }
};

export const searchMyPlanners = async (page: number, size: number, input: string): Promise<Page<plannerListResponse>> => {
    try {
        const userStore = useUserStore();
        const userId = userStore.userInfo?.userId;

        const response = await axiosInstance.get(`/search/planners/${userId}`, {
            params: {
                query: input,
                page: page,
                size: size
            }
        });

        return response.data;

    } catch (e: any) {
        console.error("Error fetching planners:", e);
        return e.response.data.errorCode;
    }
};