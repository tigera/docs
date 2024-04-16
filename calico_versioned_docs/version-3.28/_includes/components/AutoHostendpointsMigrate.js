import React from 'react';

import Admonition from '@theme/Admonition';
import Link from '@docusaurus/Link';
import CodeBlock from '@theme/CodeBlock';
import Heading from '@theme/Heading';

import { prodname, baseUrl } from '../../variables';

export default function AutoHostendpointsMigrate(props) {
  return (
    <>
      <Heading
        as='h2'
        id='migrating-to-auto-host-endpoints'
      >
        Migrating to auto host endpoints
      </Heading>
      <Admonition type='caution'>
        Auto host endpoints have an allow-all profile attached which allows all traffic in the absence of network
        policy. This may result in unexpected behavior and data.
      </Admonition>
      <p>In order to migrate existing all-interfaces host endpoints to {prodname}-managed auto host endpoints:</p>
      <ol>
        <li>
          <p>
            Add any labels on existing all-interfaces host endpoints to their corresponding {props.orch} nodes.{' '}
            {prodname} manages labels on automatic host endpoints by syncing labels from their nodes. Any labels on
            existing all-interfaces host endpoints should be added to their respective nodes. For example, if your
            existing all-interface host endpoint for node <strong>node1</strong> has the label{' '}
            <strong>environment: dev</strong>, then you must add that same label to its node:
          </p>
          <CodeBlock language='bash'>
            {props.orch === 'OpenShift'
              ? 'oc label node node1 environment=dev'
              : 'kubectl label node node1 environment=dev'}
          </CodeBlock>
        </li>
        <li>
          <p>
            Enable auto host endpoints by following the{' '}
            <Link href={`${baseUrl}/network-policy/hosts/kubernetes-nodes#enable-automatic-host-endpoints`}>
              enable automatic host endpoints how-to guide
            </Link>
            . Note that automatic host endpoints are created with a profile attached that allows all traffic in the
            absence of network policy.
          </p>
          <CodeBlock language='bash'>
            calicoctl patch kubecontrollersconfiguration default --patch =
            {'{"spec": {"controllers": {"node": {"hostEndpoint": {"autoCreate": "Enabled"}}}}}'}
          </CodeBlock>
        </li>
        <li>
          <p>
            Delete old all-interfaces host endpoints. You can distinguish host endpoints managed by {prodname} from
            others in several ways. First, automatic host endpoints have the label{' '}
            <strong>projectcalico.org/created-by: calico-kube-controllers</strong>. Secondly, automatic host
            endpoints&#39; name have the suffix <strong>-auto-hep</strong>.
          </p>
          <CodeBlock language='bash'>calicoctl delete hostendpoint &lt;old_hostendpoint_name&gt;</CodeBlock>
        </li>
      </ol>
    </>
  );
}
