import fs from 'fs/promises';
import os from 'os';
import path from 'path';

import { contentOnly, createCache } from '../cache.js';

const PAGE = (runtimeHash, body) =>
  `<html><head><link rel="stylesheet" href="/assets/css/styles.abc.css"/>` +
  `<script src="/assets/js/runtime~main.${runtimeHash}.js" defer></script></head>` +
  `<body><main>${body}</main><script>window.__DOCUSAURUS={};</script></body></html>`;

describe('contentOnly', () => {
  it('drops script and link tags', () => {
    expect(contentOnly(PAGE('aaa', '<p>Text.</p>'))).toBe(
      '<html><head></head><body><main><p>Text.</p></main></body></html>'
    );
  });

  it('is unchanged by a bundle fingerprint churning', () => {
    expect(contentOnly(PAGE('aaa', '<p>Text.</p>'))).toBe(contentOnly(PAGE('zzz', '<p>Text.</p>')));
  });

  it('still reflects a real content change', () => {
    expect(contentOnly(PAGE('aaa', '<p>One.</p>'))).not.toBe(contentOnly(PAGE('aaa', '<p>Two.</p>')));
  });
});

describe('createCache', () => {
  let cacheDir;

  beforeEach(async () => {
    cacheDir = await fs.mkdtemp(path.join(os.tmpdir(), 'llms-cache-test-'));
  });

  afterEach(async () => {
    await fs.rm(cacheDir, { recursive: true, force: true });
  });

  it('keys identically across a bundle fingerprint change', () => {
    const cache = createCache({ cacheDir, fingerprint: 'v1' });

    expect(cache.keyFor(PAGE('aaa', '<p>Text.</p>'))).toBe(cache.keyFor(PAGE('zzz', '<p>Text.</p>')));
  });

  it('keys differently when the converter fingerprint changes', () => {
    const before = createCache({ cacheDir, fingerprint: 'v1' });
    const after = createCache({ cacheDir, fingerprint: 'v2' });
    const page = PAGE('aaa', '<p>Text.</p>');

    expect(before.keyFor(page)).not.toBe(after.keyFor(page));
  });

  it('round-trips a value and counts hits and misses', async () => {
    const cache = createCache({ cacheDir, fingerprint: 'v1' });
    const key = cache.keyFor(PAGE('aaa', '<p>Text.</p>'));

    expect(await cache.get(key)).toBeNull();
    await cache.set(key, { markdown: '# Title' });

    expect(await cache.get(key)).toEqual({ markdown: '# Title' });
    expect(cache.stats).toEqual({ hits: 1, misses: 1 });
  });

  it('prunes entries the build did not touch', async () => {
    const seeding = createCache({ cacheDir, fingerprint: 'v1' });
    await seeding.set(seeding.keyFor(PAGE('aaa', '<p>Kept.</p>')), { markdown: 'kept' });
    await seeding.set(seeding.keyFor(PAGE('aaa', '<p>Dropped.</p>')), { markdown: 'dropped' });

    const rebuild = createCache({ cacheDir, fingerprint: 'v1' });
    await rebuild.get(rebuild.keyFor(PAGE('aaa', '<p>Kept.</p>')));

    expect(await rebuild.prune()).toBe(1);
    expect(await fs.readdir(cacheDir)).toHaveLength(1);
  });

  it('reports no removals when there is no cache directory yet', async () => {
    const cache = createCache({ cacheDir: path.join(cacheDir, 'missing'), fingerprint: 'v1' });

    expect(await cache.prune()).toBe(0);
  });
});
