
import React, { createContext, useContext, useState, useEffect, PropsWithChildren, useCallback, useRef } from 'react';
import { useFarm } from './FarmContext';
import { useLocalization } from './LocalizationContext';
import { 
    getStrategicAdvice, 
    StrategicAdvice, 
    getWeatherAnalysis, 
    WeatherData, 
    getWaterManagementAdvice, 
    WaterAdvice 
} from '../lib/gemini';

interface AIContextState {
    strategicAdvice: StrategicAdvice | null;
    weatherData: WeatherData | null;
    waterAdvice: WaterAdvice | null;
    isLoading: boolean;
    error: string | null;
}

interface AIContextType extends AIContextState {
    refresh: () => void;
}

const AIContext = createContext<AIContextType | undefined>(undefined);

export const AIProvider = ({ children }: PropsWithChildren) => {
    const [state, setState] = useState<AIContextState>({
        strategicAdvice: null,
        weatherData: null,
        waterAdvice: null,
        isLoading: true,
        error: null,
    });
    
    const { farmData } = useFarm();
    const { language } = useLocalization();

    const farmDataRef = useRef(farmData);
    useEffect(() => {
        farmDataRef.current = farmData;
    }, [farmData]);

    const languageRef = useRef(language);
    useEffect(() => {
        languageRef.current = language;
    }, [language]);

    const fetchData = useCallback(async () => {
        const currentFarmData = farmDataRef.current;
        const currentLanguage = languageRef.current;

        if (!currentFarmData || !currentFarmData.farmDetails.location) {
            setState(s => ({ ...s, isLoading: false, strategicAdvice: null, weatherData: null, waterAdvice: null }));
            return;
        }

        setState(s => ({ ...s, isLoading: true, error: null }));

        try {
            const advicePromise = getStrategicAdvice(currentFarmData, currentLanguage);
            const weatherPromise = getWeatherAnalysis(currentFarmData.farmDetails.location, currentLanguage);
            const waterPromise = getWaterManagementAdvice(currentFarmData, currentLanguage);

            const [adviceResult, weatherResult, waterResult] = await Promise.allSettled([
                advicePromise,
                weatherPromise,
                waterPromise
            ]);

            setState({
                strategicAdvice: adviceResult.status === 'fulfilled' ? adviceResult.value : null,
                weatherData: weatherResult.status === 'fulfilled' ? weatherResult.value : null,
                waterAdvice: waterResult.status === 'fulfilled' ? waterResult.value : null,
                isLoading: false,
                error: (adviceResult.status === 'rejected' && weatherResult.status === 'rejected' && waterResult.status === 'rejected') 
                    ? "Failed to load AI insights. Please try again." 
                    : null,
            });

            // Log rejections for debugging
            if (adviceResult.status === 'rejected') console.error("Strategic Advice failed:", adviceResult.reason);
            if (weatherResult.status === 'rejected') console.error("Weather Analysis failed:", weatherResult.reason);
            if (waterResult.status === 'rejected') console.error("Water Advice failed:", waterResult.reason);

        } catch (error) {
            console.error("Failed to fetch AI data", error);
            if (error instanceof Error && (error.message.includes('429') || error.message.includes('RESOURCE_EXHAUSTED'))) {
                 setState(s => ({ ...s, isLoading: false, error: "You have exceeded your API request limit. Please check your plan and billing details, or try again later." }));
            } else {
                 setState(s => ({ ...s, isLoading: false, error: "An error occurred while fetching AI insights." }));
            }
        }
    }, []);

    // Effect for data load. Runs when farmData or language changes.
    useEffect(() => {
        if (farmData && farmData.farmDetails.location) {
            fetchData();
        }
    }, [farmData?.farmDetails.location, language, fetchData]);


    const refresh = () => {
        fetchData();
    };

    return (
        <AIContext.Provider value={{ ...state, refresh }}>
            {children}
        </AIContext.Provider>
    );
};

export const useAI = () => {
    const context = useContext(AIContext);
    if (context === undefined) {
        throw new Error('useAI must be used within an AIProvider');
    }
    return context;
};