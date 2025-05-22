# Oceans Exploration

A visual exploration of the world's oceans and their importance to our planet, developed with Vue 3, TypeScript, and Vite. The site supports multiple languages (English, Spanish, and French).

## Development

### Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Or start development server with specific language
npm run dev:en  # English
npm run dev:es  # Spanish
npm run dev:fr  # French
```

## Multilingual Support

This project is set up as a multi-language website with support for:

- English (default): `/`
- Spanish: `/es/`
- French: `/fr/`

## Deployment

The site is built as a static site generator (SSG) for optimal performance and SEO.

### Static Site Deployment

```bash
# Standard static build
npm run build:static

# Build with base URL for GitHub Pages
npm run build:static:github

# Deploy the static site
npm run deploy:static

# Deploy to GitHub Pages
npm run deploy:static:github
```

### Static Site Preview

To preview the built static site locally:

```bash
npm run preview:static
```

For more details on the static site generation, see [README-SSG.md](./README-SSG.md).

### Automated Deployment

This project uses GitHub Actions for automated deployment:

1. Any push to the `master` branch triggers a deployment to GitHub Pages
2. Pull requests trigger a test build to verify everything compiles correctly

#### GitHub Pages Configuration:

- The site is deployed to: `https://yourgithubusername.github.io/turning-the-tide/`
- The site uses a custom base URL: `/turning-the-tide/`
- All assets use absolute paths from this base URL
- Spanish: `/es/`
- French: `/fr/`

### Language Implementation

- **Router-based Navigation**: Each language has its own route
- **Vue I18n**: For string translations and language switching
- **Separate Builds**: Each language version can be built separately

### Working with Translations

1. All translatable strings are stored in `src/locales/[lang].ts`
2. To add new translatable content, add it to all language files
3. In components, use the `t()` function from Vue I18n:
   ```vue
   <template>
     <p>{{ t('sections.turningTide.title') }}</p>
   </template>
   
   <script setup>
   import { useI18n } from 'vue-i18n';
   const { t } = useI18n();
   </script>
   ```

### Building and Testing

```bash
# Build the static site with all language versions
npm run build:static

# Preview specific language versions during development
npm run preview:en  # English (http://localhost:5173)
npm run preview:es  # Spanish (http://localhost:5174)
npm run preview:fr  # French (http://localhost:5175)

# Preview the complete static site build
npm run preview:static
```

## Project Structure

### SCSS Utilities

This project uses SCSS for styling and includes utilities based on the UNDP design system:

- **Breakpoints**: Responsive breakpoints based on the UNDP design system.
  - See documentation in [`src/assets/scss/README.md`](./src/assets/scss/README.md)
  - Import in your components: `@use '@/assets/scss/breakpoints' as bp;`

### Components

- **OceanCards**: Main component for the ocean cards with scrolling and focal point tracking
- **SingleOceanCard**: Individual card component displaying ocean facts
- **PatternWave**: SVG wave pattern component

### Routing and Views

- `src/router/index.ts`: Defines routes for each language
- `src/views/[lang]/Home.vue`: Language-specific home page components

### Internationalization

- `src/i18n.ts`: Vue I18n configuration
- `src/locales/[lang].ts`: Translation strings for each language
- **StyleGuide**: Utility component to visualize breakpoints and styling (toggle in App.vue)
