import React from 'react';

import Admonition from '@theme/Admonition';
import CodeBlock from '@theme/CodeBlock';

export default function OpenShiftPrometheusOperator(props) {
  return (
    <>
      <p>Apply the {props.prodname} manifests for the Prometheus operator.</p>
      <Admonition type='note'>
        Complete this step only if you are using the {props.prodname} Prometheus operator (including adding your own
        Prometheus operator). Skip this step if you are using{' '}
        <a href='../../../calico-enterprise/maintenance/monitor/support'>BYO Prometheus</a> that you manage yourself.
      </Admonition>
      <CodeBlock language='bash'>
        {props.operation === 'install'
          ? 'oc create -f "/manifests/ocp/tigera-prometheus-operator.yaml"'
          : 'oc apply -f "/manifests/ocp/tigera-prometheus-operator.yaml"'}
      </CodeBlock>
      <p>
        Create the pull secret in the <code>tigera-prometheus</code> namespace and then patch the Prometheus operator
        deployment. Use the image pull secret provided to you by Tigera support representative.
      </p>
      <CodeBlock language='bash'>
        {`oc create secret generic tigera-pull-secret \\
    --type=kubernetes.io/dockerconfigjson -n tigera-prometheus \\
    --from-file=.dockerconfigjson=<path/to/pull/secret>
oc patch deployment -n tigera-prometheus calico-prometheus-operator \\
    -p '{"spec":{"template":{"spec":{"imagePullSecrets":[{"name": "tigera-pull-secret"}]}}}}'`}
      </CodeBlock>
    </>
  );
}
