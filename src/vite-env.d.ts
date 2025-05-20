/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

// Allow importing JS files without type declarations
declare module '*.js' {
  const content: any
  export default content
}
