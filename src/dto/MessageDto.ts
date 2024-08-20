
export interface sendMessageRequest {
    friendId: number;
    sendUserId: number | undefined;
    content: string;
}

export interface messagesRequest {
    userId: number | undefined;
    friendId: number;
}

export interface messageListResponse {
    friendId: number;
    friendNickname: string;
    friendProfileImage: string;
    friendTag: number;
    recentMessage: string;
}

export interface messageResponse {
    messageId: number;
    isSent: boolean;

    sendUserId: number | undefined;
    sendUserNickname: string;
    sendUserTag: number;
    sendUserProfileImage: string;

    receiveUserId: number;
    receiveUserNickname: string;
    receiveUserTag: number;
    receiveUserProfileImage: string;

    content: string;
    sendAt: Date;
}