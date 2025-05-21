import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { initViewport } from './assets/js/viewport.js'

// Import breakpoint debug helper in development mode
if (import.meta.env.DEV) {
  import('./assets/js/breakpoint-debug.js')
    .then(() => {
      // The initBreakpointDebug function will be called automatically
      // when the module is loaded
      console.log('Breakpoint debug helper loaded');
    })
    .catch(error => {
      console.error('Failed to load breakpoint debug helper:', error);
    });
}

// Initialize the app
const app = createApp(App)

// Mount the app
app.mount('#app')

// Initialize the viewport script after app is mounted
// This ensures all elements are in the DOM before viewport detection starts
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    initViewport({
      once: false, // Set to true if you want animations to happen only once
      threshold: 0.2 // Element is considered in viewport when 20% visible
    });
  }, 100); // Small delay to ensure all Vue components are fully rendered
});
