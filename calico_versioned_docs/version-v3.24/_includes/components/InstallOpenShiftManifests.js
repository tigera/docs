import React from 'react';

import CodeBlock from '@theme/CodeBlock';
import { url } from '@site/variables';

import { prodname, baseUrl } from '../../variables';

export default function InstallOpenShiftManifests() {
  return (
    <>
      <p>Download the {prodname} manifests for OpenShift and add them to the generated manifests directory:</p>
      <CodeBlock language='bash-plain-text'>
        {`mkdir calico
wget -qO- ${url}${baseUrl}/manifests/ocp.tgz | tar xvz --strip-components=1 -C calico
cp calico/* manifests/`}
      </CodeBlock>
    </>
  );
}
