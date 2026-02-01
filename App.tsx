
import React, { useState } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { FarmProvider, useFarm } from './contexts/FarmContext';
import { LocalizationProvider } from './contexts/LocalizationContext';
import { SpeechProvider } from './contexts/SpeechContext';
import { AIProvider } from './contexts/AIContext';

import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Landing from './modules/Landing';
import FarmSetup from './modules/FarmSetup';
import Dashboard from './modules/Dashboard';
import CostManager from './modules/CostManager';
import CropHealthScanner from './modules/CropHealthScanner';
import StorageManager from './modules/StorageManager';
import ProfitEngine from './modules/ProfitEngine';
import MarketIntelligence from './modules/MarketIntelligence';
import FarmNotebook from './modules/FarmNotebook';
import StrategicAdvisor from './modules/StrategicAdvisor';
import WeatherHub from './modules/WeatherHub';
import WaterManagement from './modules/WaterManagement';
import GovernmentSchemes from './modules/GovernmentSchemes';

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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [hasStarted, setHasStarted] = useState(localStorage.getItem('krushi_mitra_has_started') === 'true');

  const handleStart = () => {
    localStorage.setItem('krushi_mitra_has_started', 'true');
    setHasStarted(true);
  };

  if (!hasStarted) {
    return <Landing onStart={handleStart} />;
  }

  if (!isFarmSetupComplete) {
    return <FarmSetup />;
  }

  return (
    <HashRouter>
      <div className="flex min-h-screen font-sans selection:bg-emerald-100 selection:text-emerald-900 overflow-x-hidden">
        <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
        <main className="flex-1 lg:ml-72 min-w-0 flex flex-col relative">
          <Header setIsSidebarOpen={setIsSidebarOpen} />
          <div className="p-4 md:p-8 lg:p-12 max-w-[1500px] mx-auto w-full flex-1">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/strategic-advisor" element={<StrategicAdvisor />} />
              <Route path="/weather-hub" element={<WeatherHub />} />
              <Route path="/water-management" element={<WaterManagement />} />
              <Route path="/cost-manager" element={<CostManager />} />
              <Route path="/crop-health-scanner" element={<CropHealthScanner />} />
              <Route path="/storage-manager" element={<StorageManager />} />
              <Route path="/profit-engine" element={<ProfitEngine />} />
              <Route path="/market-intelligence" element={<MarketIntelligence />} />
              <Route path="/notebook" element={<FarmNotebook />} />
              <Route path="/schemes" element={<GovernmentSchemes />} />
            </Routes>
          </div>
          <Footer />
        </main>
      </div>
    </HashRouter>
  );
};

export default App;