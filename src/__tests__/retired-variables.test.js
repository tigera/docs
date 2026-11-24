/**
 * @jest-environment node
 *
 * The version variables were renamed. The build leaves an unknown `$[name]` token
 * as literal text, so a page that still uses an old name would ship broken with no
 * error. This fails the check instead.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..');

const RETIRED = {
  releaseTitle: 'releaseTag',
  version: 'minorTag',
  chart_version_name: 'chartVersion',
};

const retiredToken = new RegExp(`\\$\\[[ \\t]*(${Object.keys(RETIRED).join('|')})[ \\t]*\\]`, 'g');

function* pages(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* pages(full);
    } else if (/\.mdx?$/.test(entry.name)) {
      yield full;
    }
  }
}

const trees = fs
  .readdirSync(ROOT)
  .filter((name) => /^(calico|use-cases)/.test(name) && fs.statSync(path.join(ROOT, name)).isDirectory());

describe('retired variable names', () => {
  it('finds the docs trees', () => {
    expect(trees).toEqual(expect.arrayContaining(['calico', 'calico-enterprise', 'calico-cloud']));
  });

  it('are not used in any page', () => {
    const found = [];
    for (const tree of trees) {
      for (const page of pages(path.join(ROOT, tree))) {
        for (const [, name] of fs.readFileSync(page, 'utf8').matchAll(retiredToken)) {
          found.push(`${path.relative(ROOT, page)}: $[${name}] is now $[${RETIRED[name]}]`);
        }
      }
    }
    expect(found).toEqual([]);
  });
});
