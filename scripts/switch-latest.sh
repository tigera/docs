#!/usr/bin/env bash
set -e

product=$1
fromVersion=$2
toVersion=$3

function help() {
  echo "This script requires 3 arguments: a product name (calico or calico-enterprise), a 'from' version, and a 'to' version"
  echo "For example: ./script/switch-latest.sh calico 3.25 3.26"
  exit 1
}

if [[ "${product}" != "calico" && "${product}" != "calico-enterprise" ]]; then
  help
elif [[ -z $fromVersion || -z $toVersion ]]; then
  help
fi

echo 'Switching latest...'

regex="s/^[ \t]*baseUrl:[ \t]*'\/${product}/latest'[ \t]*,[ \t]*\$/m"
perl -0777 -pi -e "${regex}" "./${product}_versioned_docs/version-${fromVersion}/variables.js"

regex="s/^[ \t]*baseUrl:[ \t]*'\/${product}/${toVersion}'[ \t]*,[ \t]*\$/m"
perl -0777 -pi -e "${regex}" "./${product}_versioned_docs/version-${toVersion}/variables.js"

regex="s/label:[ \t]*'${fromVersion}'[ \t]*,[ \t]*\n([ \t]*)path:[ \t]*'latest'[ \t]*,/label: '${fromVersion}',\n\${1}path: '${fromVersion}',/m"
perl -0777 -pi -e "${regex}" "./docusaurus.config.js"

regex="s/label:[ \t]*'${toVersion}'[ \t]*,[ \t]*\n([ \t]*)path:[ \t]*'latest'[ \t]*,/label: '${toVersion}',\n\${1}path: 'latest',/m"
perl -0777 -pi -e "${regex}" "./docusaurus.config.js"

echo "[SUCCESS]: version 'latest' for product '${product}' switched from ${fromVersion} to ${toVersion}"
