#!/bin/bash

product=$1
version=$2

echo 'Cutting a new version...'

yarn docusaurus docs:version:$product $version

echo 'Updating MDX imports...'
regex="s/import (.*) from\s* '\@site\/${product}\/(.*)';/import \${1} from '\@site\/${product}_versioned_docs\/version-${version}\/\${2}';/g"
find "./${product}_versioned_docs/version-${version}" -path '*/*.mdx' -type f -print0 | xargs -0 perl -0777 -pi -e "${regex}"
echo '[SUCCESS]: imports updated!'
echo

echo 'Press any key...'
read -n 1
