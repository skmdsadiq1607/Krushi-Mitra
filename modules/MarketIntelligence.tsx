
import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useFarm } from '../contexts/FarmContext';
import { useLocalization } from '../contexts/LocalizationContext';
import { useSpeech } from '../contexts/SpeechContext';
import { useAutoSpeak } from '../hooks/useAutoSpeak';
import { getMarketAnalysis, MarketAnalysis } from '../lib/gemini';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Globe, BrainCircuit, AlertTriangle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const MarketIntelligence: React.FC = () => {
    const { farmData } = useFarm();
    const { t, language } = useLocalization();
    const { speak } = useSpeech();
    useAutoSpeak('speakMarketIntelIntro');
    
    const [localPrice, setLocalPrice] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string|null>(null);
    const [analysis, setAnalysis] = useState<MarketAnalysis|null>(null);

    const { crop, location, totalStorageCost, season, spoilageRatePerWeek, harvestedQuantity } = useMemo(() => {
        if (!farmData) return { crop: '', location: '', totalStorageCost: 0, season: '', spoilageRatePerWeek: 0, harvestedQuantity: 0 };
        
        return { 
            crop: farmData.farmDetails?.crops?.[0] || 'your crop',
            location: farmData.farmDetails?.location || '',
            totalStorageCost: farmData.costs?.storage || 0,
            season: farmData.farmDetails?.season || 'Kharif',
            spoilageRatePerWeek: (farmData.storage?.spoilageRate || 0),
            harvestedQuantity: farmData.storage?.harvestedQuantity || 0 
        };
    }, [farmData]);

    const handleAnalyze = async () => {
        setError(null);
        if (!crop || !location || crop === 'your crop') {
             setError("Please set your primary crop in the farm setup.");
             return;
        };
        const priceNum = parseFloat(localPrice) || 0;
        if (priceNum <= 0) {
            setError("Please enter a valid local price.");
            return;
        }
        if (harvestedQuantity <= 0) {
            setError("Please enter your harvested quantity in the Storage Manager first.");
            return;
        }

        setIsLoading(true);
        try {
            const result = await getMarketAnalysis(
                crop, 
                location, 
                language,
                priceNum,
                totalStorageCost,
                season,
                spoilageRatePerWeek,
                harvestedQuantity
            );
            setAnalysis(result);
            speak('speakAnalysisComplete');
        } catch (e) {
            setError(t('marketIntelError'));
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    };

    if (!farmData) return null;

    return (
        <div className="max-w-7xl mx-auto space-y-8">
            <header>
                <h1 className="text-4xl font-black text-stone-900 tracking-tighter">{t('marketIntelTitle')}</h1>
                <p className="text-stone-500 font-medium mt-1">{t('marketIntelSubtitle')}</p>
            </header>

            <Card>
                <div className="flex flex-col md:flex-row gap-4 items-end">
                    <div className="flex-1 w-full">
                        <Input 
                            label={t('marketIntelLocalPriceLabel')}
                            placeholder={t('marketIntelLocalPricePlaceholder')}
                            type="number"
                            value={localPrice}
                            onChange={e => setLocalPrice(e.target.value)}
                            onFocus={() => speak('speakMarketPrice')}
                        />
                    </div>
                    <Button onClick={handleAnalyze} disabled={isLoading || !localPrice} className="w-full md:w-auto" onFocus={() => speak('speakGetMarketAdviceBtn')}>
                        {isLoading ? t('marketIntelAnalyzing') : t('marketIntelGetAnalysis')}
                    </Button>
                </div>
            </Card>
            
            {error && <div className="text-center p-8 font-bold text-red-600 flex items-center justify-center gap-2"><AlertTriangle/>{error}</div>}

            {analysis && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                    <Card title={t('marketIntelAnalysisTitle')} icon={<BrainCircuit/>}>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2 space-y-4">
                                <h3 className="font-bold text-stone-700">{t('marketIntelPriceTrend')} for {crop}</h3>
                                <div style={{width: '100%', height: 250}}>
                                    <ResponsiveContainer>
                                        <LineChart data={analysis.priceTrend} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="date" />
                                            <YAxis width={60} tickFormatter={(value) => `₹${value}`} />
                                            <Tooltip formatter={(value) => `₹${Number(value).toLocaleString()}`} />
                                            <Line type="monotone" dataKey="price" stroke="#10b981" strokeWidth={3} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                                <p className="text-stone-600 text-sm">{analysis.analysisText}</p>
                            </div>
                            <div className="lg:col-span-1 bg-stone-50 p-6 rounded-2xl">
                                <h3 className="font-bold text-stone-700 mb-3">{t('marketIntelSellVsStore')}</h3>
                                <table className="w-full text-sm">
                                    <tbody>
                                        <tr className="border-b">
                                            <td className="py-2 font-bold">{t('marketIntelSellNow')}</td>
                                            <td className="py-2 text-right font-bold text-emerald-600">₹{analysis.sellVsStore.sellNowProfit.toLocaleString(undefined, {maximumFractionDigits:0})}</td>
                                        </tr>
                                        {analysis.sellVsStore.storeProfitProjections.map(item => (
                                             <tr key={item.weeks} className="border-b">
                                                <td className="py-2">{t('marketIntelStoreFor')} {item.weeks} {t('marketIntelWeeks')}</td>
                                                <td className="py-2 text-right">₹{item.profit.toLocaleString(undefined, {maximumFractionDigits:0})}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </Card>
                    <Card className="bg-emerald-50 border-emerald-200">
                        <h3 className="font-bold text-lg text-emerald-800 mb-2">{t('marketIntelRecommendation')}</h3>
                        <div className="flex items-center">
                             <span className="text-emerald-700 font-bold text-xl mr-3">{analysis.sellVsStore.decision}</span>
                             <p className="text-emerald-700">{analysis.recommendation}</p>
                        </div>
                    </Card>
                </motion.div>
            )}

        </div>
    );
};

export default MarketIntelligence;