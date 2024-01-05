#!/usr/bin/env bash
set -eu

: ${VERSION:?"Product version not specified, set using 'VERSION' e.g. VERSION=3.15.4"}
: ${PRODUCT:?"Product not specified, set using 'PRODUCT'"}
: ${GITHUB_TOKEN:?"GitHub API token not specified, set using 'GITHUB_TOKEN'"}

declare -A products=(
  "calico-enterprise"
)

declare -A product_repo_dict=(
  ["calico-enterprise"]="tigera/calico-private"
)
declare -A product_branch_prefix=(
  ["calico-enterprise"]="release-calient"
)

valid_product() {
  local search=$1
  for product in "${!products[@]}"; do
    if [ $product == $search ]; then
      return 0
    fi
  done
  return 1
}

git_branch_ref() {
  local version=$1
  if [ $version != "master" ]; then
    : ${GIT_VERSION_REF:=$(echo "$version" | cut -d. -f1,2)}
    echo "?ref=${product_branch_prefix[$PRODUCT]}-v${GIT_VERSION_REF#v}"
  fi
}

docs_folder_path() {
  local version=$1
  if [ $version == "master" ]; then
    echo $PRODUCT
  else
    local version_stream=$(echo "${version}" | cut -d. -f1,2)
    : ${DOCS_VERSION_STREAM:=${version_stream}}
    echo ${PRODUCT}_versioned_docs/version-${DOCS_VERSION_STREAM#v}
  fi
}

if ! valid_product "$PRODUCT"; then
  echo "error: Invalid product specified: \"$PRODUCT\""
fi

# sanitize product version
VERSION=${VERSION#v}
branchRef=$(git_branch_ref $VERSION)
apiUrl="https://${GITHUB_TOKEN}:@api.github.com/repos/${product_repo_dict[$PRODUCT]}/contents/calico/_data/versions.yml${branchRef}"
releases_json_file=$(docs_folder_path $VERSION)/releases.json

found_version=$(jq ".[] | select(.title| test(\"$VERSION\"))" $releases_json_file)
if [ -n "$found_version" ]; then
  # Skip updating if version already exists
  echo "Component list for $VERSION already exists ...SKIPPING!"
  exit 0
  # Alternative option: delete existing and replace
  # yq -o=json -i "del(.[]| select(.title | test(\"$VERSION\")))" $releases_json_file
fi

versions_yml=$(curl -H 'Accept: application/vnd.github.v3.raw' "${apiUrl}")
version_info=$(yq "
  ... comments=\"\" | .[] |
  select(.title == \"v${VERSION}\" or .title == \"${VERSION}\")
  " <(echo "$versions_yml"))

if [ -z "$version_info" -a "$version_info" != " " ]; then
  echo "error: No component list found for $VERSION"
  exit 1
else
  new_version=$(yq -o=json '. |= pick(["title", "helmRelease", "tigera-operator", "calico", "components"]) | del(.components.[].fips-image)' <(echo "$version_info"))
  # add new version as first item in array
  releases_json=$(cat $releases_json_file | jq --argjson newVersion "$(echo $new_version)" '. = [$newVersion] + .')
  jq '.' <(echo $releases_json) >$releases_json_file
fi
