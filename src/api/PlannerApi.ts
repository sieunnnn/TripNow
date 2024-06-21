import axiosInstance from "./AxiosInstance.ts";
import {useUserStore} from "../store/userStore.ts";
import {Page} from "../dto/PaginationDto.ts";
import {plannerListResponse} from "../dto/PlannerDto.ts";

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