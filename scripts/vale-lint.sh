#!/usr/bin/env bash
#
# Vale wrapper that handles the $[variable] syntax used in these docs.
#
# MDX files use $[prodname], $[manifestsUrl], etc. for Docusaurus variable
# interpolation. mdx2vast (Vale's MDX parser) uses acorn which crashes on
# this non-standard JS syntax. This script temporarily replaces $[...] with
# a placeholder before running Vale, then restores the original files.
#
# Prerequisites:
#   brew install vale ripgrep
#   npm install -g mdx2vast
#   vale sync
#
# Usage:
#   scripts/vale-lint.sh [vale args...]
#
# Examples:
#   scripts/vale-lint.sh calico/
#   scripts/vale-lint.sh --no-exit calico/ calico-enterprise/
#   scripts/vale-lint.sh --output=line calico/getting-started/

set -euo pipefail

# Check dependencies
for cmd in vale mdx2vast rg perl; do
  if ! command -v "$cmd" &>/dev/null; then
    echo "Error: $cmd is not installed." >&2
    exit 1
  fi
done

# Save the list of files containing $[...] so we can restore them after
filelist=$(mktemp)
backupdir=$(mktemp -d)
trap 'rm -f "$filelist"; rm -rf "$backupdir"' EXIT

rg -l '\$\[[^\]]*\]' -g '*.mdx' -g '*.md' . > "$filelist" 2>/dev/null || true

if [ ! -s "$filelist" ]; then
  # No files need replacement; run vale directly
  exec vale "$@"
fi

# Back up each file to a temp directory preserving relative paths
while IFS= read -r f; do
  mkdir -p "$backupdir/$(dirname "$f")"
  cp "$f" "$backupdir/$f"
done < "$filelist"

# Restore files from backups on exit (success or failure)
cleanup() {
  while IFS= read -r f; do
    cp "$backupdir/$f" "$f" 2>/dev/null || true
  done < "$filelist"
  rm -f "$filelist"
  rm -rf "$backupdir"
}
trap cleanup EXIT

# Replace $[...] with PICKLEVAR
xargs perl -i -pe 's/\$\[[^\]]*\]/PICKLEVAR/g' < "$filelist"

# Run vale, capturing its exit code
vale_exit=0
vale "$@" || vale_exit=$?

# cleanup runs via trap
exit $vale_exit
