
import React from 'react';
import { Globe, Volume2, VolumeX, Menu } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLocalization } from '../../contexts/LocalizationContext';
import { useSpeech } from '../../contexts/SpeechContext';
import { useFarm } from '../../contexts/FarmContext';

interface HeaderProps {
  setIsSidebarOpen: (isOpen: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ setIsSidebarOpen }) => {
  const { language, setLanguage, t } = useLocalization();
  const { isMuted, toggleMute } = useSpeech();
  const { farmData } = useFarm();

  const farmerName = farmData?.farmDetails.farmerName?.split(' ')[0] || '';

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between px-4 md:px-8 py-4 bg-white/80 backdrop-blur-xl border-b border-stone-200 no-print">
      <div className="flex items-center space-x-3">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="lg:hidden p-2 -ml-2 text-stone-600"
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6" />
        </button>
        <h1 className="text-lg md:text-xl font-bold text-stone-800 truncate">
          {t('dashboardWelcome', { name: farmerName })}
        </h1>
      </div>
      <div className="flex items-center space-x-2 md:space-x-4">
        <motion.div
          className="relative hidden sm:block" // Hide language switcher on very small screens
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 400, damping: 15 }}
        >
          <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400 pointer-events-none" />
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as 'en' | 'te' | 'hi' | 'ur')}
            className="pl-11 pr-5 py-3 bg-white border border-stone-200 rounded-2xl font-bold text-stone-700 text-sm appearance-none focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
            aria-label="Select language"
          >
            <option value="en">English</option>
            <option value="te">తెలుగు</option>
            <option value="hi">हिंदी</option>
            <option value="ur">اردو</option>
          </select>
        </motion.div>
        <motion.button
          onClick={toggleMute}
          className="p-3 md:p-4 bg-white border border-stone-200 rounded-2xl text-stone-600 hover:bg-stone-50 transition-colors"
          aria-label={isMuted ? 'Unmute voice' : 'Mute voice'}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        >
          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </motion.button>
      </div>
    </header>
  );
};

export default Header;
