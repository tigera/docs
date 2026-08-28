import React from 'react';
import { usePluginData } from '@docusaurus/useGlobalData';
import { useDocsVersion } from '@docusaurus/plugin-content-docs/client';

import { buildLegend, buildRows, cellLabel, DEPRECATION_TABLE, PREVIEW_TABLE, releaseWindow } from './featureStatus';
import type { Feature, TableKind } from './featureStatus';

const PLUGIN_NAME = 'docusaurus-plugin-feature-status';

/**
 * A feature status table for a release-notes page.
 *
 * The product and the three-release window both come from the page's own docs context:
 * the product is the docs plugin id, which is already the data file's product key, and
 * the window ends at the page's own version. A versioned snapshot therefore keeps the
 * window it was cut with, and no version numbers are written into the page.
 *
 * The TableKind is the only thing separating the two tables. Everything else — the
 * window, the product, carry-forward, ordering, rendering — is shared.
 */
const FeatureStatusTable: React.FC<TableKind> = ({ include, legend }) => {
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

  const rows = buildRows(features, pluginId, versions, include);
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
      <p>{buildLegend(legend)}</p>
    </>
  );
};

/** Features that were in technology preview at some point in the window. */
export const TechPreviewTable: React.FC = () => <FeatureStatusTable {...PREVIEW_TABLE} />;

/**
 * Features that were deprecated or removed at some point in the window.
 *
 * Both statuses select a row, so a feature that was deprecated earlier and removed
 * inside the window stays visible through the release that removed it.
 */
export const DeprecatedFeaturesTable: React.FC = () => <FeatureStatusTable {...DEPRECATION_TABLE} />;
