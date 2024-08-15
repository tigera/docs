import React from 'react';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';

import { toKebab } from '@site/src/components/utils/formatters';

import variables from '../../variables';

export default function ReleaseNotes() {
  const releases = variables.releases.map((release) => {
    let note = release.note;
    try {
      if (!note) {
        note = require(`../release-notes/_${release.title}-release-notes.mdx`).default({});
      }
    } catch {
      console.error(`Cannot find "/_includes/release-notes/_${release.title}-release-notes.mdx" file`);
    }

    return {
      ...release,
      note,
    };
  });

  return (
    <>
      {releases.map((release) => (
        <div key={release.title}>
          <Heading
            as='h2'
            id={`calico-enterprise-${toKebab(release.title)}`}
            data-bz-version={toKebab(release.title)}
          >
            Calico Enterprise {release.title}
          </Heading>
          {release.title !== 'master' && (
            <p>
              <Link
                href={`${variables.downloadsurl}/ee/archives/release-${release.title}-${release['tigera-operator'].version}.tgz`}
              >
                Release archive
              </Link>{' '}
              with Kubernetes manifests. Based on Calico {releases[0].calico.minor_version}.
            </p>
          )}
          {release.note}
          <Heading
            as='h3'
            id={`component-versions-${toKebab(release.title)}`}
          >
            Component Versions
          </Heading>
          <p>
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
