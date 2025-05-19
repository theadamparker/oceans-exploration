<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import type { ComponentPublicInstance } from 'vue'
import SingleOceanCard from './SingleOceanCard.vue'
import cardsOceanImage from '../assets/img/cards-ocean.jpg'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

// Make the image accessible to the template
const oceanCardsBackgroundImage = cardsOceanImage

// Create refs for the container and each card
const containerRef = ref<HTMLElement | null>(null)
// Type that can handle both DOM elements and Vue component instances
type ElementOrComponentRef = Element | ComponentPublicInstance | null
const cardRefs = ref<ElementOrComponentRef[]>(Array(6).fill(null)) // Pre-initialize array with 6 null elements

// Background position states
const backgroundPosition = ref('916px 355px')  // Default state position

// Define focal points for each card as x/y pixel coordinates
const focalPoints = [
  '675px 980px',   // 1. 71% card
  '1004px 949px',  // 2. CO2 card
  '885px 1444px',  // 3. $2.3 billion card
  '634px 1891px',  // 4. GDP card
  '1016px 1967px', // 5. Oxygen card
  '834px 2340px'   // 6. SDG 14 card
]

onMounted(() => {
  // No need for ScrollTrigger pinning since we're using position: sticky
  // We're only setting up triggers for card animations and background position changes

  // Set up triggers for each card to update background position
  setTimeout(() => {
    cardRefs.value.forEach((cardEl, index) => {
      if (!cardEl) return;

      // We need to ensure we're working with a DOM element
      const element = cardEl instanceof Element ? cardEl : (cardEl as ComponentPublicInstance).$el;
      if (!(element instanceof Element)) return;

      // Create ScrollTrigger for each card
      ScrollTrigger.create({
        trigger: element,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => {
          console.log(`Card ${index} entered view, updating background to ${focalPoints[index]}`);
          backgroundPosition.value = focalPoints[index];
          element.classList.add('in-view');
        },
        onLeave: () => {
          element.classList.remove('in-view');
        },
        onEnterBack: () => {
          console.log(`Card ${index} re-entered view, updating background to ${focalPoints[index]}`);
          backgroundPosition.value = focalPoints[index];
          element.classList.add('in-view');
        },
        onLeaveBack: () => {
          element.classList.remove('in-view');
        },
      });
    });
  }, 200); // Small delay to ensure DOM is ready
})

onUnmounted(() => {
  // Clean up ScrollTrigger instances
  ScrollTrigger.getAll().forEach(trigger => trigger.kill())
})

const oceanCards = [
  {
    heading: '71%',
    description: 'Earth is more water than land—oceans cover 71 percent of the Earth\'s surface. And they play an important role in climate control'
  },
  {
    heading: 'CO2',
    description: 'They absorb about 23 percent of CO2 emissions every year and more than 90 percent of excess heat.'
  },
  {
    heading: '$2.3 billion',
    description: 'Oceans are economic powerhouses—contributes about $2.3 billion to the global economy and they feed more than 3 billion people'
  },
  {
    heading: 'GDP',
    description: 'If oceans were a country they would be fifth in GDP after Germany.'
  },
  {
    heading: 'Oxygen',
    description: 'Oceans produce 50-60 percent of all oxygen, making it vital for the survival of the planet and the species which depend on it.'
  },
  {
    heading: 'SDG 14',
    description: 'Yet, Sustainable Development Goal 14 – life below water – is the most underfunded. Less than 1 percent of climate finance goes towards protecting oceans. At the same time, unchecked exploitation is pushing marine life towards collapse.'
  }
]
</script>
<template>
  <div class="section--ocean-cards">
    <!-- Fixed background container -->
    <div ref="containerRef" class="ocean-cards-background" :style="{
      backgroundImage: `url(${oceanCardsBackgroundImage})`,
      backgroundPosition: backgroundPosition
    }">
    </div>

    <!-- Content that scrolls over background -->
    <h1 class="fontSize-m">What do oceans do for us?</h1>
    <div class="ocean-cards-content">
      <div class="ocean-cards">
        <div v-for="(card, index) in oceanCards" :key="index" :ref="el => cardRefs[index] = el" class="card-wrapper">
          <SingleOceanCard :heading="card.heading" :description="card.description" class="card-item" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
* {
  box-sizing: border-box;
}

.section--ocean-cards {
  background-color: transparent;
  width: 100%;
  position: relative;
  padding: 8rem 0;
  /* Set a min-height to ensure there's enough room for scrolling */
  min-height: 100vh;
}

.ocean-cards-background {
  padding: 0 2rem 2rem;
  width: 80%;
  border-radius: 40px;
  margin: 0 auto;
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  height: 80dvh;
  transition: background-position 1.5s ease-in-out;
  position: sticky;
  /* Use sticky positioning instead of ScrollTrigger for pinning */
  top: 10vh;
  /* Position from top of viewport */
  z-index: 1;
  /* Ensure background stays behind content */
}

.ocean-cards-content {
  position: relative;
  /* Change from absolute to relative */
  width: 100%;
  z-index: 2;
  /* Place above the background */
  pointer-events: none;
  /* Let click events pass through to background */
  margin-top: -80vh;
  /* Create overlap with the background container */
}

.ocean-cards {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 80vh;
  /* Large gap between cards */
  padding: 100vh 0 50vh;
  /* Start after viewport height and add padding at the bottom */
  width: 100%;
  pointer-events: auto;
  /* Re-enable pointer events for cards */
}

h1 {
  text-align: center;
  color: #03045e;
  margin-bottom: 2rem;
  width: 340px;
  background: #1B2E49;
  color: white;
  line-height: 1;
  text-align: left;
  padding: 2rem;
  margin-top: 0;
  border-radius: 0 0 30px 30px;
  z-index: 2;
  position: relative;
  margin-left: 5%;
}

.card-wrapper {
  display: flex;
  justify-content: center;
  min-height: 200px;
  padding: 0 10vw 0 30vw;
  transition: opacity 0.5s ease, transform 0.5s ease;

  &.in-view {
    opacity: 1;
    transform: scale(1);
  }

  &:not(.in-view) {
    opacity: 0.8;
    transform: scale(0.95);
  }

  &:nth-of-type(2) {
    align-self: flex-start;
  }

  &:nth-of-type(3) {
    align-self: flex-end;
  }

  &:nth-of-type(5) {
    align-self: flex-start;
  }

  &:nth-of-type(6) {
    align-self: flex-end;
  }
}
</style>