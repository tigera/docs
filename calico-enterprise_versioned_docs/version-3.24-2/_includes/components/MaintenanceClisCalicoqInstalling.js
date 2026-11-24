// Temporary component for "calico-enterprise\maintenance\clis\calicoq\installing.mdx"

import React from 'react';

import CodeBlock from '@theme/CodeBlock';

import { downloadsurl, releaseTag, filesUrl, minorTag } from '../../variables';

export default function MaintenanceClisCalicoqInstalling() {
  const ver = minorTag === 'master' ? minorTag : releaseTag;
  const code =
    ver === 'master'
      ? `${filesUrl}/download/binaries/${ver}/calicoq`
      : `curl -o calicoq -O -L ${downloadsurl}/ee/binaries/${ver}/calicoq`;

  return <CodeBlock>{code}</CodeBlock>;
}
