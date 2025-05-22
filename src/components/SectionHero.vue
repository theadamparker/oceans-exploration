<template>
  <section>
    <div class="titleWrap">
      <h1 class="title" v-html="t('hero.title')"></h1>
      <p class="subtitle">{{ t('hero.subtitle') }}</p>
    </div>
    <div class="sailboat">
      <img src="../assets/img/sailing.webp" alt="">
    </div>
    <img src="../assets/img/water-gradient.webp" alt="" class="wave">
  </section>
</template>
<script setup>
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>
<style lang="scss" scoped>
@use '../assets/scss/breakpoints' as bp;
section {
  height: 100dvh;
  text-align: center;
  background: linear-gradient(180deg, #008DFF 23.08%, #C4DFFC 64.42%);
  background-attachment: fixed;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  z-index: -1;
}

.titleWrap {
  position: fixed;
  z-index: 2;
}

.subtitle {
  font-size: 30px;
  line-height: 1.142;
  @include bp.devicebreak(medium) {
    font-size: 35px;
  }
}

.wave {
  width: 100%;
  height: 40vh;
  object-fit: cover;
  object-position: center top;
  position: absolute;
  top: 60vh;
  z-index: 3;
  background-image: linear-gradient(180deg, #1b2e4900 48%, #1b2e49a5 50%, #1B2E49 90%);
}
@keyframes sail {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100vw);
  }
}

.sailboat {
  position: absolute;
  height: 70vh;
  bottom: 19vh;
  z-index: 1;
  right: 0;
  animation: sail 10s infinite linear;

  @include bp.devicebreak(medium) {
    animation-duration: 25s;
    bottom: 21vh;
  }
  img {
    height: 100%;
    width: auto;
    max-width: none;
  }
}
</style>