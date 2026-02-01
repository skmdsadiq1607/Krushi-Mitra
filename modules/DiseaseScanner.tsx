
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { UploadCloud, CheckCircle, AlertTriangle, X } from 'lucide-react';
import { useLocalization } from '../contexts/LocalizationContext';
import { useSpeech } from '../contexts/SpeechContext';
import { useAutoSpeak } from '../hooks/useAutoSpeak';
import { detectDisease } from '../lib/gemini';
import { DiseaseDetection } from '../types';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

const DiseaseScanner: React.FC = () => {
  const { t, language } = useLocalization();
  const { speak } = useSpeech();
  useAutoSpeak('speakDiseaseScannerIntro');

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [base64Image, setBase64Image] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<DiseaseDetection | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = (reader.result as string).split(',')[1];
        setImagePreview(reader.result as string);
        setBase64Image(base64String);
        setResult(null);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => e.preventDefault();
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!base64Image) return;
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const detectionResult = await detectDisease(base64Image, language);
      setResult(detectionResult);
      speak('speakAnalysisComplete');
    } catch (err) {
      setError(t('diseaseScannerError'));
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  
  const resetScanner = () => {
      setImagePreview(null);
      setBase64Image(null);
      setResult(null);
      setError(null);
  };

  const handleUploadClick = () => {
    speak('speakUploadArea');
    fileInputRef.current?.click();
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <header>
        <h1 className="text-4xl font-black text-stone-900 tracking-tighter">{t('diseaseScannerTitle')}</h1>
        <p className="text-stone-500 font-medium mt-1">{t('diseaseScannerSubtitle')}</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
            {!imagePreview && (
                 <motion.div 
                    className="border-4 border-dashed border-stone-200 rounded-2xl p-12 text-center cursor-pointer hover:border-emerald-500 transition-colors"
                    onClick={handleUploadClick}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                 >
                    <UploadCloud className="w-16 h-16 mx-auto text-stone-300 mb-4" />
                    <p className="font-bold text-stone-600">{t('diseaseScannerUploadLabel')}</p>
                    <p className="text-sm text-stone-400 mt-1">PNG, JPG, WEBP</p>
                    <input type="file" accept="image/*" ref={fileInputRef} onChange={e => e.target.files && handleFileChange(e.target.files[0])} className="hidden" />
                </motion.div>
            )}
            {imagePreview && (
                <div className="relative">
                    <img src={imagePreview} alt="Crop preview" className="rounded-2xl w-full h-auto object-cover" />
                    <button onClick={resetScanner} className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/70">
                        <X size={20}/>
                    </button>
                </div>
            )}
             <Button onClick={handleSubmit} disabled={!imagePreview || isLoading} className="mt-6" onFocus={() => speak('speakAnalyzeCropBtn')}>
                {isLoading ? t('diseaseScannerAnalyzing') : 'Analyze Crop'}
            </Button>
        </Card>

        <div>
            {isLoading && <div className="text-center p-8 font-bold">{t('diseaseScannerAnalyzing')}</div>}
            {error && <div className="text-center p-8 font-bold text-red-600 flex items-center justify-center gap-2"><AlertTriangle/>{error}</div>}
            {result && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <Card title={t('diseaseScannerResultTitle')} icon={<CheckCircle />}>
                        <div className="space-y-6">
                            <h2 className="text-3xl font-bold text-emerald-700">{result.diseaseName}</h2>
                            <div className="grid grid-cols-2 gap-4">
                                <div><p className="text-sm text-stone-500 font-bold">{t('diseaseScannerResultConfidence')}</p><p className="text-xl font-black">{result.confidence}%</p></div>
                                <div><p className="text-sm text-stone-500 font-bold">{t('diseaseScannerResultSeverity')}</p><p className="text-xl font-black">{result.severity}</p></div>
                            </div>
                             <div>
                                <h3 className="font-bold mb-2">{t('diseaseScannerResultExplanation')}</h3>
                                <p className="text-stone-600">{result.explanation}</p>
                            </div>
                            <div>
                                <h3 className="font-bold mb-2">{t('diseaseScannerResultTreatment')}</h3>
                                <ul className="list-decimal list-inside space-y-1 text-stone-600">
                                    {result.treatmentSteps.map((step, i) => <li key={i}>{step}</li>)}
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-bold mb-2">{t('diseaseScannerResultCost')}</h3>
                                <p className="text-xl font-black">₹{result.estimatedCostINR}</p>
                            </div>
                             <div>
                                <h3 className="font-bold mb-2">{t('diseaseScannerResultPrevention')}</h3>
                                 <ul className="list-disc list-inside space-y-1 text-stone-600">
                                    {result.preventiveMeasures.map((step, i) => <li key={i}>{step}</li>)}
                                </ul>
                            </div>
                        </div>
                    </Card>
                </motion.div>
            )}
        </div>
      </div>
    </div>
  );
};

export default DiseaseScanner;
