# Static Site Generation Tutorial

This guide explains how the static site generation feature works in this project.

## Overview

Static Site Generation (SSG) converts your Vue application into plain HTML, CSS, and JavaScript that can be served from any web server without requiring Node.js. This is achieved by pre-rendering all pages at build time.

## How Our Implementation Works

### 1. The Build Process

When you run `npm run build:static`, the following happens:

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│ Vue Application │────▶│ Vite SSR Build  │────▶│ Static HTML/CSS │
└─────────────────┘     └─────────────────┘     └─────────────────┘
                                                          │
                                                          ▼
                                                ┌─────────────────┐
                                                │  Post-Process   │
                                                │  Optimization   │
                                                └─────────────────┘
```

1. TypeScript files are compiled with `vue-tsc`
2. Vite builds the app in SSR mode
3. The postbuild script optimizes the output:
   - Minifies HTML
   - Generates language-specific files
   - Creates SEO assets (sitemap, robots.txt)

### 2. Multilingual Support

We handle multiple languages by:

```
index.html ──┬─▶ /index.html (English)
             ├─▶ /es/index.html (Spanish)
             └─▶ /fr/index.html (French)
```

1. Each language gets its own path and index.html file
2. HTML `lang` attributes are set correctly for each language
3. Meta tags and SEO content adapts to each language

### 3. SEO Enhancements

The `App.vue.ssg` file contains SEO enhancements using `@vueuse/head`:

```vue
// Example
useHead({
  title: pageTitle,
  meta: [
    { name: 'description', content: pageDescription },
    { property: 'og:title', content: pageTitle },
    // ...other meta tags
  ],
  link: [
    { rel: 'canonical', href: canonicalUrl },
    // ...language alternates
  ]
})
```

### 4. Key Files and Their Roles

- **vite.config.ssg.ts**: Configures Vite for static building
- **main.ts.ssg**: Modified main file compatible with SSG
- **postbuild.js**: Processes and optimizes the build output
- **App.vue.ssg**: Enhanced App component with SEO features
- **locales/**.ts.ssg**: Locale files with added meta information

## Common Adaptations

### Adding a New Page

1. Create the page component in `src/views/`
2. Add a route in `router/index.ts`
3. Update `routes` array in `vite.config.ssg.ts` if needed

### Adding a New Language

1. Create a new locale file in `src/locales/`
2. Add language to `i18n.ts`
3. Update `routes` array in `vite.config.ssg.ts`
4. Update `postbuild.js` to handle the new language

### Customizing SEO

1. Edit meta information in locale files
2. Update `canonicalUrl` computation in `App.vue.ssg`
3. Add additional meta tags as needed

## Deployment Options

This project supports multiple deployment options:

```
./deploy-static.sh [--dev|--github|--cloudflare|--netlify|--vercel]
```

Each option generates platform-specific files:

- **GitHub Pages**: Adds `.nojekyll`
- **Netlify/Vercel**: Adds `_redirects` for SPA fallbacks
- **Cloudflare Pages**: Adds `_headers` for security headers
