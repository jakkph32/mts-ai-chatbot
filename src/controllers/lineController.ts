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
    try {
        switch (event.type) {
            case "follow":
                if (event.follow.isUnblocked) {
                    return
                } else {
                    return
                }
            case "message":
                const replyToken = event.replyToken as string; // Declare and assign replyToken here
                switch (event.message.type) {
                    case "image":
                        await client.replyMessage({
                            replyToken, messages: [
                                {
                                    type: "text",
                                    text: "image 🙏"
                                }
                            ]
                        });
                    case "file":
                        await client.replyMessage({
                            replyToken, messages: [
                                {
                                    type: "text",
                                    text: "file 🙏"
                                }
                            ]
                        });
                    case "location":
                        await client.replyMessage({
                            replyToken, messages: [
                                {
                                    type: "text",
                                    text: "location 🙏"
                                }
                            ]
                        });
                    case "video":
                        await client.replyMessage({
                            replyToken, messages: [
                                {
                                    type: "text",
                                    text: "video 🙏"
                                }
                            ]
                        });
                    case "audio":
                        await client.replyMessage({
                            replyToken, messages: [
                                {
                                    type: "text",
                                    text: "audio 🙏"
                                }
                            ]
                        });
                    case "sticker":
                        await client.replyMessage({
                            replyToken, messages: [
                                {
                                    type: "text",
                                    text: "sticker 🙏"
                                }
                            ]
                        });
                        break
                    default:
                        await client.replyMessage({
                            replyToken, messages: [
                                {
                                    type: "text",
                                    text: "Text 🙏"
                                }
                            ]
                        });
                        break
                }
        }
    } catch (err) {
        console.error(err);
    }
}