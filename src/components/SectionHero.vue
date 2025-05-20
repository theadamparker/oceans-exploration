<template>
  <section>
    <div class="titleWrap">
      <h1 class="title">Turning <br>the tide</h1>
      <p class="subtitle">Charting the way to a sustainable ocean economy</p>
    </div>
    <div class="sailboat">
      <img src="../assets/img/sailing.webp" alt="">
    </div>
    <img src="../assets/img/hero-wave.png" alt="" class="wave">
  </section>
</template>
<style lang="scss" scoped>
@use '../assets/scss/breakpoints' as bp;
section {
  height: 100dvh;
  text-align: center;
  background: linear-gradient(180deg, #008DFF 23.08%, #C4DFFC 64.42%);
  background-attachment: fixed;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  z-index: -1;
}

.titleWrap {
  position: fixed;
  z-index: 2;
}

.subtitle {
  font-size: 30px;
  line-height: 1.142;
  @include bp.devicebreak(medium) {
    font-size: 35px;
  }
}

.wave {
  width: 100%;
  height: 40vh;
  object-fit: cover;
  object-position: center top;
  position: absolute;
  top: 60vh;
  z-index: 3;
}

.sailboat {
  position: absolute;
  top: 15vh;
  z-index: 1;
  @include bp.devicebreak(medium) {
    height: 70vh;
  }
  img {
    height: 100%;
    width: auto;
  }
}
</style>