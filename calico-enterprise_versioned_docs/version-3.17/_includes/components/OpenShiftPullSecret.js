import React from 'react';

import CodeBlock from '@theme/CodeBlock';

export default function OpenShiftPullSecret() {
  return (
    <>
      <p>
        Update the contents of the secret with the image pull secret provided to you by Tigera support representative.
      </p>
      <p>
        For example, if the secret is located at <code>~/.docker/config.json</code>, run the following commands.
      </p>
      <CodeBlock>
        {"SECRET=$(cat ~/.docker/config.json | tr -d '\\n\\r\\t ' | base64 -w 0)\n"}
        {'sed -i "s/SECRET/${SECRET}/" manifests/02-pull-secret.yaml'}
      </CodeBlock>
    </>
  );
}
