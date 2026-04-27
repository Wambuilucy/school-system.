import { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'sw' | 'fr' | 'es';

export const languages: { code: Language; label: string; flag: string }[] = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'sw', label: 'Kiswahili', flag: '🇰🇪' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
];

interface I18nContextType {
  lang: Language;
  setLang: (l: Language) => void;
}

const I18nContext = createContext<I18nContextType | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(() => (localStorage.getItem('schoollink_lang') as Language) || 'en');
  const setLang = (l: Language) => {
    setLangState(l);
    localStorage.setItem('schoollink_lang', l);
  };
  return <I18nContext.Provider value={{ lang, setLang }}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
}
