import React from 'react';

import Admonition from '@theme/Admonition';
import CodeBlock from '@theme/CodeBlock';
import Link from '@docusaurus/Link';

import { prodname, baseUrl, filesUrl } from '../../variables';

export default function OpenShiftPrometheusOperator(props) {
  const createSecret = `oc create secret generic tigera-pull-secret \\
  --type=kubernetes.io/dockerconfigjson -n tigera-prometheus \\
  --from-file=.dockerconfigjson=<path/to/pull/secret>\n`;
  const notOSCodeBlock = props.upgradeFrom !== 'OpenSource' ? createSecret : '';

  return (
    <>
      <p>Apply the {prodname} manifests for the Prometheus operator.</p>
      <Admonition type='note'>
        Complete this step only if you are using the {prodname} Prometheus operator (including adding your own
        Prometheus operator). Skip this step if you are using{' '}
        <Link href={`${baseUrl}/operations/monitor/prometheus/support`}>BYO Prometheus</Link> that you manage yourself.
      </Admonition>
        {props.operation === 'install'
            ? <CodeBlock language='bash'>oc create -f {filesUrl}/manifests/ocp/tigera-prometheus-operator.yaml</CodeBlock>
            : <CodeBlock language='bash'>oc apply -f {filesUrl}/manifests/ocp/tigera-prometheus-operator.yaml</CodeBlock>}
    </>
  );
}
