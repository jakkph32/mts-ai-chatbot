import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} from "@google/generative-ai";
import "dotenv/config";

const apiKey = process.env.GOOGLE_GEMINI_API;

if (!apiKey) {
    console.error("Error: GOOGLE_GEMINI_API environment variable not set.");
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);

export const geminiChat = async (prompt: string) => {
    const model = genAI.getGenerativeModel({
        model: "",
        systemInstruction: "",
        generationConfig: {
            maxOutputTokens: 8192,
            temperature: 1,
            topP: 0.95,
            topK: 3,
        }
    })

    try {
        const chat = model.startChat();

        const result = await chat.sendMessage(prompt);

        return result.response.text();
    } catch (error) {
        console.error("Error interacting with Gemini:", error);
        return "An error occurred. Please try again later.";

    }
}

export const geminiMultiModal = async (imageBinary: string) => {
    const mimeType = "image/png";

    const imageParts = [
        {
            inlineData: {
                data: Buffer.from(imageBinary, "binary").toString("base64"),
                mimeType,
            },
        },
    ];

    const model = genAI.getGenerativeModel({
        model: "",
        systemInstruction: "",
        generationConfig: {
            maxOutputTokens: 8192,
            temperature: 1,
            topP: 0.95,
            topK: 3,
        },
        safetySettings: [
            {
                category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
                threshold: HarmBlockThreshold.BLOCK_NONE,
            },
            {
                category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
                threshold: HarmBlockThreshold.BLOCK_NONE,
            },
            {
                category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
                threshold: HarmBlockThreshold.BLOCK_NONE,
            },
            {
                category: HarmCategory.HARM_CATEGORY_HARASSMENT,
                threshold: HarmBlockThreshold.BLOCK_NONE,
            },
        ]

    })

    try {
        return;
    } catch (error) {
        console.error(error)

        return;
    }
}