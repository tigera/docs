import React from 'react';
import { When } from 'react-if';

import Admonition from '@theme/Admonition';
import CodeBlock from '@theme/CodeBlock';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';

import ConfigureManagedCluster from './ConfigureManagedCluster';
import { prodname, prodnamedash, baseUrl, filesUrl } from '../../variables';

export default function InstallGeneric(props) {
  return (
    <>
      <Heading
        as='h4'
        id={`install-${prodnamedash}`}
      >
        Install {prodname}
      </Heading>
      <When condition={props.clusterType !== 'managed'}>
        <li>
          <Link href={`${baseUrl}/operations/logstorage/create-storage`}>Configure storage for {prodname}</Link>.
        </li>
      </When>
      <ol>
        <li>
          <p>Install the Tigera Operator and custom resource definitions.</p>
          <CodeBlock>kubectl create -f {filesUrl}/manifests/tigera-operator.yaml</CodeBlock>
        </li>
        <li>
          <p>
            Install the Prometheus operator and related custom resource definitions. The Prometheus operator will be
            used to deploy Prometheus server and Alertmanager to monitor {prodname} metrics.
          </p>
          <Admonition type='note'>
            If you have an existing Prometheus operator in your cluster that you want to use, skip this step. To work
            with {prodname}, your Prometheus operator must be v0.40.0 or higher.
          </Admonition>
          <CodeBlock>kubectl create -f {filesUrl}/manifests/tigera-prometheus-operator.yaml</CodeBlock>
        </li>
        <li>
          Install your pull secret.
          <p>
            If pulling images directly from <code>quay.io/tigera</code>, you will likely want to use the credentials
            provided to you by your Tigera support representative. If using a private registry, use your private
            registry credentials.
          </p>
          <CodeBlock>
            {`kubectl create secret generic tigera-pull-secret \\
  --type=kubernetes.io/dockerconfigjson -n tigera-operator \\
  --from-file=.dockerconfigjson=<path/to/pull/secret>`}
          </CodeBlock>
        </li>
        <li>
          (Optional) If your cluster architecture requires any custom{' '}
          <Link href={`${baseUrl}/reference/resources`}>{prodname} resources</Link> to function at startup, install them
          now using <Link href={`${baseUrl}/reference/clis/calicoctl/overview`}>calicoctl</Link>.
        </li>
        <li>
          <p>
            (Optional) Compliance and packet capture features are optional. To enable these features during installation, download and review the custom-resources.yaml file. Uncomment the necessary CRs and use this custom-resources.yaml for installation.
          </p>
          <p>
            <CodeBlock language='bash'>curl -O -L {filesUrl}/manifests/custom-resources.yaml</CodeBlock>
          </p>
        </li>
        <When condition={props.clusterType === 'managed'}>
          <li>
            <p>
              Download the Tigera custom resources. For more information on configuration options available in this
              manifest, see <Link href={`${baseUrl}/reference/installation/api`}>the installation reference</Link>.
            </p>
            <CodeBlock language='bash'>curl -O -L {filesUrl}/manifests/custom-resources.yaml</CodeBlock>
            <p>
              Remove the <code>Manager</code> custom resource from the manifest file.
            </p>
            <CodeBlock language='yaml'>
              {`apiVersion: operator.tigera.io/v1
kind: Manager
metadata:
  name: tigera-secure
spec:
  # Authentication configuration for accessing the Tigera manager.
  # Default is to use token-based authentication.
  auth:
    type: Token`}
            </CodeBlock>
            <p>
              Remove the <code>LogStorage</code> custom resource from the manifest file.
            </p>
            <CodeBlock language='yaml'>
              {`apiVersion: operator.tigera.io/v1
kind: LogStorage
metadata:
  name: tigera-secure
spec:
  nodes:
    count: 1`}
            </CodeBlock>
            <p>Now apply the modified manifest.</p>
            <CodeBlock language='bash'>kubectl create -f ./custom-resources.yaml</CodeBlock>
          </li>
        </When>
        <When condition={props.clusterType !== 'managed'}>
          <li>
            <p>
              Install the Tigera custom resources. For more information on configuration options available, see{' '}
              <Link href={`${baseUrl}/reference/installation/api`}>the installation reference</Link>.
            </p>
            <CodeBlock>kubectl create -f {filesUrl}/manifests/custom-resources.yaml</CodeBlock>
          </li>
        </When>
        <p>You can now monitor progress with the following command:</p>
        <CodeBlock>watch kubectl get tigerastatus</CodeBlock>
        <p>
          Wait until the <code>apiserver</code> shows a status of <code>Available</code>, then proceed to the next
          section.
        </p>
      </ol>
      <When condition={props.clusterType === 'standalone' || props.clusterType === 'management'}>
        <>
          <Heading
            as='h4'
            id={`install-${prodnamedash}-license`}
          >
            Install {prodname} license
          </Heading>
          <p>Install the {prodname} license provided to you by Tigera.</p>
          <CodeBlock>
            kubectl create -f {'<'}/path/to/license.yaml{'>'}
          </CodeBlock>
          <p>You can now monitor progress with the following command:</p>
          <CodeBlock>watch kubectl get tigerastatus</CodeBlock>
        </>
      </When>
      <When condition={props.clusterType == 'management'}>
        <>
          <Heading
            as='h4'
            id='create-a-management-cluster'
          >
            Create a management cluster
          </Heading>
          <p>
            To control managed clusters from your central management plane, you must ensure it is reachable for
            connections. The simplest way to get started (but not for production scenarios), is to configure a{' '}
            <code>NodePort</code> service to expose the management cluster. Note that the service must live within the{' '}
            <code>tigera-manager</code> namespace.
          </p>
          <ol>
            <li>
              <p>
                Create a service to expose the management cluster. The following example of a NodePort service may not
                be suitable for production and high availability. For options, see{' '}
                <Link href={`${baseUrl}/multicluster/mcm/fine-tune-deployment`}>
                  Fine-tune multi-cluster management for production
                </Link>
                . Apply the following service manifest.
              </p>
              <CodeBlock language='bash'>
                {`kubectl create -f - <<EOF
apiVersion: v1
kind: Service
metadata:
  name: tigera-manager-mcm
  namespace: tigera-manager
spec:
  ports:
  - nodePort: 30449
    port: 9449
    protocol: TCP
    targetPort: 9449
  selector:
    k8s-app: tigera-manager
  type: NodePort
EOF`}
              </CodeBlock>
            </li>
            <li>
              <p>
                Export the service port number, and the public IP or host of the management cluster. (Ex.
                "example.com:1234" or "10.0.0.10:1234".)
              </p>
              <CodeBlock>
                export MANAGEMENT_CLUSTER_ADDR={'<'}your-management-cluster-addr{'>'}
              </CodeBlock>
            </li>
            <li>
              <p>
                <Link href={`${baseUrl}/reference/installation/api#operator.tigera.io/v1.ManagementCluster`}>
                  ManagementCluster
                </Link>{' '}
                CR.
              </p>
              <CodeBlock language='bash'>
                {`kubectl apply -f - <<EOF
apiVersion: operator.tigera.io/v1
kind: ManagementCluster
metadata:
  name: tigera-secure
spec:
  address: $MANAGEMENT_CLUSTER_ADDR
EOF`}
              </CodeBlock>
            </li>
          </ol>
          <Heading
            as='h4'
            id='create-an-admin-user-and-verify-management-cluster-connection'
          >
            Create an admin user and verify management cluster connection
          </Heading>
          <p>
            To access resources in a managed cluster from the {prodname} Manager within the management cluster, the
            logged-in user must have appropriate permissions defined in that managed cluster (clusterrole bindings).
          </p>
          <ol>
            <li>
              <p>
                Create an admin user called, <code>mcm-user</code> in the default namespace with full permissions, by
                applying the following commands.
              </p>
              <CodeBlock language='bash'>
                kubectl create sa mcm-user{'\n'}
                kubectl create clusterrolebinding mcm-user-admin --serviceaccount=default:mcm-user
                --clusterrole=tigera-network-admin
              </CodeBlock>
            </li>
            <li>
              <p>Get the login token for your new admin user, and log in to {prodname} Manager.</p>
              <CodeBlock language='bash'>
                {`kubectl get secret $(kubectl get serviceaccount mcm-user -o jsonpath='{range .secrets[*]}{.name}{"\n"}{end}' | grep token) -o go-template='{{.data.token | base64decode}}' && echo`}
              </CodeBlock>
              <p>
                In the top right banner, your management cluster is displayed as the first entry in the cluster
                selection drop-down menu with the fixed name, <code>management cluster</code>.
              </p>
              <p>
                <img
                  src='/img/calico-enterprise/mcm/mcm-management-cluster.png'
                  alt='Cluster Created'
                />
              </p>
            </li>
          </ol>
          <p>You have successfully installed a management cluster.</p>
        </>
      </When>
      <When condition={props.clusterType === 'managed'}>
        <>
          <ConfigureManagedCluster />
          <Heading
            as='h4'
            id='provide-permissions-to-view-the-managed-cluster'
          >
            Provide permissions to view the managed cluster
          </Heading>
          <p>
            To access resources belonging to a managed cluster from the {prodname} Manager UI, the service or user
            account used to log in must have appropriate permissions defined in the managed cluster.
          </p>
          <p>
            Let&#39;s define admin-level permissions for the service account (<code>mcm-user</code>) we created to log
            in to the Manager UI. Run the following command against your managed cluster.
          </p>
          <CodeBlock language='bash'>
            kubectl create clusterrolebinding mcm-user-admin --serviceaccount=default:mcm-user
            --clusterrole=tigera-network-admin
          </CodeBlock>
        </>
      </When>
    </>
  );
}
