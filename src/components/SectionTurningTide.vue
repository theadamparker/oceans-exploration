<template>
  <section>
    <div class="grid-container">
      <div class="grid-x">
        <div class="small-12 large-8 cell">
          <h3>Turning the tide</h3>
          <p>UNDP is committed to raising awareness of the ocean’s crucial role in maintaining ecosystem health and
            supporting blue and green economies. We focus on governance, financing, innovation, and we advocate for
            global
            cooperation to protect and sustainably use the ocean.</p>
          <p>We help countries to meet their ocean targets through their National Biodiversity Action Plans, which align
            with their Nationally Determined Contributions. Strategic guidance and technical advice is provided through
             UNDP’s Nature Pledge, Climate Promise, and Ocean Promise.</p>
        </div>
      </div>
      <div class="grid-x fish-wrap">
        <div class="fish">
          <video autoplay loop muted playsinline>
            <source src="../assets/img/fish.webm" type="video/webm">
            <source src="../assets/img/fish-ios.mov" type="video/mp4">
          </video>
        </div>
        <div class="small-12 large-8 large-offset-4 cell large-text">
          <p>This work cannot be done alone. We build diverse global, local, and Indigenous partnerships and promote
            practical solutions for ocean management.</p>
          <p>The  Ocean Innovation Challenge and Global Fund for Coral Reefs are mobilizing new sources of private and
            public funds.</p>
        </div>
      </div>
    </div>
  </section>
</template>
<style lang="scss" scoped>
@use '../assets/scss/breakpoints' as bp;

@keyframes swim {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100vw);
  }
}

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

.large-text {
  margin-top: 120px;

  p {
    font-size: 35px;
    line-height: 1.142;
  }
}

.fish-wrap {
  flex-direction: column-reverse;
  @include bp.devicebreak(medium) {
    flex-direction: row;
  }
}

.fish {
  position: static;
  left: 0;
  animation: swim 5s infinite linear;
  pointer-events: none;
  @include bp.devicebreak(medium) {
    position: absolute;
    margin-top: 380px;
    animation-duration: 10s;
  }
  
  img {
    width: auto;
    height: auto;
    max-width: 300px;
    @include bp.devicebreak(medium) {
      max-width: 500px;
    }
  }
}
</style>