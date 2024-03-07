import React from 'react';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';

import { toKebab } from '@site/src/components/utils/formatters';

import variables from '../../variables';

export default function ComponentVersions() {
  const { prodname, version, downloadsurl } = variables;

  const releases = variables.releases.map((release) => {
    return release;
  }).filter(release => release);

  return (
    <>
      {releases.map((release) => (
        <div key={release.title}>
          <p>
            This page lists the specific component versions that go into {variables.prodname} patch releases.
          </p>
          <Heading
            as='h2'
            id={`component-versions-${toKebab(release.title)}`}
            data-bz-version={toKebab(release.title)}
          >
            Component versions for {variables.prodname} {release.title.startsWith('v') ? release.title.substring(1) : release.title}
          </Heading>
          <p>
            {release.title !== 'master' && (
              <p>
                <Link
                  href={`https://github.com/projectcalico/calico/releases/download/${release.title}/release-${release.title}.tgz`}
                >
                  Release archive
                </Link>{' '}
                with Kubernetes manifests.
              </p>
            )}
            This release comprises the following components, and can be installed using{' '}
            <code>
              {release['tigera-operator'].registry}/{release['tigera-operator'].image}:
              {release['tigera-operator'].version}
            </code>
          </p>
          <table>
            <thead>
              <tr>
                <th>Component</th>
                <th>Version</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(release.components).map((componentName) => (
                <tr key={componentName}>
                  <td>{componentName}</td>
                  <td>{release.components[componentName].version}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </>
  );
}
