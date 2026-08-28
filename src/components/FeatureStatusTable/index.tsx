import React from 'react';
import { usePluginData } from '@docusaurus/useGlobalData';
import { useDocsVersion } from '@docusaurus/plugin-content-docs/client';

import { buildLegend, buildRows, cellLabel, PREVIEW_LEGEND, releaseWindow } from './featureStatus';
import type { Feature } from './featureStatus';

const PLUGIN_NAME = 'docusaurus-plugin-feature-status';

/**
 * The technology preview table for a release-notes page.
 *
 * The product and the three-release window both come from the page's own docs context:
 * the product is the docs plugin id, which is already the data file's product key, and
 * the window ends at the page's own version. A versioned snapshot therefore keeps the
 * window it was cut with, and no version numbers are written into the page.
 */
const TechPreviewTable: React.FC = () => {
  const { features } = usePluginData(PLUGIN_NAME) as { features: Feature[] };
  const { pluginId, version } = useDocsVersion();

  const versions = releaseWindow(version);

  // The unversioned `current` version, which the site labels Next, has no release line,
  // so there is no window to derive. Rendering nothing beats inventing a version number
  // in published release notes.
  if (!versions) {
    console.warn(`[${PLUGIN_NAME}] No release window for docs version "${version}", so no table is rendered.`);
    return null;
  }

  const rows = buildRows(features, pluginId, versions);
  if (!rows.length) return null;

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Feature</th>
            {versions.map((column) => (
              <th key={column}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.name}>
              <td>{row.name}</td>
              {row.cells.map((cell, index) => (
                <td key={versions[index]}>{cellLabel(cell)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <p>{buildLegend(PREVIEW_LEGEND)}</p>
    </>
  );
};

export default TechPreviewTable;
