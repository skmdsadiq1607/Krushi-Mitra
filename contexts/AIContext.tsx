
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

    // Use refs to hold the latest data without causing re-renders of the callback itself.
    // This is key to preventing the fetch-on-every-update bug.
    const farmDataRef = useRef(farmData);
    useEffect(() => {
        farmDataRef.current = farmData;
    }, [farmData]);

    const languageRef = useRef(language);
    useEffect(() => {
        languageRef.current = language;
    }, [language]);

    // This callback is now stable and won't be recreated on every farmData change.
    const fetchData = useCallback(async () => {
        const currentFarmData = farmDataRef.current;
        const currentLanguage = languageRef.current;

        if (!currentFarmData || !currentFarmData.farmDetails.location) {
            setState(s => ({ ...s, isLoading: false, strategicAdvice: null, weatherData: null, waterAdvice: null }));
            return;
        }

        setState(s => ({ ...s, isLoading: true, error: null }));

        try {
            const [advice, weather, water] = await Promise.all([
                getStrategicAdvice(currentFarmData, currentLanguage),
                getWeatherAnalysis(currentFarmData.farmDetails.location, currentLanguage),
                getWaterManagementAdvice(currentFarmData, currentLanguage)
            ]);
            
            setState({
                strategicAdvice: advice,
                weatherData: weather,
                waterAdvice: water,
                isLoading: false,
                error: null,
            });

        } catch (error) {
            console.error("Failed to fetch AI data", error);
            if (error instanceof Error && (error.message.includes('429') || error.message.includes('RESOURCE_EXHAUSTED'))) {
                 setState(s => ({ ...s, isLoading: false, error: "You have exceeded your API request limit. Please check your plan and billing details, or try again later." }));
            } else {
                 setState(s => ({ ...s, isLoading: false, error: "An error occurred while fetching AI insights." }));
            }
        }
    }, []); // Empty dependency array makes this function stable.

    // This effect runs only when farmData is first loaded, triggering the initial fetch.
    useEffect(() => {
        if (farmData) {
            fetchData();
        }
    }, [farmData, fetchData]);

    // This effect runs ONLY when the language changes.
    useEffect(() => {
        // We check farmData to ensure we don't fetch on language change before the app is ready.
        if (farmData) {
            fetchData();
        }
    }, [language, fetchData]); // We can add farmData here because the above effect handles the initial load

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
