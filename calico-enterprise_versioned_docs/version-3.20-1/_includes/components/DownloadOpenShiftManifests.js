import React from 'react';

import CodeBlock from '@theme/CodeBlock';

import variables from '../../variables';

export default function DownloadOpenShiftManifests() {
  return (
    <>
      <p>Download the {variables.prodname} manifests for OpenShift:</p>
      <CodeBlock id='data-download-openshift-manifests' language='bash'>
        {`mkdir calico
wget -qO- ${variables.filesUrl}/manifests/ocp.tgz | tar xvz --strip-components=1 -C calico`}
      </CodeBlock>
    </>
  );
}
