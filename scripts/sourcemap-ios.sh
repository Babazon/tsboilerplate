#!/bin/bash

set -e

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" >/dev/null 2>&1 && cd .. && pwd)"
cd "$DIR"

APP_VERSION=$(cat package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g' \
  | tr -d '[[:space:]]')
BUILD_NUMBER="${APPCENTER_BUILD_ID:-1}"

if [ "$DEV" = "true" ]; then
  echo "running dev version $APP_VERSION. build number: $BUILD_NUMBER"
else
  echo "running release version. $APP_VERSION. build number: $BUILD_NUMBER"
fi

echo "creating source maps..."

if [ "$DEV" = "true" ]; then
  curl "http://localhost:8081/index.bundle?platform=ios&dev=true&minify=false" >ios-debug.bundle
  curl "http://localhost:8081/index.bundle.map?platform=ios&dev=true&minify=false" >ios-debug.bundle.map
else
  yarn run react-native bundle \
    --platform ios \
    --dev false \
    --entry-file index.js \
    --bundle-output ios-release.bundle \
    --sourcemap-output ios-release.bundle.map
fi

echo "uploading source maps..."

if [ "$DEV" = "true" ]; then
  curl https://upload.bugsnag.com/react-native-source-map \
    -F apiKey="$BUGSNAG_API_KEY" \
    -F appVersion="$APP_VERSION" \
    -F appBundleVersion="$BUILD_NUMBER" \
    -F dev=true \
    -F platform=ios \
    -F sourceMap=@ios-debug.bundle.map \
    -F bundle=@ios-debug.bundle \
    -F projectRoot="$(pwd)"
else
  curl https://upload.bugsnag.com/react-native-source-map \
    -F apiKey="$BUGSNAG_API_KEY" \
    -F appVersion="$APP_VERSION" \
    -F appBundleVersion="$BUILD_NUMBER" \
    -F dev=false \
    -F platform=ios \
    -F sourceMap=@ios-release.bundle.map \
    -F bundle=@ios-release.bundle \
    -F projectRoot="$(pwd)"
fi

echo "done"
