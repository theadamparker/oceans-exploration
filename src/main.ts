// src/main.ts
import { createApp as _createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import i18n from './i18n'
// Import the UNDP design system utilities with viewport function
import { initViewport } from './assets/js/undp-design-system.js'

// For SSG export, this function is used by vite-ssg
export function createApp(_SSGContext?: any) {
  const app = _createApp(App);
  app.use(router);
  app.use(i18n);
  
  // If in browser (not SSR), initialize viewport detection
  if (!import.meta.env.SSR && typeof window !== 'undefined') {
    // Delay initViewport until after navigation is complete
    router.isReady().then(() => {
      setTimeout(() => {
        initViewport({
          once: false,
          threshold: 0.2
        });
      }, 200);
      
      // Re-initialize viewport detection on route change
      router.afterEach(() => {
        setTimeout(() => {
          initViewport({
            once: false,
            threshold: 0.2
          });
        }, 200);
      });
    });
  }
  
  return { app, router };
}

// Only run in browser
if (!import.meta.env.SSR && !import.meta.env.SSG && typeof window !== 'undefined') {
  // Import breakpoint debug helper in development mode
  if (import.meta.env.DEV) {
    import('./assets/js/breakpoint-debug.js')
      .then(() => {
        console.log('Breakpoint debug helper loaded');
      })
      .catch(error => {
        console.error('Failed to load breakpoint debug helper:', error);
      });
  }

  // Standard non-SSG initialization
  const { app } = createApp();
  app.mount('#app');

  // Initialize the viewport script after app is mounted
  window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
      initViewport({
        once: false,
        threshold: 0.2
      });
    }, 100);
  });
}
