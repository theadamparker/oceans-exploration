import { createRouter, createWebHistory } from 'vue-router';
import { nextTick } from 'vue';

// Views
import EnHome from '../views/en/Home.vue';
import EsHome from '../views/es/Home.vue';
import FrHome from '../views/fr/Home.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: EnHome,
    meta: { 
      locale: 'en',
      title: 'UNDP Oceans Exploration'
    }
  },
  {
    path: '/en',
    redirect: '/'
  },
  {
    path: '/es',
    name: 'es-home',
    component: EsHome,
    meta: { 
      locale: 'es',
      title: 'UNDP Exploración de los Océanos'
    }
  },
  {
    path: '/fr',
    name: 'fr-home',
    component: FrHome,
    meta: { 
      locale: 'fr',
      title: 'PNUD Exploration des Océans'
    }
  },
  {
    // Catch all route - redirect to user's preferred language or English
    path: '/:pathMatch(.*)*',
    redirect: () => {
      // Check browser language
      const userLang = navigator.language;
      const lang = userLang.split('-')[0];
      
      // Redirect to language version if we support it
      if (['es', 'fr'].includes(lang)) {
        return `/${lang}`;
      }
      
      // Default to English (root path)
      return '/';
    }
  }
];

// Determine base URL for the router
// This ensures it works in both development and production (GitHub Pages)
let baseUrl = import.meta.env.BASE_URL || '/';
console.log(`Router initialized with base URL: ${baseUrl}`);

const router = createRouter({
  history: createWebHistory(baseUrl), // Use the determined base URL
  routes,
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  }
});

// Update page title based on route meta
router.afterEach((to) => {
  nextTick(() => {
    document.title = to.meta?.title as string || 'UNDP Oceans Exploration';
  });
});

export default router;
