import { GoogleGenAI, Type } from "@google/genai";

async function test() {
    const ai = new GoogleGenAI({});
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
