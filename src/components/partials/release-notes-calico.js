import React from 'react';

import Link from '@docusaurus/Link';

import { toKebab } from '../utils/formatters';
import { componentUrl } from '../utils/componentUrl';
import variables from '../../../variables';

export default function ReleaseNotesCalico() {
  const { prodname, version, imageNames } = variables.openSource;

  const releases = variables.openSource.releases.map((release) => ({
    ...release,
    note:
      release.note ||
      require(`../../../docs/calico/_includes/release-notes/${release.title}-release-notes.mdx`).default({}),
  }));

  return (
    <>
      <p>
        The following table shows component versioning for {prodname} <strong>{version}</strong>.
      </p>
      <p>
        To select a different version, click <strong>Releases</strong> in the top navigation bar.
      </p>
      {releases.map((release) => (
        <div key={release.title}>
          <h2 id={toKebab(release.title)}>{release.title}</h2>
          {release.title !== 'master' && (
            <p>
              <Link
                href={`https://github.com/projectcalico/calico/releases/download/${release.title}/release-${release.title}.tgz`}
              >
                Release archive
              </Link>{' '}
              with Kubernetes manifests, Docker images and binaries.
            </p>
          )}
          {release.note}
          <table>
            <thead>
              <tr>
                <th>Component</th>
                <th>Version</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(release.components).map((comp) => {
                // Use the imageName for the component, if it has one, for better readability
                const componentName = imageNames[comp] || comp;

                return (
                  <tr key={componentName}>
                    <td>{componentName}</td>
                    <td>
                      <Link href={`/release-notes/${componentUrl(componentName, release, prodname)}`}>
                        {release.components[comp].version}
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ))}
    </>
  );
}
