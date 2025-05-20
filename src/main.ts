import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

// Import breakpoint debug helper in development mode
if (import.meta.env.DEV) {
  import('./assets/js/breakpoint-debug.js')
}

createApp(App).mount('#app')
