import fs from 'fs';
import path from 'path';
import { builtinModules } from 'module';

// Other sites run a copy of this directory and install its dependencies from
// package.json, so a package used here but missing from that list breaks their
// build, and a stale range installs a converter that produces different Markdown.

const PLUGIN_DIR = path.join(__dirname, '..');
const REPO_ROOT = path.join(PLUGIN_DIR, '..', '..', '..');

const readJson = (file) => JSON.parse(fs.readFileSync(file, 'utf-8'));
const plugin = readJson(path.join(PLUGIN_DIR, 'package.json'));
const site = readJson(path.join(REPO_ROOT, 'package.json'));

/** Bare package names imported by the plugin's own source, tests excluded. */
function importedPackages() {
  const names = new Set();

  for (const file of fs.readdirSync(PLUGIN_DIR).filter((f) => f.endsWith('.js'))) {
    const source = fs.readFileSync(path.join(PLUGIN_DIR, file), 'utf-8');
    for (const [, specifier] of source.matchAll(/^import\s[^'"]*['"]([^'"]+)['"]/gm)) {
      if (specifier.startsWith('.') || specifier.startsWith('node:')) {
        continue;
      }
      const name = specifier.startsWith('@')
        ? specifier.split('/').slice(0, 2).join('/')
        : specifier.split('/')[0];
      if (!builtinModules.includes(name)) {
        names.add(name);
      }
    }
  }

  return [...names].sort();
}

describe('package.json', () => {
  it('declares exactly the packages the plugin imports', () => {
    expect(Object.keys(plugin.dependencies).sort()).toEqual(importedPackages());
  });

  it('pins the same ranges this site installs', () => {
    const siteDeps = { ...site.dependencies, ...site.devDependencies };

    for (const [name, range] of Object.entries({
      ...plugin.dependencies,
      ...plugin.peerDependencies,
    })) {
      expect([name, siteDeps[name]]).toEqual([name, range]);
    }
  });
});
