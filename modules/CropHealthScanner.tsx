
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { UploadCloud, CheckCircle, AlertTriangle, X, FlaskConical, Bug, Leaf, Grab } from 'lucide-react';
import { useLocalization } from '../contexts/LocalizationContext';
import { useSpeech } from '../contexts/SpeechContext';
import { useAutoSpeak } from '../hooks/useAutoSpeak';
import { detectDisease, identifyPestOrWeed } from '../lib/gemini';
import { DiseaseDetection, PestWeedIdentification } from '../types';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

type AnalysisResult = DiseaseDetection | PestWeedIdentification;
type AnalysisType = 'Disease' | 'Pest' | 'Weed';

const CropHealthScanner: React.FC = () => {
  const { t, language } = useLocalization();
  const { speak } = useSpeech();
  useAutoSpeak('speakCropHealthScannerIntro');

  const [analysisType, setAnalysisType] = useState<AnalysisType>('Disease');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [base64Image, setBase64Image] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);
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
        let detectionResult: AnalysisResult;
        if (analysisType === 'Disease') {
            detectionResult = await detectDisease(base64Image, language);
        } else {
            detectionResult = await identifyPestOrWeed(base64Image, language, analysisType);
        }
        setResult(detectionResult);
        speak('speakAnalysisComplete');
    } catch (err) {
      setError(t('cropHealthScannerError'));
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

  const AnalysisTypeSelector = () => (
    <div className="mb-6">
        <label className="block text-sm font-bold text-stone-600 mb-2 ml-1 text-center">{t('cropHealthScannerSelectType')}</label>
        <div className="flex justify-center bg-stone-100 p-2 rounded-2xl border">
            <Button variant={analysisType === 'Disease' ? 'primary' : 'secondary'} onClick={() => setAnalysisType('Disease')} className="!text-sm !py-3 flex-1">{t('cropHealthScannerTypeDisease')}</Button>
            <Button variant={analysisType === 'Pest' ? 'primary' : 'secondary'} onClick={() => setAnalysisType('Pest')} className="!text-sm !py-3 flex-1">{t('cropHealthScannerTypePest')}</Button>
            <Button variant={analysisType === 'Weed' ? 'primary' : 'secondary'} onClick={() => setAnalysisType('Weed')} className="!text-sm !py-3 flex-1">{t('cropHealthScannerTypeWeed')}</Button>
        </div>
    </div>
  );

  const renderResult = () => {
    if (!result) return null;

    if ('diseaseName' in result) { // It's a DiseaseDetection
        return (
            <>
                <h2 className="text-3xl font-bold text-emerald-700">{result.diseaseName}</h2>
                <div className="grid grid-cols-2 gap-4">
                    <div><p className="text-sm text-stone-500 font-bold">{t('cropHealthScannerResultConfidence')}</p><p className="text-xl font-black">{result.confidence}%</p></div>
                    <div><p className="text-sm text-stone-500 font-bold">{t('cropHealthScannerResultSeverity')}</p><p className="text-xl font-black">{result.severity}</p></div>
                </div>
                <div><h3 className="font-bold mb-2">{t('cropHealthScannerResultExplanation')}</h3><p className="text-stone-600">{result.explanation}</p></div>
                <div><h3 className="font-bold mb-2">{t('cropHealthScannerResultTreatment')}</h3><ul className="list-decimal list-inside space-y-1 text-stone-600">{result.treatmentSteps.map((step, i) => <li key={i}>{step}</li>)}</ul></div>
                {result.suggestedProducts?.length > 0 && <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200"><h3 className="font-bold mb-2 flex items-center gap-2 text-emerald-800"><FlaskConical size={18}/>Suggested Products</h3><ul className="space-y-2">{result.suggestedProducts.map((prod, i) => <li key={i} className="text-sm"><span className="font-bold text-emerald-700">{prod.name}: </span><span className="text-emerald-600">{prod.composition}</span></li>)}</ul></div>}
                <div><h3 className="font-bold mb-2">{t('cropHealthScannerResultCost')}</h3><p className="text-xl font-black">₹{result.estimatedCostINR}</p></div>
                <div><h3 className="font-bold mb-2">{t('cropHealthScannerResultPrevention')}</h3><ul className="list-disc list-inside space-y-1 text-stone-600">{result.preventiveMeasures.map((step, i) => <li key={i}>{step}</li>)}</ul></div>
            </>
        )
    } else { // It's a PestWeedIdentification
         return (
             <>
                <h2 className="text-3xl font-bold text-emerald-700 flex items-center gap-2">{result.type === 'Pest' ? <Bug/> : <Leaf/>} {result.name}</h2>
                <div className="grid grid-cols-2 gap-4">
                    <div><p className="text-sm text-stone-500 font-bold">{t('cropHealthScannerResultConfidence')}</p><p className="text-xl font-black">{result.confidence}%</p></div>
                    <div><p className="text-sm text-stone-500 font-bold">{t('cropHealthScannerResultThreat')}</p><p className="text-xl font-black">{result.threatLevel}</p></div>
                </div>
                <div><h3 className="font-bold mb-2">{t('cropHealthScannerResultExplanation')}</h3><p className="text-stone-600">{result.description}</p></div>
                <div><h3 className="font-bold mb-2">{t('cropHealthScannerResultControl')}</h3><div className="space-y-2">{result.controlMethods.map((method, i) => <div key={i}><strong className="text-sm">{method.type}:</strong> <span className="text-sm text-stone-600">{method.description}</span></div>)}</div></div>
                {result.suggestedProducts?.length > 0 && <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200"><h3 className="font-bold mb-2 flex items-center gap-2 text-emerald-800"><FlaskConical size={18}/>Suggested Products</h3><ul className="space-y-2">{result.suggestedProducts.map((prod, i) => <li key={i} className="text-sm"><span className="font-bold text-emerald-700">{prod.name}: </span><span className="text-emerald-600">{prod.composition}</span></li>)}</ul></div>}
            </>
         )
    }
  }


  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <header>
        <h1 className="text-4xl font-black text-stone-900 tracking-tighter">{t('cropHealthScannerTitle')}</h1>
        <p className="text-stone-500 font-medium mt-1">{t('cropHealthScannerSubtitle')}</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
            <AnalysisTypeSelector />
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
                    <p className="font-bold text-stone-600">{t('cropHealthScannerUploadLabel')}</p>
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
                {isLoading ? t('cropHealthScannerAnalyzing') : `Analyze ${analysisType}`}
            </Button>
        </Card>

        <div>
            {isLoading && <div className="text-center p-8 font-bold">{t('cropHealthScannerAnalyzing')}</div>}
            {error && <div className="text-center p-8 font-bold text-red-600 flex items-center justify-center gap-2"><AlertTriangle/>{error}</div>}
            {result && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <Card title={t('cropHealthScannerResultTitle')} icon={<CheckCircle />}>
                        <div className="space-y-6">
                            {renderResult()}
                        </div>
                    </Card>
                </motion.div>
            )}
        </div>
      </div>
    </div>
  );
};

export default CropHealthScanner;