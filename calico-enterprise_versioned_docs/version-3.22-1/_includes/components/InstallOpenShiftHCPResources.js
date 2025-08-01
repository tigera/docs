import React from 'react';

import CodeBlock from '@theme/CodeBlock';

import { filesUrl } from '../../variables';
import OpenShiftPrometheusOperator from './OpenShiftPrometheusOperator';

export default function InstallOpenShiftHCPResources() {
  return (
    <>
      <p>Apply the custom resources for enterprise features.</p>
      <CodeBlock language='bash'>oc create -f {filesUrl}/manifests/ocp/tigera-enterprise-resources.yaml</CodeBlock>

      <OpenShiftPrometheusOperator operation='install' />

      <p>You can now monitor progress with the following command:</p>
      <CodeBlock>watch oc get tigerastatus</CodeBlock>
      <p>
        When it shows all components with status <code>Available</code>, proceed to the next step.
      </p>

      <p>(Optional) Apply the full CRDs including descriptions.</p>
      <CodeBlock language='bash'>oc apply --server-side --force-conflicts -f {filesUrl}/manifests/operator-crds.yaml</CodeBlock>
    </>
  );
}
