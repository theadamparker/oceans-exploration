/// <reference types="vite/client" />
/// <reference path="./assets/js/undp-viewport.d.ts" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

// Allow importing JS files without type declarations
declare module '*.js' {
  const value: any;
  export default value;
}

// Define a global type for UNDP_JS on the window object
interface UndpJs {
  languageSwitcher?: {
    init: () => void;
  };
  // Add other UNDP_JS properties as needed
  [key: string]: any; // Allow for other properties not explicitly defined
}

// Export everything as global declarations
declare global {
  interface Window {
    UNDP_JS_INIT?: {
      init: () => void;
    };
    UNDP_JS?: UndpJs;
    jQuery?: any; // Or a more specific jQuery type if you have one
  }
}

// Make sure TypeScript exports these global declarations
export {};
