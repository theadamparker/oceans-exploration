#!/bin/bash

# Helper script to start the dev server with different language routes
# Usage: ./dev-lang.sh [en|es|fr]

LANG=${1:-en}
VALID_LANGS=("en" "es" "fr")

# Check if language is valid
if [[ ! " ${VALID_LANGS[@]} " =~ " ${LANG} " ]]; then
    echo "Error: Invalid language. Valid options are: en, es, fr"
    exit 1
fi

# Start dev server with the language route
echo "Starting development server with /${LANG}/ route..."

# Set environment variable for language
export VITE_DEFAULT_LOCALE=${LANG}

# Start the dev server and open in browser at the language route
npm run dev -- --open /${LANG}/
