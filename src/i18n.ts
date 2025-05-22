import { createI18n } from 'vue-i18n';
import en from './locales/en.ts';
import es from './locales/es.ts';
import fr from './locales/fr.ts';

const i18n = createI18n({
  legacy: false, // Use Composition API mode
  globalInjection: true, // Make translation functions available in templates
  locale: 'en', // Default language
  fallbackLocale: 'en', // Fallback if translation is missing
  messages: {
    en,
    es,
    fr
  }
});

export default i18n;
