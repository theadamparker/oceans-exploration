<script setup lang="ts">
import SectionHero from './components/SectionHero.vue';
import IntroOctopus from './components/IntroOctopus.vue';
import SectionFisheries from './components/SectionFisheries.vue';
import OceanCards from './components/OceanCards.vue';
import SectionTurningTide from './components/SectionTurningTide.vue';

</script>

<template>
  <div>
    <SectionHero />
    <IntroOctopus />
    <SectionFisheries />
    <OceanCards />
    <SectionTurningTide />
  </div>
</template>

<style scoped lang="scss">
@use './assets/scss/breakpoints' as bp;

</style>
