
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocalization } from '../contexts/LocalizationContext';
import { useAutoSpeak } from '../hooks/useAutoSpeak';
import { useAI } from '../contexts/AIContext';
import { Card } from '../components/ui/Card';
import { Sun, Cloud, CloudRain, CloudSnow, Wind, Droplets, Thermometer } from 'lucide-react';

const WeatherIcon = ({ description, size = 48 }: { description: string; size?: number }) => {
    const desc = description.toLowerCase();
    if (desc.includes('rain') || desc.includes('drizzle')) return <CloudRain size={size} className="text-blue-500" />;
    if (desc.includes('snow')) return <CloudSnow size={size} className="text-blue-300" />;
    if (desc.includes('cloud') || desc.includes('overcast')) return <Cloud size={size} className="text-stone-500" />;
    if (desc.includes('wind')) return <Wind size={size} className="text-stone-600" />;
    return <Sun size={size} className="text-amber-500" />;
};

const WeatherHub: React.FC = () => {
    const { t } = useLocalization();
    useAutoSpeak('speakWeatherIntro');
    const { weatherData: weather, isLoading, error } = useAI();

    if (isLoading) {
        return <div className="text-center font-bold">Loading Weather Data...</div>;
    }
    
    if (error) {
        return <div className="text-center font-bold text-red-500">{error}</div>;
    }

    if (!weather) {
        return <div className="text-center font-bold text-red-500">Could not load weather data.</div>;
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-7xl mx-auto space-y-8"
        >
            <header>
                <h1 className="text-4xl font-black text-stone-900 tracking-tighter">{t('weatherTitle')}</h1>
                <p className="text-stone-500 font-medium mt-1">{t('weatherSubtitle')}</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-1 space-y-8">
                    <Card title={t('weatherCurrent')}>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-6xl font-black text-stone-800">{weather.current.temp.toFixed(0)}°C</p>
                                <p className="font-bold text-stone-600">{weather.current.description}</p>
                            </div>
                            <WeatherIcon description={weather.current.description} size={80} />
                        </div>
                        <div className="mt-6 space-y-3">
                            <div className="flex justify-between text-sm"><span className="font-bold text-stone-500 flex items-center"><Thermometer size={16} className="mr-2"/>{t('weatherFeelsLike')}</span><span className="font-bold">{weather.current.feels_like.toFixed(0)}°C</span></div>
                             <div className="flex justify-between text-sm"><span className="font-bold text-stone-500 flex items-center"><Droplets size={16} className="mr-2"/>{t('weatherHumidity')}</span><span className="font-bold">{weather.current.humidity}%</span></div>
                             <div className="flex justify-between text-sm"><span className="font-bold text-stone-500 flex items-center"><Wind size={16} className="mr-2"/>{t('weatherWind')}</span><span className="font-bold">{weather.current.wind_speed} km/h</span></div>
                        </div>
                    </Card>
                     <Card title={t('weatherAdvisory')} className="bg-emerald-50 border-emerald-200">
                        <p className="text-emerald-800">{weather.advisory}</p>
                    </Card>
                </div>
                <div className="lg:col-span-2">
                    <Card title={t('weatherForecast')}>
                        <div className="space-y-2">
                            {weather.forecast.map((day, index) => (
                                <div key={index} className="grid grid-cols-4 items-center p-3 rounded-xl hover:bg-stone-50">
                                    <p className="font-bold col-span-1">{day.day}</p>
                                    <div className="col-span-1 flex justify-center">
                                        <WeatherIcon description={day.description} size={32} />
                                    </div>
                                    <p className="text-sm text-stone-500 col-span-1 truncate">{day.description}</p>
                                    <p className="font-bold text-right col-span-1">{day.temp_max.toFixed(0)}° / {day.temp_min.toFixed(0)}°</p>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            </div>
        </motion.div>
    );
};

export default WeatherHub;
