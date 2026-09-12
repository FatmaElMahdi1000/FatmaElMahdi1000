#!/usr/bin/env bash
set -euo pipefail

DEST_DIR="assets/images"
DEST_FILE="$DEST_DIR/wednesday-bg.jpg"

mkdir -p "$DEST_DIR"

echo "Downloading Wednesday-style background into $DEST_FILE..."
# This uses the Unsplash source endpoint with a Wednesday/Addams/gothic query.
# It returns a high-quality image from Unsplash that is free to use under the Unsplash license.
curl -L "https://source.unsplash.com/1600x900/?wednesday,addams,gothic" -o "$DEST_FILE"

echo "Downloaded to $DEST_FILE"

echo "If you want a fixed photo (so the image never changes), replace the file with a specific image from Unsplash and add the photographer credit to assets/images/unsplash-credits.txt"
