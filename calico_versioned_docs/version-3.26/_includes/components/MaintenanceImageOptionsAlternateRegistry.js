// Temporary component for "calico\maintenance\image-options\alternate-registry.mdx"

import React from 'react';
import CodeBlock from '@theme/CodeBlock';
import variables from '../../variables';

export default function MaintenanceImageOptionsAlternateRegistry() {
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
        <p>Use the following commands to pull the required {variables.prodname} images.</p>
      </li>
      <CodeBlock language='bash'>
        docker pull {variables.tigeraOperator.registry}/{variables.tigeraOperator.image}:{variables.tigeraOperator.version}
        {'\n'}
        {cmds1}
      </CodeBlock>
      <li>
        <p>
          Retag the images with the name of your registry <code>$REGISTRY</code>.
        </p>
      </li>
      <CodeBlock language='bash'>
        docker tag {variables.tigeraOperator.registry}/{variables.tigeraOperator.image}:{variables.tigeraOperator.version} $REGISTRY/
        {variables.tigeraOperator.image}:{variables.tigeraOperator.version}
        {'\n'}
        {cmds2}
      </CodeBlock>
      <li>
        <p>Push the images to your registry.</p>
      </li>
      <CodeBlock language='bash'>
        docker push $REGISTRY/{variables.tigeraOperator.image}:{variables.tigeraOperator.version}
        {'\n'}
        {cmds3}
      </CodeBlock>
    </ol>
  );
}

function renderInstallCommands(renderCommand) {
  const releaseComponents = variables.releases[0].components;
  const components = Object.keys(releaseComponents);
  const filteredComponents = components.filter((c) => variables.imageNames[c] && !c.includes('flannel'));
  const componentNames = filteredComponents.map((c) => variables.imageNames[c]);

  const result = filteredComponents
    .map((c, i) => {
      const componentData = releaseComponents[c];
      const reg = componentData.registry ? `${componentData.registry}/` : variables.registry;

      return renderCommand(componentData, reg, componentNames, i);
    })
    .join('\n');

  return result;
}
