#!/bin/bash

# Function to display help information
show_help() {
  echo "Usage: ./check-build.sh [OPTIONS]"
  echo ""
  echo "Options:"
  echo "  -h, --help            Show this help message"
  echo ""
  echo "This script checks the static build for common issues."
}

# Parse command line arguments
while [[ $# -gt 0 ]]; do
  case $1 in
    -h|--help)
      show_help
      exit 0
      ;;
    *)
      echo "Unknown option: $1"
      show_help
      exit 1
      ;;
  esac
done

# Check if dist directory exists
if [ ! -d "dist" ]; then
  echo "❌ Error: dist/ directory not found."
  echo "Please run 'npm run build:static' first to generate the static site."
  exit 1
fi

# Display a separator line
separator() {
  echo "----------------------------------------"
}

echo "🔍 Checking static build for common issues..."
separator

# Check for index.html files
echo "📄 Checking HTML files:"
if [ -f "dist/index.html" ]; then
  echo "✅ Main index.html exists"
else
  echo "❌ Main index.html is missing"
fi

if [ -f "dist/es/index.html" ]; then
  echo "✅ Spanish index.html exists"
else
  echo "❌ Spanish index.html is missing"
fi

if [ -f "dist/fr/index.html" ]; then
  echo "✅ French index.html exists"
else
  echo "❌ French index.html is missing"
fi
separator

# Check for 404 page
echo "🔍 Checking 404 page:"
if [ -f "dist/404.html" ]; then
  echo "✅ 404 page exists"
else
  echo "❌ 404 page is missing"
fi
separator

# Check for SEO files
echo "🔍 Checking SEO files:"
if [ -f "dist/sitemap.xml" ]; then
  echo "✅ sitemap.xml exists"
else
  echo "❌ sitemap.xml is missing"
fi

if [ -f "dist/robots.txt" ]; then
  echo "✅ robots.txt exists"
else
  echo "❌ robots.txt is missing"
fi
separator

# Check HTML for common SEO issues
echo "🔍 Checking for common SEO issues in index.html:"

# Function to check HTML file
check_html_file() {
  local file=$1
  local lang=$2
  
  echo "Checking $file ($lang):"
  
  # Check for title tag
  if grep -q "<title" "$file"; then
    echo "✅ Title tag exists"
  else
    echo "❌ Missing title tag"
  fi
  
  # Check for meta description
  if grep -q "meta.*description" "$file"; then
    echo "✅ Meta description exists"
  else
    echo "❌ Missing meta description"
  fi
  
  # Check for canonical links
  if grep -q "link.*canonical" "$file"; then
    echo "✅ Canonical link exists"
  else
    echo "❌ Missing canonical link"
  fi
  
  # Check for language attributes
  if grep -q "lang=\"$lang\"" "$file"; then
    echo "✅ Correct language attribute ($lang) exists"
  else
    echo "❌ Missing or incorrect language attribute"
  fi
  
  # Check for Open Graph tags
  if grep -q "property=\"og:" "$file"; then
    echo "✅ Open Graph tags exist"
  else
    echo "⚠️ Open Graph tags might be missing"
  fi
}

# Check main index.html
if [ -f "dist/index.html" ]; then
  check_html_file "dist/index.html" "en"
fi
separator

# Check for asset optimization
echo "🔍 Checking for asset optimization:"

# Count assets
js_files=$(find dist/assets -name "*.js" | wc -l)
css_files=$(find dist/assets -name "*.css" | wc -l)
image_files=$(find dist/assets -type f -name "*.jpg" -o -name "*.png" -o -name "*.webp" -o -name "*.svg" | wc -l)

echo "📊 Asset summary:"
echo "   - JavaScript files: $js_files"
echo "   - CSS files: $css_files"
echo "   - Image files: $image_files"
separator

echo "✨ Build check completed!"
echo ""
echo "Next steps:"
echo "1. Preview your site with 'npm run preview:static'"
echo "2. Deploy your site with './deploy-static.sh'"
echo ""
