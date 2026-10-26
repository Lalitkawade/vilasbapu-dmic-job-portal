import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language } from '../types/candidate';
import { translations } from '../i18n/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: keyof typeof translations['mr']) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Default language is Marathi ('mr') as per requirement Section 5
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('dmic_portal_lang');
    return (saved === 'en' || saved === 'mr') ? saved : 'mr';
  });

  useEffect(() => {
    localStorage.setItem('dmic_portal_lang', language);
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const toggleLanguage = () => {
    setLanguageState(prev => (prev === 'mr' ? 'en' : 'mr'));
  };

  const t = (key: keyof typeof translations['mr']): string => {
    const dict = translations[language] || translations['mr'];
    return dict[key] || translations['mr'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
