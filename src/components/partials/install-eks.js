import React from 'react';

import CodeBlock from '@theme/CodeBlock';
import Link from '@docusaurus/Link';
import Admonition from '@theme/Admonition';
import Heading from '@theme/Heading';
import GeekDetails from '@site/src/components/partials/geek-details';

import ConfigureManagedCluster from './configure-managed-cluster';
import Highlight from '../utils/Highlight';
import { toKebab } from '../utils/formatters';

export default function InstallEKS(props) {
  return (
    <>
      <Heading
        as='h4'
        id='install-eks-with-amazon-vpc-networking'
      >
        Install EKS with Amazon VPC networking
      </Heading>
      {props.clusterType === 'standalone' && (
        <>
          <p>The geeky details of what you get:</p>
          <GeekDetails details='Policy:Calico,IPAM:AWS,CNI:AWS,Overlay:No,Routing:VPC Native,Datastore:Kubernetes' />
        </>
      )}
      <Heading
        as='h5'
        id='create-an-eks-cluster'
      >
        Create an EKS cluster
      </Heading>
      <p>
        Make sure you have an EKS cluster <strong>without {props.prodname} installed</strong> and:
      </p>
      <ul>
        <li>
          <Link href='https://docs.aws.amazon.com/eks/latest/userguide/platform-versions.html'>
            A supported EKS Kubernetes version
          </Link>
        </li>
        <li>
          <Link href='/docs/calico-enterprise/getting-started/install-on-clusters/requirements#supported-managed-kubernetes-versions'>
            A supported {props.prodname} managed Kubernetes version
          </Link>
          .
        </li>
      </ul>
      <Heading
        as='h5'
        id={`"install-${toKebab(props.prodname)}"`}
      >
        Install {props.prodname}
      </Heading>
      <ol>
        <li>
          <Link href='/docs/calico-enterprise/maintenance/logstorage/create-storage'>
            Configure a storage class for {props.prodname}.
          </Link>
        </li>
        <li>
          <p>Install the Tigera operator and custom resource definitions.</p>
          <CodeBlock>
            {/* TODO [manifest]: Use correct manifest links */}
            {`kubectl create -f {{ "/manifests/tigera-operator.yaml" | absolute_url }}`}
          </CodeBlock>
        </li>
        <li>
          <p>
            Install the Prometheus operator and related custom resource definitions. The Prometheus operator will be
            used to deploy Prometheus server and Alertmanager to monitor {props.prodname} metrics.
          </p>
          <Admonition type='note'>
            If you have an existing Prometheus operator in your cluster that you want to use, skip this step. To work
            with {props.prodname}, your Prometheus operator must be v0.40.0 or higher.
          </Admonition>
          <CodeBlock>
            {/* TODO [manifest]: Use correct manifest links */}
            {`kubectl create -f {{ "/manifests/tigera-prometheus-operator.yaml" | absolute_url }}`}
          </CodeBlock>
        </li>
        <li>
          <p>Install your pull secret.</p>
          <p>
            If pulling images directly from <Highlight>quay.io/tigera</Highlight>, you will likely want to use the
            credentials provided to you by your Tigera support representative. If using a private registry, use your
            private registry credentials instead.
          </p>
          <CodeBlock>
            {`kubectl create secret generic tigera-pull-secret \\
    --type=kubernetes.io/dockerconfigjson -n tigera-operator \\
    --from-file=.dockerconfigjson=<path/to/pull/secret>`}
          </CodeBlock>
          <p>
            For the Prometheus operator, create the pull secret in the <Highlight>tigera-prometheus</Highlight>{' '}
            namespace and then patch the deployment.
          </p>
          <CodeBlock>
            {`kubectl create secret generic tigera-pull-secret \\
    --type=kubernetes.io/dockerconfigjson -n tigera-prometheus \\
    --from-file=.dockerconfigjson=<path/to/pull/secret>
kubectl patch deployment -n tigera-prometheus calico-prometheus-operator \\
    -p '{"spec":{"template":{"spec":{"imagePullSecrets":[{"name": "tigera-pull-secret"}]}}}}'`}
          </CodeBlock>
        </li>
        <li>
          <p>
            Install any extra{' '}
            <Link href={`/docs/${toKebab(props.prodname)}/reference/resources`}>{props.prodname} resources</Link> needed
            at cluster start using{' '}
            <Link href='/docs/calico-enterprise/reference/clis/calicoctl/overview'>calicoctl</Link>.
          </p>
        </li>
        {props.clusterType === 'managed' ? (
          <>
            <li>
              <p>
                Download the Tigera custom resources. For more information on configuration options available in this
                manifest, see{' '}
                <Link href={`/docs/${toKebab(props.prodname)}/reference/installation/api`}>
                  the installation reference
                </Link>
                .
              </p>
              <CodeBlock language='bash'>
                {/* TODO [manifest]: Use correct manifest links */}
                {`curl -O -L {{ "/manifests/eks/custom-resources.yaml" | absolute_url }}`}
              </CodeBlock>
              <p>
                Remove the <Highlight>Manager</Highlight> custom resource from the manifest file.
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
                Remove the <Highlight>LogStorage</Highlight> custom resource from the manifest file.
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
            <li>
              <p>Monitor progress with the following command:</p>
              <CodeBlock language='bash'>watch kubectl get tigerastatus</CodeBlock>
              <p>
                Wait until the <Highlight>apiserver</Highlight> shows a status of <Highlight>Available</Highlight>, then
                proceed to the next section.
              </p>
            </li>
          </>
        ) : (
          <li>
            <p>
              Install the Tigera custom resources. For more information on configuration options available in this
              manifest, see{' '}
              <Link href={`/docs/${toKebab(props.prodname)}/reference/installation/api`}>
                the installation reference
              </Link>
              .
            </p>
            <CodeBlock>
              {/* TODO [manifest]: Use correct manifest links */}
              {`kubectl create -f {{ "/manifests/eks/custom-resources.yaml" | absolute_url }}`}
            </CodeBlock>
            <p>You can now monitor progress with the following command:</p>
            <CodeBlock>watch kubectl get tigerastatus</CodeBlock>
            <p>
              Wait until the <Highlight>apiserver</Highlight> shows a status of <Highlight>Available</Highlight>, then
              proceed to <Link href='#install-the-calico-enterprise-license'>install the {props.prodname} license</Link>
              .
            </p>
          </li>
        )}
      </ol>
      <Heading
        as='h4'
        id='install-eks-with-calico-networking'
      >
        Install EKS with Calico networking
      </Heading>
      {props.clusterType === 'standalone' && (
        <>
          <p>The geeky details of what you get:</p>
          <GeekDetails details='Policy:Calico,IPAM:Calico,CNI:Calico,Overlay:VXLAN,Routing:Calico,Datastore:Kubernetes' />
        </>
      )}
      <Admonition type='note'>
        {props.prodname} networking cannot currently be installed on the EKS control plane nodes. As a result the
        control plane nodes will not be able to initiate network connections to {props.prodname} pods. (This is a
        general limitation of EKS's custom networking support, not specific to {props.prodname}.) As a workaround,
        trusted pods that require control plane nodes to connect to them, such as those implementing admission
        controller webhooks, can include <Highlight>hostNetwork:true</Highlight> in their pod spec. See the Kuberentes
        API{' '}
        <Link href='https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.21/#podspec-v1-core'>
          pod spec
        </Link>{' '}
        definition for more information on this setting.
      </Admonition>
      <Heading
        as='h5'
        id='create-an-eks-cluster'
      >
        Create an EKS cluster
      </Heading>
      <p>
        For these instructions, we will use <Highlight>eksctl</Highlight> to provision the cluster. However, you can use
        any of the methods in{' '}
        <Link href='https://docs.aws.amazon.com/eks/latest/userguide/getting-started.html'>
          Getting Started with Amazon EKS
        </Link>
      </p>
      <p>
        Before you get started, make sure you have downloaded and configured the{' '}
        <Link href='https://docs.aws.amazon.com/eks/latest/userguide/getting-started-eksctl.html#eksctl-prereqs'>
          necessary prerequisites
        </Link>
      </p>
      <ol>
        <li>
          <p>First, create an Amazon EKS cluster without any nodes.</p>
          <CodeBlock language='bash'>eksctl create cluster --name my-calico-cluster --without-nodegroup</CodeBlock>
        </li>
        <li>
          <p>
            Since this cluster will use {props.prodname} for networking, you must delete the{' '}
            <Highlight>aws-node</Highlight> daemon set to disable AWS VPC networking for pods.
          </p>
          <CodeBlock language='bash'>kubectl delete daemonset -n kube-system aws-node</CodeBlock>
        </li>
      </ol>
      <Heading
        as='h5'
        id={`install-${props.prodname}`}
      >
        Install {props.prodname}
      </Heading>
      <ol>
        <li>
          <p>
            <Link href='/docs/calico-enterprise/maintenance/logstorage/create-storage'>
              Configure a storage class for {props.prodname}.
            </Link>
          </p>
        </li>
        <li>
          <p>Install the Tigera operator and custom resource definitions.</p>
          <CodeBlock>
            {/* TODO [manifest]: Use correct manifest links */}
            {`kubectl create -f {{ "/manifests/tigera-operator.yaml" | absolute_url }}`}
          </CodeBlock>
        </li>
        <li>
          <p>
            Install the Prometheus operator and related custom resource definitions. The Prometheus operator will be
            used to deploy Prometheus server and Alertmanager to monitor {props.prodname} metrics.
          </p>
          <Admonition type='note'>
            If you have an existing Prometheus operator in your cluster that you want to use, skip this step. To work
            with {props.prodname}, your Prometheus operator must be v0.40.0 or higher.
          </Admonition>
          <CodeBlock>
            {/* TODO [manifest]: Use correct manifest links */}
            {`kubectl create -f {{ "/manifests/tigera-prometheus-operator.yaml" | absolute_url }}`}
          </CodeBlock>
        </li>
        <li>
          <p>Install your pull secret.</p>
          <p>
            If pulling images directly from <Highlight>quay.io/tigera</Highlight>, you will likely want to use the
            credentials provided to you by your Tigera support representative. If using a private registry, use your
            private registry credentials instead.
          </p>
          <CodeBlock>
            {`kubectl create secret generic tigera-pull-secret \\
    --type=kubernetes.io/dockerconfigjson -n tigera-operator \\
    --from-file=.dockerconfigjson=<path/to/pull/secret>`}
          </CodeBlock>
          <p>
            For the Prometheus operator, create the pull secret in the <Highlight>tigera-prometheus</Highlight>{' '}
            namespace and then patch the deployment.
          </p>
          <CodeBlock>
            {`kubectl create secret generic tigera-pull-secret \\
    --type=kubernetes.io/dockerconfigjson -n tigera-prometheus \\
    --from-file=.dockerconfigjson=<path/to/pull/secret>
kubectl patch deployment -n tigera-prometheus calico-prometheus-operator \\
    -p '{"spec":{"template":{"spec":{"imagePullSecrets":[{"name": "tigera-pull-secret"}]}}}}'`}
          </CodeBlock>
        </li>
        <li>
          <p>
            Install any extra{' '}
            <Link href={`/docs/${toKebab(props.prodname)}/reference/resources`}>{props.prodname} resources</Link> needed
            at cluster start using{' '}
            <Link href='/docs/calico-enterprise/reference/clis/calicoctl/overview'>calicoctl</Link>.
          </p>
        </li>
        <li>
          <p>
            To configure {props.prodname} for use with the Calico CNI plugin, we must create an{' '}
            <Highlight>Installation</Highlight> resource that has <Highlight>spec.cni.type: Calico</Highlight>. Install
            the <Highlight>custom-resources-calico-cni.yaml</Highlight> manifest, which includes this configuration. For
            more information on configuration options available in this manifest, see{' '}
            <Link href={`/docs/${toKebab(props.prodname)}/reference/installation/api`}>the installation reference</Link>
            .
          </p>
          {props.clusterType !== 'managed' && (
            <CodeBlock>
              {/* TODO [manifest]: Use correct manifest links */}
              {`kubectl create -f {{ "/manifests/eks/custom-resources-calico-cni.yaml" | absolute_url }}`}
            </CodeBlock>
          )}
        </li>
        {props.clusterType === 'managed' && (
          <>
            <li>
              <p>
                Download the Tigera custom resources. For more information on configuration options available in this
                manifest, see{' '}
                <Link href={`/docs/${toKebab(props.prodname)}/reference/installation/api`}>
                  the installation reference
                </Link>
                .
              </p>
              <CodeBlock language='bash'>
                {/* TODO [manifest]: Use correct manifest links */}
                {`curl -O -L {{ "/manifests/eks/custom-resources-calico-cni.yaml" | absolute_url }}`}
              </CodeBlock>
              <p>
                Remove the <Highlight>Manager</Highlight> custom resource from the manifest file.
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
                Remove the <Highlight>LogStorage</Highlight> custom resource from the manifest file.
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
              <CodeBlock language='bash'>{`kubectl create -f ./custom-resources-calico-cni.yaml`}</CodeBlock>
            </li>
            <li>
              <p>Monitor progress with the following command:</p>
              <CodeBlock language='bash'>watch kubectl get tigerastatus</CodeBlock>
            </li>
          </>
        )}
        <li>
          <p>Finally, add nodes to the cluster.</p>
          <CodeBlock language='bash'>
            {`eksctl create nodegroup --cluster my-calico-cluster --node-type t3.xlarge --node-ami auto --max-pods-per-node 100`}
          </CodeBlock>
          <blockquote>
            <p>
              <strong>Tip</strong>: Without the <Highlight>--max-pods-per-node</Highlight> option above, EKS will limit
              the{' '}
              <Link href='https://github.com/awslabs/amazon-eks-ami/blob/master/files/eni-max-pods.txt'>
                number of pods based on node-type
              </Link>
              . See <Highlight>eksctl create nodegroup --help</Highlight> for the full set of node group options.
            </p>
          </blockquote>
        </li>
        <li>
          <p>Monitor progress with the following command:</p>
          <CodeBlock>watch kubectl get tigerastatus</CodeBlock>
          <p>
            Wait until the <Highlight>apiserver</Highlight> shows a status of <Highlight>Available</Highlight>, then
            proceed to the next section.
          </p>
        </li>
      </ol>
      {(props.clusterType === 'standalone' || props.clusterType === 'management') && (
        <>
          <Heading
            as='h4'
            id={`install-the-${props.prodname}-license`}
          >
            Install the {props.prodname} license
          </Heading>
          <p>In order to use {props.prodname}, you must install the license provided to you by Tigera.</p>
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
            <Highlight>NodePort</Highlight> service to expose the management cluster. Note that the service must live
            within the <Highlight>tigera-manager</Highlight> namespace.
          </p>
          <ol>
            <li>
              <p>Create a service to expose the management cluster.</p>
              <p>
                The following example of a NodePort service may not be suitable for production and high availability.
                For options, see{' '}
                <Link href='/docs/calico-enterprise/multicluster/mcm/fine-tune-deployment'>
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
                <Link
                  href={`/docs/${toKebab(
                    props.prodname
                  )}/reference/installation/api#operator.tigera.io/v1.ManagementCluster`}
                >
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
            To access resources in a managed cluster from the {props.prodname} Manager within the management cluster,
            the logged-in user must have appropriate permissions defined in that managed cluster (clusterrole bindings).
          </p>
          <ol>
            <li>
              <p>
                Create an admin user called, <Highlight>mcm-user</Highlight> in the default namespace with full
                permissions, by applying the following commands.
              </p>
              <CodeBlock language='bash'>
                {`kubectl create sa mcm-user
kubectl create clusterrolebinding mcm-user-admin --serviceaccount=default:mcm-user --clusterrole=tigera-network-admin`}
              </CodeBlock>
            </li>
            <li>
              <p>Get the login token for your new admin user, and log in to {props.prodname} Manager.</p>
              <CodeBlock language='bash'>
                {`kubectl get secret $(kubectl get serviceaccount mcm-user -o jsonpath='{range .secrets[*]}{.name}{"\n"}{end}' | grep token) -o go-template='{{.data.token | base64decode}}' && echo`}
              </CodeBlock>
              <p>
                In the top right banner, your management cluster is displayed as the first entry in the cluster
                selection drop-down menu with the fixed name, <Highlight>management cluster</Highlight>.
              </p>
              <img
                src='/img/calico-enterprise/mcm/mcm-management-cluster.png'
                alt='Cluster Created'
              />
            </li>
          </ol>
          <p>You have successfully installed a management cluster.</p>
        </>
      )}
      {props.clusterType === 'managed' && (
        <>
          <ConfigureManagedCluster prodname={props.prodname} />
          <Heading
            as='h4'
            id='provide-permissions-to-view-the-managed-cluster'
          >
            Provide permissions to view the managed cluster
          </Heading>
          <p>
            To access resources belonging to a managed cluster from the {props.prodname} Manager UI, the service or user
            account used to log in must have appropriate permissions defined in the managed cluster.
          </p>
          <p>
            Let's define admin-level permissions for the service account (<Highlight>mcm-user</Highlight>) we created to
            log in to the Manager UI. Run the following command against your managed cluster.
          </p>
          <CodeBlock language='bash'>
            {`kubectl create clusterrolebinding mcm-user-admin --serviceaccount=default:mcm-user --clusterrole=tigera-network-admin`}
          </CodeBlock>
        </>
      )}
    </>
  );
}
