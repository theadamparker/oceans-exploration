#!/bin/bash

# Function to display help information
show_help() {
  echo "Usage: ./deploy-static.sh [OPTIONS]"
  echo ""
  echo "Options:"
  echo "  -h, --help            Show this help message"
  echo "  -d, --dev             Build for development (base='/')"
  echo "  -g, --github          Build for GitHub Pages (base='/turning-the-tide/')"
  echo "  -c, --cloudflare      Build for Cloudflare Pages"
  echo "  -n, --netlify         Build for Netlify"
  echo "  -v, --vercel          Build for Vercel"
  echo ""
  echo "Default: development build"
}

# Default to development mode
MODE="development"
DEPLOY_TARGET=""

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
      DEPLOY_TARGET="GitHub Pages"
      shift
      ;;
    -c|--cloudflare)
      MODE="cloudflare"
      DEPLOY_TARGET="Cloudflare Pages"
      shift
      ;;
    -n|--netlify)
      MODE="netlify"
      DEPLOY_TARGET="Netlify"
      shift
      ;;
    -v|--vercel)
      MODE="vercel"
      DEPLOY_TARGET="Vercel"
      shift
      ;;
    *)
      echo "Unknown option: $1"
      show_help
      exit 1
      ;;
  esac
done

# Function to generate environment-specific files
generate_env_files() {
  local target=$1
  local base_url=$2
  
  # Generate _redirects for Netlify/Vercel
  if [[ "$target" == "Netlify" || "$target" == "Vercel" ]]; then
    cat > dist/_redirects << EOF
# Redirect language paths
/en/*  /:splat  301
/en    /        301

# SPA fallback
/*    /index.html   200

# Language-specific SPA fallbacks
/es/*  /es/index.html  200
/fr/*  /fr/index.html  200
EOF
    echo "Generated _redirects file for $target"
  fi
  
  # Generate _headers for Cloudflare/Netlify
  if [[ "$target" == "Cloudflare Pages" || "$target" == "Netlify" ]]; then
    cat > dist/_headers << EOF
# All pages
/*
  X-Frame-Options: DENY
  X-XSS-Protection: 1; mode=block
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'; media-src 'self'; object-src 'none'; frame-ancestors 'none';

# Cache assets
/assets/*
  Cache-Control: public, max-age=31536000, immutable
EOF
    echo "Generated _headers file for $target"
  fi
}

# Perform the build based on the selected mode
if [ "$MODE" = "github" ]; then
  # Try to detect the GitHub repository information
  GITHUB_USERNAME=$(git config --get remote.origin.url | sed -n 's/.*[:/]\([^/]*\)\/oceans-exploration.*/\1/p' 2>/dev/null || echo "theadamparker")
  REPO_NAME="turning-the-tide"
  
  echo "Building static site for ${DEPLOY_TARGET} with base='/${REPO_NAME}/'"
  GITHUB_REPO="${GITHUB_USERNAME}/${REPO_NAME}" npm run build:static:github
  
  # Add a .nojekyll file to prevent Jekyll processing
  touch dist/.nojekyll
  
  generate_env_files "$DEPLOY_TARGET" "/${REPO_NAME}/"
  
  echo "Static site build for ${DEPLOY_TARGET} completed!"
  echo "Your site is ready to deploy to https://${GITHUB_USERNAME}.github.io/${REPO_NAME}/"
  
elif [ "$MODE" = "cloudflare" ]; then
  echo "Building static site for ${DEPLOY_TARGET} with base='/'"
  npm run build:static
  
  generate_env_files "$DEPLOY_TARGET" "/"
  
  echo "Static site build for ${DEPLOY_TARGET} completed!"
  echo "Your site is ready to deploy to Cloudflare Pages"
  
elif [ "$MODE" = "netlify" ]; then
  echo "Building static site for ${DEPLOY_TARGET} with base='/'"
  npm run build:static
  
  generate_env_files "$DEPLOY_TARGET" "/"
  
  echo "Static site build for ${DEPLOY_TARGET} completed!"
  echo "Your site is ready to deploy to Netlify"
  
elif [ "$MODE" = "vercel" ]; then
  echo "Building static site for ${DEPLOY_TARGET} with base='/'"
  npm run build:static
  
  generate_env_files "$DEPLOY_TARGET" "/"
  
  echo "Static site build for ${DEPLOY_TARGET} completed!"
  echo "Your site is ready to deploy to Vercel"
  
else
  echo "Building static site for development environment with base='/'"
  npm run build:static
  
  echo "Static site build for development completed!"
  echo "To preview the site, run 'npm run preview:static'"
fi
