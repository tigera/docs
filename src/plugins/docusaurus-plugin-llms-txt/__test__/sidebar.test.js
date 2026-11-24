import { walkSidebar } from '../sidebar-utils.js';

describe('walkSidebar', () => {
  it('lists a doc once when a category links to one of its own items', () => {
    const sidebars = {
      main: [
        {
          type: 'category',
          label: 'Install',
          link: { type: 'doc', id: 'install/index' },
          items: ['install/index', 'install/helm'],
        },
      ],
    };

    expect(walkSidebar(sidebars, new Map())).toEqual([
      { docId: 'install/index', sectionLabel: 'Install' },
      { docId: 'install/helm', sectionLabel: 'Install' },
    ]);
  });
});
