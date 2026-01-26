import React from 'react';

import Admonition from '@theme/Admonition';
import CodeBlock from '@theme/CodeBlock';

import { prodname, prodnamedash, prodnameWindows, registry, releases, tigeraOperator } from '../../variables';

export default function PrivateRegistryImagePath() {
    const components = releases[0].components;
    const componentsWithImage = Object.values(components).filter(filters.withImage);

    return (
        <>
            <h3 id={`push-${prodnamedash}-images-to-your-private-registry-image-path`}>
                Push {prodname} images to your private registry image path
            </h3>
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
                        Retag the images with the name of your private registry <code>$PRIVATE_REGISTRY</code> and{' '}
                        <code>$IMAGE_PATH</code>.
                    </p>
                </li>
                <CodeBlock language='bash'>
                    {`docker tag ${tigeraOperator.registry}/${tigeraOperator.image}:${
                        tigeraOperator.version
                    } $PRIVATE_REGISTRY/$IMAGE_PATH/${mapImageToImageName(tigeraOperator.image)}:${tigeraOperator.version}\n`}
                    {componentsWithImage.filter(filters.isNotWindows).map((component) => {
                        const registry = mapComponentToRegistry(component);
                        const imageName = mapImageToImageName(component.image);

                        return (
                            `docker tag ${registry}${component.image}:${component.version} $PRIVATE_REGISTRY/$IMAGE_PATH/${imageName}:${component.version}\n`
                        );
                    }).join('')}
                </CodeBlock>

                <li>
                    <p>Push the images to your private registry.</p>
                </li>
                <CodeBlock language='bash'>
                    {`docker push $PRIVATE_REGISTRY/$IMAGE_PATH/${mapImageToImageName(tigeraOperator.image)}:${
                        tigeraOperator.version
                    }`}
                    {componentsWithImage.filter(filters.isNotWindows).map((component) => {
                        const imageName = mapImageToImageName(component.image);

                        return `docker push $PRIVATE_REGISTRY/$IMAGE_PATH/${imageName}:${component.version}\n`;
                    }).join('')}
                </CodeBlock>
                <Admonition type='caution'>Do not push the private {prodname} images to a public registry.</Admonition>
                <li>
                    <p>Use <code>crane cp</code> to copy the Windows images to your private registry.</p>
                </li>
                <p>For hybrid Linux + Windows clusters, use <code>crane cp</code> on the following Windows images to copy them to your private registry.</p>
                <CodeBlock language='bash'>
                    {componentsWithImage.filter(filters.isWindows).map((component) => {
                        const imageName = mapImageToImageName(component.image);

                        return `crane cp ${registry}${component.image}:${component.version} $PRIVATE_REGISTRY/$IMAGE_PATH/${imageName}:${component.version}\n`;
                    }).join('')}
                </CodeBlock>

                <Admonition type='caution'>Do not <code>crane cp</code> the private {prodnameWindows} images to a public registry.</Admonition>
            </ol>

            <h3 id='run-the-operator-using-images-from-your-private-registry-image-path'>
                Run the operator using images from your private registry image path
            </h3>
            <p>
                Before applying <code>tigera-operator.yaml</code>, modify registry references to use your custom registry:
            </p>
            <CodeBlock language='bash'>
                {`sed -ie "s?quay.io.*/?$PRIVATE_REGISTRY/$IMAGE_PATH/?" tigera-operator.yaml`}
            </CodeBlock>

            {/* The second 'sed' should be removed once operator launches Prometheus & Alertmanager */}

            <p>
                Next, ensure that an image pull secret has been configured for your custom registry. Set the enviroment variable{' '}
                <code>PRIVATE_REGISTRY_PULL_SECRET</code> to the secret name. Then add the image pull secret to the operator
                deployment spec:
            </p>
            <CodeBlock language='bash'>
                {`sed -ie "/serviceAccountName: tigera-operator/a \      imagePullSecrets:\\n\      - name: $PRIVATE_REGISTRY_PULL_SECRET"  tigera-operator.yaml`}
            </CodeBlock>
            <p>
                If you are installing Prometheus operator as part of {prodname}, then before applying{' '}
                <code>tigera-prometheus-operator.yaml</code>, modify registry references to use your custom registry:
            </p>
            <CodeBlock language='bash'>
                {`sed -ie "s?quay.io.*/?$PRIVATE_REGISTRY/$IMAGE_PATH/?" tigera-prometheus-operator.yaml
sed -ie "/serviceAccountName: calico-prometheus-operator/a \      imagePullSecrets:\\n\      - name: $PRIVATE_REGISTRY_PULL_SECRET"  tigera-prometheus-operator.yaml`}
            </CodeBlock>

            {/* The second 'sed' should be removed once operator launches Prometheus & Alertmanager */}

            <p>
                Before applying <code>custom-resources.yaml</code>, modify registry references to use your custom registry:
            </p>
            <CodeBlock language='bash'>{`sed -ie "s?quay.io.*/?$PRIVATE_REGISTRY/$IMAGE_PATH/?" custom-resources.yaml`}</CodeBlock>

            {/* The second 'sed' should be removed once operator launches Prometheus & Alertmanager */}

            <p>
                For <b>Openshift</b>, after downloading all manifests modify the following to use your custom registry:
            </p>
            <CodeBlock language='bash'>
                {`sed -ie "s?quay.io.*/?$PRIVATE_REGISTRY/$IMAGE_PATH/?" manifests/02-tigera-operator.yaml`}
            </CodeBlock>

            <Admonition type='note'>
                Add the image pull secret for your <code>registry</code> to the secret <code>tigera-pull-secret</code>
            </Admonition>

            <h3 id='configure-the-operator-to-use-images-from-your-private-registry-image-path'>
                Configure the operator to use images from your private registry image path.
            </h3>
            <p>
                Set the <code>spec.registry</code> and <code>spec.imagePath</code> field of your Installation resource to the
                name of your custom registry. For example:
            </p>
            <CodeBlock language='yaml'>
                {`apiVersion: operator.tigera.io/v1
kind: Installation
metadata:
  name: default
spec:
  variant: TigeraSecureEnterprise
  imagePullSecrets:
    - name: tigera-pull-secret
  // highlight-next-line
  registry: myregistry.com
  // highlight-next-line
  imagePath: my-image-path`}
            </CodeBlock>
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

    function mapImageToImageName(image) {
        const imageName = image.split('/').pop();

        return imageName;
    }
}

const filters = {
    withImage: (component) => !!component.image,
    isWindows: (component) => component.image.includes('-windows'),
    isNotWindows: (component) => !filters.isWindows(component),
};
