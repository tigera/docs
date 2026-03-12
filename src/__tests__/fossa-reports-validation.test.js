import fs from 'fs';
import path from 'path';

const ROOT = path.resolve(__dirname, '..', '..');

// Dynamically discover all calico-enterprise docs version directories
function discoverDocsVersions() {
  const versions = [];

  // "next" docs
  versions.push({
    label: 'next',
    docsDir: 'calico-enterprise',
    sidebarFile: 'sidebars-calico-enterprise.js',
  });

  // Versioned docs
  const versionedDocsDir = path.join(ROOT, 'calico-enterprise_versioned_docs');
  if (fs.existsSync(versionedDocsDir)) {
    for (const dir of fs.readdirSync(versionedDocsDir)) {
      if (!dir.startsWith('version-')) continue;
      const sidebarFile = `calico-enterprise_versioned_sidebars/${dir}-sidebars.json`;
      if (!fs.existsSync(path.join(ROOT, sidebarFile))) continue;
      versions.push({
        label: dir,
        docsDir: `calico-enterprise_versioned_docs/${dir}`,
        sidebarFile,
      });
    }
  }

  return versions;
}

const docsVersions = discoverDocsVersions();

// Filter to versions that have an attribution.mdx with the FossaReport component
const fossaVersions = docsVersions.filter(({ docsDir }) => {
  const mdxPath = path.join(ROOT, docsDir, 'reference', 'attribution.mdx');
  return fs.existsSync(mdxPath) && fs.readFileSync(mdxPath, 'utf8').includes('FossaReport');
});

describe('FOSSA attribution structure', () => {
  it('at least one docs version has a FOSSA-powered attribution page', () => {
    expect(fossaVersions.length).toBeGreaterThan(0);
  });

  for (const { label, docsDir, sidebarFile } of fossaVersions) {
    describe(label, () => {
      it('attribution.mdx imports releases.json and FossaReport component', () => {
        const mdxPath = path.join(ROOT, docsDir, 'reference', 'attribution.mdx');
        const content = fs.readFileSync(mdxPath, 'utf8');
        expect(content).toContain("from '../releases.json'");
        expect(content).toContain('<FossaReport releases={releases}');
      });

      it('sidebar has "reference/attribution" entry', () => {
        const content = fs.readFileSync(path.join(ROOT, sidebarFile), 'utf8');
        expect(content).toContain('reference/attribution');
      });

      it('does NOT have a separate fossa-reports.mdx', () => {
        const fossaPath = path.join(ROOT, docsDir, 'reference', 'fossa-reports.mdx');
        expect(fs.existsSync(fossaPath)).toBe(false);
      });
    });
  }
});

// S3 bucket checks (opt-in: set RUN_S3_CHECKS=1 to enable)
const runS3Checks = process.env.RUN_S3_CHECKS === '1';

(runS3Checks ? describe : describe.skip)('FOSSA S3 bucket existence', () => {
  // Extract unique minor versions from all releases.json files
  const minorVersions = [
    ...new Set(
      fossaVersions
        .map(({ docsDir }) => {
          const releasesPath = path.join(ROOT, docsDir, 'releases.json');
          if (!fs.existsSync(releasesPath)) return null;
          const releases = JSON.parse(fs.readFileSync(releasesPath, 'utf8'));
          const latest = releases.find((r) => r.title !== 'master');
          if (!latest) return null;
          const parts = latest.title.replace(/^v/, '').split('.');
          return `${parts[0]}-${parts[1]}`;
        })
        .filter(Boolean)
    ),
  ];

  it.each(minorVersions)(
    'S3 bucket exists for minor version %s',
    async (s3Key) => {
      const bucketUrl = `https://ce-${s3Key}-attribution-report.s3.amazonaws.com/`;
      const res = await fetch(bucketUrl, { method: 'HEAD' });
      // 403 (AccessDenied) = bucket exists but private; 404 = bucket missing
      expect(res.status).not.toBe(404);
    },
    10000
  );
});
