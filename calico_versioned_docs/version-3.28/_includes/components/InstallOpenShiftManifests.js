import React from 'react';
import CodeBlock from '@theme/CodeBlock';
import variables from '@site/calico_versioned_docs/version-3.28/variables';

export default function InstallOpenShiftManifests() {
  return (
    <>
      <p>Download the {variables.prodname} manifests for OpenShift and add them to the generated manifests directory:</p>
      <CodeBlock id='data-install-openshift-manifests' language='bash'>
        {`mkdir calico
wget -qO- ${variables.calicoReleasesURL}/${variables.releaseTitle}/ocp.tgz | tar xvz --strip-components=1 -C calico
cp calico/* manifests/`}
      </CodeBlock>
    </>
  );
}
