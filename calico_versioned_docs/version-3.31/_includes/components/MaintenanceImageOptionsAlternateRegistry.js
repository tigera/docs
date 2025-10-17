// Temporary component for "calico\maintenance\image-options\alternate-registry.mdx"

import React from 'react';

import CodeBlock from '@theme/CodeBlock';

import { imageNames, prodname, registry, releases, tigeraOperator } from '../../variables';

export default function MaintenanceImageOptionsAlternateRegistry() {
  const pullCmds = renderRetagCommands(
    (componentData, reg, componentNames, i) => `docker pull ${reg}${componentNames[i]}:${componentData.version}`,
    (c) => imageNames[c] && !c.includes('flannel') && !c.includes('-windows')
  );

  const tagCmds = renderRetagCommands(
    (componentData, reg, componentNames, i) =>
      `docker tag ${reg}${componentNames[i]}:${componentData.version} $REGISTRY/${componentNames[i]}:${componentData.version}`,
    (c) => imageNames[c] && !c.includes('flannel') && !c.includes('-windows')
  );

  const pushCmds = renderRetagCommands(
    (componentData, reg, componentNames, i) => `docker push $REGISTRY/${componentNames[i]}:${componentData.version}`,
    (c) => imageNames[c] && !c.includes('flannel') && !c.includes('-windows')
  );

  const craneCmds = renderRetagCommands(
    (componentData, reg, componentNames, i) => `crane cp ${reg}${componentNames[i]}:${componentData.version} $REGISTRY/${componentNames[i]}:${componentData.version}`,
    (c) => imageNames[c] && c.includes('-windows')
  );

  return (
    <ol>
      <li>
        <p>Use the following commands to pull the required {prodname} images.</p>
      </li>
      <CodeBlock language='bash'>
        docker pull {tigeraOperator.registry}/{tigeraOperator.image}:{tigeraOperator.version}
        {'\n'}
        {pullCmds}
      </CodeBlock>
      <li>
        <p>
          Retag the images with the name of your registry <code>$REGISTRY</code>.
        </p>
      </li>
      <CodeBlock language='bash'>
        docker tag {tigeraOperator.registry}/{tigeraOperator.image}:{tigeraOperator.version} $REGISTRY/
        {tigeraOperator.image}:{tigeraOperator.version}
        {'\n'}
        {tagCmds}
      </CodeBlock>
      <li>
        <p>Push the images to your registry.</p>
      </li>
      <CodeBlock language='bash'>
        docker push $REGISTRY/{tigeraOperator.image}:{tigeraOperator.version}
        {'\n'}
        {pushCmds}
      </CodeBlock>
      <li>
        <p>Use <code>crane cp</code> to copy the Windows images to your private registry.</p>
      </li>
      <p>For hybrid Linux + Windows clusters, use <code>crane cp</code> on the following Windows images to copy them to your private registry.</p>
      <CodeBlock language='bash'>
        {craneCmds}
      </CodeBlock>
    </ol>
  );
}

function renderRetagCommands(renderCommand, filterFunc) {
  const releaseComponents = releases[0].components;
  const components = Object.keys(releaseComponents);
  const filteredComponents = components.filter(filterFunc);
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
