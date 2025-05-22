<script setup lang="ts">
import { watch, onMounted, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useHead } from '@vueuse/head';

const { locale, t } = useI18n();

// Function to update the HTML lang attribute
const updateHtmlLang = (lang: string) => {
  document.documentElement.lang = lang;
};

// Watch for changes in locale and update the HTML lang attribute
watch(locale, (newLocale) => {
  updateHtmlLang(newLocale);
});

// Set the initial HTML lang attribute when the component is mounted
onMounted(() => {
  updateHtmlLang(locale.value);
});

// Computed properties for dynamic meta tags
const pageTitle = computed(() => {
  return t('meta.title');
});

const pageDescription = computed(() => {
  return t('meta.description');
});

const canonicalUrl = computed(() => {
  const baseUrl = import.meta.env.PROD 
    ? 'https://yourusername.github.io/turning-the-tide' 
    : 'http://localhost:5173';
  
  let path = '';
  if (locale.value === 'es') {
    path = '/es/';
  } else if (locale.value === 'fr') {
    path = '/fr/';
  } else {
    path = '/';
  }
  
  return `${baseUrl}${path}`;
});

// Set up head meta tags for SEO
useHead({
  title: pageTitle,
  meta: [
    { name: 'description', content: pageDescription },
    { property: 'og:title', content: pageTitle },
    { property: 'og:description', content: pageDescription },
    { property: 'og:url', content: canonicalUrl },
    { property: 'og:type', content: 'website' },
    { property: 'og:image', content: '/img/cards-ocean.jpg' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: pageTitle },
    { name: 'twitter:description', content: pageDescription },
    { name: 'twitter:image', content: '/img/cards-ocean.jpg' },
  ],
  link: [
    { rel: 'canonical', href: canonicalUrl },
    { 
      rel: 'alternate', 
      href: import.meta.env.PROD 
        ? 'https://yourusername.github.io/turning-the-tide/' 
        : 'http://localhost:5173/',
      hreflang: 'en' 
    },
    { 
      rel: 'alternate', 
      href: import.meta.env.PROD 
        ? 'https://yourusername.github.io/turning-the-tide/es/' 
        : 'http://localhost:5173/es/',
      hreflang: 'es' 
    },
    { 
      rel: 'alternate', 
      href: import.meta.env.PROD 
        ? 'https://yourusername.github.io/turning-the-tide/fr/' 
        : 'http://localhost:5173/fr/',
      hreflang: 'fr' 
    },
  ],
  htmlAttrs: {
    lang: locale,
  },
});
</script>

<template>
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

<style scoped lang="scss">
@use './assets/scss/breakpoints' as bp;

</style>
