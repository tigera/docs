// Temporary component for "calico\maintenance\image-options\alternate-registry.mdx"

import React from 'react';

import CodeBlock from '@theme/CodeBlock';

import { imageNames, prodname, registry, releases, tigeraOperator } from '../../variables';

export default function _Maintenance_ImageOptions_AlternateRegistry() {
  const cmds1 = renderInstallCommands(
    (componentData, reg, componentNames, i) => `docker pull ${reg}${componentNames[i]}:${componentData.version}`
  );

  const cmds2 = renderInstallCommands(
    (componentData, reg, componentNames, i) =>
      `docker tag ${reg}${componentNames[i]}:${componentData.version} $REGISTRY/${componentNames[i]}:${componentData.version}`
  );

  const cmds3 = renderInstallCommands(
    (componentData, reg, componentNames, i) => `docker push $REGISTRY/${componentNames[i]}:${componentData.version}`
  );

  return (
    <ol>
      <li>
        <p>Use the following commands to pull the required {prodname} images.</p>
      </li>
      <CodeBlock language='batch'>
        docker pull {tigeraOperator.registry}/{tigeraOperator.image}:{tigeraOperator.version}
        {'\n'}
        {cmds1}
      </CodeBlock>
      <li>
        <p>
          Retag the images with the name of your registry <code>$REGISTRY</code>.
        </p>
      </li>
      <CodeBlock language='batch'>
        docker tag {tigeraOperator.registry}/{tigeraOperator.image}:{tigeraOperator.version} $REGISTRY/
        {tigeraOperator.image}:{tigeraOperator.version}
        {'\n'}
        {cmds2}
      </CodeBlock>
      <li>
        <p>Push the images to your registry.</p>
      </li>
      <CodeBlock language='batch'>
        docker push $REGISTRY/{tigeraOperator.image}:{tigeraOperator.version}
        {'\n'}
        {cmds3}
      </CodeBlock>
    </ol>
  );
}

function renderInstallCommands(renderCommand) {
  const releaseComponents = releases[0].components;
  const components = Object.keys(releaseComponents);
  const filteredComponents = components.filter((c) => imageNames[c] && !c.includes('flannel'));
  const componentNames = filteredComponents.map((c) => imageNames[c]);

  const result = filteredComponents
    .map((c, i) => {
      const componentData = releaseComponents[c];
      const reg = componentData.registry ? `${componentData.registry}/` : registry;

      return renderCommand(componentData, reg, componentNames, i);
    })
    .join('\n');

  return result;
}
