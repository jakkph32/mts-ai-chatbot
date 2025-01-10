import {
    ClientConfig,
    MessageAPIResponseBase,
    messagingApi,
    MiddlewareConfig,
    webhook,
} from '@line/bot-sdk';
import "dotenv/config";

// Setup all LINE client and Express configurations.
const clientConfig: ClientConfig = {
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN || '',
};

export const middlewareConfig: MiddlewareConfig = {
    channelSecret: process.env.CHANNEL_SECRET || '',
};

// Create a new LINE SDK client.
const client = new messagingApi.MessagingApiClient(clientConfig);

// Function handler to receive the text.
export const textEventHandler = async (event: webhook.Event): Promise<MessageAPIResponseBase | undefined> => {
    // Process all variables here.

    // Check if for a text message
    if (event.type !== 'message' || event.message.type !== 'text') {
        return;
    }

    // Process all message related variables here.

    // Check if message is repliable
    if (!event.replyToken) return;

    // Create a new message.
    // Reply to the user.
    await client.replyMessage({
        replyToken: event.replyToken,
        messages: [{
            type: 'text',
            text: event.message.text,
        }],
    });
};