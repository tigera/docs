import React from 'react';

import CodeBlock from '@theme/CodeBlock';
import ConfigDataplaneOpenShiftManifests from './ConfigDataplaneOpenShiftManifests';

import { prodname, releaseTitle, calicoReleasesURL } from '../../variables';

export default function DownloadOpenShiftManifests() {
  return (
    <>
      <p>Download the {prodname} manifests for OpenShift:</p>
      <CodeBlock id='data-download-openshift-manifests' language='bash'>
        {`mkdir calico
wget -qO- ${calicoReleasesURL}/${releaseTitle}/ocp.tgz | tar xvz --strip-components=1 -C calico`}
      </CodeBlock>

      <ConfigDataplaneOpenShiftManifests folderName="calico" />
    </>
  );
}
