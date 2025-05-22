# Oceans Exploration

A visual exploration of the world's oceans and their importance to our planet, developed with Vue 3, TypeScript, and Vite. The site supports multiple languages (English, Spanish, and French).

## Development

### Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

## Multilingual Support

This project is set up as a multi-language website with support for:

- English (default): `/en/`
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
# Build all language versions
npm run build:multilang

# Preview specific language versions
npm run preview:en  # English (http://localhost:5173)
npm run preview:es  # Spanish (http://localhost:5174)
npm run preview:fr  # French (http://localhost:5175)
```

## Deployment

To deploy the multilingual site:

```bash
./deploy-multilingual.sh
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
