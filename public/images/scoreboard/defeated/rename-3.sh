#!/bin/bash

# Get the directory of this script (the folder it lives in)
TARGET_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

cd "$TARGET_DIR" || { echo "Folder not found"; exit 1; }

for file in *-3.png; do
  [ -e "$file" ] || continue

  new_name="${file/-3.png/.png}"

  echo "Renaming '$file' -> '$new_name'"
  mv "$file" "$new_name"
done