import React from 'react';

import Admonition from '@theme/Admonition';
import CodeBlock from '@theme/CodeBlock';
import Link from '@docusaurus/Link';

import { baseUrl } from '../../variables';

export default function EnvironmentFile(props) {
  return (
    <>
        <p>
            {props.install === 'container' ? (
                <span>
                    Use the following guidelines and sample file to define the environment variables for starting Calico on the host.
                    For more help, see the <Link href={`${baseUrl}/reference/component-resources/node/configuration`}>{props.nodecontainer} configuration reference</Link>
                </span>
            ) : (
                <span>
                    Use the following guidelines and sample file to define the environment variables for starting Calico on the host.
                </span>
            )}
        </p>
      <p>For the Kubernetes datastore set the following:</p>
      <table>
        <thead>
          <tr>
            <th>Variable</th>
            <th>Configuration guidance</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>KUBECONFIG</td>
            <td>Path to kubeconfig file to access the Kubernetes API Server</td>
          </tr>
        </tbody>
      </table>
      {props.install === 'container' && (
        <Admonition type='note'>
          If using certificates and keys, you will need to volume mount them into the container at the location
          specified by the paths mentioned above.
        </Admonition>
      )}
      <p>
        Sample <code>EnvironmentFile</code> - save to <code>/etc/calico/calico.env</code>
      </p>
      <CodeBlock language='bash'>
        {`DATASTORE_TYPE=kubernetes
CALICO_NODENAME=""
NO_DEFAULT_POOLS="true"
CALICO_IP=""
CALICO_IP6=""
CALICO_AS=""
CALICO_NETWORKING_BACKEND=bird`}
      </CodeBlock>
    </>
  );
}
