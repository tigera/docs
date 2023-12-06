// Temporary component for "calico-enterprise/getting-started/install-on-clusters/kubernetes/helm.mdx"

import React from 'react';

import CodeBlock from '@theme/CodeBlock';
import Heading from '@theme/Heading';

import { chart_version_name, prodname, prodnamedash, version } from '../../variables';

export default function GettingStartedInstallOnClustersKubernetesHelm() {
  return (
    <>
      {renderCond1()}
      <Heading
        as='h3'
        id='customize-the-helm-chart'
      >
        Customize the Helm chart
      </Heading>
      <p>
        If you are installing on a cluster installed by EKS, GKE, AKS or Mirantis Kubernetes Engine (MKE), or you need
        to customize TLS certificates, you <strong>must</strong> customize this Helm chart by creating a{' '}
        <code>values.yaml</code> file. Otherwise, you can skip this step.
      </p>
      <ol>
        <li>
          <p>
            If you are installing on a cluster installed by EKS, GKE, AKS or Mirantis Kubernetes Engine (MKE), set the{' '}
            <code>kubernetesProvider</code> as described in the{' '}
            <a href='../../../reference/installation/api#operator.tigera.io/v1.Provider'>Installation reference</a>. For
            example:
          </p>
        </li>
        <CodeBlock language='bash'>{`echo '{ installation: {kubernetesProvider: EKS }}' > values.yaml`}</CodeBlock>
        <p>
          For Azure AKS cluster with no Kubernetes CNI pre-installed, create <code>values.yaml</code> with the following
          command:
        </p>
        <CodeBlock>
          {`cat > values.yaml <<EOF
installation:
  kubernetesProvider: AKS
  cni:
    type: Calico
  calicoNetwork:
    bgp: Disabled
    ipPools:
    - cidr: 10.244.0.0/16
      encapsulation: VXLAN
EOF`}
        </CodeBlock>
        <li>
          <p>
              Add any other customizations you require to <code>values.yaml</code> by running the following command.
              For help, see <a href='../../../reference/installation/helm_customization'>Helm installation reference</a>,
              or <a href='https://helm.sh/docs/'>helm docs</a>.
          </p>
        </li>
        {renderCond2()}
      </ol>
      <Heading
        as='h3'
        id={`install-${prodnamedash}`}
      >
        Install {prodname}
      </Heading>
      <ol>
        <li>
          <p>
            <a href='../../../operations/logstorage/create-storage'>Configure a storage class for {prodname}</a>
          </p>
        </li>
        <li>
          <p>
            Create the <code>tigera-operator</code> namespace:
          </p>
          <pre>
            <code class='language-batch'>kubectl create namespace tigera-operator</code>
          </pre>
        </li>
        <li>
          <p>
            Install the Tigera {prodname} operator and custom resource definitions using the Helm chart, and passing in
            your image pull secrets
          </p>
          {renderCond3()}
        </li>
        <li>
          <p>
            Monitor progress, wait until <code>apiserver</code> shows a status of <code>Available</code>, then proceed
            to the next step.
          </p>
          <CodeBlock language='bash'>watch kubectl get tigerastatus/apiserver</CodeBlock>
        </li>
        <li>
          <p>Install your {prodname} license:</p>
          <CodeBlock language='bash'>kubectl apply -f &lt;/path/to/license.yaml&gt;</CodeBlock>
        </li>
        <li>
          <p>You can now monitor progress with the following command:</p>
          <CodeBlock language='bash'>watch kubectl get tigerastatus</CodeBlock>
        </li>
        <p>Congratulations! You have now installed {prodname} using the Helm 3 chart.</p>
      </ol>
    </>
  );

  function renderCond1() {
    if (version === 'master') {
      return (
        <ol>
          <li>
            <p>Install the Google cloud storage helm repo plugin:</p>
          </li>
          <CodeBlock language='bash'>helm plugin install https://github.com/viglesiasce/helm-gcs.git</CodeBlock>
          <li>
            <p>Add the Calico helm repo:</p>
            <CodeBlock language='bash'>helm repo add tigera gs://tigera-helm-charts</CodeBlock>
          </li>
        </ol>
      );
    }

    return (
      <>
        <ol>
          <li>
            <p>Get the Helm chart:</p>
            <CodeBlock language='bash'>
              {`curl -O -L https://downloads.tigera.io/ee/charts/tigera-operator-${chart_version_name}.tgz`}
            </CodeBlock>
          </li>
        </ol>
      </>
    );
  }

  function renderCond2() {
    if (version === 'master') {
      return <CodeBlock language='bash'>helm show values tigera/tigera-operator --version v0.0</CodeBlock>;
    }

    return <CodeBlock language='bash'>{`helm show values ./tigera-operator-${chart_version_name}.tgz`}</CodeBlock>;
  }

  function renderCond3() {
    if (version === 'master') {
      return (
        <>
          <CodeBlock language='bash'>
            {`helm install calico-enterprise tigera/tigera-operator --version v0.0 \\
--set-file imagePullSecrets.tigera-pull-secret=<path/to/pull/secret>,tigera-prometheus-operator.imagePullSecrets.tigera-pull-secret=<path/to/pull/secret> \\
--namespace tigera-operator`}
          </CodeBlock>
          <p>
            or if you created a <code>values.yaml</code> above:
          </p>
          <CodeBlock language='bash'>
            {`helm install calico-enterprise tigera/tigera-operator --version v0.0 -f values.yaml \\
--set-file imagePullSecrets.tigera-pull-secret=<path/to/pull/secret>,tigera-prometheus-operator.imagePullSecrets.tigera-pull-secret=<path/to/pull/secret> \\
--namespace tigera-operator`}
          </CodeBlock>
        </>
      );
    }

    return (
      <>
        <CodeBlock language='bash'>
          {`helm install calico-enterprise tigera-operator-${chart_version_name}.tgz \\
--set-file imagePullSecrets.tigera-pull-secret=<path/to/pull/secret>,tigera-prometheus-operator.imagePullSecrets.tigera-pull-secret=<path/to/pull/secret> \\
--namespace tigera-operator`}
        </CodeBlock>
        <p>
          or if you created a <code>values.yaml</code> above:
        </p>
        <CodeBlock language='bash'>
          {`helm install calico-enterprise tigera-operator-${chart_version_name}.tgz -f values.yaml \\
--set-file imagePullSecrets.tigera-pull-secret=<path/to/pull/secret>,tigera-prometheus-operator.imagePullSecrets.tigera-pull-secret=<path/to/pull/secret> \\
--namespace tigera-operator`}
        </CodeBlock>
      </>
    );
  }
}
