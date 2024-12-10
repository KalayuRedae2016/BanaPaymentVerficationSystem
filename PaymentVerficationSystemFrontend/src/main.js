import './style.css';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import globals from './globals/globals1.js';
import './assets/global.css'; // Import the global CSS
import { createI18n } from 'vue-i18n';
import amharicMessages from '../locales/amharic.json';
import englishMessages from '../locales/english.json';
import tigrignaMessages from '../locales/tigrigna.json';
import apiClientPlugin from "./store/plugins/apiClientPlugin";

// Set the default language
const defaultLocale = 'amharic';

const i18n = createI18n({
  locale: defaultLocale, // Set Amharic as the default language
  fallbackLocale: 'english', // Set a fallback language
  messages: {
    amharic: amharicMessages,
    english: englishMessages,
    tigrigna: tigrignaMessages,
  },
});

createApp(App)
  .use(store)
  .use(globals)
  .use(router)
  .use(i18n)
  .use(apiClientPlugin)
  .mount('#app');
