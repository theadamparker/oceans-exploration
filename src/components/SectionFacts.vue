<template>
  <section>
    <div class="grid-container">
      <h2>The facts at sea<br>Plastics</h2>
      <div class="grid-x grid-margin-x">
        <div class="small-12 medium-4">
          <img src="../assets/img/card-1-en.webp" alt="">
          <h3 class="h5">Marine pollution</h3>
          <p>Marine pollution is reaching extreme levels. In 2021 there were more than 17 million metric tonnes of plastic in the oceans, and figure that’s expected to double by 2040.</p>
        </div>
        <div class="small-12 medium-4">
          <img src="../assets/img/card-2-en.webp" alt="">
          <h3 class="h5">Single use plastic</h3>
          <p>About 89 percent of plastic found on the ocean floor is single use. And every year an estimated 5 to 12 million metric tonnes of plastics enters the ocean.</p>
        </div>
        <div class="small-12 medium-4">
          <img src="../assets/img/card-3-en.webp" alt="">
          <h3 class="h5">2040</h3>
          <p>And yet, by 2040, up to 37 million tonnes of plastic could pollute the oceans every year. This is not only an environmental catastrophe, it’s an economic liability. Clean up and financial losses cost around US$13 billion a year.</p>
        </div>
      </div>
    </div>
  </section>
</template>
<style lang="scss" scoped>
@use '../assets/scss/breakpoints' as bp;
section {
  background: #008DFF;
  padding: 150px 12px;
  margin: 0;
  position: relative;
  color: #1B2E49;

  @include bp.devicebreak(medium) {
    padding: 300px 24px;
  }
}
</style>