
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, LayoutGroup, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, Leaf, Coins, Camera, Package, TrendingUp, Globe, BookOpen, Lightbulb, CloudSun, Droplets, ArchiveRestore, X, ScrollText
} from 'lucide-react';
import { useLocalization } from '../../contexts/LocalizationContext';
import { useFarm } from '../../contexts/FarmContext';

interface SidebarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const location = useLocation();
  const { t } = useLocalization();
  const { resetFarm } = useFarm();

  const NAV_ITEMS = [
    { id: 'dashboard', label: t('navDashboard'), icon: <LayoutDashboard className="w-5 h-5" />, path: '/dashboard' },
    { id: 'advisor', label: t('navStrategicAdvisor'), icon: <Lightbulb className="w-5 h-5" />, path: '/strategic-advisor' },
    { id: 'schemes', label: t('navGovtSchemes'), icon: <ScrollText className="w-5 h-5" />, path: '/schemes' },
    { id: 'weather', label: t('navWeatherHub'), icon: <CloudSun className="w-5 h-5" />, path: '/weather-hub' },
    { id: 'water', label: t('navWaterManage'), icon: <Droplets className="w-5 h-5" />, path: '/water-management' },
    { id: 'cost', label: t('navCostManager'), icon: <Coins className="w-5 h-5" />, path: '/cost-manager' },
    { id: 'cropHealth', label: t('navCropHealthScanner'), icon: <Camera className="w-5 h-5" />, path: '/crop-health-scanner' },
    { id: 'storage', label: t('navStorageManager'), icon: <Package className="w-5 h-5" />, path: '/storage-manager' },
    { id: 'profit', label: t('navProfitEngine'), icon: <TrendingUp className="w-5 h-5" />, path: '/profit-engine' },
    { id: 'market', label: t('navMarketIntel'), icon: <Globe className="w-5 h-5" />, path: '/market-intelligence' },
    { id: 'notebook', label: t('navNotebook'), icon: <BookOpen className="w-5 h-5" />, path: '/notebook' },
  ];
  
  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset your farm profile? All your data will be permanently deleted and you will return to the setup screen.")) {
      resetFarm();
    }
  };

  const SidebarContent = () => (
    <aside className="fixed inset-y-0 left-0 w-72 bg-gradient-to-b from-emerald-950 to-stone-900 text-white z-50 border-r border-white/5 shadow-2xl flex flex-col no-print">
      <div className="p-8 flex items-center justify-between">
        <div className='flex items-center space-x-3'>
            <div className="bg-emerald-500 p-2.5 rounded-2xl shadow-lg shadow-emerald-500/20">
              <Leaf className="w-6 h-6 text-emerald-950" />
            </div>
            <span className="text-2xl font-black tracking-tighter">{t('appName')}</span>
        </div>
         <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden p-2 text-stone-400 hover:text-white">
          <X size={24} />
        </button>
      </div>

      <nav className="flex-1 mt-4 px-4 space-y-1.5 overflow-y-auto custom-scrollbar">
        <LayoutGroup>
          {NAV_ITEMS.map((item) => {
            const isActive = location.pathname.startsWith(item.path);
            return (
              <motion.div
                key={item.id}
                whileHover={!isActive ? { x: 3, scale: 1.01 } : {}}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="rounded-[1.2rem]"
              >
                <Link
                  to={item.path}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`relative flex items-center space-x-3 px-5 py-4 rounded-[1.2rem] transition-colors duration-200 group z-10 w-full ${
                    isActive ? 'text-white' : 'text-stone-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-emerald-500/20 border border-emerald-500/10 rounded-[1.2rem] shadow-lg shadow-black/20"
                      style={{ borderRadius: '1.2rem' }}
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                  <span className={`relative z-10 ${isActive ? 'text-emerald-400' : 'text-emerald-600/60 group-hover:text-emerald-400'} transition-colors`}>
                    {item.icon}
                  </span>
                  <span className="relative z-10 font-bold text-sm tracking-tight">{item.label}</span>
                </Link>
              </motion.div>
            );
          })}
        </LayoutGroup>
      </nav>

      <div className="p-6 border-t border-white/5 bg-stone-900/50">
        <div className="bg-emerald-900/40 p-4 rounded-2xl border border-white/5 flex items-center justify-between mb-4">
            <div className="min-w-0">
              <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400 leading-none mb-1">{t('headerStatus')}</p>
              <p className="text-xs font-bold truncate">{t('headerStatusText')}</p>
            </div>
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
        </div>
        <button
          onClick={handleReset}
          className="w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-2xl text-stone-400 hover:bg-white/5 hover:text-red-400 transition-colors"
          aria-label="Reset Farm Profile"
        >
          <ArchiveRestore className="w-4 h-4" />
          <span className="text-sm font-bold">Reset Farm Profile</span>
        </button>
      </div>
    </aside>
  );

  return (
    <>
      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              aria-hidden="true"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="lg:hidden"
            >
              <SidebarContent />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <SidebarContent />
      </div>
    </>
  );
};

export default Sidebar;