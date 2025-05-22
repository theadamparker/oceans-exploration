#!/bin/bash

# Function to display help information
show_help() {
  echo "Usage: ./deploy.sh [OPTIONS]"
  echo ""
  echo "Options:"
  echo "  -h, --help            Show this help message"
  echo "  -d, --dev             Build for development (base='/')"
  echo "  -g, --github          Build for GitHub Pages (base='/turning-the-tide/')"
  echo ""
  echo "Default: development build"
}

# Default to development mode
MODE="development"

# Parse command line arguments
while [[ $# -gt 0 ]]; do
  case $1 in
    -h|--help)
      show_help
      exit 0
      ;;
    -d|--dev)
      MODE="development"
      shift
      ;;
    -g|--github)
      MODE="github"
      shift
      ;;
    *)
      echo "Unknown option: $1"
      show_help
      exit 1
      ;;
  esac
done

# Perform the build based on the selected mode
if [ "$MODE" = "github" ]; then
  echo "Building for GitHub Pages with base='/turning-the-tide/'"
  
  # Create a temporary config file with GitHub Pages settings
  cat > vite.config.build.ts << EOF
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name in an ES modules environment
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [vue()],
  base: '/turning-the-tide/',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        es: path.resolve(__dirname, 'es/index.html'),
        fr: path.resolve(__dirname, 'fr/index.html'),
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  }
});
EOF
  
  # Run the build with the temporary config
  npm run build -- --config vite.config.build.ts
  
  # Add a .nojekyll file to prevent Jekyll processing
  touch dist/.nojekyll
  
  echo "Build for GitHub Pages completed!"
  echo "Your site is ready to deploy to https://yourusername.github.io/turning-the-tide/"
  
else
  echo "Building for development environment with base='/'"
  
  # Create a temporary config file with development settings
  cat > vite.config.build.ts << EOF
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name in an ES modules environment
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [vue()],
  base: '/',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        es: path.resolve(__dirname, 'es/index.html'),
        fr: path.resolve(__dirname, 'fr/index.html'),
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  }
});
EOF
  
  # Run the build with the temporary config
  npm run build -- --config vite.config.build.ts
  
  echo "Build for development completed!"
  echo "To preview the site, run 'npm run preview'"
fi

# Clean up the temporary config file
rm vite.config.build.ts
