
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Leaf, MapPin, Scale, Sprout, Tractor, CheckCircle, Mic, User } from 'lucide-react';
import { useFarm } from '../contexts/FarmContext';
import { useLocalization } from '../contexts/LocalizationContext';
import { useSpeech } from '../contexts/SpeechContext';
import { useAutoSpeak } from '../hooks/useAutoSpeak';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { reverseGeocode } from '../lib/gemini';
import Footer from '../components/layout/Footer';

const steps = [
  { id: 1, name: 'farmSetupStepPersonal' },
  { id: 2, name: 'farmSetupStep1' },
  { id: 3, name: 'farmSetupStep2' },
  { id: 4, name: 'farmSetupStep3' },
  { id: 5, name: 'farmSetupStep4' },
];

const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

const FarmSetup: React.FC = () => {
  const { saveFarmSetup } = useFarm();
  const { language, setLanguage, t } = useLocalization();
  const { speak } = useSpeech();
  useAutoSpeak('speakFarmSetupLanguageIntro');
  
  const [currentStep, setCurrentStep] = useState(1);
  const [details, setDetails] = useState({
    farmerName: '',
    location: '',
    landSize: '',
    soilType: 'Loamy',
    crops: '',
    season: 'Kharif',
    waterSource: 'Canal',
    irrigationMethod: 'Drip',
    machinery: '',
  });

  const [isListening, setIsListening] = useState(false);
  const [isGeocoding, setIsGeocoding] = useState(false);
  const [micPermissionError, setMicPermissionError] = useState(false);
  const [gpsPermissionError, setGpsPermissionError] = useState(false);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (!SpeechRecognition) {
      console.warn("Speech recognition not supported by this browser.");
      return;
    }
    
    recognitionRef.current = new SpeechRecognition();
    const recognition = recognitionRef.current;

    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript.toLowerCase().trim();
        if (transcript.includes('english')) setLanguage('en');
        else if (transcript.includes('telugu')) setLanguage('te');
        else if (transcript.includes('hindi')) setLanguage('hi');
        else if (transcript.includes('urdu')) setLanguage('ur');
        setIsListening(false);
    };

    recognition.onend = () => setIsListening(false);
    recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        if (event.error === 'not-allowed') {
            setMicPermissionError(true);
        }
        setIsListening(false);
    };

  }, [setLanguage]);

  useEffect(() => {
      if (recognitionRef.current) {
          recognitionRef.current.lang = {
            'en': 'en-US',
            'te': 'te-IN',
            'hi': 'hi-IN',
            'ur': 'ur-PK'
        }[language] || 'en-US';
      }
  }, [language]);

  const toggleListenForLanguage = () => {
      setMicPermissionError(false);
      const recognition = recognitionRef.current;
      if (!recognition) {
        alert("Sorry, your browser doesn't support voice commands.");
        return;
      }

      if (isListening) {
          recognition.stop();
      } else {
          try {
            recognition.start();
            setIsListening(true);
          } catch(e) {
            console.error("Could not start recognition", e);
            setIsListening(false);
          }
      }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const handleUseGPS = () => {
    speak('farmSetupUseGPS');
    setGpsPermissionError(false);
    setIsGeocoding(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
            const locationName = await reverseGeocode(latitude, longitude);
            setDetails(prev => ({ ...prev, location: locationName }));
        } catch (error) {
            alert('Could not determine location name from coordinates. Please enter it manually.');
            console.error(error);
        } finally {
            setIsGeocoding(false);
        }
      },
      (error) => {
        if (error.code === error.PERMISSION_DENIED) {
            setGpsPermissionError(true);
        } else {
            alert('Could not get location. Please enable location services and try again.');
        }
        console.error(error);
        setIsGeocoding(false);
      }
    );
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const processedDetails = {
      ...details,
      landSize: parseFloat(details.landSize) || 0,
      crops: details.crops.split(',').map(c => c.trim()).filter(Boolean),
      machinery: details.machinery.split(',').map(m => m.trim()).filter(Boolean),
    };
    saveFarmSetup(processedDetails);
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, steps.length));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));
  
  return (
    <div className="min-h-screen bg-stone-50 flex flex-col p-4">
      <div className="flex-grow flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-3xl bg-white rounded-[3rem] shadow-2xl border border-stone-200 p-12 overflow-hidden"
        >
          <div className="text-center mb-8">
            <div className="inline-flex p-4 bg-emerald-100 rounded-3xl mb-6">
              <Leaf className="w-12 h-12 text-emerald-600" />
            </div>
            <h1 className="text-4xl font-black text-stone-900 tracking-tighter">{t('farmSetupTitle')}</h1>
            <p className="text-stone-500 font-medium mt-2">{t('farmSetupSubtitle')}</p>
          </div>
          
          <div className="mb-8 p-6 bg-stone-100 rounded-3xl border border-stone-200 text-center">
              <p className="font-bold text-stone-700 mb-4">{t('farmSetupLanguageSelectPrompt')}</p>
              <div className="flex justify-center items-center flex-wrap gap-3">
                  <Button variant={language === 'en' ? 'primary' : 'secondary'} onClick={() => setLanguage('en')} className="w-auto py-3 px-6 text-base !font-bold">English</Button>
                  <Button variant={language === 'te' ? 'primary' : 'secondary'} onClick={() => setLanguage('te')} className="w-auto py-3 px-6 text-base !font-bold">తెలుగు</Button>
                  <Button variant={language === 'hi' ? 'primary' : 'secondary'} onClick={() => setLanguage('hi')} className="w-auto py-3 px-6 text-base !font-bold">हिंदी</Button>
                  <Button variant={language === 'ur' ? 'primary' : 'secondary'} onClick={() => setLanguage('ur')} className="w-auto py-3 px-6 text-base !font-bold">اردو</Button>
                  <motion.button 
                      onClick={toggleListenForLanguage}
                      className={`p-4 rounded-full transition-colors ${isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-emerald-600 text-white'}`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      aria-label="Speak to select language"
                  >
                      <Mic size={24} />
                  </motion.button>
              </div>
              {isListening && <p className="text-sm mt-3 text-red-500 font-bold">{t('notebookListening')}</p>}
              {micPermissionError && <p className="text-sm mt-3 text-red-500 font-bold">{t('micPermissionDenied')}</p>}
          </div>

          {/* Progress Bar */}
          <div className="flex justify-center items-center my-8">
            {steps.map((step, index) => (
              <React.Fragment key={step.id}>
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${currentStep >= step.id ? 'bg-emerald-600 text-white' : 'bg-stone-200 text-stone-500'}`}>
                    {currentStep > step.id ? <CheckCircle size={20}/> : step.id}
                  </div>
                  <span className="text-xs font-bold mt-2 text-center w-20">{t(step.name as any)}</span>
                </div>
                {index < steps.length - 1 && <div className={`flex-1 h-1 mx-2 ${currentStep > index + 1 ? 'bg-emerald-600' : 'bg-stone-200'}`}></div>}
              </React.Fragment>
            ))}
          </div>

          <form onSubmit={handleSubmit}>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ x: 300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -300, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                {currentStep === 1 && (
                  <div className="space-y-6 text-center">
                    <h2 className="text-2xl font-bold">{t('farmSetupPersonalTitle')}</h2>
                    <Input name="farmerName" label={t('farmSetupFarmerNameLabel')} placeholder={t('farmSetupFarmerNamePlaceholder')} value={details.farmerName} onChange={handleChange} icon={<User />} onFocus={() => speak('speakFarmSetupName')} required />
                  </div>
                )}
                
                {currentStep === 2 && (
                  <div className="space-y-6 text-center">
                    <h2 className="text-2xl font-bold">{t('farmSetupLocationTitle')}</h2>
                    <p className="text-stone-500">{t('farmSetupLocationDesc')}</p>
                    <Input name="location" label={t('farmSetupLocationLabel')} placeholder={t('farmSetupLocationPlaceholder')} value={details.location} onChange={handleChange} icon={<MapPin />} onFocus={() => speak('speakFarmSetupLocation')} required />
                    <Button type="button" variant="secondary" onClick={handleUseGPS} disabled={isGeocoding} className="text-base">{isGeocoding ? t('farmSetupGeocoding') : t('farmSetupUseGPS')}</Button>
                    {gpsPermissionError && <p className="text-sm mt-3 text-red-500 font-bold">{t('gpsPermissionDenied')}</p>}
                  </div>
                )}

                {currentStep === 3 && (
                  <div className="space-y-6 text-center">
                    <h2 className="text-2xl font-bold">{t('farmSetupBasicsTitle')}</h2>
                    <p className="text-stone-500">{t('farmSetupBasicsDesc')}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Input name="landSize" type="number" label={t('farmSetupLandSizeLabel')} placeholder="e.g., 10" value={details.landSize} onChange={handleChange} icon={<Scale />} onFocus={() => speak('speakFarmSetupLandSize')} required />
                      <Select name="soilType" label={t('farmSetupSoilTypeLabel')} value={details.soilType} onChange={handleChange} options={['Loamy', 'Clay', 'Sandy', 'Black Soil', 'Red Soil']} onFocus={() => speak('speakSoilType')} />
                    </div>
                    <Input name="crops" label={t('farmSetupCropsLabel')} placeholder={t('farmSetupCropsPlaceholder')} value={details.crops} onChange={handleChange} icon={<Sprout />} onFocus={() => speak('speakCrops')} required />
                  </div>
                )}
                
                 {currentStep === 4 && (
                  <div className="space-y-6 text-center">
                    <h2 className="text-2xl font-bold">{t('farmSetupInfraTitle')}</h2>
                    <p className="text-stone-500">{t('farmSetupInfraDesc')}</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <Select name="season" label={t('farmSetupSeasonLabel')} value={details.season} onChange={handleChange} options={['Kharif', 'Rabi', 'Zaid']} onFocus={() => speak('speakSeason')} />
                      <Select name="waterSource" label={t('farmSetupWaterSourceLabel')} value={details.waterSource} onChange={handleChange} options={['Canal', 'Borewell', 'Rainfed', 'River']} onFocus={() => speak('speakWaterSource')} />
                      <Select name="irrigationMethod" label={t('farmSetupIrrigationLabel')} value={details.irrigationMethod} onChange={handleChange} options={['Drip', 'Sprinkler', 'Flood']} onFocus={() => speak('speakIrrigation')} />
                    </div>
                     <Input name="machinery" label={t('farmSetupMachineryLabel')} placeholder={t('farmSetupMachineryPlaceholder')} value={details.machinery} onChange={handleChange} icon={<Tractor />} onFocus={() => speak('speakMachinery')} />
                  </div>
                )}

                {currentStep === 5 && (
                  <div className="space-y-6 text-center">
                    <h2 className="text-2xl font-bold">{t('farmSetupConfirmTitle')}</h2>
                    <p className="text-stone-500">{t('farmSetupConfirmDesc')}</p>
                    <div className="text-left bg-stone-50 p-6 rounded-2xl border border-stone-200 grid grid-cols-2 gap-4">
                      <div><strong>{t('farmSetupConfirmLabelName')}:</strong> {details.farmerName}</div>
                      <div><strong>{t('farmSetupConfirmLabelLocation')}:</strong> {details.location}</div>
                      <div><strong>{t('farmSetupConfirmLabelLand')}:</strong> {details.landSize} Acres</div>
                      <div><strong>{t('farmSetupConfirmLabelSoil')}:</strong> {details.soilType}</div>
                      <div><strong>{t('farmSetupConfirmLabelCrops')}:</strong> {details.crops}</div>
                      <div><strong>{t('farmSetupConfirmLabelSeason')}:</strong> {details.season}</div>
                      <div><strong>{t('farmSetupConfirmLabelWater')}:</strong> {details.waterSource}</div>
                       <div><strong>{t('farmSetupConfirmLabelIrrigation')}:</strong> {details.irrigationMethod}</div>
                       <div><strong>{t('farmSetupConfirmLabelMachinery')}:</strong> {details.machinery}</div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-between mt-12">
              {currentStep > 1 ? (
                <Button type="button" variant="secondary" onClick={prevStep}>{t('back')}</Button>
              ) : <div></div>}
              
              {currentStep < steps.length ? (
                <Button type="button" onClick={nextStep}>{t('next')}</Button>
              ) : (
                <Button type="submit">{t('confirm')}</Button>
              )}
            </div>
          </form>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default FarmSetup;
