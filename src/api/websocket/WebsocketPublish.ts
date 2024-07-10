import { Client } from "@stomp/stompjs";

let client: Client | null = null;

export const setClient = (stompClient: Client) => {
    client = stompClient;
};

export const sendMessage = (plannerId: number, chatDto: any): void => {
    if (client && client.connected) {
        const destination = `/pub/planner/${plannerId}/chat/send`;
        client.publish({
            destination,
            body: JSON.stringify(chatDto),
        });
    } else {
        console.log("Client is not connected");
    }
};

export const createPlanBox = (plannerId: number, planBoxCreateRequest: any): void => {
    if (client && client.connected) {
        const destination = `/pub/planner/${plannerId}/create`;
        client.publish({
            destination,
            body: JSON.stringify(planBoxCreateRequest),
        });
    } else {
        console.log("Client is not connected");
    }
}

export const updatePlanBox = (plannerId: number, planBoxId: number, planBoxUpdateRequest: any): void => {
    if (client && client.connected) {
        const destination = `/pub/planner/${plannerId}/update/${planBoxId}`;
        client.publish({
            destination,
            body: JSON.stringify(planBoxUpdateRequest),
        });
    } else {
        console.log("Client is not connected");
    }
}

export const deletePlanBox = (plannerId: number, planBoxId: number): void => {
    if (client && client.connected) {
        const destination = `/pub/planner/${plannerId}/delete/${planBoxId}`;
        client.publish({
            destination
        });
    } else {
        console.log("Client is not connected");
    }
}