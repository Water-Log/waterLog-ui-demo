'use client';

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';

// Define the available languages
export type Language = 'en' | 'tr';

// Translation map – extend as needed
const translations: Record<Language, Record<string, string>> = {
  en: {
    greeting: 'Hello',
    'app.title': 'WaterLog',
    'app.description': 'WaterLog',
    'app.generator': 'WaterLog',

    // Register Page
    'register.title': 'Register',
    'steps.1.title': 'General Information',
    'steps.1.subtitle': 'Basic information about your company',
    'steps.2.title': 'Country Selection',
    'steps.2.subtitle': 'Select your country',
    'steps.3.title': 'Company Information',
    'steps.3.subtitle': 'Your company details',
    'steps.4.title': 'Login Information',
    'steps.4.subtitle': 'Information to access your account',

    'accountType.heading': 'Account Type',
    'accountType.description': 'Please select your account type',
    'businessAccount.title': 'Business Account',
    'businessAccount.subtitle': 'Corporate user account',

    'countrySelect.heading': 'Country Selection',
    'countrySelect.description': 'Please select your country',

    'companyInfo.heading': 'Company Information',
    'companyInfo.description': 'Please enter your company details.',

    'loginInfo.heading': 'Login Information',
    'loginInfo.description': 'Please enter your account details.',

    'button.previous': 'Previous',
    'button.continue': 'Continue',
    'button.complete': 'Complete Registration',

    'status.inProgress': 'In Progress',
    'status.completed': 'Completed',
  },
  tr: {
    greeting: 'Merhaba',
    'app.title': 'SuLog',
    'app.description': 'SuLog',
    'app.generator': 'SuLog',

    // Register Page
    'register.title': 'Kayıt Ol',
    'steps.1.title': 'Genel Bilgiler',
    'steps.1.subtitle': 'Şirketinizle ilgili temel bilgileriniz',
    'steps.2.title': 'Detaylı Bilgiler',
    'steps.2.subtitle': 'Şirketinizle ilgili detaylı bilgileriniz',
    'steps.3.title': 'İletişim ve Hesap Bilgileri',
    'steps.3.subtitle': 'Şirketinizle ilgili iletişim ve hesap bilgileriniz',
    'steps.4.title': 'Kullanıcı Hesabı Bilgileri',
    'steps.4.subtitle': 'Kullanıcı hesabı bilgileriniz',

    'accountType.heading': 'Hesap Türü',
    'accountType.description': 'Lütfen hesap türünüzü seçin',
    'businessAccount.title': 'İşletme Hesabı',
    'businessAccount.subtitle': 'Kurumsal kullanıcı hesabı',

    'countrySelect.heading': 'Ülke Seçimi',
    'countrySelect.description': 'Lütfen ülkenizi seçin',

    'companyInfo.heading': 'Şirket Bilgileri',
    'companyInfo.description': 'Lütfen şirket bilgilerinizi girin.',

    'loginInfo.heading': 'Giriş Bilgileri',
    'loginInfo.description': 'Lütfen hesap bilgilerinizi girin.',

    'button.previous': 'Geri',
    'button.continue': 'Devam',
    'button.complete': 'Kaydı Tamamla',

    'status.inProgress': 'Devam Ediyor',
    'status.completed': 'Tamamlandı',
  },
};

// Define helper to get cookie on client side
function getCookie(name: string): string | undefined {
  if (typeof document === 'undefined') return undefined;
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? match[2] : undefined;
}

interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(
  undefined
);

interface LanguageProviderProps {
  children: ReactNode;
  /**
   * Optional initial language – defaults to `'en'` if not provided.
   */
  initialLanguage?: Language;
}

export function LanguageProvider({
  children,
  initialLanguage = 'en',
}: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>(initialLanguage);

  // Load persisted language on mount (client-side only)
  useEffect(() => {
    const cookieLang = getCookie('lang') as Language | undefined;
    const localLang = localStorage.getItem('lang') as Language | null;
    const saved = cookieLang ?? localLang;
    if (saved && saved !== language) {
      setLanguageState(saved);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Persist language changes (cookie + localStorage)
  useEffect(() => {
    try {
      // 1 year expiry
      document.cookie = `lang=${language}; path=/; max-age=31536000`;
      localStorage.setItem('lang', language);
    } catch (err) {
      // Ignore if cookies disabled
    }
  }, [language]);

  const setLanguage = (lang: Language) => setLanguageState(lang);

  const toggleLanguage = () =>
    setLanguageState((prev) => (prev === 'en' ? 'tr' : 'en'));

  const t = (key: string) => {
    const value = translations[language]?.[key];
    // Fallback to English if translation missing
    return value ?? translations.en[key] ?? key;
  };

  const value: LanguageContextValue = {
    language,
    setLanguage,
    toggleLanguage,
    t,
  };

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
