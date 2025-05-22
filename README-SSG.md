# Static Site Generation for Oceans Exploration

This document provides information about the static site generation (SSG) setup for the Oceans Exploration multilingual project.

## Overview

The static site generation process creates a fully static version of the Vue.js application, allowing it to be deployed to any static hosting platform while preserving all multilingual capabilities (English, Spanish, and French).

## Key Benefits

- **Improved SEO**: Static HTML with proper meta tags, canonical URLs, and language alternates
- **Better Performance**: Pre-rendered HTML loads faster than client-side rendered Vue applications
- **Wider Deployment Options**: Can be hosted on GitHub Pages, Netlify, Vercel, or any static file server
- **Offline Capabilities**: Works with minimal or no JavaScript enabled
- **Reduced Server Requirements**: No Node.js server needed for production

## Technical Setup

The static site generation is built on:

- `vite-ssg` for static site generation with Vue 3
- `@vueuse/head` for managing document head and meta tags
- Custom postbuild script for multilingual optimization
- HTML minification for improved performance

## Scripts

| Script | Description |
|--------|-------------|
| `npm run build:static` | Build the static site for a generic domain |
| `npm run build:static:github` | Build the static site for GitHub Pages with proper base URL |
| `npm run preview:static` | Preview the static site locally |
| `npm run check:build` | Validate the static site build |
| `./deploy-static.sh` | Deploy the static site to production |

## Multilingual Structure

The build process generates:

- `/dist/index.html` - English version
- `/dist/es/index.html` - Spanish version
- `/dist/fr/index.html` - French version

Each version contains:
- Proper language attributes (`<html lang="en/es/fr">`)
- Language-specific meta tags and descriptions
- Canonical URLs
- Alternate language links
- Correct asset references

## SEO Features

- Properly configured meta tags for each language
- Open Graph tags for social media sharing
- Twitter Card support
- Canonical URLs to prevent duplicate content issues
- Language alternates with hreflang attributes
- Sitemap.xml with multilingual entries
- robots.txt for search engine guidance

## How It Works

1. The Vue app is rendered for each language route
2. The postbuild script processes the HTML files to:
   - Fix relative asset paths
   - Add language-specific meta tags
   - Generate language variants
   - Create sitemap.xml and robots.txt
   - Optimize HTML for performance

## Customization

### Changing Domain

Update the domain in `postbuild.js`:

```javascript
const domain = process.env.BASE_URL === '/turning-the-tide/' 
  ? 'https://yourusername.github.io/turning-the-tide' 
  : 'https://your-production-domain.com';
```

### Adjusting Meta Tags

Edit the metaContent object in `postbuild.js` to customize the meta tags for each language:

```javascript
const metaContent = {
  en: {
    description: "Your English description",
    // ...other meta content
  },
  es: {
    description: "Your Spanish description",
    // ...other meta content
  },
  fr: {
    description: "Your French description",
    // ...other meta content
  }
};
```

## Troubleshooting

### Asset Path Issues

If assets aren't loading properly:

1. Check the generated HTML files in `/dist/`
2. Verify that asset paths use relative URLs (`./assets/` instead of `/assets/`)
3. Adjust the path replacement patterns in `postbuild.js` if needed

### Language Detection Issues

If the wrong language is shown:

1. Ensure your web server is properly configured
2. Check that canonical URLs and hreflang links are correct
3. Verify that folder structure is maintained in deployment

### Slow Performance

If the static site is slow:

1. Run `npm run build:static` with NODE_ENV=production
2. Check that HTML minification is working
3. Consider optimizing images and other assets