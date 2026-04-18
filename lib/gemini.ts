
import { GoogleGenAI, Type, ThinkingLevel } from "@google/genai";
import { DiseaseDetection, PestWeedIdentification } from "../types";
import { FarmData } from '../contexts/FarmContext';

let ai: GoogleGenAI;

/**
 * Lazily initializes and returns a singleton instance of the GoogleGenAI client.
 * Throws a specific error if the API key is not configured.
 * @returns The initialized GoogleGenAI instance.
 */
function getAI(): GoogleGenAI {
    const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;
    if (!apiKey) {
        // This specific error message will be caught by UI error boundaries.
        throw new Error("Gemini API key is not configured. Please set the GEMINI_API_KEY environment variable in your deployment settings.");
    }
    if (!ai) {
        ai = new GoogleGenAI({ apiKey });
    }
    return ai;
}


/**
 * A robust parser for cleaning and parsing Gemini's JSON responses.
 * It handles responses wrapped in markdown code blocks.
 * @param responseText The raw text response from the Gemini API.
 * @returns A parsed JSON object of type T.
 * @throws An error if the response is empty or cannot be parsed.
 */
const parseGeminiResponse = <T>(responseText: string | undefined, defaultValues?: Partial<T>): T => {
    if (!responseText) {
        throw new Error("Received empty response from API.");
    }
    
    let text = responseText.trim();
    
    // Try to extract JSON from markdown block
    const match = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
    if (match) {
        text = match[1].trim();
    }

    let parsed: any;
    try {
        parsed = JSON.parse(text);
    } catch (error) {
        console.error("Failed to parse JSON, falling back to brace extraction. Erring text:", text.substring(0, 50));
        
        // Final fallback: try to find the outermost braces/brackets
        const firstBrace = responseText.indexOf('{');
        const lastBrace = responseText.lastIndexOf('}');
        const firstBracket = responseText.indexOf('[');
        const lastBracket = responseText.lastIndexOf(']');
        
        // Determine whether the outer structure is likely an object or an array
        const start = Math.min(
            firstBrace !== -1 ? firstBrace : Infinity,
            firstBracket !== -1 ? firstBracket : Infinity
        );
        const end = Math.max(lastBrace, lastBracket);

        if (start !== Infinity && end !== -1 && end >= start) {
            try {
                parsed = JSON.parse(responseText.substring(start, end + 1));
            } catch (err) {
                 if (error instanceof Error) {
                     throw new Error(`JSON Parse Error: ${error.message}. Original text: ${text.substring(0, 150)}...`);
                 }
                 throw new Error("An unknown JSON parsing error occurred.");
            }
        } else {
             if (error instanceof Error) {
                 throw new Error(`JSON Parse Error: ${error.message}. Original text: ${text.substring(0, 150)}...`);
             }
             throw new Error("An unknown JSON parsing error occurred.");
        }
    }

    // Assign safe defaults if provided
    if (defaultValues && typeof parsed === 'object' && parsed !== null) {
        return { ...defaultValues, ...parsed } as T;
    }
    return parsed as T;
};


/**
 * Analyzes a base64 encoded image of a crop to detect diseases.
 * @param base64Image The base64 encoded string of the crop image.
 * @param language The language for the response (e.g., 'en', 'te', 'hi', 'ur').
 * @returns A promise that resolves to a DiseaseDetection object.
 */
export const detectDisease = async (base64Image: string, language: string, mimeType: string = 'image/jpeg'): Promise<DiseaseDetection> => {
  const genAI = getAI();
  const response = await genAI.models.generateContent({
    model: 'gemini-2.5-pro',
    contents: [
      {
        role: 'user',
        parts: [
          { inlineData: { data: base64Image, mimeType: mimeType } },
          { text: `Analyze this crop image through an elite scientific lens. Utilize deep past historical data of agricultural diseases. Identify the disease, your confidence level (0-100), severity (Low, Medium, High), a simple scientific explanation for the farmer, highly accurate step-by-step treatment options, the estimated cost in local currency (INR), and verified preventive measures. Crucially, suggest 2-3 specific, scientifically-proven pesticide or fungicide products in India (including chemical composition and popular brand names) for treatment. Provide the response in ${language}. Your entire response must be a single, valid JSON object with no extra text or markdown formatting.` }
        ]
      }
    ],
    config: {
      responseMimeType: "application/json",
    }
  });

  const parsedResponse = parseGeminiResponse<any>(response.text, {
    diseaseName: "Unknown",
    confidence: 0,
    severity: "Low",
    explanation: "Could not analyze image.",
    treatmentSteps: [],
    estimatedCostINR: 0,
    preventiveMeasures: [],
    suggestedProducts: []
  });
  // Ensure compatibility with the type definition
  return {
    ...parsedResponse,
    nextSteps: parsedResponse.treatmentSteps || [],
  };
};

export const identifyPestOrWeed = async (base64Image: string, language: string, analysisType: 'Pest' | 'Weed', mimeType: string = 'image/jpeg'): Promise<PestWeedIdentification> => {
  const genAI = getAI();
  const typeLower = analysisType.toLowerCase();
  
  const prompt = `Analyze this image to identify the ${typeLower}.
    Act as an elite agricultural scientist and perform high-level, end-to-end research. Use science and past history of the region's common threats to provide profoundly accurate results in ${language}. 
    Your response must be a single, valid JSON object with the following structure:
    1. 'name': The scientific or exact common name of the ${typeLower}.
    2. 'type': The string "${analysisType}".
    3. 'confidence': Your confidence level (0-100) in the identification.
    4. 'threatLevel': The threat level to common Indian crops. For pests, use 'Low', 'Medium', 'High', or 'Beneficial'. For weeds, use 'Low', 'Medium', or 'High'.
    5. 'description': A brief description of the ${typeLower} and the scientific damage or impact it causes.
    6. 'controlMethods': An array of objects, each with 'type' (e.g., 'Chemical', 'Organic', 'Mechanical') and a precise, scientifically-backed 'description' of the method.
    7. 'suggestedProducts': An array of 2-3 specific, commonly available and effective ${typeLower === 'pest' ? 'pesticide' : 'herbicide'} products in India, including 'name' and 'composition' (e.g., brand name and chemical).
    Ensure the entire output is only the JSON object, without any extra text or markdown formatting.`;

  const response = await genAI.models.generateContent({
    model: 'gemini-2.5-pro',
    contents: [
      {
        role: 'user',
        parts: [
            { inlineData: { data: base64Image, mimeType: mimeType } },
            { text: prompt }
        ]
      }
    ],
    config: {
      responseMimeType: "application/json",
    }
  });

  return parseGeminiResponse<PestWeedIdentification>(response.text, {
            name: "Unknown",
            type: analysisType,
            confidence: 0,
            threatLevel: "Low",
            description: "Could not identify.",
            controlMethods: [],
            suggestedProducts: []
        });
};


export interface MarketAnalysis {
    analysisText: string;
    priceTrend: { date: string; price: number }[];
    recommendation: string;
    sellVsStore: {
        decision: string;
        sellNowProfit: number;
        storeProfitProjections: {
            weeks: number;
            profit: number;
        }[];
    };
}

/**
 * Provides market analysis for a crop using Google Search grounding.
 * @param crop The crop name.
 * @param location The farmer's location.
 * @param language The language for the response.
 * @returns A promise that resolves to a MarketAnalysis object.
 */
export const getMarketAnalysis = async (
    crop: string, 
    location: string, 
    language: string,
    localPrice: number,
    totalStorageCost: number,
    season: string,
    spoilageRatePerWeek: number,
    harvestedQuantity: number
): Promise<MarketAnalysis> => {
    const genAI = getAI();
    const context = `
        Perform an accurate, high-level end-to-end scientific research analysis of the market for ${crop} in ${location}. 
        Use past history and deep agricultural economics to provide highly precise and actionable insights.
        The farmer's current situation:
        - Current local price: ₹${localPrice} per quintal
        - Harvested quantity: ${harvestedQuantity} quintals
        - Total storage cost for the entire ${season} season: ₹${totalStorageCost}
        - Weekly spoilage rate: ${spoilageRatePerWeek}%

        First, intelligently estimate the weekly storage cost based on the total seasonal cost, past inflation data, and the typical length of the ${season} season in India. Then, provide a single, valid JSON object in ${language} with:
        1. 'analysisText': A brief, deep-dive scientific and historical summary of market conditions for this crop in this specific location.
        2. 'priceTrend': An array of the last 4 weeks' prices (find absolute real historical data and scientific correlations if possible, otherwise simulate a profoundly realistic trend).
        3. 'recommendation': A final, robust agricultural economics-backed recommendation text.
        4. 'sellVsStore': An object containing:
            a. 'decision': A short string like "Sell Now" or "Store for 2 Weeks".
            b. 'sellNowProfit': The total profit if sold now (Revenue - Total Investment is not needed, just show Revenue).
            c. 'storeProfitProjections': An array with precise profit projections for storing for 1, 2, and 4 weeks. Each object should have 'weeks' and 'profit'. These profit projections must accurately account for your calculated weekly storage cost and scientific spoilage rate.
        
        Ensure your entire output is only the JSON object, adhering to the schema. Use Google Search to ensure the highest degree of accuracy possible.
    `;

    const config = {
         
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: {
            type: Type.OBJECT,
            properties: {
                analysisText: { type: Type.STRING },
                priceTrend: { 
                    type: Type.ARRAY, 
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            date: { type: Type.STRING },
                            price: { type: Type.NUMBER }
                        },
                        required: ['date', 'price']
                    }
                },
                recommendation: { type: Type.STRING },
                sellVsStore: {
                    type: Type.OBJECT,
                    properties: {
                        decision: { type: Type.STRING },
                        sellNowProfit: { type: Type.NUMBER },
                        storeProfitProjections: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    weeks: { type: Type.NUMBER },
                                    profit: { type: Type.NUMBER }
                                },
                                required: ['weeks', 'profit']
                            }
                        }
                    },
                    required: ['decision', 'sellNowProfit', 'storeProfitProjections']
                }
            },
            required: ['analysisText', 'priceTrend', 'recommendation', 'sellVsStore']
        }
    };

    try {
        const response = await genAI.models.generateContent({
            model: 'gemini-2.5-pro',
            contents: context,
            config
        });
        return parseGeminiResponse<MarketAnalysis>(response.text, {
                analysisText: "Market analysis unavailable.",
                priceTrend: [],
                recommendation: "Could not analyze market data.",
                sellVsStore: { decision: "Unknown", sellNowProfit: 0, storeProfitProjections: [] }
            });
    } catch (error) {
        console.warn("Market analysis with search failed, retrying without search...", error);
        const response = await genAI.models.generateContent({
            model: 'gemini-2.5-pro',
            contents: context + " (Note: If you cannot find real-time data, rely on profound scientific and historical knowledge to estimate the accurate market patterns)",
            config: { ...config, tools: [] }
        });
        return parseGeminiResponse<MarketAnalysis>(response.text, {
                analysisText: "Market analysis unavailable.",
                priceTrend: [],
                recommendation: "Could not analyze market data.",
                sellVsStore: { decision: "Unknown", sellNowProfit: 0, storeProfitProjections: [] }
        });
    }
};

export interface StrategicAdvice {
    debtPressure: {
        score: number; // 0-100
        level: 'Low' | 'Moderate' | 'High';
        summary: string;
    };
    rainFailure: {
        riskLevel: 'Low' | 'Moderate' | 'High';
        primaryStrategy: string;
        strategies: {
            title: string;
            description: string;
            pros: string[];
            cons: string[];
        }[];
    };
    cropSwitch: {
        currentCrop: {
            profit: number;
            waterRequirement: 'Low' | 'Moderate' | 'High';
            riskLevel: 'Low' | 'Moderate' | 'High';
        };
        suggestions: {
            cropName: string;
            estimatedProfit: number;
            waterRequirement: 'Low' | 'Moderate' | 'High';
            riskLevel: 'Low' | 'Moderate' | 'High';
            reason: string;
        }[];
    };
}

export const getStrategicAdvice = async (farmData: FarmData, language: string): Promise<StrategicAdvice> => {
    const genAI = getAI();
    const totalInvestment = (farmData.costs.seeds?.cost || 0) +
        (farmData.costs.fertilizers?.reduce((s, i) => s + i.cost, 0) || 0) +
        (farmData.costs.pesticides?.reduce((s, i) => s + i.cost, 0) || 0) +
        (farmData.costs.labor?.wages || 0) +
        (farmData.costs.machinery?.fuel || 0) +
        (farmData.costs.electricity || 0) +
        (farmData.costs.irrigation || 0) +
        (farmData.costs.storage || 0);
    
    const context = `
      Act as an elite agricultural expert and conduct a high-level, end-to-end scientific analysis of the following farm data for a farmer in ${farmData.farmDetails.location}. Utilize profound past history, soil science, and agro-economics to formulate the most accurate strategy possible.
      - Land Size: ${farmData.farmDetails.landSize} acres
      - Soil: ${farmData.farmDetails.soilType}
      - Crops: ${farmData.farmDetails.crops.join(', ')}
      - Season: ${farmData.farmDetails.season}
      - Water Source: ${farmData.farmDetails.waterSource}
      - Total Investment (INR): ${totalInvestment}
      
      Based on this deep scientific assessment, provide a detailed, professional-grade strategic analysis in ${language}.
      1.  **Debt Pressure:** Calculate an accurate score (0-100) based on investment vs. historically accurate average revenue for these exact crops in ${farmData.farmDetails.location}. Classify level as Low (0-40), Moderate (41-70), or High (71-100). Provide a brief, insightful, scientifically-backed summary.
      2.  **Rain Failure Risk:** Accurately assess the meteorological risk level (Low, Moderate, High) based on climate history for this region regarding the water source/crops. Suggest a primary mitigation strategy and then list 3 detailed, actionable, highly scientific strategies with titles, descriptions, pros, and cons.
      3.  **Crop Switch Opportunity:** 
          a. First, analyze the farmer's **current main crop (${farmData.farmDetails.crops[0]})** using agricultural economics and biological needs. Calculate its estimated profit, water requirement (Low, Moderate, High), and science-based risk level (Low, Moderate, High).
          b. Then, suggest 2 alternative crops scientifically proven to thrive in ${farmData.farmDetails.soilType} soil during the ${farmData.farmDetails.season} season in ${farmData.farmDetails.location}. For each, provide estimated profit, water requirement, risk level, and a well-reasoned explanation referencing verifiable market trends and agronomy.
      
      Your entire response must be a single, valid JSON object adhering to the provided schema, with no additional text or formatting.
    `;

    const response = await genAI.models.generateContent({
        model: 'gemini-2.5-pro',
        contents: context,
        config: {
             
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    debtPressure: {
                        type: Type.OBJECT,
                        properties: {
                            score: { type: Type.NUMBER },
                            level: { type: Type.STRING, enum: ['Low', 'Moderate', 'High'] },
                            summary: { type: Type.STRING }
                        },
                        required: ['score', 'level', 'summary']
                    },
                    rainFailure: {
                        type: Type.OBJECT,
                        properties: {
                            riskLevel: { type: Type.STRING, enum: ['Low', 'Moderate', 'High'] },
                            primaryStrategy: { type: Type.STRING },
                            strategies: {
                                type: Type.ARRAY,
                                items: {
                                    type: Type.OBJECT,
                                    properties: {
                                        title: { type: Type.STRING },
                                        description: { type: Type.STRING },
                                        pros: { type: Type.ARRAY, items: { type: Type.STRING } },
                                        cons: { type: Type.ARRAY, items: { type: Type.STRING } }
                                    },
                                    required: ['title', 'description', 'pros', 'cons']
                                }
                            }
                        },
                        required: ['riskLevel', 'primaryStrategy', 'strategies']
                    },
                    cropSwitch: {
                        type: Type.OBJECT,
                        properties: {
                            currentCrop: {
                                type: Type.OBJECT,
                                properties: {
                                    profit: { type: Type.NUMBER },
                                    waterRequirement: { type: Type.STRING, enum: ['Low', 'Moderate', 'High'] },
                                    riskLevel: { type: Type.STRING, enum: ['Low', 'Moderate', 'High'] },
                                },
                                required: ['profit', 'waterRequirement', 'riskLevel']
                            },
                            suggestions: {
                                type: Type.ARRAY,
                                items: {
                                    type: Type.OBJECT,
                                    properties: {
                                        cropName: { type: Type.STRING },
                                        estimatedProfit: { type: Type.NUMBER },
                                        waterRequirement: { type: Type.STRING, enum: ['Low', 'Moderate', 'High'] },
                                        riskLevel: { type: Type.STRING, enum: ['Low', 'Moderate', 'High'] },
                                        reason: { type: Type.STRING }
                                    },
                                    required: ['cropName', 'estimatedProfit', 'waterRequirement', 'riskLevel', 'reason']
                                }
                            }
                        },
                        required: ['currentCrop', 'suggestions']
                    }
                },
                required: ['debtPressure', 'rainFailure', 'cropSwitch']
            }
        }
    });

    // For backward compatibility with old property name in the component
    const parsed = parseGeminiResponse<any>(response.text, {
        debtPressure: { score: 0, level: 'Low', summary: "Data unavailable." },
        rainFailure: { riskLevel: 'Low', primaryStrategy: "N/A", strategies: [] },
        cropSwitch: { currentCrop: { profit: 0, waterRequirement: 'Low', riskLevel: 'Low' }, suggestions: [] }
    });
    if (parsed.cropSwitch && parsed.cropSwitch.currentCrop) {
        parsed.cropSwitch.currentCropProfit = parsed.cropSwitch.currentCrop.profit;
    }


    return parsed as StrategicAdvice;
};

export interface WeatherData {
    current: {
        temp: number;
        feels_like: number;
        humidity: number;
        wind_speed: number;
        description: string;
    };
    forecast: {
        day: string;
        temp_max: number;
        temp_min: number;
        description: string;
    }[];
    advisory: string;
}

export const getWeatherAnalysis = async (location: string, language: string): Promise<WeatherData> => {
    const genAI = getAI();
    const config = {
         
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: {
            type: Type.OBJECT,
            properties: {
                current: {
                    type: Type.OBJECT,
                    properties: {
                        temp: { type: Type.NUMBER },
                        feels_like: { type: Type.NUMBER },
                        humidity: { type: Type.NUMBER },
                        wind_speed: { type: Type.NUMBER },
                        description: { type: Type.STRING },
                    },
                    required: ['temp', 'feels_like', 'humidity', 'wind_speed', 'description']
                },
                forecast: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            day: { type: Type.STRING },
                            temp_max: { type: Type.NUMBER },
                            temp_min: { type: Type.NUMBER },
                            description: { type: Type.STRING },
                        },
                         required: ['day', 'temp_max', 'temp_min', 'description']
                    }
                },
                advisory: { type: Type.STRING }
            },
            required: ['current', 'forecast', 'advisory']
        }
    };

    try {
        const response = await genAI.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Get the current weather and a 7-day forecast for ${location}. Provide a single, valid JSON object with: 1) 'current' conditions (temp, feels_like, humidity, wind_speed, description). 2) a 'forecast' array for 7 days (day name, temp_max, temp_min, description). 3) an 'advisory' string with an actionable farming tip based on the forecast. Respond in ${language}. Ensure your entire output is only the JSON object.`,
            config
        });
        return parseGeminiResponse<WeatherData>(response.text, {
            current: { temp: 0, feels_like: 0, humidity: 0, wind_speed: 0, description: 'Unknown' },
            forecast: [],
            advisory: "Could not fetch advisory."
        });
    } catch (error) {
        console.warn("Weather analysis with search failed, retrying without search...", error);
        const response = await genAI.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Estimate the current weather and a 7-day forecast for ${location} based on typical seasonal patterns. Provide a single, valid JSON object with: 1) 'current' conditions (temp, feels_like, humidity, wind_speed, description). 2) a 'forecast' array for 7 days (day name, temp_max, temp_min, description). 3) an 'advisory' string with an actionable farming tip. Respond in ${language}. Ensure your entire output is only the JSON object.`,
            config: { ...config, tools: [] }
        });
        return parseGeminiResponse<WeatherData>(response.text, {
            current: { temp: 0, feels_like: 0, humidity: 0, wind_speed: 0, description: 'Unknown' },
            forecast: [],
            advisory: "Could not fetch advisory."
        });
    }
};

export interface WaterAdvice {
    weeklyUsage: number; // in liters
    nextIrrigation: string; // e.g., "In 3 days"
    tip: string;
}

export const getWaterManagementAdvice = async (farmData: FarmData, language: string): Promise<WaterAdvice> => {
    const genAI = getAI();
    const context = `
      Perform high-level, end-to-end scientific research to provide profound water management advice based on this farm data. Use historical evapotranspiration rates and soil hydrology.
      - Location: ${farmData.farmDetails.location}
      - Crop: ${farmData.farmDetails.crops[0]}
      - Soil Type: ${farmData.farmDetails.soilType}
      - Water Source: ${farmData.farmDetails.waterSource}
      - Land Size: ${farmData.farmDetails.landSize} acres
      
      Provide a single, valid JSON object with: 1) 'weeklyUsage' (highly accurate estimated total liters based on crop biology). 2) 'nextIrrigation' (a scientifically reasoned string like 'In 2 days' or 'Tomorrow'). 3) a 'tip' (a specific, actionable, meteorologically sound irrigation recommendation). Respond in ${language}. The entire response must be only the JSON object.
    `;
    const config = {
         
        tools: [{ googleSearch: {} }], // Use search to factor in recent weather
        responseMimeType: "application/json",
        responseSchema: {
            type: Type.OBJECT,
            properties: {
                weeklyUsage: { type: Type.NUMBER },
                nextIrrigation: { type: Type.STRING },
                tip: { type: Type.STRING },
            },
            required: ['weeklyUsage', 'nextIrrigation', 'tip']
        }
    };

    try {
        const response = await genAI.models.generateContent({
            model: 'gemini-2.5-pro',
            contents: context,
            config
        });
        return parseGeminiResponse<WaterAdvice>(response.text, {
            weeklyUsage: 0, nextIrrigation: "Unknown", tip: "Could not fetch water advice."
        });
    } catch (error) {
        console.warn("Water management advice with search failed, retrying without search...", error);
        const response = await genAI.models.generateContent({
            model: 'gemini-2.5-pro',
            contents: context,
            config: { ...config, tools: [] }
        });
        return parseGeminiResponse<WaterAdvice>(response.text, {
            weeklyUsage: 0, nextIrrigation: "Unknown", tip: "Could not fetch water advice."
        });
    }
};

/**
 * Converts latitude and longitude coordinates into a human-readable location string.
 * @param lat The latitude.
 * @param lon The longitude.
 * @returns A promise that resolves to a "District, State" string.
 */
export const reverseGeocode = async (lat: number, lon: number): Promise<string> => {
  const genAI = getAI();
  const response = await genAI.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: `Based on the coordinates latitude: ${lat} and longitude: ${lon}, provide the approximate District and State. Your response should be a single string in the format "District, State". Do not add any other text or explanation.`,
    config: {
       
    }
  });
  
  const text = response.text;
  if (!text) {
      throw new Error("Failed to reverse geocode coordinates.");
  }
  return text.trim();
};

export interface GovernmentSchemesInfo {
    centralSchemes: { name: string; description: string; link: string }[];
    stateSchemes: { name: string; description: string; link: string }[];
    msp: { crop: string; price: number; details: string };
    farmerRights: { name: string; description: string }[];
}

export const getGovernmentSchemes = async (location: string, crop: string, language: string): Promise<GovernmentSchemesInfo> => {
    const genAI = getAI();
    const prompt = `Using Google Search, conduct high-level end-to-end research to find profoundly accurate, historically up-to-date relevant information for a farmer in ${location}, India, who grows ${crop}. Validate against scientific and governmental truth. Provide a precise summary in ${language}. Your response must be a single, valid JSON object with the following structure:
        1. 'centralSchemes': An array of the absolutely top 3-4 central government schemes for farmers (include precise name, an accurate brief description leveraging historical context, and a 'link' to an official source).
        2. 'stateSchemes': An array of the top 2-3 most accurate state-specific schemes for farmers in ${location} (include name, deep description, and 'link').
        3. 'msp': An object with the exact, latest announced Minimum Support Price for ${crop}. Include 'crop' name, 'price' in INR per quintal, and a 'details' string about the recent scientific or historical announcement context.
        4. 'farmerRights': An array of 2-3 key scientific or legal farmer rights in India (e.g., Right to Soil Health Card), with a 'name' and a highly accurate brief 'description' for each.
        Ensure all information is exceptionally up-to-date and absolute factual accuracy is maintained.
        `;
    const config = {
         
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: {
            type: Type.OBJECT,
            properties: {
                centralSchemes: {
                    type: Type.ARRAY,
                    items: { type: Type.OBJECT, properties: { name: { type: Type.STRING }, description: { type: Type.STRING }, link: { type: Type.STRING } }, required: ['name', 'description', 'link'] }
                },
                stateSchemes: {
                    type: Type.ARRAY,
                    items: { type: Type.OBJECT, properties: { name: { type: Type.STRING }, description: { type: Type.STRING }, link: { type: Type.STRING } }, required: ['name', 'description', 'link'] }
                },
                msp: {
                    type: Type.OBJECT,
                    properties: { crop: { type: Type.STRING }, price: { type: Type.NUMBER }, details: { type: Type.STRING } },
                    required: ['crop', 'price', 'details']
                },
                farmerRights: {
                    type: Type.ARRAY,
                    items: { type: Type.OBJECT, properties: { name: { type: Type.STRING }, description: { type: Type.STRING } }, required: ['name', 'description'] }
                }
            },
            required: ['centralSchemes', 'stateSchemes', 'msp', 'farmerRights']
        }
    };

    try {
        const response = await genAI.models.generateContent({
            model: 'gemini-2.5-pro',
            contents: prompt,
            config
        });
        return parseGeminiResponse<GovernmentSchemesInfo>(response.text, {
            centralSchemes: [],
            stateSchemes: [],
            msp: { crop: crop, price: 0, details: "Not available" },
            farmerRights: []
        });
    } catch (error) {
        console.warn("Government schemes with search failed, retrying without search...", error);
        const response = await genAI.models.generateContent({
            model: 'gemini-2.5-pro',
            contents: prompt + " (Note: If you cannot find real-time data, utilize profound historical knowledge to extrapolate highly accurate general well-known schemes and MSP estimates.)",
            config: { ...config, tools: [] }
        });
        return parseGeminiResponse<GovernmentSchemesInfo>(response.text, {
            centralSchemes: [],
            stateSchemes: [],
            msp: { crop: crop, price: 0, details: "Not available" },
            farmerRights: []
        });
    }
};


export interface MarketPriceSuggestion {
    price: number;
    justification: string;
}

export const getMarketPriceSuggestion = async (crop: string, location: string, language: string): Promise<MarketPriceSuggestion> => {
    const genAI = getAI();
    const response = await genAI.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Using Google Search, find the current approximate market price (mandi price) in INR per quintal for ${crop} in the ${location} region of India. Provide your answer as a single, valid JSON object in ${language} with two keys: 'price' (a single number) and 'justification' (a brief text explaining the source or reason for this price, e.g., "Based on recent mandi prices in...").`,
        config: {
             
            tools: [{ googleSearch: {} }],
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    price: { type: Type.NUMBER },
                    justification: { type: Type.STRING }
                },
                required: ['price', 'justification']
            }
        }
    });

    return parseGeminiResponse<MarketPriceSuggestion>(response.text, {
        price: 0, justification: "Price data unavailable."
    });
};

/**
 * Generates a concise, encouraging daily briefing for the farmer.
 * @param farmData The farmer's data.
 * @param language The language for the response.
 * @returns A promise that resolves to a string.
 */
export const getDailyBriefing = async (farmData: FarmData, language: string): Promise<string> => {
    const genAI = getAI();
    const context = `
      Act as an elite agricultural scientist and formulate a highly accurate, brief daily briefing for a farmer in ${farmData.farmDetails.location}. Utilize past history and data-driven insights.
      - Farmer Name: ${farmData.farmDetails.farmerName}
      - Crops: ${farmData.farmDetails.crops.join(', ')}
      - Season: ${farmData.farmDetails.season}
      
      The briefing should be 2-3 sentences long, mentioning one precise scientific or historically-backed actionable insight (like a climatic trend or agronomic tip) relevant to their current crops and location. Use an encouraging, professional tone in ${language}.
    `;

    try {
        const response = await genAI.models.generateContent({
            model: 'gemini-2.5-pro',
            contents: context,
            config: {
                 
            }
        });
        return response.text || "Good morning! Your farm is looking good today. Stay focused on your irrigation schedule.";
    } catch (error) {
        console.error("Daily briefing failed:", error);
        return "Good morning! Wishing you a productive day on the farm.";
    }
};

/**
 * Handles a voice query from the farmer and provides a spoken response.
 * @param query The user's voice query.
 * @param farmData The farmer's data.
 * @param language The language for the response.
 * @returns A promise that resolves to a string.
 */
export const handleVoiceQuery = async (query: string, farmData: FarmData, language: string): Promise<string> => {
    const genAI = getAI();
    const context = `
      You are Krushi Mitra, an AI farming assistant. A farmer has asked you a question via voice: "${query}".
      
      Farmer's Context:
      - Name: ${farmData.farmDetails.farmerName}
      - Location: ${farmData.farmDetails.location}
      - Crops: ${farmData.farmDetails.crops.join(', ')}
      
      Provide a helpful, concise answer (max 2 sentences) in ${language}. Be direct and practical. If the query is about weather, market, or general advice, use your knowledge to help.
    `;

    try {
        const response = await genAI.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: context,
            config: {
                 
                tools: [{ googleSearch: {} }]
            }
        });
        return response.text || "I'm sorry, I couldn't process that. How else can I help you today?";
    } catch (error) {
        console.warn("Voice query with search failed, retrying without search...", error);
        try {
            const response = await genAI.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: context,
                config: {
                     
                    tools: []
                }
            });
            return response.text || "I'm sorry, I couldn't process that. How else can I help you today?";
        } catch (innerError) {
             console.error("Voice query failed completely:", innerError);
             return "I'm having trouble connecting right now. Please try again in a moment.";
        }
    }
};