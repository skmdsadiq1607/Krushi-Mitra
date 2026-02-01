
import React from 'react';
import { Globe, Volume2, VolumeX } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLocalization } from '../../contexts/LocalizationContext';
import { useSpeech } from '../../contexts/SpeechContext';
import { useFarm } from '../../contexts/FarmContext';

const Header: React.FC = () => {
  const { language, setLanguage } = useLocalization();
  const { isMuted, toggleMute } = useSpeech();
  const { farmData } = useFarm();

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between px-8 py-5 bg-white/80 backdrop-blur-xl border-b border-stone-200 no-print">
      <div className="hidden lg:flex items-center space-x-3">
        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
        <h2 className="text-sm font-bold text-stone-600">
          {farmData?.farmDetails.location || 'Farm OS'}
        </h2>
      </div>
      <div className="flex items-center space-x-4">
        <motion.div
          className="relative"
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
          className="p-4 bg-white border border-stone-200 rounded-2xl text-stone-600 hover:bg-stone-50 transition-colors"
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
