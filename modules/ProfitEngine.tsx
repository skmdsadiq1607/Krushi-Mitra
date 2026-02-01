
import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';
import { useFarm } from '../contexts/FarmContext';
import { useLocalization } from '../contexts/LocalizationContext';
import { useSpeech } from '../contexts/SpeechContext';
import { useAutoSpeak } from '../hooks/useAutoSpeak';
import { getMarketPriceSuggestion } from '../lib/gemini';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { TrendingUp, Scale, CircleDollarSign, Sparkles } from 'lucide-react';

const ProfitEngine: React.FC = () => {
    const { farmData } = useFarm();
    const { t, language } = useLocalization();
    const { speak } = useSpeech();
    useAutoSpeak('speakProfitEngineIntro');

    const [yieldPerAcre, setYieldPerAcre] = useState('');
    const [pricePerQuintal, setPricePerQuintal] = useState('');
    const [priceSuggestion, setPriceSuggestion] = useState<{ price: number; justification: string } | null>(null);
    const [isSuggestingPrice, setIsSuggestingPrice] = useState(false);
    const [priceSuggestionError, setPriceSuggestionError] = useState<string | null>(null);


    const { totalInvestment, landSize, costBreakdown } = useMemo(() => {
        if (!farmData) return { totalInvestment: 0, landSize: 1, costBreakdown: [] };
        
        const { costs, farmDetails } = farmData;
        const seedsCost = costs.seeds?.cost || 0;
        const fertilizersCost = costs.fertilizers?.reduce((s, i) => s + i.cost, 0) || 0;
        const pesticidesCost = costs.pesticides?.reduce((s, i) => s + i.cost, 0) || 0;
        const laborCost = costs.labor?.wages || 0;
        const machineryCost = costs.machinery?.fuel || 0;
        const utilitiesCost = (costs.electricity || 0) + (costs.irrigation || 0) + (costs.transport || 0) + (costs.storage || 0);

        const breakdown = [
            { name: t('costCategorySeeds'), cost: seedsCost, fill: '#34d399' },
            { name: t('costCategoryFertilizers'), cost: fertilizersCost, fill: '#fbbf24' },
            { name: t('costCategoryPesticides'), cost: pesticidesCost, fill: '#f87171' },
            { name: t('costCategoryLabor'), cost: laborCost, fill: '#60a5fa' },
            { name: t('costCategoryMachinery'), cost: machineryCost, fill: '#c084fc' },
            { name: t('costCategoryUtilities'), cost: utilitiesCost, fill: '#9ca3af' },
        ].filter(item => item.cost > 0);

        const total = breakdown.reduce((sum, item) => sum + item.cost, 0);
        
        return { 
            totalInvestment: total, 
            landSize: farmDetails.landSize > 0 ? farmDetails.landSize : 1,
            costBreakdown: breakdown,
        };
    }, [farmData, t]);

    const handleGetPriceSuggestion = async () => {
        if (!farmData) return;
        setIsSuggestingPrice(true);
        setPriceSuggestion(null);
        setPriceSuggestionError(null);
        try {
            const crop = farmData.farmDetails.crops[0];
            const location = farmData.farmDetails.location;
            const suggestion = await getMarketPriceSuggestion(crop, location, language);
            setPriceSuggestion(suggestion);
            setPricePerQuintal(suggestion.price.toString());
        } catch (error) {
            console.error("Failed to get price suggestion:", error);
            if (error instanceof Error && (error.message.includes('429') || error.message.includes('RESOURCE_EXHAUSTED'))) {
                setPriceSuggestionError("API request limit exceeded. Please try again in a moment.");
            } else {
                setPriceSuggestionError("Could not fetch price suggestion.");
            }
        } finally {
            setIsSuggestingPrice(false);
        }
    };
    
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
        { name: t('profitEngineChartTitle'), Cost: totalInvestment, Revenue: analysis?.totalRevenue || 0 }
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
                            <div>
                                <Input 
                                    label={t('profitEnginePriceLabel')}
                                    placeholder={t('profitEnginePricePlaceholder')}
                                    type="number"
                                    value={pricePerQuintal}
                                    onChange={e => setPricePerQuintal(e.target.value)}
                                    icon={<CircleDollarSign/>}
                                    onFocus={() => speak('speakProfitPrice')}
                                />
                                <Button variant="secondary" onClick={handleGetPriceSuggestion} disabled={isSuggestingPrice} className="w-full mt-3 !py-3 !text-sm">
                                    <Sparkles size={16} className="mr-2"/>
                                    {isSuggestingPrice ? t('profitEngineAnalyzingPrice') : t('profitEngineGetPriceSuggestion')}
                                </Button>
                                {priceSuggestion && (
                                    <p className="text-xs text-stone-500 mt-2 p-2 bg-stone-100 rounded-md">{priceSuggestion.justification}</p>
                                )}
                                {priceSuggestionError && (
                                    <p className="text-xs text-red-500 mt-2 p-2 bg-red-50 rounded-md">{priceSuggestionError}</p>
                                )}
                            </div>
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
                         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
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
                                            <Legend />
                                            <Bar dataKey="Cost" fill="#f59e0b" />
                                            <Bar dataKey="Revenue" fill="#10b981" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </Card>
                             <Card title="Cost Breakdown">
                                <div style={{width: '100%', height: 300}}>
                                     <ResponsiveContainer>
                                        <BarChart data={costBreakdown} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                             <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis type="number" tickFormatter={(value) => `₹${Number(value/1000).toFixed(0)}k`} />
                                            <YAxis type="category" dataKey="name" width={100} />
                                            <Tooltip formatter={(value) => `₹${Number(value).toLocaleString()}`} />
                                            <Bar dataKey="cost" name="Cost" barSize={30} />
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