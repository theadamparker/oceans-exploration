<template>
  <section>
    <p>The <strong>health of oceans</strong> is deeply tied to the health of the planet and our economies—millions of people across the world depend on them <strong class="blue">for sustenance, security and livelihoods.</strong></p>
    <video autoplay loop muted playsinline class="video">
      <source src="./../assets/img/octopus.webm" type="video/webm">
      Your browser does not support the video tag.
    </video>
  </section>
</template>
<style lang="scss" scoped>
@use '../assets/scss/breakpoints' as bp;

section {
  background: #1B2E49;
  padding: 180px 12px;
  margin: 0;
  position: relative;
  @include bp.devicebreak(medium) {
    padding: 300px 24px;
  }
}

p {
  color: white;
  font-size: 25px;
  line-height: 1.142;
  max-width: 750px;
  @include bp.devicebreak(medium) {
    font-size: 40px;
    
  }
  @include bp.devicebreak(large) {
    font-size: 48px;
    margin: 0 8.33%;
  }
}

.blue {
  color: #008DFF;
}

video {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  top: 0;
  left: 0;
  pointer-events: none;
}
</style>