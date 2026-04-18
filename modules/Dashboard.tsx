
import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useFarm } from '../contexts/FarmContext';
import { useLocalization } from '../contexts/LocalizationContext';
import { useAutoSpeak } from '../hooks/useAutoSpeak';
import { useAI } from '../contexts/AIContext';
import { Card } from '../components/ui/Card';
import { Coins, GitBranch, Sprout, LandPlot, ArrowRight, AlertTriangle, Lightbulb, CloudSun, Droplets, RefreshCw, Sparkles } from 'lucide-react';
import { Button } from '../components/ui/Button';

const DebtPressureIndicator = ({ score, levelText }: { score: number; levelText: string }) => {
    const levelColor = score > 70 ? 'text-red-500' : score > 40 ? 'text-amber-500' : 'text-emerald-500';

    return (
        <div className="relative flex flex-col items-center justify-center">
            <svg className="w-48 h-24" viewBox="0 0 100 50">
                <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="#e5e7eb" strokeWidth="10" />
                <path
                    d="M 10 50 A 40 40 0 0 1 90 50"
                    fill="none"
                    stroke="url(#gradient)"
                    strokeWidth="10"
                    strokeDasharray={`${(score / 100) * 125.6} 125.6`}
                    strokeLinecap="round"
                />
                <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#10b981" />
                        <stop offset="50%" stopColor="#f59e0b" />
                        <stop offset="100%" stopColor="#ef4444" />
                    </linearGradient>
                </defs>
            </svg>
            <div className="absolute bottom-0 text-center">
                 <span className={`text-3xl font-black tracking-tighter ${levelColor}`}>{levelText}</span>
            </div>
        </div>
    );
};


const Dashboard: React.FC = () => {
    const { farmData } = useFarm();
    const { t } = useLocalization();
    useAutoSpeak('speakDashboardIntro');
    const { strategicAdvice: advice, isLoading, error, refresh } = useAI();

    const kpis = useMemo(() => {
        if (!farmData) return { totalInvestment: 0, costPerAcre: 0, cropCount: 0, landSize: 0 };

        const { costs, farmDetails } = farmData;
        const totalInvestment = (costs.seeds?.cost || 0) +
                                (costs.fertilizers?.reduce((s, i) => s + i.cost, 0) || 0) +
                                (costs.pesticides?.reduce((s, i) => s + i.cost, 0) || 0) +
                                (costs.labor?.wages || 0) +
                                (costs.machinery?.fuel || 0) +
                                (costs.electricity || 0) +
                                (costs.irrigation || 0) +
                                (costs.transport || 0) +
                                (costs.storage || 0);
        
        const landSize = farmDetails.landSize > 0 ? farmDetails.landSize : 1;
        const costPerAcre = totalInvestment / landSize;

        return {
            totalInvestment,
            costPerAcre,
            cropCount: farmDetails.crops.length,
            landSize: farmDetails.landSize,
        };
    }, [farmData]);

    const greeting = useMemo(() => {
        const hour = new Date().getHours();
        if (hour < 12) return t('greetingMorning') || "Good Morning";
        if (hour < 18) return t('greetingAfternoon') || "Good Afternoon";
        return t('greetingEvening') || "Good Evening";
    }, [t]);

    const debtLevelText = useMemo(() => {
        if (!advice) return '';
        const level = advice.debtPressure.level;
        if (level === 'High') return t('debtPressureHigh');
        if (level === 'Moderate') return t('debtPressureModerate');
        return t('debtPressureLow');
    }, [advice, t]);
    
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-12 pb-12"
        >
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 tracking-tight">
                        {greeting}, {farmData?.farmDetails.farmerName || 'Farmer'}!
                    </h1>
                    <p className="text-[#5A5A40] font-serif italic text-lg mt-1">{t('dashboardSubtitle')}</p>
                </div>
                <div className="flex items-center gap-2 bg-white/50 p-2 rounded-2xl border border-stone-200/50">
                    <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-bold text-stone-500 uppercase tracking-widest">{t('headerStatusText')}</span>
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="bg-white border-stone-200/60 shadow-sm hover:shadow-md transition-shadow rounded-[2rem] p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl"><Coins size={20}/></div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-stone-400">Financials</span>
                    </div>
                    <p className="text-sm font-bold text-stone-500">{t('kpiTotalInvestment')}</p>
                    <p className="text-3xl font-black text-stone-900 mt-1">₹{kpis.totalInvestment.toLocaleString()}</p>
                </Card>
                 <Card className="bg-white border-stone-200/60 shadow-sm hover:shadow-md transition-shadow rounded-[2rem] p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-2 bg-amber-50 text-amber-600 rounded-xl"><Sprout size={20}/></div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-stone-400">Efficiency</span>
                    </div>
                    <p className="text-sm font-bold text-stone-500">{t('kpiCostPerAcre')}</p>
                    <p className="text-3xl font-black text-stone-900 mt-1">₹{kpis.costPerAcre.toLocaleString(undefined, {maximumFractionDigits: 0})}</p>
                </Card>
                <Card className="bg-white border-stone-200/60 shadow-sm hover:shadow-md transition-shadow rounded-[2rem] p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-2 bg-sky-50 text-sky-600 rounded-xl"><GitBranch size={20}/></div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-stone-400">Diversity</span>
                    </div>
                    <p className="text-sm font-bold text-stone-500">{t('kpiCropCount')}</p>
                    <p className="text-3xl font-black text-stone-900 mt-1">{kpis.cropCount}</p>
                </Card>
                <Card className="bg-white border-stone-200/60 shadow-sm hover:shadow-md transition-shadow rounded-[2rem] p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-2 bg-violet-50 text-violet-600 rounded-xl"><LandPlot size={20}/></div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-stone-400">Scale</span>
                    </div>
                    <p className="text-sm font-bold text-stone-500">{t('kpiLandSize')}</p>
                    <p className="text-3xl font-black text-stone-900 mt-1">{kpis.landSize} <span className="text-xl font-medium text-stone-400">Acres</span></p>
                </Card>
            </div>

            <section>
                <h2 className="text-2xl font-serif font-bold text-stone-800 mb-6 flex items-center gap-2">
                    <ArrowRight size={20} className="text-[#5A5A40]" />
                    {t('quickAccess')}
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                    {[
                        { to: '/cost-manager', icon: Coins, label: t('navCostManager'), color: 'bg-emerald-50 text-emerald-600' },
                        { to: '/crop-health-scanner', icon: Sprout, label: t('navCropHealthScanner'), color: 'bg-rose-50 text-rose-600' },
                        { to: '/market-intelligence', icon: Coins, label: t('navMarketIntel'), color: 'bg-amber-50 text-amber-600' },
                        { to: '/storage-manager', icon: LandPlot, label: t('navStorageManager'), color: 'bg-sky-50 text-sky-600' },
                        { to: '/profit-engine', icon: Coins, label: t('navProfitEngine'), color: 'bg-violet-50 text-violet-600' },
                        { to: '/notebook', icon: GitBranch, label: t('navNotebook'), color: 'bg-stone-50 text-stone-600' },
                        { to: '/schemes', icon: Lightbulb, label: t('navGovtSchemes'), color: 'bg-indigo-50 text-indigo-600' },
                    ].map((item, i) => (
                        <Link key={i} to={item.to}>
                            <motion.div 
                                whileHover={{ y: -4 }}
                                className="bg-white border border-stone-200/60 p-4 rounded-2xl flex flex-col items-center text-center gap-3 shadow-sm hover:shadow-md transition-all"
                            >
                                <div className={`p-3 rounded-xl ${item.color}`}>
                                    <item.icon size={20} />
                                </div>
                                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-600 leading-tight">
                                    {item.label}
                                </span>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </section>

             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="rounded-[2.5rem] p-8 bg-white border-stone-200/60 shadow-sm overflow-hidden relative group">
                    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform">
                        <CloudSun size={120} />
                    </div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 bg-sky-100 text-sky-600 rounded-2xl"><CloudSun size={24}/></div>
                            <h2 className="text-2xl font-serif font-bold text-stone-800">{t('weatherWidgetTitle')}</h2>
                        </div>
                        <p className="text-stone-600 mb-8 max-w-md leading-relaxed">Get the latest forecast and AI-powered weather advisories tailored for your location.</p>
                        <Link to="/weather-hub">
                            <Button className="bg-stone-900 hover:bg-black text-white rounded-full px-8">{t('viewDetails')}</Button>
                        </Link>
                    </div>
                </Card>
                <Card className="rounded-[2.5rem] p-8 bg-white border-stone-200/60 shadow-sm overflow-hidden relative group">
                    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform">
                        <Droplets size={120} />
                    </div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 bg-blue-100 text-blue-600 rounded-2xl"><Droplets size={24}/></div>
                            <h2 className="text-2xl font-serif font-bold text-stone-800">{t('waterWidgetTitle')}</h2>
                        </div>
                        <p className="text-stone-600 mb-8 max-w-md leading-relaxed">Access irrigation recommendations and log water usage to optimize your resources.</p>
                         <Link to="/water-management">
                            <Button className="bg-stone-900 hover:bg-black text-white rounded-full px-8">{t('viewDetails')}</Button>
                        </Link>
                    </div>
                </Card>
            </div>


            <div className="relative">
                 <div className="flex justify-between items-center mb-8">
                    <div className="flex items-center">
                        <div className="p-3 bg-emerald-600 text-white rounded-2xl mr-4 shadow-lg shadow-emerald-600/20"><Sparkles size={24}/></div>
                        <div>
                            <h2 className="text-3xl font-serif font-bold text-stone-800">{t('commandCenter')}</h2>
                            <p className="text-sm text-emerald-600 font-serif italic opacity-70">{t('aiInsightsTitle')}</p>
                        </div>
                    </div>
                    <button 
                        onClick={() => refresh()} 
                        disabled={isLoading}
                        className="flex items-center px-4 py-2 bg-white border border-stone-200 rounded-full text-sm font-bold text-stone-600 hover:bg-stone-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
                    >
                        <RefreshCw size={16} className={`mr-2 ${isLoading ? 'animate-spin' : ''}`}/>
                        {isLoading ? 'Refreshing...' : 'Refresh'}
                    </button>
                </div>
                
                <div className="bg-white border border-stone-200/60 rounded-[3rem] p-8 shadow-sm">
                    {isLoading && (
                        <div className="py-20 flex flex-col items-center justify-center space-y-4">
                            <div className="w-12 h-12 border-4 border-[#5A5A40]/20 border-t-[#5A5A40] rounded-full animate-spin" />
                            <p className="font-serif italic text-stone-500">Consulting Gemini AI for your farm...</p>
                        </div>
                    )}
                    {error && (
                        <div className="py-12 px-6 bg-red-50 rounded-[2rem] border border-red-100 text-center">
                            <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                            <p className="font-bold text-red-800 mb-2">AI Insights Unavailable</p>
                            <p className="text-red-600 text-sm max-w-md mx-auto">{error}</p>
                            <Button onClick={() => refresh()} className="mt-6 bg-red-600 hover:bg-red-700 text-white rounded-full">Try Again</Button>
                        </div>
                    )}
                    {advice && !isLoading && !error && (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                            <div className="flex flex-col items-center justify-center text-center p-8 rounded-[2.5rem] bg-[#f5f5f0]/50 border border-stone-200/30">
                                <h3 className="font-serif font-bold text-stone-800 text-xl mb-6">{t('debtPressureTitle')}</h3>
                                <DebtPressureIndicator score={advice.debtPressure.score} levelText={debtLevelText} />
                                <p className="text-sm text-stone-600 mt-6 leading-relaxed italic">"{advice.debtPressure.summary}"</p>
                            </div>

                            <div className="p-8 rounded-[2.5rem] bg-[#f5f5f0]/50 border border-stone-200/30 flex flex-col">
                                <span className="text-[10px] font-black uppercase tracking-widest text-stone-400 mb-2">Climate Risk</span>
                                <h3 className="font-serif font-bold text-stone-800 text-xl mb-4">{t('rainFailureTitle')}</h3>
                                <div className="inline-flex px-4 py-1 bg-sky-100 text-sky-700 rounded-full text-xs font-black uppercase tracking-wider self-start mb-4">
                                    {advice.rainFailure.riskLevel} Risk
                                </div>
                                <p className="text-sm text-stone-600 leading-relaxed flex-1">{advice.rainFailure.primaryStrategy}</p>
                                <Link to="/strategic-advisor" className="mt-6 group inline-flex items-center text-sm font-bold text-[#5A5A40] hover:text-stone-900 transition-colors">
                                    {t('viewStrategies')} 
                                    <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform"/>
                                </Link>
                            </div>

                            <div className="p-8 rounded-[2.5rem] bg-[#f5f5f0]/50 border border-stone-200/30 flex flex-col">
                                <span className="text-[10px] font-black uppercase tracking-widest text-stone-400 mb-2">Opportunity</span>
                                <h3 className="font-serif font-bold text-stone-800 text-xl mb-4">{t('cropSwitchTitle')}</h3>
                                <div className="inline-flex px-4 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-black uppercase tracking-wider self-start mb-4">
                                    Recommended
                                </div>
                                <p className="text-xl font-bold text-stone-900 mb-2">{advice.cropSwitch.suggestions[0]?.cropName || 'None'}</p>
                                <p className="text-sm text-stone-600 leading-relaxed flex-1 italic">"{advice.cropSwitch.suggestions[0]?.reason || 'Current crop is optimal.'}"</p>
                                <Link to="/strategic-advisor" className="mt-6 group inline-flex items-center text-sm font-bold text-[#5A5A40] hover:text-stone-900 transition-colors">
                                    {t('viewStrategies')} 
                                    <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform"/>
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>

        </motion.div>
    );
};

export default Dashboard;
