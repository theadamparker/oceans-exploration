<script setup lang="ts">
defineProps<{
  heading: string;
  description: string;
}>();
</script>
<template>
  <div class="ocean-card">
    <h2 class="ocean-card__heading">{{ heading }}</h2>
    <p class="ocean-card__description">{{ description }}</p>
  </div>
</template>

<style lang="scss" scoped>
@use '../assets/scss/breakpoints' as bp;

.ocean-card {
  background-color: #f0f8ff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  padding: 2rem 1.25rem;

  @include bp.devicebreak(medium) {
    width: 240px;
  }

  @include bp.devicebreak(xlarge) {
    width: 440px;
    padding: 2rem;
    border-radius: 20px;
  }

  &__heading {
    color: #1B2E49;
    margin-top: 0;
    margin-bottom: 1rem;
    font-size: 36px;
    font-weight: 900;
    
    @include bp.devicebreak(medium) {
      font-size: 44px;
    }

    @include bp.devicebreak(xlarge) {
      font-size: 64px;
    }
  }

  &__description {
    color: #000;
    line-height: 1.5;
    margin: 0;
    font-size: 16px;

    @include bp.devicebreak(xlarge) {
      font-size: 20px;
    }
  }
}
</style>