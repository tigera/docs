#!/bin/bash

# This script makes changes to docusaurus.config.js.
# These changes make Docusaurus publish only version Next for each product doc set.

sed -i "s/onBrokenLinks: 'throw'/onBrokenLinks: 'warn'/" docusaurus.config.js
sed -i "s/onlyIncludeVersions: \[.*\]/onlyIncludeVersions: \['current'\]/" docusaurus.config.js
sed -i "/lastVersion/d" docusaurus.config.js

# Changes links from landing page to version next
sed -i "s/calico\/latest\/about/calico\/next\/about/" src/___new___/data/selectDocsInfo.ts
sed -i "s/calico-enterprise\/latest\/about/calico-enterprise\/next\/about/" src/___new___/data/selectDocsInfo.ts
sed -i "s/calico-cloud\/about/calico-cloud\/next\/about\//" src/___new___/data/selectDocsInfo.ts

yarn build