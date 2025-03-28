import React from 'react';
import { When } from 'react-if';

import CodeBlock from '@theme/CodeBlock';
import ConfigDataplaneOpenShiftManifests from './ConfigDataplaneOpenShiftManifests';

import { prodname, releaseTitle, calicoReleasesURL } from '../../variables';

export default function InstallOpenShiftManifests(props) {
  let tarExcludeFlag = "";
  if(props.filesToExclude) {
    let fileList = props.filesToExclude.split(",");
    fileList.forEach(function(file) {
      tarExcludeFlag += "--exclude=ocp/" + file.trim()  + " ";
    });
  }
  return (
    <>
      <p>Download the {prodname} manifests for OpenShift and add them to the generated manifests directory:</p>
      <CodeBlock id='data-install-openshift-manifests' language='bash'>
        {`mkdir calico
wget -qO- ${calicoReleasesURL}/${releaseTitle}/ocp.tgz | tar xvz ${tarExcludeFlag}--strip-components=1 -C calico
cp calico/* manifests/`}
      </CodeBlock>

      <When condition={!props.skipDataplaneConfigSteps}>
        <ConfigDataplaneOpenShiftManifests folderName="manifests" />
      </When>

    </>
  );
}
