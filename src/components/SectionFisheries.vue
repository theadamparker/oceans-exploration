<script setup>
import wavePatternWhite from '../assets/img/pattern-wave-white.png';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

// Make the image URL available to the style section via CSS custom property
const wavePattern = `url(${wavePatternWhite})`;
</script>

<template>
  <section>
    <div class="grid-container">
      <div class="grid-x">
        <p class="small-12 large-8 large-offset-2 h3">{{ t('sections.fisheries.mainText') }}</p>
      </div>
      <div class="grid-x">
        <figure>
          <div>
            <img src="../assets/img/photo-fiji.jpg" alt="" />
          </div>
          <figcaption>
            <p>
              {{ t('sections.fisheries.figureCaption') }}
            </p>
            <div class="credits">
              <strong>{{ t('common.photo') }}:</strong> {{ t('sections.fisheries.photoCredit') }}
            </div>
          </figcaption>
        </figure>
      </div>
      <div class="grid-x">
        <div class="small-12 large-8 large-offset-2">
          <p>{{ t('sections.fisheries.tourismText') }}</p>
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

.coralWrap {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  overflow: hidden;

  img {
    width: 160px;
    @include bp.devicebreak(medium) {
      width: 300px;
    }
    @include bp.devicebreak(xlarge) {
      width: 500px;
    }
  }

  .left {
    transform: translate(-30%, 30%);
  }

  .right {
    transform: translate(30%, 30%);
  }
}
</style>