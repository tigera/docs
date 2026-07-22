#!/usr/bin/env node
/**
 * changed-pages.js
 *
 * Print the built page URLs for the docs files changed in a PR, one per line.
 * The PR link-check workflow feeds this list to the crawler as PAGES_TO_CHECK.
 *
 * Usage:
 *   node scripts/changed-pages.js [baseRef] [manifestPath]
 *
 * Defaults: baseRef = origin/main, manifestPath = build/link-check-routes.json.
 * The manifest is written by the docusaurus-plugin-link-check-routes plugin
 * during a build run with LINK_CHECK_ROUTES=true.
 *
 * Note: only files registered as docs pages map to a URL. Changes to partials,
 * includes, or components are reported as "unmatched" and are not checked here.
 */

const { execFileSync } = require('child_process');
const fs = require('fs');

const base = process.argv[2] || process.env.BASE_REF || 'origin/main';
const manifestPath = process.argv[3] || 'build/link-check-routes.json';

const DOC_RE = /\.mdx?$/;

function changedDocFiles(baseRef) {
  // execFile with an argument array: no shell, so baseRef cannot inject commands.
  const out = execFileSync('git', ['diff', '--name-only', `${baseRef}...HEAD`], { encoding: 'utf8' });
  return out
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean)
    .filter((f) => DOC_RE.test(f));
}

let manifest;
try {
  manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
} catch (e) {
  console.error(`[changed-pages] cannot read manifest ${manifestPath}: ${e.message}`);
  process.exit(2);
}

const files = changedDocFiles(base);
const permalinks = new Set();
const unmatched = [];

for (const f of files) {
  const links = manifest[f];
  if (links && links.length) {
    links.forEach((l) => permalinks.add(l));
  } else {
    unmatched.push(f);
  }
}

// Pages go to stdout (consumed by the workflow); diagnostics go to stderr.
for (const p of [...permalinks].sort()) {
  console.log(p);
}

console.error(
  `[changed-pages] base=${base} changed-docs=${files.length} pages=${permalinks.size} unmatched=${unmatched.length}`
);
if (unmatched.length) {
  console.error(
    `[changed-pages] unmatched (partials/includes/components, not checked): ${unmatched.slice(0, 10).join(', ')}${unmatched.length > 10 ? '...' : ''}`
  );
}
