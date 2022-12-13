// Temporary component for "calico-enterprise\maintenance\clis\calicoq\installing.mdx"

import React from 'react';

import CodeBlock from '@theme/CodeBlock';

import { downloadsurl, releases, filesUrl_CE, version } from '../../variables';

export default function _Maintenance_Clis_Calicoq_Installing() {
  const ver = version === 'master' ? version : releases[0].title;
  const code =
    ver === 'master'
      ? `${filesUrl_CE}/download/binaries/${ver}/calicoq`
      : `curl -o calicoq -O -L ${downloadsurl}/ee/binaries/${ver}/calicoq`;

  return <CodeBlock>{code}</CodeBlock>;
}
