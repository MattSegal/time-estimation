#!/bin/bash
# https://tinydrydock.com/
# http://tinydrydock.com.s3-website-ap-southeast-2.amazonaws.com/
# https://dash.cloudflare.com/4475bf3857373ac069c38303b1325c19/tinydrydock.com/dns/records
# Exit on error
set -e

# Configuration
S3_BUCKET="tinydrydock.com"
DIST_DIR="dist"

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

# # Upload to S3
echo "📤 Uploading to S3 bucket: $S3_BUCKET"
aws s3 sync $DIST_DIR "s3://$S3_BUCKET" --delete

# Invalidate CloudFront cache if you're using CloudFront (commented out by default)
# echo "🔄 Invalidating CloudFront cache..."
# aws cloudfront create-invalidation --distribution-id YOUR_DISTRIBUTION_ID --paths "/*"

echo "✅ Deployment completed successfully!" 