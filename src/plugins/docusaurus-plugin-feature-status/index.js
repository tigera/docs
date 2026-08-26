/**
 * docusaurus-plugin-feature-status
 *
 * Reads data/feature-status.yaml once per build and exposes it as plugin global data,
 * so the release-notes tables render from the data file rather than from hand-written
 * Markdown that has to be re-typed in every release.
 *
 * The parse happens here rather than in a webpack loader because the file is a single
 * build-wide input: loading it once and putting it on global data keeps it out of every
 * page bundle that does not use it.
 */

import fs from 'fs/promises';
import path from 'path';
import { parse } from 'yaml';

export const PLUGIN_NAME = 'docusaurus-plugin-feature-status';

const DATA_FILE = 'data/feature-status.yaml';

export default function featureStatusPlugin(context) {
  const dataPath = path.join(context.siteDir, DATA_FILE);

  return {
    name: PLUGIN_NAME,

    // Reload the site when the data file changes, so editing a status during
    // `yarn start` updates the tables without a restart.
    getPathsToWatch() {
      return [dataPath];
    },

    async loadContent() {
      const source = await fs.readFile(dataPath, 'utf8');
      const parsed = parse(source);

      if (!parsed || !Array.isArray(parsed.features)) {
        throw new Error(`[${PLUGIN_NAME}] ${DATA_FILE} has no top-level "features" list.`);
      }

      return { features: parsed.features };
    },

    async contentLoaded({ content, actions }) {
      actions.setGlobalData(content);
    },
  };
}
