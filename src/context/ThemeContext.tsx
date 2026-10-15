import React, { createContext, useContext, useState, useEffect } from 'react';

interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
  lang: 'ar' | 'fr';
  setLang: (lang: 'ar' | 'fr') => void;
  toggleLang: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  isDarkMode: false,
  toggleTheme: () => {},
  lang: 'ar',
  setLang: () => {},
  toggleLang: () => {}
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('mezdohub_dark_mode');
      if (saved !== null) {
        return saved === 'true';
      }
      return false; // Default to Professional Light (#FFFFFF / #F8FAFC)
    } catch {
      return false;
    }
  });

  const [lang, setLangState] = useState<'ar' | 'fr'>(() => {
    try {
      const saved = localStorage.getItem('mezdohub_lang');
      if (saved === 'fr' || saved === 'ar') return saved;
      return 'ar';
    } catch {
      return 'ar';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('mezdohub_dark_mode', String(isDarkMode));
    } catch {}
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    try {
      localStorage.setItem('mezdohub_lang', lang);
    } catch {}
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  const toggleTheme = () => setIsDarkMode(prev => !prev);
  const setLang = (newLang: 'ar' | 'fr') => setLangState(newLang);
  const toggleLang = () => setLangState(prev => prev === 'ar' ? 'fr' : 'ar');

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, lang, setLang, toggleLang }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
