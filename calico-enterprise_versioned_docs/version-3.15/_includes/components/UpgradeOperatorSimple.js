import React from 'react';
import { When } from 'react-if';

import Admonition from '@theme/Admonition';
import CodeBlock from '@theme/CodeBlock';
import Link from '@docusaurus/Link';

import { baseUrl, filesUrl, tmpScriptsURL } from '../../variables';

export default function UpgradeOperatorSimple(props) {
  return (
    <>
      <ol>
        <When condition={props.provider === 'AKS' && props.upgradeFrom === 'OpenSource'}>
          <li>
            <p>
              Switch the active operator to the one that will be installed to the new namespace. First, download the
              helper script:
            </p>
            <CodeBlock language='bash'>curl -L -O {tmpScriptsURL}/scripts/switch-active-operator.sh</CodeBlock>
            <p>Then switch the active operator. This will deactivate the currently running operator.</p>
            <CodeBlock>
              chmod a+x ./switch-active-operator.sh{'\n'}
              ./switch-active-operator.sh tigera-operator-enterprise
            </CodeBlock>
          </li>
        </When>
        <li>
          <p>Download the new manifests for Tigera operator.</p>
          <CodeBlock language='bash'>
            {props.provider === 'AKS'
              ? `curl -L -o tigera-operator.yaml ${filesUrl}/manifests/aks/tigera-operator-upgrade.yaml`
              : `curl -L -O ${filesUrl}/manifests/tigera-operator.yaml`}
          </CodeBlock>
        </li>

        <li>
          <p>Download the new manifests for Prometheus operator.</p>
          <Admonition type='note'>
            If you have an existing Prometheus operator in your cluster that you want to use, skip this step. To work
            with Calico Enterprise, your Prometheus operator must be v0.40.0 or higher.
          </Admonition>
          <CodeBlock language='bash'>curl -L -O {filesUrl}/manifests/tigera-prometheus-operator.yaml</CodeBlock>
        </li>

        <li>
          <p>
            If you previously{' '}
            <Link href={`${baseUrl}/getting-started/install-on-clusters/private-registry`}>
              installed using a private registry
            </Link>
            , you will need to{' '}
            <Link
              href={`${baseUrl}/getting-started/install-on-clusters/private-registry/private-registry-regular#push-calico-enterprise-images-to-your-private-registry`}
            >
              push the new images{' '}
            </Link>
            and then{' '}
            <Link
              href={`${baseUrl}/getting-started/install-on-clusters/private-registry/private-registry-regular#run-the-operator-using-images-from-your-private-registry`}
            >
              update the manifest
            </Link>{' '}
            downloaded in the previous step.
          </p>
        </li>

        <li>
          <p>Apply the manifest for Tigera operator.</p>
          <CodeBlock language='bash'>kubectl apply --server-side --force-conflicts -f tigera-operator.yaml</CodeBlock>
          <When condition={props.upgradeFrom !== 'OpenSource'}>
            <Admonition type='note'>
              If you intend to update any <code>operator.tigera.io</code> or <code>projectcalico.org</code> resources to
              utilize new fields available in the update you must make sure you make those changes after applying the{' '}
              <code>tigera-operator.yaml</code>.
            </Admonition>
          </When>
        </li>

        <li>
          <p>If you downloaded the manifests for Prometheus operator from the earlier step, then apply them now.</p>
          <CodeBlock language='bash'>
            kubectl apply --server-side --force-conflicts -f tigera-prometheus-operator.yaml
          </CodeBlock>
        </li>

        <When condition={props.upgradeFrom === 'OpenSource'}>
          <li>
            <p>Install your pull secret.</p>
            <p>
              {' '}
              If pulling images directly from <code>quay.io/tigera</code>, you will likely want to use the credentials
              provided to you by your Tigera support representative. If using a private registry, use your private
              registry credentials instead.
            </p>
            <CodeBlock>
              {`kubectl create secret generic tigera-pull-secret \\
  --type=kubernetes.io/dockerconfigjson -n ${
    props.provider === 'AKS' ? 'tigera-operator-enterprise' : 'tigera-operator'
  } \\
  --from-file=.dockerconfigjson=<path/to/pull/secret>`}
            </CodeBlock>
            <p>
              For the Prometheus operator, create the pull secret in the <code>tigera-prometheus</code> namespace and
              then patch the deployment.
            </p>
            <CodeBlock>
              {`kubectl create secret generic tigera-pull-secret \\
    --type=kubernetes.io/dockerconfigjson -n tigera-prometheus \\
    --from-file=.dockerconfigjson=<path/to/pull/secret>
kubectl patch deployment -n tigera-prometheus calico-prometheus-operator \\
    -p '{"spec":{"template":{"spec":{"imagePullSecrets":[{"name": "tigera-pull-secret"}]}}}}'`}
            </CodeBlock>
          </li>
        </When>

        <When condition={props.upgradeFrom === 'OpenSource'}>
          <li>
            <p>
              Install the Tigera custom resources. For more information on configuration options available in this
              manifest, see <Link href={`${baseUrl}/reference/installation/api`}>the installation reference</Link>.
            </p>
            <CodeBlock language='bash'>
              {props.provider === 'EKS'
                ? `kubectl apply -f ${filesUrl}/manifests/eks/custom-resources-upgrade-from-calico.yaml`
                : props.provider === 'AKS'
                ? `kubectl apply -f ${filesUrl}/manifests/aks/custom-resources-upgrade-from-calico.yaml`
                : `kubectl apply -f ${filesUrl}/manifests/custom-resources-upgrade-from-calico.yaml`}
            </CodeBlock>
          </li>
        </When>

        <When condition={props.upgradeFrom !== 'OpenSource'}>
          <>
            <li>
              <p>If your cluster has OIDC login configured, follow these steps:</p>
              <p> a. Save a copy of your Manager for reference.</p>
              <CodeBlock language='bash'>{'kubectl get manager tigera-secure -o yaml > manager.yaml'}</CodeBlock>
              <p>b. Remove the deprecated fields from your Manager resource.</p>
              <CodeBlock language='bash'>{`kubectl patch manager tigera-secure --type merge -p '{"spec": null}'`}</CodeBlock>
              <p>
                c. If you are currently using v3.2 and are using OIDC with Kibana verify that you have the following
                resources in your cluster:
              </p>
              <CodeBlock language='bash'>
                kubectl get authentication tigera-secure{'\n'}
                kubectl get secret tigera-oidc-credentials -n tigera-operator
              </CodeBlock>
              <p>
                If both of these resources are present, you can continue with the next step. Otherwise, use the
                instructions to{' '}
                <Link href={`${baseUrl}/operations/cnx/configure-identity-provider`}>
                  configure an identity provider
                </Link>{' '}
                to configure OIDC.
              </p>
              <p>
                d. Follow{' '}
                <Link href={`${baseUrl}/operations/cnx/configure-identity-provider`}>
                  configure an identity provider
                </Link>
                .
              </p>
            </li>
            <li>
              <p>
                If your cluster is a management cluster using v3.1 or older, apply a{' '}
                <Link href={`${baseUrl}/reference/installation/api#operator.tigera.io/v1.ManagementCluster`}>
                  ManagementCluster{' '}
                </Link>
                CR to your cluster.
              </p>
              <CodeBlock language='bash'>
                {`kubectl apply -f - <<EOF
apiVersion: operator.tigera.io/v1
kind: ManagementCluster
metadata:
  name: tigera-secure
EOF`}
              </CodeBlock>
            </li>
            <li>
              <p>
                If your cluster is v3.7 or older, apply a new{' '}
                <Link href={`${baseUrl}/reference/installation/api#operator.tigera.io/v1.Monitor`}>Monitor </Link>
                CR to your cluster.
              </p>
              <CodeBlock language='bash'>
                {`kubectl apply -f - <<EOF
apiVersion: operator.tigera.io/v1
kind: Monitor
metadata:
  name: tigera-secure
EOF`}
              </CodeBlock>
            </li>
            <li>
              <p>You can monitor progress with the following command:</p>
              <CodeBlock language='bash'>watch kubectl get tigerastatus</CodeBlock>
              <Admonition type='note'>
                If there are any problems you can use <code>kubectl get tigerastatus -o yaml</code> to get more details.
              </Admonition>
            </li>
            <li>
              <p>
                If your cluster includes egress gateways, follow the{' '}
                <Link href={`${baseUrl}/networking/egress/egress-gateway-on-prem#upgrading-egress-gateways`}>
                  egress gateway upgrade instructions
                </Link>
                .
              </p>
            </li>
          </>
        </When>
      </ol>
    </>
  );
}
