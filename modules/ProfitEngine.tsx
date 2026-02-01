
import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { useFarm } from '../contexts/FarmContext';
import { useLocalization } from '../contexts/LocalizationContext';
import { useSpeech } from '../contexts/SpeechContext';
import { useAutoSpeak } from '../hooks/useAutoSpeak';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { TrendingUp, Scale, CircleDollarSign } from 'lucide-react';

const ProfitEngine: React.FC = () => {
    const { farmData } = useFarm();
    const { t } = useLocalization();
    const { speak } = useSpeech();
    useAutoSpeak('speakProfitEngineIntro');

    const [yieldPerAcre, setYieldPerAcre] = useState('');
    const [pricePerQuintal, setPricePerQuintal] = useState('');

    const { totalInvestment, landSize } = useMemo(() => {
        if (!farmData) return { totalInvestment: 0, landSize: 1 };
        const { costs, farmDetails } = farmData;
        const total = (costs.seeds?.cost || 0) +
                      (costs.fertilizers?.reduce((s, i) => s + i.cost, 0) || 0) +
                      (costs.pesticides?.reduce((s, i) => s + i.cost, 0) || 0) +
                      (costs.labor?.wages || 0) +
                      (costs.machinery?.fuel || 0) +
                      (costs.electricity || 0) +
                      (costs.irrigation || 0) +
                      (costs.transport || 0) +
                      (costs.storage || 0);
        return { totalInvestment: total, landSize: farmDetails.landSize > 0 ? farmDetails.landSize : 1 };
    }, [farmData]);
    
    const analysis = useMemo(() => {
        const yieldNum = parseFloat(yieldPerAcre) || 0;
        const priceNum = parseFloat(pricePerQuintal) || 0;

        if (yieldNum === 0 || priceNum === 0) return null;

        const totalYield = yieldNum * landSize;
        const totalRevenue = totalYield * priceNum;
        const netProfit = totalRevenue - totalInvestment;
        const breakEvenYield = totalInvestment / priceNum; // total quintals needed
        const breakEvenYieldPerAcre = breakEvenYield / landSize;

        return {
            totalRevenue,
            netProfit,
            breakEvenYieldPerAcre,
        };
    }, [yieldPerAcre, pricePerQuintal, totalInvestment, landSize]);

    const chartData = [
        { name: 'Cost', value: totalInvestment, fill: '#f59e0b' },
        { name: 'Revenue', value: analysis?.totalRevenue || 0, fill: '#10b981' }
    ];

    return (
        <div className="max-w-7xl mx-auto space-y-8">
            <header>
                <h1 className="text-4xl font-black text-stone-900 tracking-tighter">{t('profitEngineTitle')}</h1>
                <p className="text-stone-500 font-medium mt-1">{t('profitEngineSubtitle')}</p>
            </header>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1 space-y-8">
                    <Card title={t('profitEngineInputs')} icon={<TrendingUp/>}>
                        <div className="space-y-4">
                            <Input 
                                label={t('profitEngineYieldLabel')}
                                placeholder={t('profitEngineYieldPlaceholder')}
                                type="number"
                                value={yieldPerAcre}
                                onChange={e => setYieldPerAcre(e.target.value)}
                                icon={<Scale/>}
                                onFocus={() => speak('speakProfitYield')}
                            />
                            <Input 
                                label={t('profitEnginePriceLabel')}
                                placeholder={t('profitEnginePricePlaceholder')}
                                type="number"
                                value={pricePerQuintal}
                                onChange={e => setPricePerQuintal(e.target.value)}
                                icon={<CircleDollarSign/>}
                                onFocus={() => speak('speakProfitPrice')}
                            />
                        </div>
                    </Card>
                    <Card>
                         <div className="text-center">
                            <p className="text-sm font-bold text-stone-500 mb-1">{t('costTotalInvestment')}</p>
                            <p className="text-4xl font-black text-stone-800 tracking-tighter">₹{totalInvestment.toLocaleString()}</p>
                        </div>
                    </Card>
                </div>

                <div className="lg:col-span-2">
                    {analysis ? (
                         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <Card title={t('profitEngineAnalysis')} icon={<TrendingUp/>}>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center mb-8">
                                    <div>
                                        <p className="text-sm font-bold text-stone-500">{t('profitEngineTotalRevenue')}</p>
                                        <p className="text-3xl font-black text-emerald-600 tracking-tighter">₹{analysis.totalRevenue.toLocaleString()}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-stone-500">{t('profitEngineNetProfit')}</p>
                                        <p className={`text-3xl font-black tracking-tighter ${analysis.netProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                            ₹{analysis.netProfit.toLocaleString()}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-stone-500">{t('profitEngineBreakEven')}</p>
                                        <p className="text-3xl font-black text-amber-600 tracking-tighter">{analysis.breakEvenYieldPerAcre.toFixed(2)}</p>
                                    </div>
                                </div>
                                <h3 className="text-center font-bold text-stone-700 mb-4">{t('profitEngineChartTitle')}</h3>
                                <div style={{width: '100%', height: 300}}>
                                    <ResponsiveContainer>
                                        <BarChart data={chartData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="name" />
                                            <YAxis width={80} tickFormatter={(value) => `₹${Number(value).toLocaleString()}`} />
                                            <Tooltip formatter={(value) => `₹${Number(value).toLocaleString()}`} />
                                            <Bar dataKey="value" barSize={60} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </Card>
                         </motion.div>
                    ) : (
                        <div className="flex items-center justify-center h-full bg-stone-50 rounded-2xl p-8">
                            <p className="text-stone-500 font-bold">Enter yield and price to see your profit analysis.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfitEngine;