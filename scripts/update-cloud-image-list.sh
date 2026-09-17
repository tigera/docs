#!/usr/bin/env bash
# Add a Calico Cloud version to the private-registry image list in
# src/___new___/data/ccImageLists.js.
#
# The list is keyed by Calico Cloud version and is shared by every docs tree, so it is updated once
# per release rather than once per tree. The new entry is labelled "(latest)" and the previous one
# loses the label.
#
# The cc-operator image is deliberately not fetched. It is released in lockstep with Calico Cloud
# -- one image per version, tagged with that version -- so VersionedCloudImageList derives it from
# the entry's key. The published image-list does not contain it.
set -eu

ccVersion=${1:-}
manifestVersion=${2:-}
baseUrl=${BASE_URL:-https://installer.calicocloud.io}
list=src/___new___/data/ccImageLists.js

function help() {
  echo "This script requires 2 arguments: a Calico Cloud version, and the cloud-manifest version"
  echo "that release installs from."
  echo "For example: ./scripts/update-cloud-image-list.sh v24.0.0 v3.24.0-1.0-1"
  exit 1
}

if [[ -z ${ccVersion} || -z ${manifestVersion} ]]; then
  help
fi

if [[ ! -f ${list} ]]; then
  echo "Run this from the root of the docs repo: ${list} not found"
  exit 1
fi

url="${baseUrl}/manifests/${manifestVersion}/image-list"
echo "Fetching ${url}"
images=$(curl -fsS "${url}")

if [[ -z ${images} ]]; then
  echo "No images returned by ${url}"
  exit 1
fi

CC_VERSION="${ccVersion}" IMAGES="${images}" LIST="${list}" SOURCE_URL="${url}" node -e '
  const fs = require("fs");
  const { CC_VERSION, IMAGES, LIST, SOURCE_URL } = process.env;
  let text = fs.readFileSync(LIST, "utf8");

  if (new RegExp(`^  .${CC_VERSION.replace(/\./g, "\\.")}( \\(latest\\))?.:`, "m").test(text)) {
    console.error(`${CC_VERSION} is already in ${LIST}`);
    process.exit(1);
  }
  if (/cc-operator/.test(IMAGES)) {
    console.error("NOTE: the image-list now contains cc-operator. It is added per version by");
    console.error("      VersionedCloudImageList, so check for a duplicate before committing.");
  }

  // The previous newest entry is no longer the latest.
  text = text.replace(/^  (.[^\n]+) \(latest\).:/m, "  $1'"'"':");

  const entry = `  // curl -0 ${SOURCE_URL}\n  '"'"'${CC_VERSION} (latest)'"'"': \`${IMAGES}\`,\n`;
  const start = "const ccImageLists = {\n";
  if (!text.startsWith(start)) {
    console.error(`could not find the start of ccImageLists in ${LIST}`);
    process.exit(1);
  }
  fs.writeFileSync(LIST, start + entry + text.slice(start.length));
'

echo "Added ${ccVersion} to ${list}"
echo "Check that quay.io/tigera/cc-operator:${ccVersion} is published before releasing the docs."
