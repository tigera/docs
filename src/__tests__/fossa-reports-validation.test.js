import fs from 'fs';
import path from 'path';

const ROOT = path.resolve(__dirname, '..', '..');

// Dynamically discover all sidebar files and their corresponding docs directories
function discoverSidebarMappings() {
  const mappings = {};

  // Main sidebar → next docs
  mappings['sidebars-calico-enterprise.js'] = 'calico-enterprise/reference/fossa-reports';

  // Versioned sidebars → versioned docs
  const versionedDir = path.join(ROOT, 'calico-enterprise_versioned_sidebars');
  if (fs.existsSync(versionedDir)) {
    for (const file of fs.readdirSync(versionedDir)) {
      const match = file.match(/^(version-.+)-sidebars\.json$/);
      if (!match) continue;
      const versionId = match[1];
      const sidebarRelPath = `calico-enterprise_versioned_sidebars/${file}`;
      const docsRelPath = `calico-enterprise_versioned_docs/${versionId}/reference/fossa-reports`;
      mappings[sidebarRelPath] = docsRelPath;
    }
  }

  return mappings;
}

function extractFossaVersionsFromSidebar(sidebarPath) {
  const content = fs.readFileSync(path.join(ROOT, sidebarPath), 'utf8');
  const matches = content.match(/reference\/fossa-reports\/([^"'\s,\]]+)/g) || [];
  return matches.map((m) => m.replace('reference/fossa-reports/', ''));
}

function getMdxVersionsInDir(docsDir) {
  const fullPath = path.join(ROOT, docsDir);
  if (!fs.existsSync(fullPath)) return [];
  return fs
    .readdirSync(fullPath)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace('.mdx', ''));
}

const allMappings = discoverSidebarMappings();

// Filter to only sidebars that have FOSSA entries
const fossaMappings = Object.fromEntries(
  Object.entries(allMappings).filter(
    ([sidebarFile]) => extractFossaVersionsFromSidebar(sidebarFile).length > 0
  )
);

describe('FOSSA Reports consistency', () => {
  it('at least one sidebar contains FOSSA report entries', () => {
    expect(Object.keys(fossaMappings).length).toBeGreaterThan(0);
  });

  for (const [sidebarFile, docsDir] of Object.entries(fossaMappings)) {
    const label = path.basename(sidebarFile);

    describe(label, () => {
      const sidebarVersions = extractFossaVersionsFromSidebar(sidebarFile);
      const mdxVersions = getMdxVersionsInDir(docsDir);

      it('every sidebar entry has a matching MDX file', () => {
        const missing = sidebarVersions.filter((v) => !mdxVersions.includes(v));
        expect(missing).toEqual([]);
      });

      it('every MDX file has a matching sidebar entry', () => {
        const orphaned = mdxVersions.filter((v) => !sidebarVersions.includes(v));
        expect(orphaned).toEqual([]);
      });

      it('each MDX file version prop matches its filename', () => {
        for (const version of mdxVersions) {
          const mdxPath = path.join(ROOT, docsDir, `${version}.mdx`);
          const content = fs.readFileSync(mdxPath, 'utf8');
          const match = content.match(/<FossaReport\s+version="([^"]+)"/);
          expect(match).not.toBeNull();
          expect(match[1]).toBe(version);
        }
      });
    });
  }
});

describe('FOSSA Netlify redirect', () => {
  it('netlify.toml contains the FOSSA wildcard proxy redirect', () => {
    const toml = fs.readFileSync(path.join(ROOT, 'netlify.toml'), 'utf8');
    expect(toml).toContain('/calico-enterprise/fossa-reports/:version/attribution-report.html');
    expect(toml).toContain('attribution-report.s3.amazonaws.com');
  });
});

// S3 bucket checks are opt-in: set RUN_S3_CHECKS=1 to enable (skipped in CI by default)
const runS3Checks = process.env.RUN_S3_CHECKS === '1';

(runS3Checks ? describe : describe.skip)('FOSSA S3 bucket existence', () => {
  const allVersions = [
    ...new Set(
      Object.keys(fossaMappings).flatMap((sf) => extractFossaVersionsFromSidebar(sf))
    ),
  ];

  it.each(allVersions)('S3 bucket exists for version %s', async (version) => {
    const bucketUrl = `https://ce-${version}-attribution-report.s3.amazonaws.com/`;
    const res = await fetch(bucketUrl, { method: 'HEAD' });
    // 403 (AccessDenied) or 301 (PermanentRedirect) = bucket exists; 404 = missing
    expect(res.status).not.toBe(404);
  }, 10000);
});
