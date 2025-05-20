<template>
  <section>
    <p>Marine fisheries provide 57 million jobs, and in least developed countries fish is the primary source of protein for more than half the population.</p>
  </section>
  </template>
<style lang="scss" scoped>
  @use '../assets/scss/breakpoints' as bp;

  section {
    background: #1B2E49;
    padding: 50px 12px 100px;
    margin: 0;
    position: relative;
    color: white;
    @include bp.devicebreak(medium) {
      padding: 50px 24px 100px;
    }
  }

  p {
    font-size: 30px;
    line-height: 1.142;
    @include bp.devicebreak(medium) {
      font-size: 35px;
    }
    @include bp.devicebreak(large) {
       margin: 0 16.66%;
    }
  }
  </style>