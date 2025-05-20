# Oceans Exploration

A visual exploration of the world's oceans and their importance to our planet, developed with Vue 3, TypeScript, and Vite.

## Development

### Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev
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
- **StyleGuide**: Utility component to visualize breakpoints and styling (toggle in App.vue)
