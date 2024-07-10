
export interface plannerCreateRequest {
    title: string;
    isPrivate: boolean;
}

export interface planBoxCreateRequest {
    planDate: Date;
}

export interface planBoxUpdateRequest {
    planDate: Date;
}

export interface planCreateRequest {
    isPrivate: boolean;
    title: string;
    time: string;
    content: string;
    address: string;
    isDeleted: boolean;
}

export interface plannerUpdateRequest {
    title: string;
    isPrivate: boolean;
}

export interface planBoxUpdateRequest {
    planDate: string;
    isPrivate: boolean;
}

export interface planUpdateRequest {
    isPrivate: boolean;
    title: string;
    time: string;
    content: string;
    address: string;
}

export interface plannerListResponse {
    plannerId: number;
    title: string;
    startDate: string;
    endDate: string;
    isPrivate: boolean;
    profileImages: string[];
}

export interface PlannerDetailResponse {
    plannerId: number;
    title: string;
    startDate: string;
    endDate: string;
    isPrivate: boolean;
    planBoxResponses: PlanBoxResponse[];
}

export interface PlanBoxResponse {
    planBoxId: number;
    planDate: string;
    planResponses: PlanResponse[];
}

export interface PlanResponse {
    planId: number;
    isPrivate: boolean;
    title: string;
    time: string;
    content: string;
    address: string;
}
