import fs from 'fs/promises';
import os from 'os';
import path from 'path';

import { emptyPageAllowance } from '../index.js';
import { createCache } from '../cache.js';

describe('emptyPageAllowance', () => {
  // The guard fires when empty > allowance. If the allowance ever reaches the size of
  // the version, it can never fire — which is what a minimum of 5 did to the five-doc
  // use-cases instance.
  it.each([
    ['use-cases', 5],
    ['a small version', 12],
    ['calico latest', 337],
    ['calico-enterprise latest', 415],
  ])('can still fire for %s', (_name, docCount) => {
    expect(emptyPageAllowance(docCount)).toBeLessThan(docCount);
  });

  it('leaves room for the real rate of empty pages', () => {
    // Today: one client-rendered page per product, against hundreds of docs.
    expect(emptyPageAllowance(337)).toBeGreaterThanOrEqual(17);
    expect(emptyPageAllowance(286)).toBeGreaterThanOrEqual(15);
  });

  it('tolerates a stub or two in a small instance', () => {
    expect(emptyPageAllowance(5)).toBe(2);
  });
});

describe('cache write failures', () => {
  let tmp;

  beforeEach(async () => {
    tmp = await fs.mkdtemp(path.join(os.tmpdir(), 'llms-cache-fail-'));
  });

  afterEach(async () => {
    await fs.rm(tmp, { recursive: true, force: true });
  });

  it('degrades to a warning rather than failing the build', async () => {
    // A file where the cache directory should be: mkdir fails with ENOTDIR/EEXIST.
    const blocked = path.join(tmp, 'blocker');
    await fs.writeFile(blocked, 'not a directory');

    const cache = createCache({ cacheDir: path.join(blocked, 'nested'), fingerprint: 'v1' });
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});

    await expect(cache.set('abc', { markdown: '# Title' })).resolves.toBeUndefined();
    expect(warn).toHaveBeenCalledWith(expect.stringContaining('conversion cache'));

    warn.mockRestore();
  });

  it('warns once, not once per page', async () => {
    const blocked = path.join(tmp, 'blocker');
    await fs.writeFile(blocked, 'not a directory');

    const cache = createCache({ cacheDir: path.join(blocked, 'nested'), fingerprint: 'v1' });
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});

    for (let i = 0; i < 5; i++) {
      await cache.set(`key-${i}`, { markdown: 'x' });
    }

    expect(warn).toHaveBeenCalledTimes(1);
    warn.mockRestore();
  });

  it('still reports a miss so the page is reconverted', async () => {
    const cache = createCache({ cacheDir: path.join(tmp, 'fresh'), fingerprint: 'v1' });

    expect(await cache.get('never-written')).toBeNull();
    expect(cache.stats.misses).toBe(1);
  });
});
