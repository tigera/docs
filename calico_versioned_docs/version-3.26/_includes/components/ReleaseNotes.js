import React from 'react';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';

import { toKebab } from '@site/src/components/utils/formatters';
import { componentUrl } from '@site/src/components/utils/componentUrl';

import variables from '../../variables';

export default function ReleaseNotes() {
  const { imageNames } = variables;

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
            id={toKebab(release.title)}
            data-bz-version={toKebab(release.title)}
          >
            Calico Open Source {release.title}
          </Heading>
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
                      <Link href={componentUrl(componentName, release)}>{release.components[comp].version}</Link>
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
