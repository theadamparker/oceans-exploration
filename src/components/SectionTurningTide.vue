<template>
  <section>
    turning the tide
  </section>
</template>
<style lang="scss" scoped>
@use '../assets/scss/breakpoints' as bp;
section {
  background: #1B2E49;
  padding: 150px 12px;
  margin: 0;
  position: relative;
  color: white;
  @include bp.devicebreak(medium) {
    padding: 300px 24px;
  }
}
</style>