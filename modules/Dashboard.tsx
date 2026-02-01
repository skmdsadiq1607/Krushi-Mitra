
import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useFarm } from '../contexts/FarmContext';
import { useLocalization } from '../contexts/LocalizationContext';
import { useAutoSpeak } from '../hooks/useAutoSpeak';
import { useAI } from '../contexts/AIContext';
import { Card } from '../components/ui/Card';
import { Coins, GitBranch, Sprout, LandPlot, ArrowRight, AlertTriangle, Lightbulb, CloudSun, Droplets, RefreshCw } from 'lucide-react';
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
            className="space-y-12"
        >
            <p className="text-stone-500 font-medium -mt-4">{t('dashboardSubtitle')}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <Card className="bg-gradient-to-br from-emerald-50 to-green-50">
                    <p className="text-sm font-bold text-emerald-800">{t('kpiTotalInvestment')}</p>
                    <p className="text-4xl font-black text-emerald-700 mt-2">₹{kpis.totalInvestment.toLocaleString()}</p>
                </Card>
                 <Card className="bg-gradient-to-br from-amber-50 to-yellow-50">
                    <p className="text-sm font-bold text-amber-800">{t('kpiCostPerAcre')}</p>
                    <p className="text-4xl font-black text-amber-700 mt-2">₹{kpis.costPerAcre.toLocaleString(undefined, {maximumFractionDigits: 0})}</p>
                </Card>
                <Card className="bg-gradient-to-br from-sky-50 to-blue-50">
                    <p className="text-sm font-bold text-sky-800">{t('kpiCropCount')}</p>
                    <p className="text-4xl font-black text-sky-700 mt-2">{kpis.cropCount}</p>
                </Card>
                <Card className="bg-gradient-to-br from-violet-50 to-purple-50">
                    <p className="text-sm font-bold text-violet-800">{t('kpiLandSize')}</p>
                    <p className="text-4xl font-black text-violet-700 mt-2">{kpis.landSize} <span className="text-2xl">Acres</span></p>
                </Card>
            </div>

             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card title={t('weatherWidgetTitle')} icon={<CloudSun/>}>
                    <p className="text-stone-600 mb-4">Get the latest forecast and AI-powered weather advisories.</p>
                    <Link to="/weather-hub">
                        <Button variant="secondary">{t('viewDetails')}</Button>
                    </Link>
                </Card>
                <Card title={t('waterWidgetTitle')} icon={<Droplets/>}>
                    <p className="text-stone-600 mb-4">Access irrigation recommendations and log water usage.</p>
                     <Link to="/water-management">
                        <Button variant="secondary">{t('viewDetails')}</Button>
                    </Link>
                </Card>
            </div>


            <div>
                 <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center">
                        <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg mr-3"><Lightbulb/></div>
                        <h2 className="text-xl font-bold text-stone-800">{t('aiInsightsTitle')}</h2>
                    </div>
                    <button 
                        onClick={() => refresh()} 
                        disabled={isLoading}
                        className="flex items-center text-sm font-bold text-emerald-600 hover:text-emerald-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <RefreshCw size={16} className={`mr-2 ${isLoading ? 'animate-spin' : ''}`}/>
                        {isLoading ? 'Refreshing...' : 'Refresh Insights'}
                    </button>
                </div>
                <Card>
                    {isLoading && <p className="text-center font-bold text-stone-500">Loading AI Insights...</p>}
                    {error && <p className="text-center font-bold text-red-500">{error}</p>}
                    {advice && !isLoading && !error && (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="flex flex-col items-center justify-center text-center p-4 rounded-2xl bg-stone-50">
                                <h3 className="font-bold text-stone-700 mb-2">{t('debtPressureTitle')}</h3>
                                <DebtPressureIndicator score={advice.debtPressure.score} levelText={debtLevelText} />
                                <p className="text-xs text-stone-500 mt-2">{advice.debtPressure.summary}</p>
                            </div>

                            <div className="p-6 rounded-2xl bg-stone-50 flex flex-col">
                                <h3 className="font-bold text-stone-700 mb-2">{t('rainFailureTitle')}</h3>
                                <p className="text-3xl font-black text-sky-600">{advice.rainFailure.riskLevel}</p>
                                <p className="text-sm text-stone-600 mt-2 flex-1">{advice.rainFailure.primaryStrategy}</p>
                                <Link to="/strategic-advisor" className="mt-4 font-bold text-emerald-600 hover:text-emerald-700 self-start flex items-center">{t('viewStrategies')} <ArrowRight size={16} className="ml-1"/></Link>
                            </div>

                            <div className="p-6 rounded-2xl bg-stone-50 flex flex-col">
                                <h3 className="font-bold text-stone-700 mb-2">{t('cropSwitchTitle')}</h3>
                                <p className="text-3xl font-black text-lime-600">{advice.cropSwitch.suggestions[0]?.cropName || 'None'}</p>
                                <p className="text-sm text-stone-600 mt-2 flex-1">{advice.cropSwitch.suggestions[0]?.reason || 'Current crop is optimal.'}</p>
                                <Link to="/strategic-advisor" className="mt-4 font-bold text-emerald-600 hover:text-emerald-700 self-start flex items-center">{t('viewStrategies')} <ArrowRight size={16} className="ml-1"/></Link>
                            </div>
                        </div>
                    )}
                </Card>
            </div>

        </motion.div>
    );
};

export default Dashboard;
