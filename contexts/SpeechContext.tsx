
import React, { createContext, useContext, useState, ReactNode, useCallback, PropsWithChildren, useEffect } from 'react';
import { useLocalization } from './LocalizationContext';

interface SpeechContextType {
  isMuted: boolean;
  toggleMute: () => void;
  speak: (textKey: string, dynamicValues?: Record<string, string | number>) => void;
}

const SpeechContext = createContext<SpeechContextType | undefined>(undefined);

const languageToVoiceLang = {
  en: 'en-US',
  te: 'te-IN',
  hi: 'hi-IN',
  ur: 'ur-IN',
};

export const SpeechProvider = ({ children }: PropsWithChildren) => {
  const [isMuted, setIsMuted] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const { language, t } = useLocalization();

  useEffect(() => {
    const loadVoices = () => {
      setVoices(window.speechSynthesis.getVoices());
    };
    
    // Voices are loaded asynchronously.
    window.speechSynthesis.onvoiceschanged = loadVoices;
    loadVoices(); // Initial load

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  const speak = useCallback((textKey: string, dynamicValues?: Record<string, string | number>) => {
    if (isMuted || typeof window === 'undefined' || !window.speechSynthesis) return;

    let textToSpeak = t(textKey as any);

    if (dynamicValues) {
        Object.keys(dynamicValues).forEach(key => {
            const regex = new RegExp(`{{${key}}}`, 'g');
            textToSpeak = textToSpeak.replace(regex, String(dynamicValues[key]));
        });
    }

    window.speechSynthesis.cancel(); // Cancel any ongoing speech
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    
    const targetLang = languageToVoiceLang[language] || 'en-US';
    utterance.lang = targetLang;

    // Find a matching voice for better quality
    const bestVoice = voices.find(voice => voice.lang === targetLang);
    if (bestVoice) {
      utterance.voice = bestVoice;
    }
    
    utterance.rate = 0.9; // Slower pace for clarity
    utterance.pitch = 1.0;
    window.speechSynthesis.speak(utterance);
  }, [isMuted, language, t, voices]);

  const toggleMute = () => {
    setIsMuted(prev => {
        const newMutedState = !prev;
         if (newMutedState) {
          window.speechSynthesis.cancel();
        }
        return newMutedState;
    });
  };

  return (
    <SpeechContext.Provider value={{ isMuted, toggleMute, speak }}>
      {children}
    </SpeechContext.Provider>
  );
};

export const useSpeech = () => {
  const context = useContext(SpeechContext);
  if (context === undefined) {
    throw new Error('useSpeech must be used within a SpeechProvider');
  }
  return context;
};
