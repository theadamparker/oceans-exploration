#!/bin/bash

# Deployment script for multilingual UNDP Oceans Exploration site
# This script builds the site for all languages and prepares it for deployment

echo "Building multilingual UNDP Oceans Exploration site..."

# Ensure dependencies are installed
npm install

# Build the site with multilingual support
npm run build:multilang

echo "Build complete."

# Optional: Run preview to test the site locally
# echo "Starting preview server for all language versions..."
# In separate terminal tabs/windows you would run:
# npm run preview:en
# npm run preview:es
# npm run preview:fr

echo "Site ready for deployment."
echo "Access language versions at:"
echo "- English: https://yourdomain.com/"
echo "- Spanish: https://yourdomain.com/es/"
echo "- French: https://yourdomain.com/fr/"

# For actual deployment, add your deployment commands here
# Examples:
# - AWS S3: aws s3 sync dist/ s3://your-bucket-name/ --delete
# - Netlify: netlify deploy --prod --dir=dist
# - GitHub Pages: cp -r dist/* docs/

exit 0
