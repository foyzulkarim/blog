#!/bin/zsh
# Render a 1920x1920-canvas SVG (diagram drawn in top 1080) to a clean 1920x1080 PNG.
# qlmanage aspect-FILLS a square thumbnail, so we author square and crop the top 16:9.
set -e
svg="$1"
base="${svg:r}"        # strip .svg
out="${2:-${base}.png}"
tmp=$(mktemp -d)
qlmanage -t -s 1920 -o "$tmp" "$svg" >/dev/null 2>&1
magick "$tmp/${svg:t}.png" -crop 1920x1080+0+0 +repage "$out"
rm -rf "$tmp"
magick identify "$out"
