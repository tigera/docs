import React from 'react';

import CodeBlock from '@theme/CodeBlock';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';

import { baseUrl } from '../../variables';

export default function ConfigureManagedCluster(props) {
  const kubectlCmd = props.kubectlCmd || 'kubectl';

  return (
    <>
      <Heading
        as='h4'
        id='create-the-connection-manifest-for-your-managed-cluster'
      >
        Create the connection manifest for your managed cluster
      </Heading>
      <p>
        To connect the managed cluster to your management cluster, you need to create and apply a connection manifest.
        You can create a connection manifest from the Manager UI in the management cluster or manually using{' '}
        {kubectlCmd}.
      </p>
      <Heading
        as='h5'
        id='connect-cluster---manager-ui'
      >
        Connect cluster - Manager UI
      </Heading>
      <ol>
        <li>
          <p>
            In the Manager UI left navbar, click <strong>Managed Clusters</strong>.
          </p>
        </li>
        <li>
          <p>
            On the Managed Clusters page, click the button, <strong>Add Cluster</strong>.
          </p>
        </li>
        <li>
          <p>Name your cluster that is easily recognized in a list of managed clusters, and click Create Cluster.</p>
        </li>
        <li>
          <p>Download the manifest.</p>
        </li>
      </ol>
      <Heading
        as='h5'
        id='connect-cluster---kubectl'
      >
        connect-cluster---kubectl
      </Heading>
      <p>
        Choose a name for your managed cluster and then add it to your <strong>management cluster</strong>. The
        following commands will create a manifest with the name of your managed cluster in your current directory.
      </p>
      <ol>
        <li>
          <p>
            First, decide on the name for your managed cluster. Because you will eventually have several managed
            clusters, choose a name that can be easily recognized in a list of managed clusters. The name is also used
            in steps that follow.
          </p>
          <CodeBlock language='bash'>export MANAGED_CLUSTER=my-managed-cluster</CodeBlock>
        </li>
        <li>
          <p>
            Get the namespace in which the Tigera Operator is running in your managed cluster (in most cases this will
            be <code>tigera-operator</code>):
          </p>
          <CodeBlock language='bash'>export MANAGED_CLUSTER_OPERATOR_NS=tigera-operator</CodeBlock>
        </li>
        <li>
          <p>
            Add a managed cluster and save the manifest containing a{' '}
            <Link href={`${baseUrl}/reference/installation/api#managementclusterconnection`}>
              ManagementClusterConnection
            </Link>{' '}
            and a Secret.
          </p>
          <CodeBlock language='bash'>
            {`${kubectlCmd} -o jsonpath="{.spec.installationManifest}" > $MANAGED_CLUSTER.yaml create -f - <<EOF
apiVersion: projectcalico.org/v3
kind: ManagedCluster
metadata:
  name: $MANAGED_CLUSTER
spec:
  operatorNamespace: $MANAGED_CLUSTER_OPERATOR_NS
EOF`}
          </CodeBlock>
        </li>
        <li>
          Verify that the <code>managementClusterAddr</code> in the manifest is correct.
        </li>
      </ol>
      <Heading
        as='h4'
        id='apply-the-connection-manifest-to-your-managed-cluster'
      >
        Apply the connection manifest to your managed cluster
      </Heading>
      <ol>
        <li>
          <p>
            Apply the manifest that you modified in the step,
            <strong> Add a managed cluster to the management cluster</strong>.
          </p>
          <CodeBlock language='bash'>{`${kubectlCmd} apply -f $MANAGED_CLUSTER.yaml`}</CodeBlock>
        </li>
        <li>
          <p>Monitor progress with the following command:</p>
          <CodeBlock language='bash'>{`watch ${kubectlCmd} get tigerastatus`}</CodeBlock>
          Wait until the <code>management-cluster-connection</code> and <code>tigera-compliance</code> show a status of{' '}
          <code>Available</code>.
        </li>
      </ol>
      <p>You have now successfully installed a managed cluster!</p>
    </>
  );
}
