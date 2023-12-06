#!/bin/bash

token="-temp"

for file in *; do
    if [ -f "$file" ]; then
        new_name="${file%.*}${token}.${file##*.}"
        mv "$file" "$new_name"
    fi
done
