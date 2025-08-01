import React from 'react';

import Admonition from '@theme/Admonition';
import CodeBlock from '@theme/CodeBlock';
import Link from '@docusaurus/Link';

import { prodname, baseUrl } from '../../variables';

export default function CliConfigIntro(props) {
  return (
    <>
      <p>
        Many <code>{props.cli}</code> commands require access to the {prodname} datastore. In most circumstances,{' '}
        <code>{props.cli}</code> cannot achieve this connection by default. You can provide
        <code>{props.cli}</code> with the information it needs using either of the following.
      </p>
      <ol>
        <li>
          <p>
            <strong>Configuration file</strong>: by default, <code>{props.cli}</code> will look for a configuration file
            at <code>/etc/calico/{props.cli}.cfg</code>. You can override this using the <code>--config</code> option
            with commands that require datastore access. The file can be in either YAML or JSON format. It must be valid
            and readable by <code>{props.cli}</code>. A YAML example follows.
          </p>
          <CodeBlock language='yaml'>
            {`apiVersion: projectcalico.org/v3
kind: CalicoAPIConfig
metadata:
spec:
  datastoreType: "kdd"
  ...`}
          </CodeBlock>
        </li>
        <li>
          <p>
            <strong>Environment variables</strong>: If <code>{props.cli}</code> cannot locate, read, or access a
            configuration file, it will check a specific set of environment variables.
          </p>
        </li>
      </ol>
      <p>
        See the section that corresponds to your <Link href={`${baseUrl}/operations/clis`}>datastore type</Link> for a
        full set of options and examples.
      </p>
      <Admonition type='note'>
        When running <code>{props.cli}</code> inside a container, any environment variables and configuration files must
        be passed to the container so they are available to the process inside. It can be useful to keep a running
        container (that sleeps) configured for your datastore, then it is possible to <code>exec</code> into the
        container and have an already configured environment.
      </Admonition>
    </>
  );
}
