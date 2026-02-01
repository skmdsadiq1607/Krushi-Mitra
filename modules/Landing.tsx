
import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Target, Zap, TrendingUp, ShieldCheck } from 'lucide-react';
import { Button } from '../components/ui/Button';
import Footer from '../components/layout/Footer';
import { useLocalization } from '../contexts/LocalizationContext';

interface LandingProps {
  onStart: () => void;
}

const Landing: React.FC<LandingProps> = ({ onStart }) => {
  const { t } = useLocalization();

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col justify-center items-center p-4 sm:p-6 lg:p-8">
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="w-full max-w-4xl bg-white rounded-[3rem] shadow-2xl border border-stone-200 p-8 sm:p-12 text-center"
      >
        <div className="inline-flex p-4 bg-emerald-100 rounded-3xl mb-6">
          <Leaf className="w-12 h-12 text-emerald-600" />
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-stone-900 tracking-tighter">{t('appName')}</h1>
        <p className="text-stone-500 font-medium mt-4 max-w-2xl mx-auto text-base sm:text-lg">
          {t('landingSubtitle')}
        </p>

        <div className="grid md:grid-cols-2 gap-8 text-left my-12">
          <div className="bg-stone-50 p-6 rounded-2xl border">
            <Target className="w-8 h-8 text-emerald-600 mb-3" />
            <h2 className="text-xl font-bold text-stone-800">{t('landingVisionTitle')}</h2>
            <p className="text-stone-600 mt-2">{t('landingVisionText')}</p>
          </div>
          <div className="bg-stone-50 p-6 rounded-2xl border">
            <Zap className="w-8 h-8 text-emerald-600 mb-3" />
            <h2 className="text-xl font-bold text-stone-800">{t('landingMissionTitle')}</h2>
            <p className="text-stone-600 mt-2">{t('landingMissionText')}</p>
          </div>
        </div>

        <div className="bg-emerald-50 p-8 rounded-3xl border border-emerald-200 text-left">
          <h2 className="text-2xl font-bold text-emerald-900 text-center mb-6">{t('landingHowItWorksTitle')}</h2>
          <p className="text-emerald-800 text-center mb-6 max-w-3xl mx-auto">
            {t('landingHowItWorksSubtitle')}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-emerald-900">
            <div className="flex items-center gap-3"><TrendingUp className="w-5 h-5 shrink-0" />
              <span className="font-bold">{t('landingFeature1')}</span>
            </div>
            <div className="flex items-center gap-3"><ShieldCheck className="w-5 h-5 shrink-0" />
              <span className="font-bold">{t('landingFeature2')}</span>
            </div>
            <div className="flex items-center gap-3"><Leaf className="w-5 h-5 shrink-0" />
              <span className="font-bold">{t('landingFeature3')}</span>
            </div>
            <div className="flex items-center gap-3"><Target className="w-5 h-5 shrink-0" />
              <span className="font-bold">{t('landingFeature4')}</span>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <Button onClick={onStart} className="max-w-xs mx-auto">
            {t('landingStartButton')}
          </Button>
        </div>
      </motion.main>
      <Footer />
    </div>
  );
};

export default Landing;
