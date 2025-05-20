import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

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

createApp(App).mount('#app')
