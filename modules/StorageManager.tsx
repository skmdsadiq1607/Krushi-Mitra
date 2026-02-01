
import React, { useState, useMemo } from 'react';
import { useFarm } from '../contexts/FarmContext';
import { useLocalization } from '../contexts/LocalizationContext';
import { useSpeech } from '../contexts/SpeechContext';
import { useAutoSpeak } from '../hooks/useAutoSpeak';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Button } from '../components/ui/Button';
import { Package, Warehouse, BarChart2 } from 'lucide-react';

const StorageManager: React.FC = () => {
    const { farmData, updateStorage } = useFarm();
    const { t } = useLocalization();
    const { speak } = useSpeech();
    useAutoSpeak('speakStorageManagerIntro');

    const [storageDetails, setStorageDetails] = useState(farmData?.storage || {
        crop: farmData?.farmDetails.crops[0] || '',
        harvestedQuantity: 0,
        storageType: 'On-Farm',
        capacity: 0,
        spoilageRate: 1,
    });
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setStorageDetails(prev => ({
            ...prev,
            [name]: name === 'crop' || name === 'storageType' ? value : parseFloat(value) || 0
        }));
    };

    const handleSubmit = () => {
        updateStorage(storageDetails);
    };

    const { remainingCapacity, filledPercentage, spoilageForecast } = useMemo(() => {
        const { harvestedQuantity, capacity, spoilageRate } = storageDetails;
        const remaining = capacity - harvestedQuantity;
        const filled = capacity > 0 ? (harvestedQuantity / capacity) * 100 : 0;
        
        const forecast = [1, 2, 3, 4].map(week => {
            const lossPercentage = spoilageRate * week;
            const quantityLost = (harvestedQuantity * lossPercentage) / 100;
            return {
                week,
                quantityLost: quantityLost.toFixed(2),
            };
        });

        return {
            remainingCapacity: remaining,
            filledPercentage: filled,
            spoilageForecast: forecast,
        };
    }, [storageDetails]);

    if (!farmData) return null;

    return (
         <div className="max-w-7xl mx-auto space-y-8">
            <header>
                <h1 className="text-4xl font-black text-stone-900 tracking-tighter">{t('storageManagerTitle')}</h1>
                <p className="text-stone-500 font-medium mt-1">{t('storageManagerSubtitle')}</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1 space-y-6">
                    <Card title={t('storageManagerInputs')} icon={<Package/>}>
                        <div className="space-y-4">
                            <Select name="crop" label={t('storageCropLabel')} options={farmData.farmDetails.crops} value={storageDetails.crop} onChange={handleChange} onFocus={() => speak('speakStorageCrop')} />
                            <Input name="harvestedQuantity" label={t('storageHarvestedQtyLabel')} placeholder={t('storageHarvestedQtyPlaceholder')} type="number" value={storageDetails.harvestedQuantity} onChange={handleChange} onFocus={() => speak('speakHarvestedQty')} />
                            <Select name="storageType" label={t('storageTypeLabel')} options={['On-Farm', 'Warehouse', 'Cold Storage']} value={storageDetails.storageType} onChange={handleChange} onFocus={() => speak('speakStorageType')} />
                            <Input name="capacity" label={t('storageCapacityLabel')} placeholder={t('storageCapacityPlaceholder')} type="number" value={storageDetails.capacity} onChange={handleChange} onFocus={() => speak('speakStorageCapacity')} />
                            <Input name="spoilageRate" label={t('storageSpoilageRateLabel')} type="number" value={storageDetails.spoilageRate} onChange={handleChange} onFocus={() => speak('speakSpoilageRate')} />
                        </div>
                    </Card>
                    <Button onClick={handleSubmit} onFocus={() => speak('speakUpdateStorageBtn')}>{t('storageUpdateButton')}</Button>
                </div>

                <div className="lg:col-span-2 space-y-8">
                    <Card title={t('storageDashboard')} icon={<Warehouse/>}>
                        <h3 className="font-bold text-stone-600 mb-2">{t('storageRemainingCapacity')}</h3>
                        <div className="w-full bg-stone-100 rounded-full h-8 border border-stone-200">
                            <div className="bg-emerald-500 h-8 rounded-full text-white text-sm font-bold flex items-center justify-center" style={{ width: `${Math.min(filledPercentage, 100)}%` }}>
                                {filledPercentage.toFixed(0)}%
                            </div>
                        </div>
                        <div className="text-center mt-3">
                            <p className="font-bold text-2xl text-stone-800">{storageDetails.harvestedQuantity.toLocaleString()} / {storageDetails.capacity.toLocaleString()} <span className="text-base font-medium">Quintals</span></p>
                        </div>
                    </Card>

                     <Card title={t('storageSpoilageForecast')} icon={<BarChart2/>}>
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b">
                                    <th className="p-2 font-bold text-stone-600">{t('storageWeek')}</th>
                                    <th className="p-2 font-bold text-stone-600">{t('storageProjectedLoss')} (Quintals)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {spoilageForecast.map(item => (
                                    <tr key={item.week} className="border-b border-stone-100">
                                        <td className="p-3 font-medium">{item.week}</td>
                                        <td className="p-3 font-medium text-red-600">{item.quantityLost}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </Card>
                </div>
            </div>
         </div>
    );
};

export default StorageManager;
