import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './style.css'
import App from './App.vue'
import messages from './locales'

// Initialize theme from localStorage or OS preference
const initTheme = () => {
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = savedTheme || (prefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-bs-theme', theme);
};

// Initialize language from localStorage or browser
const initLang = () => {
  const savedLang = localStorage.getItem('language');
  if (savedLang && ['en', 'zh', 'es', 'de', 'fr', 'th'].includes(savedLang)) {
    return savedLang;
  }
  
  // Try to get browser language
  const browserLang = navigator.language.split('-')[0];
  if (['en', 'zh', 'es', 'de', 'fr', 'th'].includes(browserLang)) {
    return browserLang;
  }
  
  // Default to English
  return 'en';
};

// Create i18n instance
const i18n = createI18n({
  legacy: false,
  locale: initLang(),
  fallbackLocale: 'en',
  messages
});

initTheme();
const app = createApp(App);
app.use(i18n);
app.mount('#app');
