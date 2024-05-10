#!/bin/bash

# Loop through each file in the current directory
for file in *; do
    # Check if the file is a regular file
    if [ -f "$file" ]; then
        # Get the file extension
        extension="${file##*.}"
        # Append '-temp' to the file name and keep the extension
        new_file="${file%.*}-temp.$extension"
        # Rename the file
        mv "$file" "$new_file"
        echo "Renamed $file to $new_file"
    fi
done
