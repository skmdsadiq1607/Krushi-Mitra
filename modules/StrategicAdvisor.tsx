
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useFarm, FarmData } from '../contexts/FarmContext';
import { useLocalization } from '../contexts/LocalizationContext';
import { useAutoSpeak } from '../hooks/useAutoSpeak';
import { useAI } from '../contexts/AIContext';
import { StrategicAdvice } from '../lib/gemini';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { CloudRain, Zap, ShieldCheck, ShieldAlert, ArrowRight, GitCompareArrows } from 'lucide-react';

const StrategicAdvisor: React.FC = () => {
    const { farmData } = useFarm();
    const { t } = useLocalization();
    useAutoSpeak('speakAdvisorIntro');
    const { strategicAdvice: advice, isLoading, error } = useAI();

    const [selectedCrop, setSelectedCrop] = useState<StrategicAdvice['cropSwitch']['suggestions'][0] | null>(null);

    const handleSimulate = (suggestion: StrategicAdvice['cropSwitch']['suggestions'][0]) => {
        setSelectedCrop(suggestion);
    };

    const InfoPill = ({ text, level }: { text: string | number; level: 'Low' | 'Moderate' | 'High' }) => {
        const colors = {
            Low: 'bg-emerald-100 text-emerald-800',
            Moderate: 'bg-amber-100 text-amber-800',
            High: 'bg-red-100 text-red-800'
        };
        return <span className={`px-3 py-1 text-sm font-bold rounded-full ${colors[level]}`}>{text}</span>;
    };

    if (isLoading) {
        return <div className="text-center font-bold">Loading Strategic Advice...</div>;
    }

    if (error) {
        return <div className="text-center font-bold text-red-500">{error}</div>;
    }
    
    if (!advice) {
        return <div className="text-center font-bold text-red-500">Could not load strategic advice.</div>;
    }

    const { currentCrop } = advice.cropSwitch;

    return (
        <div className="max-w-7xl mx-auto space-y-8">
            <header>
                <h1 className="text-4xl font-black text-stone-900 tracking-tighter">{t('advisorTitle')}</h1>
                <p className="text-stone-500 font-medium mt-1">{t('advisorSubtitle')}</p>
            </header>

            <Card title={t('advisorRainFailureTitle')} icon={<CloudRain />}>
                <p className="text-stone-600 mb-6">{t('advisorRainFailureDesc')}</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {advice.rainFailure.strategies.map((s, i) => (
                        <div key={i} className="bg-stone-50 p-6 rounded-2xl border border-stone-100">
                            <h3 className="font-bold text-stone-800 mb-3">{s.title}</h3>
                            <p className="text-sm text-stone-600 mb-4">{s.description}</p>
                            <div className="space-y-3 text-xs">
                                {s.pros.map((pro, pi) => <div key={pi} className="flex items-start"><ShieldCheck className="w-4 h-4 text-emerald-500 mr-2 mt-0.5 shrink-0" /><span>{pro}</span></div>)}
                                {s.cons.map((con, ci) => <div key={ci} className="flex items-start"><ShieldAlert className="w-4 h-4 text-red-500 mr-2 mt-0.5 shrink-0" /><span>{con}</span></div>)}
                            </div>
                        </div>
                    ))}
                </div>
            </Card>

            <Card title={t('advisorCropSwitchTitle')} icon={<GitCompareArrows />}>
                <p className="text-stone-600 mb-6">{t('advisorCropSwitchDesc')}</p>
                <div className="flex gap-4 mb-8">
                    {advice.cropSwitch.suggestions.map(s => (
                        <Button
                            key={s.cropName}
                            variant={selectedCrop?.cropName === s.cropName ? 'primary' : 'secondary'}
                            onClick={() => handleSimulate(s)}
                            className="text-base"
                        >
                            {t('advisorSimulateBtn')} {s.cropName}
                        </Button>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Current Plan */}
                    <div className="bg-stone-100 p-6 rounded-2xl border-2 border-stone-200">
                        <h3 className="font-black text-2xl text-stone-800 mb-4">{t('advisorCurrentPlan')} ({farmData?.farmDetails.crops[0]})</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center"><span className="font-bold text-stone-600">{t('advisorEstProfit')}</span> <span className="font-bold text-lg">₹{currentCrop.profit.toLocaleString()}</span></div>
                            <div className="flex justify-between items-center"><span className="font-bold text-stone-600">{t('advisorWaterReq')}</span> <InfoPill text={currentCrop.waterRequirement} level={currentCrop.waterRequirement} /></div>
                            <div className="flex justify-between items-center"><span className="font-bold text-stone-600">{t('advisorRiskLevel')}</span> <InfoPill text={currentCrop.riskLevel} level={currentCrop.riskLevel} /></div>
                        </div>
                    </div>

                    {/* Simulated Plan */}
                    <div className="bg-emerald-50 p-6 rounded-2xl border-2 border-emerald-200">
                        {selectedCrop ? (
                             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                <h3 className="font-black text-2xl text-emerald-800 mb-4">{t('advisorSimulatedPlan')} ({selectedCrop.cropName})</h3>
                                <div className="space-y-4">
                                     <div className="flex justify-between items-center"><span className="font-bold text-emerald-700">{t('advisorEstProfit')}</span> <span className="font-bold text-lg text-emerald-900">₹{selectedCrop.estimatedProfit.toLocaleString()}</span></div>
                                     <div className="flex justify-between items-center"><span className="font-bold text-emerald-700">{t('advisorWaterReq')}</span> <InfoPill text={selectedCrop.waterRequirement} level={selectedCrop.waterRequirement} /></div>
                                     <div className="flex justify-between items-center"><span className="font-bold text-emerald-700">{t('advisorRiskLevel')}</span> <InfoPill text={selectedCrop.riskLevel} level={selectedCrop.riskLevel} /></div>
                                </div>
                                <p className="text-xs text-emerald-700 mt-4">{selectedCrop.reason}</p>
                             </motion.div>
                        ) : (
                            <div className="flex items-center justify-center h-full">
                                <p className="text-emerald-700 font-bold">Select a crop to simulate</p>
                            </div>
                        )}
                    </div>
                </div>
            </Card>

        </div>
    );
};

export default StrategicAdvisor;