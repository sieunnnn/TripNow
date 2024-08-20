import {Page} from "../dto/PaginationDto.ts";
import {messageListResponse, messageResponse, messagesRequest, sendMessageRequest} from "../dto/MessageDto.ts";
import {useUserStore} from "../store/userStore.ts";
import axiosInstance from "./AxiosInstance.ts";

export const getMassageList = async (page: number, size: number): Promise<Page<messageListResponse>> => {
    try {
        const userStore = useUserStore();
        const userId = userStore.userInfo?.userId;

        const response = await axiosInstance.get(`/messages/${userId}`, {
            params: {
                page,
                size
            }
        })

        console.log(response.data);

        return response.data;

    } catch (e: any) {
        return e.response.data.errorCode;
    }
}

export const getMassages = async (friendId: number, page: number, size: number): Promise<Page<messageResponse>> => {
    try {
        const userStore = useUserStore();
        const userId = userStore.userInfo?.userId;

        const data: messagesRequest = {
            friendId: friendId,
            userId: userId
        }

        const response = await axiosInstance.post(`/messages/contents`, data, {
            params: {
                page,
                size
            }
        })

        const formattedData = response.data.content.map((message: messageResponse) => {
            return {
                ...message,
                sendAt: formatTimestamp(message.sendAt)
            };
        });

        return {
            ...response.data,
            content: formattedData
        };

    } catch (e: any) {
        console.error('Error fetching messages:', e);
        return e.response.data.errorCode;
    }
};

export const sendMessage = async (friendId: number, content: string) => {
    try {
        const userStore = useUserStore();
        const userId = userStore.userInfo?.userId;

        const data: sendMessageRequest = {
            friendId: friendId,
            sendUserId: userId,
            content: content
        }

        const response = await axiosInstance.post('/messages', data);

        return response.status;

    } catch (e: any) {
        return e.response.data.errorCode;
    }
}

function formatTimestamp(timestamp: string): string {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${year}년 ${month}월 ${day}일 ${hours}:${minutes}`;
}