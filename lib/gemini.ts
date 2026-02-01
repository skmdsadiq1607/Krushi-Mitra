
import { GoogleGenAI, Type } from "@google/genai";
import { DiseaseDetection, PestWeedIdentification } from "../types";
import { FarmData } from '../contexts/FarmContext';

let ai: GoogleGenAI;

/**
 * Lazily initializes and returns a singleton instance of the GoogleGenAI client.
 * Throws a specific error if the API key is not configured.
 * @returns The initialized GoogleGenAI instance.
 */
function getAI(): GoogleGenAI {
    if (!process.env.API_KEY) {
        // This specific error message will be caught by UI error boundaries.
        throw new Error("Gemini API key is not configured. Please set the API_KEY environment variable in your deployment settings.");
    }
    if (!ai) {
        ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
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
const parseGeminiResponse = <T>(responseText: string | undefined): T => {
    if (!responseText) {
        throw new Error("Received empty response from API.");
    }
    
    // Clean the string: remove markdown backticks and trim whitespace
    let cleanedText = responseText.trim();
    if (cleanedText.startsWith('```json')) {
        cleanedText = cleanedText.substring(7); // Remove ```json
        if (cleanedText.endsWith('```')) {
            cleanedText = cleanedText.slice(0, -3); // Remove ```
        }
    }
    cleanedText = cleanedText.trim();

    try {
        return JSON.parse(cleanedText) as T;
    } catch (error) {
        console.error("Failed to parse JSON:", cleanedText);
        // Re-throw a more informative error for debugging
        if (error instanceof Error) {
            throw new Error(`JSON Parse Error: ${error.message}. Original text: ${cleanedText.substring(0, 150)}...`);
        }
        throw new Error("An unknown JSON parsing error occurred.");
    }
};


/**
 * Analyzes a base64 encoded image of a crop to detect diseases.
 * @param base64Image The base64 encoded string of the crop image.
 * @param language The language for the response (e.g., 'en', 'te', 'hi', 'ur').
 * @returns A promise that resolves to a DiseaseDetection object.
 */
export const detectDisease = async (base64Image: string, language: string): Promise<DiseaseDetection> => {
  const genAI = getAI();
  const response = await genAI.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: {
      parts: [
        { inlineData: { data: base64Image, mimeType: 'image/jpeg' } },
        { text: `Analyze this crop image. Identify the disease, your confidence level (0-100), severity (Low, Medium, High), a simple explanation for the farmer, step-by-step treatment options, the estimated cost in local currency (INR), and preventive measures. Crucially, suggest 2-3 specific, commonly available pesticide or fungicide products in India (including chemical composition and popular brand names if possible) for treatment. Provide the response in ${language}. Your entire response must be a single, valid JSON object with no extra text or markdown formatting.` }
      ]
    },
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          diseaseName: { type: Type.STRING },
          confidence: { type: Type.NUMBER },
          severity: { type: Type.STRING, enum: ['Low', 'Medium', 'High'] },
          explanation: { type: Type.STRING },
          treatmentSteps: { type: Type.ARRAY, items: { type: Type.STRING } },
          estimatedCostINR: { type: Type.NUMBER },
          preventiveMeasures: { type: Type.ARRAY, items: { type: Type.STRING } },
          suggestedProducts: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    name: { type: Type.STRING },
                    composition: { type: Type.STRING }
                },
                required: ['name', 'composition']
            }
          }
        },
        required: ['diseaseName', 'confidence', 'severity', 'explanation', 'treatmentSteps', 'estimatedCostINR', 'preventiveMeasures', 'suggestedProducts']
      }
    }
  });
  
  const parsedResponse = parseGeminiResponse<any>(response.text);
  // Ensure compatibility with the type definition
  return {
    ...parsedResponse,
    nextSteps: parsedResponse.treatmentSteps || [],
  };
};

export const identifyPestOrWeed = async (base64Image: string, language: string, analysisType: 'Pest' | 'Weed'): Promise<PestWeedIdentification> => {
  const genAI = getAI();
  const typeLower = analysisType.toLowerCase();
  
  const prompt = `Analyze this image to identify the ${typeLower}.
    Provide a detailed analysis in ${language}. Your response must be a single, valid JSON object with the following structure:
    1. 'name': The scientific or common name of the ${typeLower}.
    2. 'type': The string "${analysisType}".
    3. 'confidence': Your confidence level (0-100) in the identification.
    4. 'threatLevel': The threat level to common Indian crops. For pests, use 'Low', 'Medium', 'High', or 'Beneficial'. For weeds, use 'Low', 'Medium', or 'High'.
    5. 'description': A brief description of the ${typeLower} and the damage or impact it causes.
    6. 'controlMethods': An array of objects, each with 'type' (e.g., 'Chemical', 'Organic', 'Mechanical') and a 'description' of the method.
    7. 'suggestedProducts': An array of 2-3 specific, commonly available ${typeLower === 'pest' ? 'pesticide' : 'herbicide'} products in India, including 'name' and 'composition' (e.g., brand name and chemical).
    Ensure the entire output is only the JSON object, without any extra text or markdown formatting.`;

  const response = await genAI.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: {
        parts: [
            { inlineData: { data: base64Image, mimeType: 'image/jpeg' } },
            { text: prompt }
        ]
    },
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          type: { type: Type.STRING, enum: ['Pest', 'Weed'] },
          confidence: { type: Type.NUMBER },
          threatLevel: { type: Type.STRING, enum: ['Low', 'Medium', 'High', 'Beneficial'] },
          description: { type: Type.STRING },
          controlMethods: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                type: { type: Type.STRING, enum: ['Chemical', 'Organic', 'Biological', 'Mechanical'] },
                description: { type: Type.STRING }
              },
              required: ['type', 'description']
            }
          },
          suggestedProducts: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                composition: { type: Type.STRING }
              },
              required: ['name', 'composition']
            }
          }
        },
        required: ['name', 'type', 'confidence', 'threatLevel', 'description', 'controlMethods', 'suggestedProducts']
      }
    }
  });

  return parseGeminiResponse<PestWeedIdentification>(response.text);
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
        Analyze the market for ${crop} in ${location}. 
        The farmer's current situation:
        - Current local price: ₹${localPrice} per quintal
        - Harvested quantity: ${harvestedQuantity} quintals
        - Total storage cost for the entire ${season} season: ₹${totalStorageCost}
        - Weekly spoilage rate: ${spoilageRatePerWeek}%

        First, intelligently estimate the weekly storage cost based on the total seasonal cost and the typical length of the ${season} season in India. Then, provide a single, valid JSON object in ${language} with:
        1. 'analysisText': A brief summary of market conditions.
        2. 'priceTrend': An array of the last 4 weeks' prices (find real historical data if possible, otherwise simulate a realistic trend).
        3. 'recommendation': A final, clear recommendation text.
        4. 'sellVsStore': An object containing:
            a. 'decision': A short string like "Sell Now" or "Store for 2 Weeks".
            b. 'sellNowProfit': The total profit if sold now (Revenue - Total Investment is not needed, just show Revenue).
            c. 'storeProfitProjections': An array with profit projections for storing for 1, 2, and 4 weeks. Each object should have 'weeks' and 'profit'. These profit projections should account for your calculated weekly storage cost and spoilage.
        
        Ensure your entire output is only the JSON object, adhering to the schema. Use Google Search for the most current data.
    `;

    const response = await genAI.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: context,
        config: {
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
        }
    });

    return parseGeminiResponse<MarketAnalysis>(response.text);
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
      Analyze the following farm data for a farmer in ${farmData.farmDetails.location}.
      - Land Size: ${farmData.farmDetails.landSize} acres
      - Soil: ${farmData.farmDetails.soilType}
      - Crops: ${farmData.farmDetails.crops.join(', ')}
      - Season: ${farmData.farmDetails.season}
      - Water Source: ${farmData.farmDetails.waterSource}
      - Total Investment (INR): ${totalInvestment}
      
      Based on this, provide a detailed, professional-grade strategic analysis in ${language}.
      1.  **Debt Pressure:** Calculate a score (0-100) based on investment vs. typical revenue for these crops. Classify level as Low (0-40), Moderate (41-70), or High (71-100). Provide a brief, insightful summary.
      2.  **Rain Failure Risk:** Assess the risk level (Low, Moderate, High) based on water source and crops. Suggest a primary strategy and then list 3 detailed, actionable strategies with titles, descriptions, pros, and cons.
      3.  **Crop Switch Opportunity:** 
          a. First, analyze the farmer's **current main crop (${farmData.farmDetails.crops[0]})**. Calculate its estimated profit, water requirement (Low, Moderate, High), and risk level (Low, Moderate, High).
          b. Then, suggest 2 alternative crops suitable for the conditions. For each, provide estimated profit, water requirement, risk level, and a well-reasoned explanation referencing market trends or soil suitability.
      
      Your entire response must be a single, valid JSON object adhering to the provided schema, with no additional text or formatting.
    `;

    const response = await genAI.models.generateContent({
        model: 'gemini-3-flash-preview',
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
    const parsed = parseGeminiResponse<any>(response.text);
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
    const response = await genAI.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Get the current weather and a 7-day forecast for ${location}. Provide a single, valid JSON object with: 1) 'current' conditions (temp, feels_like, humidity, wind_speed, description). 2) a 'forecast' array for 7 days (day name, temp_max, temp_min, description). 3) an 'advisory' string with an actionable farming tip based on the forecast. Respond in ${language}. Ensure your entire output is only the JSON object.`,
        config: {
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
        }
    });

    return parseGeminiResponse<WeatherData>(response.text);
};

export interface WaterAdvice {
    weeklyUsage: number; // in liters
    nextIrrigation: string; // e.g., "In 3 days"
    tip: string;
}

export const getWaterManagementAdvice = async (farmData: FarmData, language: string): Promise<WaterAdvice> => {
    const genAI = getAI();
    const context = `
      Based on this farm data, provide water management advice.
      - Location: ${farmData.farmDetails.location}
      - Crop: ${farmData.farmDetails.crops[0]}
      - Soil Type: ${farmData.farmDetails.soilType}
      - Water Source: ${farmData.farmDetails.waterSource}
      - Land Size: ${farmData.farmDetails.landSize} acres
      
      Provide a single, valid JSON object with: 1) 'weeklyUsage' (estimated total liters). 2) 'nextIrrigation' (a string like 'In 2 days' or 'Tomorrow'). 3) a 'tip' (a specific, actionable irrigation recommendation). Respond in ${language}. The entire response must be only the JSON object.
    `;
    const response = await genAI.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: context,
        config: {
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
        }
    });

    return parseGeminiResponse<WaterAdvice>(response.text);
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
    model: 'gemini-3-flash-preview',
    contents: `Based on the coordinates latitude: ${lat} and longitude: ${lon}, provide the approximate District and State. Your response should be a single string in the format "District, State". Do not add any other text or explanation.`,
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
    const response = await genAI.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Using Google Search, find relevant information for a farmer in ${location}, India, who grows ${crop}. Provide a concise summary in ${language}. Your response must be a single, valid JSON object with the following structure:
        1. 'centralSchemes': An array of the top 3-4 central government schemes for farmers (include name, a brief description, and a 'link' to an official source).
        2. 'stateSchemes': An array of the top 2-3 state-specific schemes for farmers in ${location} (include name, description, and 'link').
        3. 'msp': An object with the latest announced Minimum Support Price for ${crop}. Include 'crop' name, 'price' in INR per quintal, and a 'details' string about the recent announcement.
        4. 'farmerRights': An array of 2-3 key farmer rights in India (e.g., Right to Soil Health Card), with a 'name' and a brief 'description' for each.
        Ensure all information is up-to-date and links are valid.
        `,
        config: {
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
        }
    });

    return parseGeminiResponse<GovernmentSchemesInfo>(response.text);
};


export interface MarketPriceSuggestion {
    price: number;
    justification: string;
}

export const getMarketPriceSuggestion = async (crop: string, location: string, language: string): Promise<MarketPriceSuggestion> => {
    const genAI = getAI();
    const response = await genAI.models.generateContent({
        model: 'gemini-3-flash-preview',
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

    return parseGeminiResponse<MarketPriceSuggestion>(response.text);
};