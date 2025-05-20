<script setup lang="ts">
import IntroOctopus from './components/IntroOctopus.vue';
import SectionFisheries from './components/SectionFisheries.vue';
import OceanCards from './components/OceanCards.vue';
import SectionTurningTide from './components/SectionTurningTide.vue';

</script>

<template>
  <div>
    <IntroOctopus />
    <SectionFisheries />
    <OceanCards />
    <SectionTurningTide />
  </div>
</template>

<style scoped lang="scss">
@use './assets/scss/breakpoints' as bp;

</style>
