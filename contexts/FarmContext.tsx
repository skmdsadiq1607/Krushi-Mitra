
import React, { createContext, useContext, useState, useEffect, ReactNode, PropsWithChildren } from 'react';

export interface Note {
    id: string;
    date: string;
    content: string;
}

export interface WaterLogEvent {
    date: string;
    duration: number; // in hours
}

// Defines the shape of all data the farmer will input
export interface FarmData {
  farmDetails: {
    farmerName: string;
    location: string;
    landSize: number;
    soilType: string;
    crops: string[];
    season: string;
    waterSource: string;
    irrigationMethod: string;
    machinery: string[];
  };
  costs: {
    seeds: { quantity: number; cost: number };
    fertilizers: { type: string; quantity: number; cost: number }[];
    pesticides: { type: string; quantity: number; cost: number }[];
    labor: { days: number; wages: number };
    machinery: { usage: number; fuel: number };
    electricity: number;
    irrigation: number;
    transport: number;
    storage: number;
  };
  storage: {
    crop: string;
    harvestedQuantity: number;
    storageType: string;
    capacity: number;
    spoilageRate: number; // Percentage per week
  };
  notes: Note[];
  waterLog: WaterLogEvent[];
}

interface FarmContextType {
  farmData: FarmData | null;
  isFarmSetupComplete: boolean;
  saveFarmSetup: (details: FarmData['farmDetails']) => void;
  updateCosts: (costs: Partial<FarmData['costs']>) => void;
  updateStorage: (storage: FarmData['storage']) => void;
  addNote: (content: string) => void;
  logIrrigationEvent: (event: WaterLogEvent) => void;
  resetFarm: () => void;
}

const FarmContext = createContext<FarmContextType | undefined>(undefined);

const initialFarmData: FarmData = {
    farmDetails: {
        farmerName: '',
        location: '',
        landSize: 0,
        soilType: '',
        crops: [],
        season: '',
        waterSource: '',
        irrigationMethod: '',
        machinery: [],
    },
    costs: {
        seeds: { quantity: 0, cost: 0 },
        fertilizers: [],
        pesticides: [],
        labor: { days: 0, wages: 0 },
        machinery: { usage: 0, fuel: 0 },
        electricity: 0,
        irrigation: 0,
        transport: 0,
        storage: 0,
    },
    storage: {
        crop: '',
        harvestedQuantity: 0,
        storageType: 'On-Farm',
        capacity: 0,
        spoilageRate: 1,
    },
    notes: [],
    waterLog: [],
};

export const FarmProvider = ({ children }: PropsWithChildren) => {
  const [farmData, setFarmData] = useState<FarmData | null>(null);
  const [isFarmSetupComplete, setIsFarmSetupComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const savedData = localStorage.getItem('krushi_mitra_farm_data');
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        // Deep merge to ensure all keys from initialFarmData are present, preventing crashes from old data structures.
        const mergedData = {
            ...initialFarmData,
            ...parsedData,
            farmDetails: {
                ...initialFarmData.farmDetails,
                ...(parsedData.farmDetails || {}),
            },
            costs: {
                ...initialFarmData.costs,
                ...(parsedData.costs || {}),
            },
            storage: {
                ...initialFarmData.storage,
                ...(parsedData.storage || {}),
            },
            notes: parsedData.notes || initialFarmData.notes,
            waterLog: parsedData.waterLog || initialFarmData.waterLog,
        };
        setFarmData(mergedData);

        if (mergedData.farmDetails.location && mergedData.farmDetails.landSize > 0) {
          setIsFarmSetupComplete(true);
        }
      } else {
        setFarmData(initialFarmData);
      }
    } catch (error) {
      console.error("Failed to load farm data from storage", error);
      setFarmData(initialFarmData);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const saveToStorage = (data: FarmData) => {
    localStorage.setItem('krushi_mitra_farm_data', JSON.stringify(data));
  };
  
  const saveFarmSetup = (details: FarmData['farmDetails']) => {
    const newData: FarmData = {
      ...(farmData || initialFarmData),
      farmDetails: details
    };
    setFarmData(newData);
    setIsFarmSetupComplete(true);
    saveToStorage(newData);
  };

  const updateCosts = (newCosts: Partial<FarmData['costs']>) => {
    if (!farmData) return;
    const updatedData = {
      ...farmData,
      costs: {
        ...farmData.costs,
        ...newCosts
      }
    };
    setFarmData(updatedData);
    saveToStorage(updatedData);
  };

  const updateStorage = (newStorage: FarmData['storage']) => {
    if (!farmData) return;
    const updatedData = { ...farmData, storage: newStorage };
    setFarmData(updatedData);
    saveToStorage(updatedData);
  };

  const addNote = (content: string) => {
    if (!farmData) return;
    const newNote: Note = {
      id: new Date().toISOString(),
      date: new Date().toLocaleDateString(),
      content: content,
    };
    const updatedData = { ...farmData, notes: [newNote, ...farmData.notes] };
    setFarmData(updatedData);
    saveToStorage(updatedData);
  };

  const logIrrigationEvent = (event: WaterLogEvent) => {
    if (!farmData) return;
    const updatedData = { ...farmData, waterLog: [event, ...farmData.waterLog] };
    setFarmData(updatedData);
    saveToStorage(updatedData);
  }

  const resetFarm = () => {
    localStorage.removeItem('krushi_mitra_farm_data');
    localStorage.removeItem('krushi_mitra_language');
    localStorage.removeItem('krushi_mitra_has_started');
    setFarmData(initialFarmData);
    setIsFarmSetupComplete(false);
    // Reloading is the most reliable way to reset the app state and show the landing page.
    window.location.reload();
  };

  if (isLoading) {
    return <div className="flex h-screen items-center justify-center bg-stone-50"><p>Loading Farm OS...</p></div>;
  }

  return (
    <FarmContext.Provider value={{ farmData, isFarmSetupComplete, saveFarmSetup, updateCosts, updateStorage, addNote, logIrrigationEvent, resetFarm }}>
      {children}
    </FarmContext.Provider>
  );
};

export const useFarm = () => {
  const context = useContext(FarmContext);
  if (context === undefined) {
    throw new Error('useFarm must be used within a FarmProvider');
  }
  return context;
};
