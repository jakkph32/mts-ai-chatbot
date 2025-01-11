import {
    ClientConfig,
    MessageAPIResponseBase,
    messagingApi,
    MiddlewareConfig,
    webhook,
} from '@line/bot-sdk';
import "dotenv/config";

const clientConfig: ClientConfig = {
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN || '',
};

export const middlewareConfig: MiddlewareConfig = {
    channelSecret: process.env.CHANNEL_SECRET || '',
};

const client = new messagingApi.MessagingApiClient(clientConfig);

export const textEventHandler = async (event: webhook.Event): Promise<MessageAPIResponseBase | undefined> => {
    try {
        if (event.type === "follow") {
            return; // No action needed for follow or unblocked events
        } else if (event.type === "message" && event.message.type !== 'text') {
            const replyToken = event.replyToken as string;
            const messageType = event.message.type;
            await client.replyMessage({
                replyToken,
                messages: [{ type: "text", text: `${messageType} 🙏` }]
            });
        } else if (event.type === "message" && event.message.type === 'text') {
            const replyToken = event.replyToken as string;
            await client.replyMessage({
                replyToken,
                messages: [{ type: "text", text: "Text 🙏" }]
            });
        }
    } catch (err) {
        console.error(err);
    }
};
