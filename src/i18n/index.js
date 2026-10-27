import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en';
import fa from './locales/fa';
import ps from './locales/ps';

export const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'fa', label: 'دری' },
  { code: 'ps', label: 'پښتو' },
];

// Deep-merge locale dictionaries with English so every UI key always resolves.
// Existing localized strings override English; missing keys have a safe fallback
// instead of rendering raw translation keys or blank components.
function deepMerge(base, localized) {
  const out = { ...base };
  for (const [key, value] of Object.entries(localized || {})) {
    out[key] = value && typeof value === 'object' && !Array.isArray(value)
      ? deepMerge(base?.[key] && typeof base[key] === 'object' ? base[key] : {}, value)
      : value;
  }
  return out;
}

const resources = {
  en: { translation: en },
  fa: { translation: deepMerge(en, fa) },
  ps: { translation: deepMerge(en, ps) },
};

function getInitialLanguage() {
  try {
    const saved = localStorage.getItem('lang');
    if (saved && resources[saved]) return saved;
  } catch (e) {
    /* storage unavailable */
  }
  return 'en';
}

// Keep <html lang> and <html dir> in sync so Tailwind logical utilities flip for RTL.
function applyDocumentLanguage(code) {
  const meta = resources[code].translation.meta;
  document.documentElement.lang = meta.htmlLang;
  document.documentElement.dir = meta.dir;
  try {
    localStorage.setItem('lang', code);
  } catch (e) {
    /* storage unavailable */
  }
}

i18n.use(initReactI18next).init({
  resources,
  lng: getInitialLanguage(),
  fallbackLng: 'en',
  returnObjects: true,
  interpolation: { escapeValue: false },
});

applyDocumentLanguage(i18n.language);
i18n.on('languageChanged', applyDocumentLanguage);

export default i18n;
