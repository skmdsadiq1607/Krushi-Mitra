import { GoogleGenAI, Type, ThinkingLevel } from "@google/genai";

async function test() {
    console.log("GEMINI_API_KEY is:", process.env.GEMINI_API_KEY ? "SET" : "UNSET");
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    try {
        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: "What is the weather in London? Output as JSON.",
            config: {
                tools: [{ googleSearch: {} }],
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: { temp: { type: Type.NUMBER } },
                    required: ["temp"]
                }
            }
        });
        console.log("Success!", response.text);
    } catch (e) {
        console.error("Failed:", e);
    }
}

test();
