import { resolveInstances } from '../index.js';
import { generateRootIndex } from '../generate.js';

const docsPlugin = (id) => ({ name: 'docusaurus-plugin-content-docs', options: { id } });

describe('resolveInstances', () => {
  it('covers the default instance when it is configured', () => {
    // A single-instance site, such as Lynx, has nothing but 'default'.
    const { instances, unconfigured } = resolveInstances(
      [{ name: 'docusaurus-plugin-content-docs', options: {} }],
      { default: { name: 'Lynx', indexPath: '' } }
    );

    expect(instances).toHaveLength(1);
    expect(instances[0]).toMatchObject({ instanceId: 'default', productName: 'Lynx', indexPath: '' });
    expect(unconfigured).toEqual([]);
  });

  it('reports unconfigured instances unless they are skipped', () => {
    const plugins = ['default', 'calico', 'new-product'].map(docsPlugin);
    const { unconfigured } = resolveInstances(plugins, { calico: { name: 'Calico' } }, ['default']);

    expect(unconfigured).toEqual(['new-product']);
  });

  it('reports configured instances that did not load', () => {
    const { missing } = resolveInstances([docsPlugin('calico')], {
      calico: {},
      'calico-cloud': {},
    });

    expect(missing).toEqual(['calico-cloud']);
  });

  it('defaults the index path to the instance id, which is where Calico serves it', () => {
    const { instances } = resolveInstances([docsPlugin('calico')], { calico: {} });

    expect(instances[0]).toMatchObject({ indexPath: 'calico', productName: 'calico' });
  });
});

describe('generateRootIndex', () => {
  const doc = (title, permalink) => ({ title, permalink, description: '', markdown: 'x' });

  it('lists extra sections and links each product under its own path', () => {
    const output = generateRootIndex({
      title: 'Calico Documentation',
      description: 'All of it.',
      topPageDocs: [doc('Quickstart', '/calico/latest/quickstart')],
      sections: [
        { title: 'Use Cases', docs: [doc('Egress', '/use-cases/egress')] },
        { title: 'Empty', docs: [] },
      ],
      products: [{ name: 'Calico Open Source', path: '/calico' }],
      siteUrl: 'https://docs.tigera.io',
    });

    expect(output).toContain('# Calico Documentation\n\n> All of it.');
    expect(output).toContain('## Use Cases\n\n- [Egress](https://docs.tigera.io/use-cases/egress.md)');
    expect(output).not.toContain('## Empty');
    expect(output).toContain(
      '- [Calico Open Source llms.txt](https://docs.tigera.io/calico/llms.txt): Index of all Calico Open Source docs'
    );
  });
});
