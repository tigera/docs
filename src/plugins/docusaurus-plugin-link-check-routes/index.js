/**
 * docusaurus-plugin-link-check-routes
 *
 * A Docusaurus postBuild plugin that writes a map of source file to built URL.
 * The PR link check uses this map to turn "files changed in a PR" into "pages to check".
 *
 * Output: <build>/link-check-routes.json, shaped as:
 *   { "calico/getting-started/install.mdx": ["/calico/latest/getting-started/install/"], ... }
 *
 * Gated by LINK_CHECK_ROUTES=true — no-op on regular builds, so it does not change normal output.
 */

import fs from 'fs/promises';
import path from 'path';

const PLUGIN_NAME = 'docusaurus-plugin-link-check-routes';
const LOG_PREFIX = '[link-check-routes]';
const OUTPUT_FILE = 'link-check-routes.json';

export default function linkCheckRoutesPlugin() {
  return {
    name: PLUGIN_NAME,

    async postBuild({ outDir, plugins }) {
      if (process.env.LINK_CHECK_ROUTES !== 'true') {
        return;
      }

      // sourcePath (repo-relative) -> array of permalinks (one source can map to more than one).
      const routes = {};
      const add = (source, permalink) => {
        if (!source || !permalink) return;
        const rel = source.replace(/^@site\//, '');
        if (!routes[rel]) routes[rel] = [];
        if (!routes[rel].includes(permalink)) routes[rel].push(permalink);
      };

      const docsPlugins = plugins.filter(
        (p) => p.name === 'docusaurus-plugin-content-docs'
      );

      for (const dp of docsPlugins) {
        const versions = dp.content?.loadedVersions || [];
        for (const version of versions) {
          for (const doc of version.docs || []) {
            add(doc.source, doc.permalink);
          }
        }
      }

      const outPath = path.join(outDir, OUTPUT_FILE);
      await fs.writeFile(outPath, JSON.stringify(routes, null, 2));
      console.log(
        `${LOG_PREFIX} Wrote ${outPath} (${Object.keys(routes).length} source files).`
      );
    },
  };
}
