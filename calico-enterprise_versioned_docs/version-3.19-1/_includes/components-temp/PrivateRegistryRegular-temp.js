import React from 'react';

import Admonition from '@theme/Admonition';
import CodeBlock from '@theme/CodeBlock';
import Heading from '@theme/Heading';

import { tigeraOperator, prodname, prodnamedash, prodnameWindows, registry, releases } from '../../variables';

export default function PrivateRegistryRegular() {
    const components = releases[0].components;
    const componentsWithImage = Object.values(components).filter(filters.withImage);

    return (
        <>
            <Heading
                as='h4'
                id={`push-${prodnamedash}-images-to-your-private-registry`}
            >
                Push {prodname} images to your private registry
            </Heading>
            <p>
                In order to install images from your private registry, you must first pull the images from Tigera&#39;s
                registry, re-tag them with your own registry, and then push the newly tagged images to your own registry.
            </p>
            <ol>
                <li>
                    <p>Use the following commands to pull the required {prodname} images.</p>
                </li>
                <CodeBlock language='bash'>
                    {`docker pull ${tigeraOperator.registry}/${tigeraOperator.image}:${tigeraOperator.version}\n`}
                    {componentsWithImage.filter(filters.isNotWindows).map(renderPullCommand).join('')}
                </CodeBlock>

                <li>
                    <p>
                        Retag the images with the name of your private registry <code>$PRIVATE_REGISTRY</code>.
                    </p>
                    <CodeBlock language='bash'>
                        {`docker tag ${tigeraOperator.registry}/${tigeraOperator.image}:${tigeraOperator.version} $PRIVATE_REGISTRY/${tigeraOperator.image}:${tigeraOperator.version}\n`}
                        {componentsWithImage.filter(filters.isNotWindows).map((component) => {
                            const registry = mapComponentToRegistry(component);

                            return (
                                `docker tag ${registry}${component.image}:${component.version} $PRIVATE_REGISTRY/${component.image}:${component.version}\n`
                            );
                        }).join('')}
                    </CodeBlock>
                </li>

                <li>
                    <p>Push the images to your private registry.</p>
                    <CodeBlock language='bash'>
                        {`docker push $PRIVATE_REGISTRY/${tigeraOperator.image}:${tigeraOperator.version}\n`}
                        {componentsWithImage.filter(filters.isNotWindows).map((component) => {
                            return `docker push $PRIVATE_REGISTRY/${component.image}:${component.version}\n`;
                        }).join('')}
                    </CodeBlock>
                    <Admonition type='caution'>Do not push the private {prodname} images to a public registry.</Admonition>
                </li>
                <li>
                <p>Use <code>crane cp</code> to copy the Windows images to your private registry.</p>
                <p>For hybrid Linux + Windows clusters, use <code>crane cp</code> on the following Windows images to copy them to your private registry.</p>
                <CodeBlock language='bash'>
                    {componentsWithImage.filter(filters.isWindows).map((component) => {
                        const registry = mapComponentToRegistry(component);
                        const imageName = component.image.split('/').pop();

                        return `crane cp ${registry}${component.image}:${component.version} $PRIVATE_REGISTRY/$IMAGE_PATH/${imageName}:${component.version}\n`;
                    }).join('')}
                </CodeBlock>

                <Admonition type='caution'>Do not <code>crane cp</code> the private {prodnameWindows} images to a public registry.</Admonition>
                </li>
            </ol>

            <Heading
                as='h4'
                id='run-the-operator-using-images-from-your-private-registry'
            >
                Run the operator using images from your private registry
            </Heading>
            <p>
                Before applying <code>tigera-operator.yaml</code>, modify registry references to use your custom registry:
            </p>
            <CodeBlock>{`sed -ie "s?quay.io?$PRIVATE_REGISTRY?g" tigera-operator.yaml`}</CodeBlock>
            <p>
                Next, ensure that an image pull secret has been configured for your custom registry. Set the enviroment variable{' '}
                <code>PRIVATE_REGISTRY_PULL_SECRET</code> to the secret name. Then add the image pull secret to the operator
                deployment spec:
            </p>
            <CodeBlock language='bash'>
                {`sed -ie "/serviceAccountName: tigera-operator/a \      imagePullSecrets:\\n\      - name: $PRIVATE_REGISTRY_PULL_SECRET"  tigera-operator.yaml`}
            </CodeBlock>
            {/* The second 'sed' should be removed once operator launches Prometheus & Alertmanager */}
            <p>
                If you are installing Prometheus operator as part of {prodname}, then before applying{' '}
                <code>tigera-prometheus-operator.yaml</code>, modify registry references to use your custom registry:
            </p>
            <CodeBlock language='bash'>
                {`sed -ie "s?quay.io?$PRIVATE_REGISTRY?g" tigera-prometheus-operator.yaml
sed -ie "/serviceAccountName: calico-prometheus-operator/a \      imagePullSecrets:\\n\      - name: $PRIVATE_REGISTRY_PULL_SECRET"  tigera-prometheus-operator.yaml`}
            </CodeBlock>
            {/* The second 'sed' should be removed once operator launches Prometheus & Alertmanager */}
            <p>
                Before applying <code>custom-resources.yaml</code>, modify registry references to use your custom registry:
            </p>
            <CodeBlock language='bash'>sed -ie "s?quay.io?$PRIVATE_REGISTRY?g" custom-resources.yaml</CodeBlock>
            {/* This step should be removed once operator launches Prometheus & Alertmanager */}

            <Heading
                as='h4'
                id='configure-the-operator-to-use-images-from-your-private-registry'
            >
                Configure the operator to use images from your private registry.
            </Heading>
            <p>
                Set the <code>spec.registry</code> field of your Installation resource to the name of your custom registry. For
                example:
            </p>
            <CodeBlock language='yaml'>{`apiVersion: operator.tigera.io/v1
kind: Installation
metadata:
  name: default
spec:
  variant: TigeraSecureEnterprise
  imagePullSecrets:
    - name: tigera-pull-secret
    // highlight-next-line
      registry: myregistry.com`}</CodeBlock>
        </>
    );

    function renderPullCommand(component) {
        const registry = mapComponentToRegistry(component);

        return `docker pull ${registry}${component.image}:${component.version}\n`;
    }

    function mapComponentToRegistry(component) {
        if (!component.registry) {
            return registry;
        }

        return `${component.registry}/`;
    }
}

const filters = {
    withImage: (component) => !!component.image,
    isWindows: (component) => component.image.includes('-windows'),
    isNotWindows: (component) => !filters.isWindows(component),
};
