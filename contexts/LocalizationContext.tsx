
import React, { createContext, useContext, useState, ReactNode, useEffect, PropsWithChildren, useCallback } from 'react';
import { translations, Translation } from '../locales/translations';

type Language = 'en' | 'te' | 'hi' | 'ur';

interface LocalizationContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: keyof Translation['ui'], dynamicValues?: Record<string, string | number>) => string;
}

const LocalizationContext = createContext<LocalizationContextType | undefined>(undefined);

export const LocalizationProvider = ({ children }: PropsWithChildren) => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const savedLang = localStorage.getItem('krushi_mitra_language') as Language;
    if (savedLang && ['en', 'te', 'hi', 'ur'].includes(savedLang)) {
      setLanguage(savedLang);
    }
  }, []);

  const handleSetLanguage = useCallback((lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('krushi_mitra_language', lang);
  }, []);

  const t = (key: keyof Translation['ui'], dynamicValues?: Record<string, string | number>) => {
    const translationSet = translations[language] || translations.en;
    let text = translationSet.ui[key] || translations.en.ui[key] || String(key);

    if (dynamicValues) {
        Object.keys(dynamicValues).forEach(placeholder => {
            const regex = new RegExp(`{{${placeholder}}}`, 'g');
            text = text.replace(regex, String(dynamicValues[placeholder]));
        });
    }

    return text;
  };

  return (
    <LocalizationContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LocalizationContext.Provider>
  );
};

export const useLocalization = () => {
  const context = useContext(LocalizationContext);
  if (context === undefined) {
    throw new Error('useLocalization must be used within a LocalizationProvider');
  }
  return context;
};