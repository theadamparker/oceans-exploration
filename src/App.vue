<script setup lang="ts">
import IntroOctopus from './components/IntroOctopus.vue';
import SectionFisheries from './components/SectionFisheries.vue';
import OceanCards from './components/OceanCards.vue';

</script>

<template>
  <div>
    <IntroOctopus />
    <SectionFisheries />
    <OceanCards />
    <div class="section section--after">This is a section after</div>
  </div>
</template>

<style scoped lang="scss">
@use './assets/scss/breakpoints' as bp;

.section {
  min-height: 40vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;

  &--before {
    background-color: #1B2E49;
  }

  &--after {
    background-color: #1B2E49;
  }
}
</style>
