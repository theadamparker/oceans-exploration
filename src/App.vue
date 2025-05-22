<script setup lang="ts">
import { watch, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';

const { locale } = useI18n();

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
