import React from 'react';

import CodeBlock from '@theme/CodeBlock';

import getProductVariablesByProdname from '../../utils/getProductVariablesByProdname';

export default function InstallOpenShiftManifests(props) {
  const { url, baseUrl } = getProductVariablesByProdname(props.prodname);

  return (
    <>
      <p>Download the {props.prodname} manifests for OpenShift and add them to the generated manifests directory:</p>
      <CodeBlock language='bash'>
        {`mkdir calico
wget -qO- ${url}${baseUrl}/manifests/ocp.tgz | tar xvz --strip-components=1 -C calico
cp calico/* manifests/`}
      </CodeBlock>
    </>
  );
}
