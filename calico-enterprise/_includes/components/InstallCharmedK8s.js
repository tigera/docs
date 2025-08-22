import React from 'react';

import CodeBlock from '@theme/CodeBlock';
import Link from '@docusaurus/Link';
import Admonition from '@theme/Admonition';
import Heading from '@theme/Heading';

import ConfigureManagedCluster from './ConfigureManagedCluster';
import { prodname, prodnamedash, baseUrl, filesUrl } from '../../variables';

export default function InstallCharmedK8s(props) {
  return (
    <>
      <Heading
        as='h4'
        id='install-with-calico-cni-networking'
      >
        Install with Calico CNI networking
      </Heading>
      <p>Use this method if your Charmed Kubernetes cluster is configured with Calico as the CNI.</p>
      <ol>
        <li>
          <p>Install the Tigera Operator and custom resource definitions.</p>
          <CodeBlock>kubectl create -f {filesUrl}/manifests/operator-crds.yaml</CodeBlock>
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
          <p>Install your pull secret.</p>
          <p>
            If pulling images directly from <code>quay.io/tigera</code>, you will likely want to use the credentials
            provided to you by your Tigera support representative. If using a private registry, use your private
            registry credentials instead.
          </p>
          <CodeBlock>
            {`kubectl create secret generic tigera-pull-secret \\
    --type=kubernetes.io/dockerconfigjson -n tigera-operator \\
    --from-file=.dockerconfigjson=<path/to/pull/secret>`}
          </CodeBlock>
        </li>
        <li>
          <p>
            Install any extra <Link href={`${baseUrl}/reference/resources`}>{prodname} resources</Link> needed at
            cluster start using <Link href={`${baseUrl}/reference/clis/calicoctl/overview`}>calicoctl</Link>.
          </p>
        </li>
        {props.clusterType === 'managed' ? (
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
            <p>You can now monitor progress with the following command:</p>
            <CodeBlock>watch kubectl get tigerastatus</CodeBlock>
          </li>
        ) : (
          <li>
            <p>
              Install the Tigera custom resources. For more information on configuration options available in this
              manifest, see <Link href={`${baseUrl}/reference/installation/api`}>the installation reference</Link>.
            </p>
            <CodeBlock>kubectl create -f {filesUrl}/manifests/custom-resources.yaml</CodeBlock>
            <p>You can now monitor progress with the following command:</p>
            <CodeBlock>watch kubectl get tigerastatus</CodeBlock>
          </li>
        )}
      </ol>
      {props.clusterType !== 'managed' ? (
        <p>
          Wait until the <code>apiserver</code> shows a status of <code>Available</code>, then proceed to{' '}
          <Link href={`#install-the-${prodnamedash}-license`}>install the {prodname} license</Link>.
        </p>
      ) : (
        <p>
          Wait until the <code>apiserver</code> shows a status of <code>Available</code>, then proceed to the next
          section.
        </p>
      )}

      <Heading
        as='h4'
        id='install-with-flannel-cni-networking'
      >
        Install with Flannel CNI networking
      </Heading>
      <p>Use this method if your Charmed Kubernetes cluster is configured with Flannel as the CNI.</p>
      <ol>
        <li>
          <p>
            <Link href={`${baseUrl}/operations/logstorage/create-storage`}>
              Configure a storage class for {prodname}
            </Link>
            .
          </p>
        </li>
        <li>
          <p>Install the Tigera Operator and custom resource definitions.</p>
          <CodeBlock>kubectl create -f {filesUrl}/manifests/operator-crds.yaml</CodeBlock>
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
          <p>Install your pull secret.</p>
          <p>
            If pulling images directly from <code>quay.io/tigera</code>, you will likely want to use the credentials
            provided to you by your Tigera support representative. If using a private registry, use your private
            registry credentials instead.
          </p>
          <CodeBlock>
            {`kubectl create secret generic tigera-pull-secret \\
    --type=kubernetes.io/dockerconfigjson -n tigera-operator \\
    --from-file=.dockerconfigjson=<path/to/pull/secret>`}
          </CodeBlock>
        </li>
        <li>
          <p>
            Install any extra <Link href={`${baseUrl}/reference/resources`}>{prodname} resources</Link> needed at
            cluster start using <Link href={`${baseUrl}/reference/clis/calicoctl/overview`}>calicoctl</Link>.
          </p>
        </li>
        {props.clusterType === 'managed' ? (
          <li>
            <p>
              Download the Tigera custom resources. For more information on configuration options available in this
              manifest, see <Link href={`${baseUrl}/reference/installation/api`}>the installation reference</Link>.
            </p>
            <CodeBlock language='bash'>curl -O -L {filesUrl}/manifests/custom-resources.yaml</CodeBlock>
            <p>Edit the Installation resource to disable Calico networking.</p>
            <CodeBlock language='yaml'>
              {`apiVersion: operator.tigera.io/v1
kind: Installation
metadata:
  name: default
spec:
  # Configures Calico networking.
  calicoNetwork:
    # Note: The ipPools section cannot be modified post-install.
    ipPools:
    - blockSize: 26
      cidr: 10.48.0.0/24
      encapsulation: None
      natOutgoing: Enabled
      nodeSelector: all()
  cni:
    type: None`}
            </CodeBlock>
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
            <p>You can now monitor progress with the following command:</p>
            <CodeBlock>watch kubectl get tigerastatus</CodeBlock>
          </li>
        ) : (
          <li>
            <p>Create a custom Installation resource for Flannel networking.</p>
            <CodeBlock language='bash'>
              {`kubectl apply -f - <<EOF
apiVersion: operator.tigera.io/v1
kind: Installation
metadata:
  name: default
spec:
  # Configures Calico networking.
  calicoNetwork:
    # Note: The ipPools section cannot be modified post-install.
    ipPools:
    - blockSize: 26
      cidr: 10.48.0.0/24
      encapsulation: None
      natOutgoing: Enabled
      nodeSelector: all()
  cni:
    type: None
EOF`}
            </CodeBlock>
            <p>Install the remaining Tigera custom resources.</p>
            <CodeBlock>kubectl create -f {filesUrl}/manifests/custom-resources.yaml</CodeBlock>
            <p>You can now monitor progress with the following command:</p>
            <CodeBlock>watch kubectl get tigerastatus</CodeBlock>
          </li>
        )}
      </ol>
      {props.clusterType !== 'managed' ? (
        <p>
          Wait until the <code>apiserver</code> shows a status of <code>Available</code>, then proceed to{' '}
          <Link href={`#install-the-${prodnamedash}-license`}>install the {prodname} license</Link>.
        </p>
      ) : (
        <p>
          Wait until the <code>apiserver</code> shows a status of <code>Available</code>, then proceed to the next
          section.
        </p>
      )}

      {props.clusterType === 'standalone' && (
        <>
          <Heading
            as='h4'
            id={`install-the-${prodnamedash}-license`}
          >
            Install the {prodname} license
          </Heading>
          <p>In order to use {prodname}, you must install the license provided to you by Tigera.</p>
          <CodeBlock>{`kubectl create -f </path/to/license.yaml>`}</CodeBlock>
          <p>You can now monitor progress with the following command:</p>
          <CodeBlock>watch kubectl get tigerastatus</CodeBlock>
        </>
      )}

      {props.clusterType === 'management' && (
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
              <p>Create a service to expose the management cluster.</p>
              <p>
                The following example of a NodePort service may not be suitable for production and high availability. For
                options, see{' '}
                <Link href={`${baseUrl}/multicluster/mcm/fine-tune-deployment`}>
                  Fine-tune multi-cluster management for production
                </Link>
                .
              </p>
              <p>Apply the following service manifest.</p>
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
              <CodeBlock language='bash'>{`export MANAGEMENT_CLUSTER_ADDR=<your-management-cluster-addr>`}</CodeBlock>
            </li>
            <li>
              <p>
                Apply the{' '}
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
        </>
      )}

      {props.clusterType === 'managed' && (
        <p>
          <ConfigureManagedCluster />
        </p>
      )}
    </>
  );
} 