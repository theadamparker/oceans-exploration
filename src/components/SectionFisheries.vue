<script setup>
import wavePatternWhite from '../assets/img/pattern-wave-white.png';

// Make the image URL available to the style section via CSS custom property
const wavePattern = `url(${wavePatternWhite})`;
</script>

<template>
  <section>
    <div class="grid-container">
      <div class="grid-x">
        <p class="small-12 large-8 large-offset-2 h3">Marine fisheries provide 57 million jobs, and in least developed countries fish is the primary source of protein for more than half the population.</p>
      </div>
      <div class="grid-x">
        <figure>
          <div>
            <img src="../assets/img/photo-fiji.jpg" alt="" />
          </div>
          <figcaption>
            <p>
              Like in the Fiji Islands, where coastal communities depend on the sea, the ocean is a lifeline—providing food, income, and cultural identity. Women play a vital role in small-scale fisheries, harvesting marine resources like octopus that sustain both livelihoods and local nutrition.
            </p>
            <div class="credits">
              <strong>Photo:</strong> UNDP Fiji
            </div>
          </figcaption>
        </figure>
      </div>
      <div class="grid-x">
        <div class="small-12 large-8 large-offset-2">
          <p>Ocean-related tourism grows by an estimated US$134 billion a year and supports a third of the world’s workers.</p>
          <p>Yet our oceans are in deep trouble. They are 30 percent more acidic than in pre-industrial times. Ocean heat is at record levels.</p>
          <p>Drowning in plastic, suffering from destructive overfishing, one of our most precious natural resources could soon be on life support, with devastating consequences.</p>
        </div>
      </div>
      
    </div>


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
    padding: 50px 0 100px;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 36px;
    background-image: v-bind(wavePattern);
    background-repeat: repeat-x;
  }
}

figure {
  margin: 100px auto;
  @include bp.devicebreak(medium) {
    margin: 150px auto;
  }
}

figcaption {
  border-color: white;
  p {
    color: white;
  }
  .credits {
    color: white;
  }
}
</style>