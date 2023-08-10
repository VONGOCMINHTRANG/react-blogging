import i18n from 'i18next'
import enLanguage from '../locales/en/translation'
import viLanguage from '../locales/vi/translation'
import ciLanguage from '../locales/ci/translation'
import LanguageDetector from 'i18next-browser-languagedetector'

i18n.use(LanguageDetector).init({
  // init data
  resources: {
    en: {
      translation: enLanguage,
    },
    vi: {
      translation: viLanguage,
    },
    ci: {
      translation: ciLanguage,
    },
  },
  // if you're using a language detector, do not define the lng option
  lng: localStorage.getItem('language') ?? 'en',
  fallbackLng: 'en',
  interpolation: {
    // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    escapeValue: false,
  },
  detection: {
    order: ['localStorage', 'navigator'],
    lookupQuerystring: 'lng',
    lookupLocalStorage: 'language',
    caches: ['localStorage'],
  },
})

export default i18n
