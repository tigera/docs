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
declare -A product_branch_prefix_dict=(
  ["calico-enterprise"]="release-calient"
)

is_valid_product() {
  local search=$1
  for product in "${!products[@]}"; do
    if [ $product == $search ]; then
      return 0
    fi
  done
  return 1
}

get_product_branch_ref() {
  local version=$1
  if [ $version != "master" ]; then
    : ${GIT_VERSION_REF:=$(echo "$version" | cut -d. -f1,2)}
    : ${GIT_VERSION_SUFFIX:=$(echo "${version}" | cut -d- -f2 | cut -d. -f1)}
    if [[ "${GIT_VERSION_SUFFIX}" == "1" ]]; then
      GIT_VERSION_REF="${GIT_VERSION_REF}-${GIT_VERSION_SUFFIX}"
    fi
    echo "?ref=${product_branch_prefix_dict[$PRODUCT]}-v${GIT_VERSION_REF#v}"
  fi
}

get_product_version_info() {
  local version=$1
  product_branch_ref=$(get_product_branch_ref $version)
  api_url="https://api.github.com/repos/${product_repo_dict[$PRODUCT]}/contents/calico/_data/versions.yml${product_branch_ref}"
  versions_yml=$(curl -fsSL -H 'Accept: application/vnd.github.v3.raw' -H "Authorization: token ${GITHUB_TOKEN}" "${api_url}")
  yq "
  ... comments=\"\" | .[] |
  select(.title == \"v${VERSION}\" or .title == \"${VERSION}\") 
  " <(echo "$versions_yml") | scripts/versions/format-versions
}

get_docs_folder_path() {
  local version=$1
  if [ $version == "master" ]; then
    echo $PRODUCT
  else
    local version_stream=$(echo "${version}" | cut -d. -f1,2)
    : ${DOCS_VERSION_STREAM:=${version_stream}}
    echo ${PRODUCT}_versioned_docs/version-${DOCS_VERSION_STREAM#v}
  fi
}

update_calico_enterprise_version() {
  new_version=$(yq -o=json '. |= pick(["title", "tigera-operator", "calico", "components"]) | del(.components.[].fips-image)' <(echo "$product_version_info"))
  # add new version as first item in array
  releases_json=$(cat $releases_json_file | jq --argjson newVersion "$(echo $new_version)" '. = [$newVersion] + .')
  jq '.' <(echo $releases_json) >$releases_json_file
  echo "[info] ${releases_json_file} updated; review ${docs_folder_path}/variables.js by hand (this script no longer writes it)"
}

if ! is_valid_product "$PRODUCT"; then
  echo "error: Invalid product specified: \"$PRODUCT\""
  exit 1
fi

# sanitize product version
VERSION=${VERSION#v}
# determine path to folder for update
docs_folder_path=$(get_docs_folder_path $VERSION)
# set version file
releases_json_file=${docs_folder_path}/releases.json
# Check if version exists in docs
found_version=$(jq ".[] | select(.title| test(\"$VERSION\"))" $releases_json_file)
if [ -n "$found_version" ]; then
  # if version already exists, delete existing and replace
  yq -o=json -i "del(.[]| select(.title | test(\"$VERSION\")))" $releases_json_file
fi

product_version_info=$(get_product_version_info $VERSION)

if [ -z "$product_version_info" -a "$product_version_info" != " " ]; then
  echo "error: No component list found for $PRODUCT $VERSION"
  exit 1
else
  case $PRODUCT in
  calico-enterprise)
    update_calico_enterprise_version
    ;;
  *)
    echo "error: Invalid product specified: \"$PRODUCT\""
    exit 1
    ;;
  esac
fi
