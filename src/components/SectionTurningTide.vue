<template>
  <section>
    <div class="grid-container">
      <div class="grid-x">
        <div class="small-12 large-8 cell">
          <h2 class="h3">{{ t('sections.turningTide.title') }}</h2>
          <p>{{ t('sections.turningTide.paragraph1') }}</p>
          <p>{{ t('sections.turningTide.paragraph2') }}</p>
        </div>
      </div>
      <div class="grid-x fish-wrap">
        <div class="fish">
          <video autoplay loop muted playsinline>
            <source src="../assets/img/fish-ios.mov" type='video/mp4; codecs="hvc1"'>
            <source src="../assets/img/fish.webm" type="video/webm">
          </video>
        </div>
        <div class="small-12 large-8 large-offset-4 cell large-text">
          <p>{{ t('sections.turningTide.paragraph3') }}</p>
          <p>{{ t('sections.turningTide.paragraph4') }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<style lang="scss" scoped>
@use '../assets/scss/breakpoints' as bp;

@keyframes swim {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100vw);
  }
}

section {
  background: #1B2E49;
  padding: 150px 12px;
  margin: 0;
  position: relative;
  color: white;
  overflow: hidden;

  @include bp.devicebreak(medium) {
    padding: 300px 24px;
  }
}

.large-text {
  margin-top: 120px;

  p {
    font-size: 35px;
    line-height: 1.142;
  }
}

.fish-wrap {
  flex-direction: column-reverse;
  @include bp.devicebreak(medium) {
    flex-direction: row;
  }
}

.fish {
  position: static;
  left: 0;
  animation: swim 5s infinite linear;
  pointer-events: none;
  @include bp.devicebreak(medium) {
    position: absolute;
    margin-top: 380px;
    animation-duration: 10s;
  }
  
  img {
    width: auto;
    height: auto;
    max-width: 300px;
    @include bp.devicebreak(medium) {
      max-width: 500px;
    }
  }
}
</style>