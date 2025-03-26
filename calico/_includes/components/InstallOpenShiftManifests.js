import React from 'react';

import CodeBlock from '@theme/CodeBlock';
import ConfigDataplaneOpenShiftManifests from './ConfigDataplaneOpenShiftManifests';

import { prodname, releaseTitle, calicoReleasesURL } from '../../variables';

export default function InstallOpenShiftManifests(props) {
  return (
    <>
      <p>Download the {prodname} manifests for OpenShift and add them to the generated manifests directory:</p>
      <CodeBlock id='data-install-openshift-manifests' language='bash'>
        {`mkdir calico
wget -qO- ${calicoReleasesURL}/${releaseTitle}/ocp.tgz | tar xvz --strip-components=1 -C calico
cp calico/* manifests/`}
      </CodeBlock>

      <When condition={!props.skipDataplaneConfigSteps}>
        <ConfigDataplaneOpenShiftManifests folderName="manifests" />
      </When>

    </>
  );
}
