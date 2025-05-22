<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter, useRoute } from 'vue-router';

// Using global UNDP_JS type defined in vite-env.d.ts

const { t, locale } = useI18n();
const router = useRouter();
const route = useRoute();

// Get current language from route or i18n
const currentLanguage = computed(() => {
  return locale.value === 'en' ? t('nav.english') : 
         locale.value === 'es' ? t('nav.spanish') : 
         t('nav.french');
});

const languageOptions = computed(() => [
  { code: 'en', name: t('nav.english') },
  { code: 'es', name: t('nav.spanish') },
  { code: 'fr', name: t('nav.french') },
]);

// Reference to determine if we're in development
const isDev = ref(false);

// Change language handler
const changeLanguage = (lang: string) => {
  // Get base URL from Vite config
  const baseUrl = import.meta.env.BASE_URL;
  
  // Create correct path based on language
  const path = lang === 'en' ? '/' : `/${lang}`;
  
  // If using router navigation
  if (route.path !== path && typeof router.push === 'function') {
    router.push(path);
  } else {
    // Fallback to direct navigation for static pages or non-router environments
    const targetPath = isDev.value 
      ? (lang === 'en' ? '/' : `/${lang}/`) 
      : (baseUrl + (lang === 'en' ? '' : lang + '/'));
    window.location.href = targetPath;
  }
};

// Create URLs for language links
const getLanguageUrl = (langCode: string) => {
  if (isDev.value) {
    return langCode === 'en' ? '/' : `/${langCode}/`;
  } else {
    return import.meta.env.BASE_URL + (langCode === 'en' ? '' : langCode + '/');
  }
};

// Initialize UNDP language switcher when available
const initUndpLanguageSwitcher = () => {
  // Type assertion to help TypeScript understand window.UNDP_JS is available
  const undpJs = window as any;
  if (undpJs.UNDP_JS && undpJs.UNDP_JS.languageSwitcher) {
    setTimeout(() => {
      undpJs.UNDP_JS.languageSwitcher.init();
    }, 100);
  }
};

// Add onMounted hook to initialize UNDP language switcher and check environment
onMounted(() => {
  initUndpLanguageSwitcher();
  
  // Check if we're in development
  const host = (window as any).location.hostname;
  isDev.value = host === 'localhost' || host === '127.0.0.1';
});
</script>

<template>
  <header class="country-header">
  <section class="header">
    <div class="grid-container fluid">
      <div class="grid-x grid-margin-x align-content-middle">
        <div class="cell small-8 large-2 shrink align-self-middle top-left">
          <router-link :to="locale === 'en' ? '/' : `/${locale}`" class="logo" tabindex="0" title="UNDP Logo homepage link">
            <img
              :src="locale === 'en' 
                ? 'https://cdn.jsdelivr.net/npm/@undp/design-system/docs/images/undp-logo-white.svg' 
                : 'https://cdn.jsdelivr.net/npm/@undp/design-system/docs/images/pnud-logo-white.svg'"
              :alt="locale === 'en' ? 'UNDP Logo' : 'PNUD Logo'"
            />
          </router-link>
        </div>
        <div class="cell small-3 large-auto top-right">
          <div
            class="dropdown-language"
            data-undpds-component="language-switcher"
          >
            <button
              class="white"
              :aria-label="`${currentLanguage}, ${t('nav.language')}`"
              aria-expanded="false"
            >
              {{ currentLanguage }}
            </button>
            <ul role="menu">
              <li role="menuitem" v-for="langOption in languageOptions" :key="langOption.code">
                <a v-if="locale !== langOption.code" 
                   :href="getLanguageUrl(langOption.code)" 
                   :lang="langOption.code" 
                   :hreflang="langOption.code" 
                   tabindex="-1" 
                   @click.prevent="changeLanguage(langOption.code)">{{ langOption.name }}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</header>
</template>
<style>
@import url('https://cdn.jsdelivr.net/npm/@undp/design-system/docs/css/components/country-site-header.min.css');
@import url('https://cdn.jsdelivr.net/npm/@undp/design-system/docs/css/components/language-switcher.min.css');

header {
  position: absolute;
  top: 0;
  width: 100%;
}
.country-header {
  .header {
    background-color: transparent;
    box-shadow: none;
    position: absolute;
    /* top: 0; */
  }
}
</style>