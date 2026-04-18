
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
    <div className="min-h-screen bg-[#f5f5f0] flex flex-col justify-center items-center p-4 sm:p-6 lg:p-8 overflow-hidden relative">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-overlay" 
           style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/mandala.png")' }} />
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#FF9933]/30 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#138808]/20 rounded-full blur-[120px]" />

      <motion.main
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-6xl bg-white/70 backdrop-blur-xl rounded-[4rem] shadow-2xl border border-white/80 p-8 sm:p-20 text-center relative z-10"
      >
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="inline-flex items-center gap-2 px-6 py-2 bg-[#FF9933]/10 rounded-full mb-10 border border-[#FF9933]/20 shadow-sm"
        >
          <Leaf className="w-4 h-4 text-[#138808]" />
          <span className="text-[#9A3412] text-xs font-bold uppercase tracking-[0.2em]">{t('appName')} · India</span>
        </motion.div>
        
        <h1 className="text-6xl sm:text-8xl lg:text-9xl font-serif font-medium text-[#166534] tracking-tighter leading-[0.85] mb-8 drop-shadow-sm">
          {t('appName')}
        </h1>
        
        <p className="text-[#ea580c] font-serif italic text-2xl sm:text-3xl max-w-3xl mx-auto mb-16 opacity-90 leading-relaxed drop-shadow-sm">
          {t('landingSubtitle')}
        </p>

        <div className="grid md:grid-cols-2 gap-12 text-left my-20">
          <motion.div 
            whileHover={{ y: -8, scale: 1.02 }}
            className="bg-white/90 p-10 rounded-[3rem] border border-orange-100 shadow-[0_10px_40px_-10px_rgba(234,88,12,0.15)] transition-all"
          >
            <div className="w-16 h-16 bg-orange-50 rounded-3xl flex items-center justify-center mb-8 shadow-inner border border-orange-100">
              <Target className="w-8 h-8 text-[#ea580c]" />
            </div>
            <h2 className="text-3xl font-serif font-bold text-stone-800 mb-4">{t('landingVisionTitle')}</h2>
            <p className="text-stone-600 text-lg leading-relaxed">{t('landingVisionText')}</p>
          </motion.div>
          
          <motion.div 
            whileHover={{ y: -8, scale: 1.02 }}
            className="bg-white/90 p-10 rounded-[3rem] border border-green-100 shadow-[0_10px_40px_-10px_rgba(22,101,52,0.1)] transition-all"
          >
            <div className="w-16 h-16 bg-green-50 rounded-3xl flex items-center justify-center mb-8 shadow-inner border border-green-100">
              <Zap className="w-8 h-8 text-[#166534]" />
            </div>
            <h2 className="text-3xl font-serif font-bold text-stone-800 mb-4">{t('landingMissionTitle')}</h2>
            <p className="text-stone-600 text-lg leading-relaxed">{t('landingMissionText')}</p>
          </motion.div>
        </div>

        <div className="bg-gradient-to-br from-[#166534]/5 to-[#ea580c]/5 p-12 sm:p-20 rounded-[4rem] border border-stone-200/50 text-left mb-20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#ea580c]/10 rounded-full blur-3xl -mr-32 -mt-32" />
          <h2 className="text-4xl font-serif font-bold text-[#166534] text-center mb-12 drop-shadow-sm">{t('landingHowItWorksTitle')}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-[#166534]">
            {[
              { icon: <TrendingUp className="w-6 h-6" />, text: t('landingFeature1'), color: "bg-[#166534]" },
              { icon: <ShieldCheck className="w-6 h-6" />, text: t('landingFeature2'), color: "bg-[#ea580c]" },
              { icon: <Leaf className="w-6 h-6" />, text: t('landingFeature3'), color: "bg-[#166534]" },
              { icon: <Target className="w-6 h-6" />, text: t('landingFeature4'), color: "bg-[#ea580c]" }
            ].map((feature, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-6 bg-white/80 backdrop-blur-sm p-6 rounded-3xl border border-stone-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className={`p-3 ${feature.color} text-white rounded-2xl shadow-md`}>
                  {feature.icon}
                </div>
                <span className="text-xl font-bold tracking-tight text-stone-800">{feature.text}</span>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center gap-8">
          <Button 
            onClick={onStart} 
            className="bg-gradient-to-r from-[#ea580c] to-[#FF9933] hover:from-[#c2410c] hover:to-[#ea580c] text-white px-16 py-10 text-2xl rounded-full shadow-2xl shadow-orange-500/30 transition-all hover:scale-105 active:scale-95 group border-0"
          >
            <span className="flex items-center gap-3">
              {t('landingStartButton')}
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                →
              </motion.span>
            </span>
          </Button>
          <div className="flex flex-col items-center gap-2">
            <p className="text-stone-400 text-sm font-medium uppercase tracking-[0.3em]">
              Empowering Farmers with Intelligence
            </p>
            <div className="w-12 h-1 bg-stone-200 rounded-full" />
          </div>
        </div>
      </motion.main>
      <div className="mt-12 opacity-50">
        <Footer />
      </div>
    </div>
  );
};

export default Landing;
