#!/bin/bash

# Function to display help information
show_help() {
  echo "Usage: ./preview-static.sh [OPTIONS]"
  echo ""
  echo "Options:"
  echo "  -h, --help            Show this help message"
  echo "  -p, --port PORT       Port to use (default: 8080)"
  echo ""
  echo "This script serves the static site from the dist/ directory"
  echo "using a simple HTTP server for local preview."
}

# Default port
PORT=8080

# Parse command line arguments
while [[ $# -gt 0 ]]; do
  case $1 in
    -h|--help)
      show_help
      exit 0
      ;;
    -p|--port)
      PORT="$2"
      shift 2
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
  echo "Error: dist/ directory not found."
  echo "Please run 'npm run build:static' first to generate the static site."
  exit 1
fi

# Determine which server to use (npx serve, python, or npx http-server)
if command -v npx &> /dev/null; then
  echo "Serving static site using 'npx serve' on port $PORT..."
  echo "Press Ctrl+C to stop the server."
  echo ""
  echo "Site available at: http://localhost:$PORT"
  echo ""
  npx serve -s dist -l $PORT
elif command -v python3 &> /dev/null; then
  echo "Serving static site using Python 3 on port $PORT..."
  echo "Press Ctrl+C to stop the server."
  echo ""
  echo "Site available at: http://localhost:$PORT"
  echo ""
  cd dist && python3 -m http.server $PORT
elif command -v python &> /dev/null; then
  echo "Serving static site using Python on port $PORT..."
  echo "Press Ctrl+C to stop the server."
  echo ""
  echo "Site available at: http://localhost:$PORT"
  echo ""
  cd dist && python -m SimpleHTTPServer $PORT
else
  echo "No suitable server found. Installing http-server..."
  echo "Serving static site using 'npx http-server' on port $PORT..."
  echo "Press Ctrl+C to stop the server."
  echo ""
  echo "Site available at: http://localhost:$PORT"
  echo ""
  npx http-server dist -p $PORT --gzip
fi
