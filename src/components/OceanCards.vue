<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import type { ComponentPublicInstance } from 'vue'
import SingleOceanCard from './SingleOceanCard.vue'
import cardsOceanImage from '../assets/img/collage-bg.jpg'
import patternWave from '../assets/img/pattern-wave.png'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

// Utility function to debounce resize events
function debounce<F extends (...args: any[]) => any>(fn: F, delay: number) {
  let timeoutID: ReturnType<typeof setTimeout> | null = null;
  return function(this: any, ...args: Parameters<F>) {
    if (timeoutID) clearTimeout(timeoutID);
    timeoutID = setTimeout(() => fn.apply(this, args), delay);
  } as F;
}

// Make the images accessible to the template and CSS
const oceanCardsBackgroundImage = cardsOceanImage
const patternWaveBackgroundImage = patternWave

// Create CSS-compatible URL strings
const oceanBgUrl = `url(${oceanCardsBackgroundImage})`
const patternBgUrl = `url(${patternWaveBackgroundImage})`

// Create refs for the container and each card
const containerRef = ref<HTMLElement | null>(null)
// Type that can handle both DOM elements and Vue component instances
type ElementOrComponentRef = Element | ComponentPublicInstance | null
const cardRefs = ref<ElementOrComponentRef[]>(Array(6).fill(null)) // Pre-initialize array with 6 null elements

// Background position states
const backgroundPosition = ref('50% 0%')  // Default state position (center-top), adjusted for zoom

// Define focal points for each card as percentage values (x% y%) of the image dimensions
// These are converted from the original pixel values to make them responsive
// Adjusted for 1.5x zoom
const focalPoints = [
  '0% 30%',   // 1. 71% card
  '100% 29%',   // 2. CO2 card
  '58% 57%',   // 3. $2.3 billion card
  '20% 80%',   // 4. GDP card
  '100% 85%',   // 5. Oxygen card
  '55% 100%'    // 6. SDG 14 card
]

// Handle window resize for responsive behavior - debounced to improve performance
const handleResize = debounce(() => {
  // Adjust background size based on screen width if needed
  const backgroundElement = containerRef.value;
  if (backgroundElement) {
    // For smaller screens, we might want to adjust the zoom level
    // Currently maintains 150% across all screen sizes
    // If needed, we could implement responsive zooming here
  }
  
  // Force ScrollTrigger to update
  ScrollTrigger.refresh();
}, 200);

onMounted(() => {
  // No need for ScrollTrigger pinning since we're using position: sticky
  // We're only setting up triggers for card animations and background position changes

  // Add resize event listener
  window.addEventListener('resize', handleResize);
  
  // Create a ScrollTrigger that resets the background to default position when above all cards
  ScrollTrigger.create({
    trigger: '.section--ocean-cards', // Using section selector for a more reliable trigger
    start: 'top top',     // Start at the very top of the section
    end: 'top+=400 top',  // End after scrolling down 400px
    onEnter: () => {
      // When first entering the section, ensure we start with default position
      backgroundPosition.value = '50% 0%';
    },
    onLeaveBack: () => {
      // Reset to default position when scrolling back up above all cards
      console.log('Scrolled above all cards, resetting background to default position');
      backgroundPosition.value = '50% 0%';
      
      // Remove in-view class from all cards when returning to the top
      cardRefs.value.forEach((cardEl) => {
        if (!cardEl) return;
        const element = cardEl instanceof Element ? cardEl : (cardEl as ComponentPublicInstance).$el;
        if (!(element instanceof Element)) return;
        element.classList.remove('in-view');
      });
    }
  });
  
  // Set up triggers for each card to update background position
  setTimeout(() => {
    // Create markers (for debugging, remove in production)
    // ScrollTrigger.config({ markers: true });
    
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
          // Only reset position if we're at the first card and going back to top section
          if (index === 0) {
            const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
            const topTriggerPoint = 300; // This should match the 'top top+=300' value from earlier trigger
            
            if (scrollPosition < topTriggerPoint) {
              console.log('Leaving first card and going above, resetting to default position');
              backgroundPosition.value = '50% 0%';
            }
          }
          element.classList.remove('in-view');
        },
      });
    });
  }, 200); // Small delay to ensure DOM is ready
})

onUnmounted(() => {
  // Clean up ScrollTrigger instances
  ScrollTrigger.getAll().forEach(trigger => trigger.kill())
  
  // Remove resize event listener
  window.removeEventListener('resize', handleResize)
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
@use '../assets/scss/breakpoints' as bp;

* {
  box-sizing: border-box;
}

.section--ocean-cards {
  background-color: transparent;
  background-image: v-bind(patternBgUrl);
  background-attachment: fixed;
  background-repeat: repeat;
  width: 100%;
  position: relative;
  padding: 8rem 0;
  /* Set a min-height to ensure there's enough room for scrolling */
  min-height: 100vh;
}

.ocean-cards-background {
  padding: 0 2rem 2rem;
  width: 90%;
  border-radius: 40px;
  margin: 0 auto;
  background-image: v-bind(oceanBgUrl);
  background-size: 150%; /* Zoomed in by 1.5x from cover */
  background-position: center; /* Initial position */
  display: flex;
  flex-direction: column;
  height: 80dvh;
  transition: background-position 1.5s ease-in-out, background-size 1.5s ease-in-out; /* Add transition for size changes too */
  position: sticky;
  /* Use sticky positioning instead of ScrollTrigger for pinning */
  top: 10vh;
  /* Position from top of viewport */
  z-index: 1;
  /* Ensure background stays behind content */
  @include bp.devicebreak(medium) {
    width: 80%;
    background-size: 150%; /* Slightly more zoom on medium screens */
  }
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

h1.fontSize-m {
  font-size: 24px;
  text-align: center;
  color: #03045e;
  margin-bottom: 2rem;
  width: 260px;
  background: #1B2E49;
  color: white;
  line-height: 1;
  text-align: left;
  padding: 2rem;
  margin-top: 0;
  border-radius: 30px;
  z-index: 2;
  position: relative;
  margin-left: 5%;
  @include bp.devicebreak(medium) {
    font-size: 42px;
    width: 340px;
  }
}

.card-wrapper {
  display: flex;
  justify-content: center;
  padding: 0 15vw;
  transition: opacity 0.5s ease, transform 0.5s ease;

  @include bp.devicebreak(medium) {
    padding: 0 10vw 0 30vw;
  }

  &.in-view {
    opacity: 1;
    transform: scale(1);
  }

  &:nth-of-type(2) {
    @include bp.devicebreak(medium) {
      align-self: flex-start;
    }
  }

  &:nth-of-type(3) {
    @include bp.devicebreak(medium) {
      align-self: flex-end;
    }
  }

  &:nth-of-type(5) {
    @include bp.devicebreak(medium) {
      align-self: flex-start;
    }
  }

  &:nth-of-type(6) {
    @include bp.devicebreak(medium) {
      align-self: flex-end;
    }
  }
}
</style>