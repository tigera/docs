#!/usr/bin/env bash
set -e

product=$1
fromVersion=${2}
toVersion=${3}
fromRegex=${2/./\\.}
toRegex=${3/./\\.}

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

echo "Switching latest from ${fromVersion} to ${toVersion}"

echo "Updating ./${product}_versioned_docs/version-${fromVersion}/variables.js"
regex="s/baseUrl:[ \t]*'.*?'/baseUrl: '\/${product}\/${fromVersion}'/"
perl -0777 -pi -e "${regex}" "./${product}_versioned_docs/version-${fromVersion}/variables.js"

echo "Updating ./${product}_versioned_docs/version-${toVersion}/variables.js"
regex="s/baseUrl:[ \t]*'.*?'/baseUrl: '\/${product}\/latest'/"
perl -0777 -pi -e "${regex}" "./${product}_versioned_docs/version-${toVersion}/variables.js"

echo "Updating ./docusaurus.config.js from 'latest'"
regex="s/${fromRegex}:\s*{(.*?)path:[ \t]*'latest'/${fromVersion}: {\${1}path: '${fromVersion}'/s"
perl -0777 -pi -e "${regex}" "./docusaurus.config.js"
regex="s/${fromRegex}:\s*{(.*?)label:[ \t]*'${fromRegex} \(latest\)'/${fromVersion}: {\${1}label: '${fromVersion}'/s"
perl -0777 -pi -e "${regex}" "./docusaurus.config.js"

echo "Updating ./docusaurus.config.js to 'latest'"
regex="s/${toRegex}:\s*{(.*?)path:[ \t]*'${toRegex}'/${toVersion}: {\${1}path: 'latest'/s"
perl -0777 -pi -e "${regex}" "./docusaurus.config.js"
regex="s/${toRegex}:\s*{(.*?)label:[ \t]*'${toRegex}.*?'/${toVersion}: {\${1}label: '${toVersion} (latest)'/s"
perl -0777 -pi -e "${regex}" "./docusaurus.config.js"

echo "Done: version 'latest' for product '${product}' switched from ${fromVersion} to ${toVersion}"
echo "Please use git diff to evaluate the modifications!"

