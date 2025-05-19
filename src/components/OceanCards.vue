<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import SingleOceanCard from './SingleOceanCard.vue'
import PatternWave from './PatternWave.vue'
import cardsOceanImage from '../assets/img/cards-ocean.jpg'

// Make the image accessible to the template
const oceanCardsBackgroundImage = cardsOceanImage
// const patternWaveImage = PatternWaveImg

// Create refs for the container and each card
const containerRef = ref(null)
const cardRefs = ref(Array(5).fill(null)) // Pre-initialize array with 5 null elements

// Background position states
const backgroundPosition = ref('center center')

// Define focal points for each card (adjust these values based on your image)
const focalPoints = [
  'center top',    // First card - top center of image
  '20% 30%',       // Second card - upper left area
  'center center', // Third card - center of image
  '80% 40%',       // Fourth card - upper right area
  'center bottom'  // Fifth card - bottom center of image
]

// Set up intersection observer to detect when cards are in view
let observers = []

onMounted(() => {
  // Wait a bit longer to ensure DOM is fully rendered and refs are available
  setTimeout(() => {
    console.log('Setting up observers', cardRefs.value);

    // Create an intersection observer for each card
    cardRefs.value.forEach((cardEl, index) => {
      if (!cardEl) {
        console.log(`Card ${index} ref is missing`);
        return;
      }

      console.log(`Setting up observer for card ${index}`, cardEl);

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            // When card comes into view, update background position
            if (entry.isIntersecting) {
              console.log(`Card ${index} is now visible, updating background position to ${focalPoints[index]}`);
              backgroundPosition.value = focalPoints[index];

              // Add class to the card for additional visual effects
              entry.target.classList.add('in-view');
            } else {
              // Remove class when card is not in view
              entry.target.classList.remove('in-view');
            }
          })
        },
        {
          root: null, // Use viewport as root
          threshold: 0.5, // Trigger when 50% of card is visible
          rootMargin: '-100px 0px' // Trigger a bit before the card enters the viewport
        }
      );

      observer.observe(cardEl);
      observers.push(observer);
    });
  }, 300); // Add a small delay to ensure DOM is ready
})

onUnmounted(() => {
  // Clean up observers
  observers.forEach(observer => observer.disconnect())
  observers = []
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
    heading: 'Heading',
    description: 'lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
  },
  {
    heading: 'Heading',
    description: 'lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
  }
]
</script>
<template>
  <div class="section--ocean-cards">
    <PatternWave />
    <div ref="containerRef" class="ocean-cards-container" :style="{
      backgroundImage: `url(${oceanCardsBackgroundImage})`,
      backgroundPosition: backgroundPosition
    }">
      <h1>What do oceans do for us?</h1>
      <div class="ocean-cards">
        <div v-for="(card, index) in oceanCards" :key="index" :ref="el => cardRefs[index] = el" class="card-wrapper">
          <SingleOceanCard :heading="card.heading" :description="card.description" class="card-item" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.section--ocean-cards {
  background-color: transparent;
  /* Fallback color */
  padding: 4rem 0;
  width: 100%;
  overflow-x: hidden;
  /* Prevent horizontal scrolling */
  height: auto;
}

.ocean-cards-container {
  padding: 0 2rem 2rem;
  width: 90%;
  margin: 0 auto;
  background-size: cover;
  // position: relative;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  /* Make sure container is at least full viewport height */
  transition: background-position 1.5s ease-in-out;
  /* Smooth transition for background position */
  overflow-y: visible;
  /* Allow vertical scrolling */
}

h1 {
  text-align: center;
  color: #03045e;
  margin-bottom: 2rem;
  width: 200px;
  background: #1B2E49;
  color: white;
  line-height: 1;
  text-align: left;
  padding: 2rem;
  margin-top: 0;
  border-radius: 0 0 30px 30px;
}

.ocean-cards {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 70vh;
  /* Large gap to ensure cards are visible one at a time when scrolling */
  padding: 30vh 0;
  /* Add padding at top and bottom */
  margin-bottom: 50vh;
  /* Add extra space at the end to allow last card to trigger */
}

.card-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  min-height: 200px;
  transition: opacity 0.5s ease, transform 0.5s ease;

  &.in-view {
    opacity: 1;
    transform: scale(1);
  }

  &:not(.in-view) {
    opacity: 0.8;
    transform: scale(0.95);
  }
}

.patternWave {
  position: absolute;
  top: 0;
  min-width: 100%;
  min-height: 100%;
  z-index: -1;
  pointer-events: none;
}

</style>