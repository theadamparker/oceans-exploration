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
.ocean-card {
  background-color: #f0f8ff;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 240px;
  height: 100%;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &__heading {
    color: #1B2E49;
    margin-top: 0;
    margin-bottom: 1rem;
    font-size: 44px;
    font-weight: 900;
  }

  &__description {
    color: #000;
    line-height: 1.5;
    margin: 0;
    font-size: 16px;
  }
}
</style>