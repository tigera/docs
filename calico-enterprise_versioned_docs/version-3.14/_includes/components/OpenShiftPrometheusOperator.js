import React from 'react';

import Admonition from '@theme/Admonition';
import CodeBlock from '@theme/CodeBlock';
import Link from '@docusaurus/Link';

import { prodname, baseUrl, filesUrl } from '../../variables';

export default function OpenShiftPrometheusOperator(props) {
  return (
    <>
      <p>Apply the {prodname} manifests for the Prometheus operator.</p>
          {props.operation === 'install'
              ? <CodeBlock language='bash'>oc create -f {filesUrl}/manifests/ocp/tigera-prometheus-operator.yaml</CodeBlock>
              : <CodeBlock language='bash'>oc apply -f {filesUrl}/manifests/ocp/tigera-prometheus-operator.yaml</CodeBlock>}
      <p>
        Create the pull secret in the <code>tigera-prometheus</code> namespace and then patch the Prometheus operator
        deployment. Use the image pull secret provided to you by Tigera support representative.
      </p>
      <CodeBlock language='batch'>
        {`oc create secret generic tigera-pull-secret \\
    --type=kubernetes.io/dockerconfigjson -n tigera-prometheus \\
    --from-file=.dockerconfigjson=<path/to/pull/secret>
oc patch deployment -n tigera-prometheus calico-prometheus-operator \\
    -p '{"spec":{"template":{"spec":{"imagePullSecrets":[{"name": "tigera-pull-secret"}]}}}}'`}
      </CodeBlock>
      <Admonition type='note'>
        If you have a different Prometheus operator separate from {prodname} in your cluster that you want to use, skip
        this section. To work with {prodname}, your Prometheus operator must be v0.40.0 or higher.
      </Admonition>
    </>
  );
}
