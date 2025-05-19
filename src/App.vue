<script setup lang="ts">

import OceanCards from './components/OceanCards.vue'
</script>

<template>
  <div>
    <div class="section section--before">This is a section before</div>
    <OceanCards />
    <div class="section section--after">This is a section after</div>
  </div>
</template>

<style scoped lang="scss">
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
