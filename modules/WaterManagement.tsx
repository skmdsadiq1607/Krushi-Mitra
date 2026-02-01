
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useFarm } from '../contexts/FarmContext';
import { useLocalization } from '../contexts/LocalizationContext';
import { useAutoSpeak } from '../hooks/useAutoSpeak';
import { useAI } from '../contexts/AIContext';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Droplets, Calendar, Clock, BarChart } from 'lucide-react';

const WaterManagement: React.FC = () => {
    const { farmData, logIrrigationEvent } = useFarm();
    const { t } = useLocalization();
    useAutoSpeak('speakWaterIntro');
    const { waterAdvice: advice, isLoading, error } = useAI();

    const [log, setLog] = useState({ date: new Date().toISOString().split('T')[0], duration: '' });

    const handleLogChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLog({ ...log, [e.target.name]: e.target.value });
    };

    const handleLogSubmit = () => {
        if (log.date && log.duration) {
            logIrrigationEvent({
                date: log.date,
                duration: parseFloat(log.duration) || 0,
            });
            setLog({ date: new Date().toISOString().split('T')[0], duration: '' });
        }
    };

    if (isLoading) {
        return <div className="text-center font-bold">Loading Water Management Data...</div>;
    }

    if (error) {
        return <div className="text-center font-bold text-red-500">{error}</div>;
    }

    if (!advice) {
        return <div className="text-center font-bold text-red-500">Could not load water management advice.</div>;
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-7xl mx-auto space-y-8"
        >
            <header>
                <h1 className="text-4xl font-black text-stone-900 tracking-tighter">{t('waterTitle')}</h1>
                <p className="text-stone-500 font-medium mt-1">{t('waterSubtitle')}</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="bg-gradient-to-br from-blue-50 to-sky-100">
                    <p className="text-sm font-bold text-blue-800">{t('waterWeeklyUsage')}</p>
                    <p className="text-4xl font-black text-blue-700 mt-2">{(advice.weeklyUsage / 1000).toLocaleString()} <span className="text-2xl">m³</span></p>
                </Card>
                 <Card className="bg-gradient-to-br from-teal-50 to-emerald-100">
                    <p className="text-sm font-bold text-teal-800">{t('waterNextIrrigation')}</p>
                    <p className="text-4xl font-black text-teal-700 mt-2">{advice.nextIrrigation}</p>
                </Card>
            </div>

            <Card title={t('waterAITip')} className="bg-sky-50 border-sky-200">
                <p className="text-sky-800">{advice.tip}</p>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <Card title={t('waterLogEvent')} icon={<Clock />}>
                    <div className="grid grid-cols-2 gap-4 items-end">
                        <Input name="date" label={t('waterLogDate')} type="date" value={log.date} onChange={handleLogChange} />
                        <Input name="duration" label={`${t('waterLogDuration')} (${t('waterLogDurationUnit')})`} type="number" value={log.duration} onChange={handleLogChange} />
                    </div>
                     <Button onClick={handleLogSubmit} className="mt-6">{t('waterLogButton')}</Button>
                </Card>

                 <Card title={t('waterHistory')} icon={<BarChart />}>
                    <div className="space-y-2 max-h-60 overflow-y-auto custom-scrollbar">
                        {farmData?.waterLog.length === 0 && <p className="text-sm text-stone-500">No irrigation events logged.</p>}
                        {farmData?.waterLog.map((event, index) => (
                             <div key={index} className="flex justify-between p-3 bg-stone-50 rounded-lg">
                                <span className="font-bold text-sm">{new Date(event.date).toLocaleDateString()}</span>
                                <span className="text-sm">{event.duration} {t('waterLogDurationUnit')}</span>
                             </div>
                        ))}
                    </div>
                 </Card>
            </div>
        </motion.div>
    );
};

export default WaterManagement;
