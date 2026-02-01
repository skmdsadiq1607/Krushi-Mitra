
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useFarm } from '../contexts/FarmContext';
import { useLocalization } from '../contexts/LocalizationContext';
import { getGovernmentSchemes, GovernmentSchemesInfo } from '../lib/gemini';
import { Card } from '../components/ui/Card';
import { Building, Landmark, IndianRupee, ScrollText, ExternalLink, ShieldCheck } from 'lucide-react';

// FIX: Moved SchemeCard outside of the GovernmentSchemes component to prevent it from being re-declared on every render.
// By defining it as a React.FC with an explicit props interface, we ensure TypeScript correctly handles special props like 'key'.
interface SchemeCardProps {
    scheme: { name: string; description: string; link: string };
    t: (key: any) => string;
}

const SchemeCard: React.FC<SchemeCardProps> = ({ scheme, t }) => (
    <div className="bg-stone-50 p-4 rounded-xl border border-stone-200">
        <h4 className="font-bold text-stone-800">{scheme.name}</h4>
        <p className="text-sm text-stone-600 my-2">{scheme.description}</p>
        <a href={scheme.link} target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-emerald-600 hover:text-emerald-800 inline-flex items-center">
            {t('learnMore')} <ExternalLink size={14} className="ml-1" />
        </a>
    </div>
);

const GovernmentSchemes: React.FC = () => {
    const { farmData } = useFarm();
    const { t, language } = useLocalization();
    const [schemesInfo, setSchemesInfo] = useState<GovernmentSchemesInfo | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const location = farmData?.farmDetails.location;
    const crop = farmData?.farmDetails.crops[0];

    useEffect(() => {
        const fetchSchemes = async () => {
            if (!location || !crop) {
                setError("Farm data is incomplete. Please set your location and primary crop.");
                setIsLoading(false);
                return;
            }

            try {
                setIsLoading(true);
                setError(null);
                const info = await getGovernmentSchemes(location, crop, language);
                setSchemesInfo(info);
            } catch (err) {
                console.error("Failed to fetch government schemes:", err);
                if (err instanceof Error && (err.message.includes('429') || err.message.includes('RESOURCE_EXHAUSTED'))) {
                    setError("API request limit exceeded. Please try again later.");
                } else {
                    setError("Could not load information. Please try again later.");
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchSchemes();
    }, [location, crop, language]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-7xl mx-auto space-y-8"
        >
            <header>
                <h1 className="text-4xl font-black text-stone-900 tracking-tighter">{t('govtSchemesTitle')}</h1>
                <p className="text-stone-500 font-medium mt-1">{t('govtSchemesSubtitle')}</p>
            </header>

            {isLoading && <div className="text-center font-bold">Loading information...</div>}
            {error && <div className="text-center font-bold text-red-500">{error}</div>}

            {schemesInfo && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                    <div className="space-y-8">
                        <Card title={t('centralSchemesTitle')} icon={<Landmark />}>
                            <div className="space-y-4">
                                {schemesInfo.centralSchemes.map((scheme, index) => (
                                    <SchemeCard key={`central-${index}`} scheme={scheme} t={t} />
                                ))}
                            </div>
                        </Card>
                         <Card title={t('stateSchemesTitle')} icon={<Building />}>
                            <div className="space-y-4">
                                {schemesInfo.stateSchemes.map((scheme, index) => (
                                    <SchemeCard key={`state-${index}`} scheme={scheme} t={t} />
                                ))}
                            </div>
                        </Card>
                    </div>
                     <div className="space-y-8">
                        <Card title={t('mspTitle')} icon={<IndianRupee />}>
                            <div className="text-center bg-emerald-50 p-6 rounded-2xl border border-emerald-200">
                                <p className="text-lg font-bold text-emerald-800">{schemesInfo.msp.crop}</p>
                                <p className="text-5xl font-black text-emerald-600 my-2">₹{schemesInfo.msp.price.toLocaleString()}</p>
                                <p className="text-sm text-emerald-700">per Quintal</p>
                            </div>
                            <p className="text-xs text-stone-500 mt-4">{schemesInfo.msp.details}</p>
                        </Card>
                        <Card title={t('farmerRightsTitle')} icon={<ShieldCheck />}>
                             <ul className="space-y-3">
                                {schemesInfo.farmerRights.map((right, index) => (
                                    <li key={`right-${index}`}>
                                        <p className="font-bold text-stone-800">{right.name}</p>
                                        <p className="text-sm text-stone-600">{right.description}</p>
                                    </li>
                                ))}
                            </ul>
                        </Card>
                    </div>
                </div>
            )}
        </motion.div>
    );
};

export default GovernmentSchemes;
