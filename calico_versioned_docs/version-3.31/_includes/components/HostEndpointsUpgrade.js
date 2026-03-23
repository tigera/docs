import React from 'react';
import Admonition from '@theme/Admonition';
import CodeBlock from '@theme/CodeBlock';
import Heading from '@theme/Heading';

import { prodname, version } from '../../variables';

export default function HostEndpointsUpgrade(props) {
  return (
    <>
      <Heading
        as='h2'
        id='host-endpoints'
      >
        Host endpoints
      </Heading>
      <Admonition type='caution'>
        If your cluster has host endpoints with <code>interfaceName: *</code> you must prepare your cluster before
        upgrading. Failure to do so will result in an outage.
      </Admonition>
      <p>
        In versions of {prodname} prior to v3.14, all-interfaces host endpoints (host endpoints with{' '}
        <code>interfaceName: *</code>) only supported pre-DNAT policy. The default behavior of all-interfaces host
        endpoints, in the absence of any policy, was to allow all traffic.
      </p>
      <p>
        Beginning from v3.14, all-interfaces host endpoints support normal policy in addition to pre-DNAT policy. The
        support for normal policy includes a change in default behavior for all-interfaces host endpoints: in the
        absence of policy the default behavior is to <strong>drop traffic</strong>. This default behavior is consistent
        with &quot;named&quot; host endpoints (which specify a named interface such as &quot;eth0&quot;); named host
        endpoints drop traffic in the absence of policy.
      </p>
      <p>
        Before upgrading to {version}, you must ensure that global network policies are in place that select existing
        all-interfaces host endpoints and explicitly allow existing traffic flows. As a starting point, you can create
        an allow-all policy that selects existing all-interfaces host endpoints. First, we&#39;ll add a label to the
        existing host endpoints. Get a list of the nodes that have an all-interfaces host endpoint:
      </p>
      <CodeBlock language='bash'>calicoctl get hep -owide | grep | awk '"{'print $1'}"'</CodeBlock>
      <p>
        With the names of the all-interfaces host endpoints, we can label each host endpoint with a new label (for
        example, <strong>host-endpoint-upgrade: &quot;&quot;</strong>):
      </p>
      <CodeBlock language='bash'>
        calicoctl get hep -owide | grep '*' | awk '"{'print $1'}"' \
        <br />
        {props.orch === 'OpenShift'
          ? '| xargs -I {} oc exec -i -n kube-system calicoctl -- calicoctl label hostendpoint {} host-endpoint-upgrade='
          : '| xargs -I {} kubectl exec -i -n kube-system calicoctl -- calicoctl label hostendpoint {} host-endpoint-upgrade=	'}
      </CodeBlock>
      <p>
        Now that the nodes with an all-interfaces host endpoint are labeled with <strong>host-endpoint-upgrade</strong>,
        we can create a policy to log and allow all traffic going into or out of the host endpoints temporarily:
      </p>
      <CodeBlock language='bash'>
        {`cat > allow-all-upgrade.yaml <<EOF
apiVersion: projectcalico.org/v3
kind: GlobalNetworkPolicy
metadata:
  name: allow-all-upgrade
spec:
  selector: has(host-endpoint-upgrade)
  types:
  - Ingress
  - Egress
  ingress:
  - action: Log
  - action: Allow
  egress:
  - action: Log
  - action: Allow
EOF`}
      </CodeBlock>
      <p>Apply the policy:</p>
      <CodeBlock language='bash'>calicoctl apply -f - {'<'} allow-all-upgrade.yaml</CodeBlock>
      <p>
        After applying this policy, all-interfaces host endpoints will log and allow all traffic through them. This
        policy will allow all traffic not accounted for by other policies. After upgrading, please review syslog logs
        for traffic going through the host endpoints and update the policy as needed to secure traffic to the host
        endpoints.
      </p>
    </>
  );
}
