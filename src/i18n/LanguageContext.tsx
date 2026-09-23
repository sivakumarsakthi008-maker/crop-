import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  SupportedLanguage,
  SUPPORTED_LANGUAGES,
  translations,
  TranslationKey,
  LanguageOption,
  getLocalizedCropName,
  getLocalizedCategory,
  getLocalizedPreset
} from './translations';

interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: (key: TranslationKey) => string;
  localizeCropName: (name: string) => string;
  localizeCategory: (category: string) => string;
  localizePreset: (presetId: string, defaultTitle: string, defaultSub: string) => { title: string; subtitle: string };
  currentLanguageOption: LanguageOption;
  supportedLanguages: LanguageOption[];
}

const STORAGE_KEY = 'smart_crop_advisor_language';

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<SupportedLanguage>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && (saved in translations)) {
        return saved as SupportedLanguage;
      }
      // Check browser language
      const navLang = navigator.language?.slice(0, 2);
      if (navLang && (navLang in translations)) {
        return navLang as SupportedLanguage;
      }
    } catch {
      // ignore
    }
    return 'en';
  });

  const setLanguage = (newLang: SupportedLanguage) => {
    setLanguageState(newLang);
    try {
      localStorage.setItem(STORAGE_KEY, newLang);
      document.documentElement.lang = newLang;
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: TranslationKey): string => {
    const langDict = translations[language] || translations.en;
    return langDict[key] || translations.en[key] || key;
  };

  const localizeCropName = (name: string): string => {
    return getLocalizedCropName(name, language);
  };

  const localizeCategory = (category: string): string => {
    return getLocalizedCategory(category, language);
  };

  const localizePreset = (presetId: string, defaultTitle: string, defaultSub: string) => {
    return getLocalizedPreset(presetId, language, defaultTitle, defaultSub);
  };

  const currentLanguageOption =
    SUPPORTED_LANGUAGES.find((l) => l.code === language) || SUPPORTED_LANGUAGES[0];

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        localizeCropName,
        localizeCategory,
        localizePreset,
        currentLanguageOption,
        supportedLanguages: SUPPORTED_LANGUAGES
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
};

