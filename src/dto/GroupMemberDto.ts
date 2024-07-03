
export interface groupMemberAddRequest {
    userId: number;
}

export interface groupMemberDeleteRequest {
    groupMemberId: number;
}

export interface groupMemberResponse {
    groupMemberId: number;
    userId: number;
    nickname: string;
    userTag: number;
    profileImageUrl: string;
    isHost: boolean;
}