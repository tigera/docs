import React from 'react';
import { usePluginData } from '@docusaurus/useGlobalData';
import { useDocsVersion } from '@docusaurus/plugin-content-docs/client';

import {
  buildLegend,
  buildRows,
  ccVersionLabel,
  ceVersionFromCloudversion,
  cellLabel,
  DEPRECATION_TABLE,
  PREVIEW_TABLE,
  releaseWindow,
} from './featureStatus';
import type { Feature, TableKind } from './featureStatus';

const PLUGIN_NAME = 'docusaurus-plugin-feature-status';

interface FeatureStatusTableProps extends TableKind {
  /**
   * Overrides the page's own docs version as the end of the release window.
   *
   * Calico Cloud's docs version ("23-2") has no release line to derive a window from, so its
   * pages pass this explicitly — the CE version their release is built on, taken from the
   * `cloudversion` variable (accepted as either a bare "3.23" or a raw "v3.23.1-4").
   */
  version?: string;
}

/**
 * A feature status table for a release-notes page.
 *
 * The product comes from the page's own docs context: the docs plugin id, which is already
 * the data file's product key. The three-release window normally comes from the page's own
 * version too, so a versioned snapshot keeps the window it was cut with and no version numbers
 * are written into the page — except Calico Cloud, whose pages pass `version` explicitly.
 *
 * The TableKind is otherwise the only thing separating the two tables. Everything else — the
 * window, the product, carry-forward, ordering, rendering — is shared.
 */
const FeatureStatusTable: React.FC<FeatureStatusTableProps> = ({ include, legend, version: versionOverride }) => {
  const { features } = usePluginData(PLUGIN_NAME) as { features: Feature[] };
  const { pluginId, version: docsVersion } = useDocsVersion();

  const targetVersion = versionOverride
    ? ceVersionFromCloudversion(versionOverride) ?? versionOverride
    : docsVersion;
  const versions = releaseWindow(targetVersion);

  // The unversioned `current` version, which the site labels Next, has no release line,
  // so there is no window to derive. Rendering nothing beats inventing a version number
  // in published release notes.
  if (!versions) {
    console.warn(`[${PLUGIN_NAME}] No release window for version "${targetVersion}", so no table is rendered.`);
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
              // Calico Cloud's own pages pass version, so relabel the CE column headers in
              // Calico Cloud's own version scheme. CE and OSS pages show the raw CE version,
              // since they don't pass an override.
              <th key={column}>{versionOverride ? ccVersionLabel(column) : column}</th>
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
export const TechPreviewTable: React.FC<{ version?: string }> = ({ version }) => (
  <FeatureStatusTable {...PREVIEW_TABLE} version={version} />
);

/**
 * Features that were deprecated or removed at some point in the window.
 *
 * Both statuses select a row, so a feature that was deprecated earlier and removed
 * inside the window stays visible through the release that removed it.
 */
export const DeprecatedFeaturesTable: React.FC<{ version?: string }> = ({ version }) => (
  <FeatureStatusTable {...DEPRECATION_TABLE} version={version} />
);
