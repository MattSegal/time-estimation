#!/bin/bash
# https://mattsegal.github.io/time-estimation/
# Exit on error
set -e

# Configuration
DIST_DIR="docs"

echo "🚀 Starting deployment process..."

# Build the project
echo "📦 Building the project..."
rm -rf $DIST_DIR
npm run build

# Check if build was successful
if [ ! -d "$DIST_DIR" ]; then
    echo "❌ Build failed: $DIST_DIR directory not found"
    exit 1
fi

# Push to GitHub Pages
echo "📤 Pushing to GitHub Pages"
git add .
git commit -m "Deploying to GitHub Pages"
git push

echo "✅ Deployment completed successfully!" 
