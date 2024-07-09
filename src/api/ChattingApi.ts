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