import React from 'react';

import CodeBlock from '@theme/CodeBlock';

export default function InstallOpenShiftManifests(props) {
  return (
    <>
      <p>Download the {props.prodname} manifests for OpenShift and add them to the generated manifests directory:</p>
      <CodeBlock language='bash'>
        {/* TODO [manifest]: Use correct manifest links */}
        {`mkdir calico
wget -qO- "/manifests/ocp.tgz" | tar xvz --strip-components=1 -C calico
cp calico/* manifests/`}
      </CodeBlock>
    </>
  );
}
