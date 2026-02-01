
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { FarmProvider, useFarm } from './contexts/FarmContext';
import { LocalizationProvider } from './contexts/LocalizationContext';
import { SpeechProvider } from './contexts/SpeechContext';
import { AIProvider } from './contexts/AIContext';

import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import FarmSetup from './modules/FarmSetup';
import Dashboard from './modules/Dashboard';
import CostManager from './modules/CostManager';
import DiseaseScanner from './modules/DiseaseScanner';
import StorageManager from './modules/StorageManager';
import ProfitEngine from './modules/ProfitEngine';
import MarketIntelligence from './modules/MarketIntelligence';
import FarmNotebook from './modules/FarmNotebook';
import StrategicAdvisor from './modules/StrategicAdvisor';
import WeatherHub from './modules/WeatherHub';
import WaterManagement from './modules/WaterManagement';

function App() {
  return (
    <LocalizationProvider>
      <SpeechProvider>
        <FarmProvider>
          <AIProvider>
            <Main />
          </AIProvider>
        </FarmProvider>
      </SpeechProvider>
    </LocalizationProvider>
  );
}

const Main: React.FC = () => {
  const { isFarmSetupComplete } = useFarm();

  if (!isFarmSetupComplete) {
    return <FarmSetup />;
  }

  return (
    <HashRouter>
      <div className="flex min-h-screen font-sans selection:bg-emerald-100 selection:text-emerald-900 overflow-x-hidden">
        <Sidebar />
        <main className="flex-1 lg:ml-72 min-w-0 flex flex-col relative">
          <Header />
          <div className="p-8 lg:p-12 max-w-[1500px] mx-auto w-full flex-1">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/strategic-advisor" element={<StrategicAdvisor />} />
              <Route path="/weather-hub" element={<WeatherHub />} />
              <Route path="/water-management" element={<WaterManagement />} />
              <Route path="/cost-manager" element={<CostManager />} />
              <Route path="/disease-scanner" element={<DiseaseScanner />} />
              <Route path="/storage-manager" element={<StorageManager />} />
              <Route path="/profit-engine" element={<ProfitEngine />} />
              <Route path="/market-intelligence" element={<MarketIntelligence />} />
              <Route path="/notebook" element={<FarmNotebook />} />
            </Routes>
          </div>
          <Footer />
        </main>
      </div>
    </HashRouter>
  );
};

export default App;