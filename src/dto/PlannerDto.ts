
export interface plannerCreateRequest {
    title: string;
    isPrivate: boolean;
}

export interface plannerUpdateRequest {
    title: string;
    isPrivate: boolean;
}

export interface plannerDeleteRequest {
    userId: number;
}

export interface plannerListResponse {
    plannerId: number;
    title: string;
    startDate: string;
    endDate: string;
    isPrivate: boolean;
    profileImages: string[];
}