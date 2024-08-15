import React from 'react';

import CodeBlock from '@theme/CodeBlock';

import variables from '../../variables';

export default function InstallOpenShiftManifests(props) {
  const uf = props.upgradeFrom;
  const exclude1 = ' --exclude=01-cr-*';
  const exclude2 = ' --exclude=02-pull-secret.yaml';
  const flag1 = uf ? exclude1 : '';
  const flag2 = uf === 'Enterprise' ? exclude2 : '';

  return (
    <>
      <p>Download the {variables.prodname} manifests for OpenShift and add them to the generated manifests directory:</p>
      <CodeBlock id='data-install-openshift-manifests' language='bash'>
        {`mkdir calico
wget -qO- ${variables.filesUrl}/manifests/ocp.tgz | tar xvz --strip-components=1 -C calico ${flag1}${flag2}
cp calico/* manifests/`}
      </CodeBlock>
    </>
  );
}
