
import React, { useState, useMemo } from 'react';
import { useFarm } from '../contexts/FarmContext';
import { useLocalization } from '../contexts/LocalizationContext';
import { useSpeech } from '../contexts/SpeechContext';
import { useAutoSpeak } from '../hooks/useAutoSpeak';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Sprout, Beaker, Wrench, Tractor, Zap, Plus, Trash2 } from 'lucide-react';

const CostManager = () => {
    const { farmData, updateCosts } = useFarm();
    const { t } = useLocalization();
    const { speak } = useSpeech();
    useAutoSpeak('speakCostManagerIntro');

    const [costs, setCosts] = useState(farmData?.costs || {
        seeds: { quantity: 0, cost: 0 },
        fertilizers: [],
        pesticides: [],
        labor: { days: 0, wages: 0 },
        machinery: { usage: 0, fuel: 0 },
        electricity: 0,
        irrigation: 0,
        transport: 0,
        storage: 0,
    });

    const handleSimpleChange = (category: string, field: string, value: string) => {
        const numValue = parseFloat(value) || 0;
        setCosts(prev => ({
            ...prev,
            [category]: { ...prev[category], [field]: numValue }
        }));
    };

    const handleUtilityChange = (field: keyof typeof costs, value: string) => {
        const numValue = parseFloat(value) || 0;
        setCosts(prev => ({ ...prev, [field]: numValue }));
    };

    const handleDynamicChange = (category: 'fertilizers' | 'pesticides', index: number, field: string, value: string) => {
        const list = [...costs[category]];
        list[index] = { ...list[index], [field]: field === 'type' ? value : (parseFloat(value) || 0) };
        setCosts(prev => ({ ...prev, [category]: list }));
    };

    const addDynamicItem = (category: 'fertilizers' | 'pesticides') => {
        const newItem = { type: '', quantity: 0, cost: 0 };
        setCosts(prev => ({ ...prev, [category]: [...prev[category], newItem] }));
    };

    const removeDynamicItem = (category: 'fertilizers' | 'pesticides', index: number) => {
        const list = costs[category].filter((_, i) => i !== index);
        setCosts(prev => ({ ...prev, [category]: list }));
    };

    const handleSubmit = () => {
        updateCosts(costs);
        // Optionally add a success message/toast
    };
    
    const { totalInvestment, costPerAcre } = useMemo(() => {
        const seeds = costs.seeds.cost;
        const fertilizers = costs.fertilizers.reduce((sum, item) => sum + item.cost, 0);
        const pesticides = costs.pesticides.reduce((sum, item) => sum + item.cost, 0);
        const labor = costs.labor.wages;
        const machinery = costs.machinery.fuel;
        const total = seeds + fertilizers + pesticides + labor + machinery + costs.electricity + costs.irrigation + costs.transport + costs.storage;
        
        const landSize = farmData?.farmDetails.landSize || 1;
        const perAcre = total / (landSize > 0 ? landSize : 1);
        
        return { totalInvestment: total, costPerAcre: perAcre };
    }, [costs, farmData?.farmDetails.landSize]);

    if (!farmData) return null;

    return (
        <div className="max-w-7xl mx-auto space-y-8">
            <header>
                <h1 className="text-4xl font-black text-stone-900 tracking-tighter">{t('costManagerTitle')}</h1>
                <p className="text-stone-500 font-medium mt-1">{t('costManagerSubtitle')}</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <Card title={t('costCategorySeeds')} icon={<Sprout/>}>
                        <div className="grid grid-cols-2 gap-4">
                            <Input label={t('costLabelQuantity')} type="number" value={costs.seeds.quantity} onChange={e => handleSimpleChange('seeds', 'quantity', e.target.value)} onFocus={() => speak('speakSeedsQty')} />
                            <Input label={t('costLabelCost')} type="number" value={costs.seeds.cost} onChange={e => handleSimpleChange('seeds', 'cost', e.target.value)} onFocus={() => speak('speakSeedsCost')} />
                        </div>
                    </Card>

                    <Card title={t('costCategoryFertilizers')} icon={<Beaker/>}>
                        {costs.fertilizers.map((item, index) => (
                             <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 items-end">
                                <div className="md:col-span-2"><Input label={t('costLabelType')} value={item.type} onChange={e => handleDynamicChange('fertilizers', index, 'type', e.target.value)} onFocus={() => speak('speakFertilizerType')}/></div>
                                <Input label={t('costLabelQuantity')} type="number" value={item.quantity} onChange={e => handleDynamicChange('fertilizers', index, 'quantity', e.target.value)} onFocus={() => speak('speakFertilizerQty')}/>
                                <div className="flex items-center gap-2">
                                <Input label={t('costLabelCost')} type="number" value={item.cost} onChange={e => handleDynamicChange('fertilizers', index, 'cost', e.target.value)} onFocus={() => speak('speakFertilizerCost')}/>
                                <button onClick={() => removeDynamicItem('fertilizers', index)} className="p-3 text-red-500 hover:bg-red-50 rounded-lg -mb-1"><Trash2 size={20} /></button>
                                </div>
                            </div>
                        ))}
                        <Button variant="secondary" onClick={() => addDynamicItem('fertilizers')} onFocus={() => speak('speakAddFertilizerBtn')} className="w-auto py-2 px-4 text-sm"><Plus size={16} className="mr-2"/>{t('costAddFertilizer')}</Button>
                    </Card>

                     <Card title={t('costCategoryPesticides')} icon={<Wrench/>}>
                        {costs.pesticides.map((item, index) => (
                             <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 items-end">
                                <div className="md:col-span-2"><Input label={t('costLabelType')} value={item.type} onChange={e => handleDynamicChange('pesticides', index, 'type', e.target.value)} onFocus={() => speak('speakPesticideType')}/></div>
                                <Input label={t('costLabelQuantity')} type="number" value={item.quantity} onChange={e => handleDynamicChange('pesticides', index, 'quantity', e.target.value)} onFocus={() => speak('speakPesticideQty')}/>
                                <div className="flex items-center gap-2">
                                <Input label={t('costLabelCost')} type="number" value={item.cost} onChange={e => handleDynamicChange('pesticides', index, 'cost', e.target.value)} onFocus={() => speak('speakPesticideCost')}/>
                                <button onClick={() => removeDynamicItem('pesticides', index)} className="p-3 text-red-500 hover:bg-red-50 rounded-lg -mb-1"><Trash2 size={20} /></button>
                                </div>
                            </div>
                        ))}
                        <Button variant="secondary" onClick={() => addDynamicItem('pesticides')} onFocus={() => speak('speakAddPesticideBtn')} className="w-auto py-2 px-4 text-sm"><Plus size={16} className="mr-2"/>{t('costAddPesticide')}</Button>
                    </Card>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <Card title={t('costCategoryLabor')} icon={<Wrench/>}>
                            <div className="grid grid-cols-2 gap-4">
                                <Input label={t('costLabelDays')} type="number" value={costs.labor.days} onChange={e => handleSimpleChange('labor', 'days', e.target.value)} onFocus={() => speak('speakLaborDays')}/>
                                <Input label={t('costLabelWages')} type="number" value={costs.labor.wages} onChange={e => handleSimpleChange('labor', 'wages', e.target.value)} onFocus={() => speak('speakLaborWages')}/>
                            </div>
                        </Card>
                         <Card title={t('costCategoryMachinery')} icon={<Tractor/>}>
                            <div className="grid grid-cols-2 gap-4">
                                <Input label={t('costLabelUsageHours')} type="number" value={costs.machinery.usage} onChange={e => handleSimpleChange('machinery', 'usage', e.target.value)} onFocus={() => speak('speakMachineryHours')}/>
                                <Input label={t('costLabelFuelCost')} type="number" value={costs.machinery.fuel} onChange={e => handleSimpleChange('machinery', 'fuel', e.target.value)} onFocus={() => speak('speakMachineryFuel')}/>
                            </div>
                        </Card>
                    </div>

                    <Card title={t('costCategoryUtilities')} icon={<Zap/>}>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                           <Input label={t('costLabelElectricity')} type="number" value={costs.electricity} onChange={e => handleUtilityChange('electricity', e.target.value)} onFocus={() => speak('speakElectricityCost')}/>
                           <Input label={t('costLabelIrrigation')} type="number" value={costs.irrigation} onChange={e => handleUtilityChange('irrigation', e.target.value)} onFocus={() => speak('speakIrrigationCost')}/>
                           <Input label={t('costLabelTransport')} type="number" value={costs.transport} onChange={e => handleUtilityChange('transport', e.target.value)} onFocus={() => speak('speakTransportCost')}/>
                           <Input label={t('costLabelStorage')} type="number" value={costs.storage} onChange={e => handleUtilityChange('storage', e.target.value)} onFocus={() => speak('speakStorageCost')}/>
                        </div>
                    </Card>
                </div>
                <div className="lg:col-span-1">
                    <div className="sticky top-28 space-y-6">
                        <Card>
                            <div className="text-center">
                                <p className="text-sm font-bold text-stone-500 mb-1">{t('costTotalInvestment')}</p>
                                <p className="text-5xl font-black text-emerald-600 tracking-tighter">₹{totalInvestment.toLocaleString()}</p>
                            </div>
                            <hr className="my-6"/>
                             <div className="text-center">
                                <p className="text-sm font-bold text-stone-500 mb-1">{t('costPerAcre')}</p>
                                <p className="text-3xl font-black text-stone-800 tracking-tight">₹{costPerAcre.toLocaleString(undefined, {minimumFractionDigits: 0, maximumFractionDigits: 0})}</p>
                            </div>
                        </Card>
                        <Button onClick={handleSubmit} onFocus={() => speak('speakUpdateCostsBtn')}>{t('costUpdateButton')}</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CostManager;