// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

const variablesPlugin = require('./src/remark/variablesPlugin');
const componentImagePlugin = require('./src/remark/componentImagePlugin');

// First 4 are default and taken from preset.
// Temporarly adding '../**/_includes/**' until https://github.com/facebook/docusaurus/pull/8275 released to npm
const excludeContentDocsPatterns = [
  '**/_*.{js,jsx,ts,tsx,md,mdx}',
  '**/_*/**',
  '**/*.test.{js,jsx,ts,tsx}',
  '**/__tests__/**',
  '../**/_includes/**',
];
/** @type {import('@docusaurus/types').Config} */
const config = {
  // TODO[dac]: noIndex should be removed, along with robots.txt and the
  // X-Robots-Tag:noindex in the /static/_headers file once we cutover
  noIndex: true,
  title: 'Calico Documentation',
  tagline: 'Active security for cloud-native applications',
  url: 'https://unified-docs.tigera.io',
  baseUrl: '/',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.png',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        // TODO: try to find a way to not specify a default instance
        docs: {
          path: 'default',
          sidebarPath: false,
        },
        blog: false,
        theme: {
          customCss: [
            require.resolve('./src/css/custom.css'),
            require.resolve('./src/css/glyphicons.scss'),
            require.resolve('./src/css/external-links.scss'),
            require.resolve('./src/css/modal.scss'),
          ],
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      algolia: {
        appId: 'Q4GSZWRKBA',
        apiKey: '2ab3eace97419c5868153aac2e3d2e6c',
        indexName: 'calico',
        contextualSearch: true,
        searchPagePath: '/search',
      },
      navbar: {
        logo: {
          src: 'img/tigera-logo-black.png',
          srcDark: 'img/tigera-logo-white.png',
        },
        items: [
          {
            type: 'dropdown',
            label: 'Documentation',
            className: 'documentation-dropdown',
            items: [
              {
                label: 'Calico Open Source',
                type: 'docSidebar',
                sidebarId: 'calicoSidebar',
                docsPluginId: 'calico',
                className: 'navbar-product-link_calico',
              },
              {
                label: 'Calico Enterprise',
                type: 'docSidebar',
                sidebarId: 'calicoEnterpriseSidebar',
                docsPluginId: 'calico-enterprise',
                className: 'navbar-product-link_calico-enterprise',
              },
              {
                label: 'Calico Cloud',
                type: 'docSidebar',
                sidebarId: 'calicoCloudSidebar',
                docsPluginId: 'calico-cloud',
                className: 'navbar-product-link_calico-cloud',
              },
            ],
          },
          {
            type: 'docsVersionDropdown',
            position: 'left',
            // className for product specific items must start with 'product-'
            dropdownItemsAfter: [
              {
                type: 'html',
                value: '<a class="dropdown__link" href="https://unified-docs.tigera.io/v3.13">3.13</a>',
                className: 'product-calico-enterprise',
              },
              {
                type: 'html',
                value: '<a class="dropdown__link" href="https://unified-docs.tigera.io/v3.12">3.12</a>',
                className: 'product-calico-enterprise',
              },
              {
                type: 'html',
                value: '<a class="dropdown__link" href="https://unified-docs.tigera.io/archive/v3.23">3.23</a>',
                className: 'product-calico',
              },
              {
                type: 'html',
                value: '<a class="dropdown__link" href="https://unified-docs.tigera.io/archive/v3.22">3.22</a>',
                className: 'product-calico',
              },
              {
                type: 'html',
                value: '<hr class="dropdown-separator" />',
              },
              {
                to: '/archive',
                label: 'All versions',
              },
            ],
          },
          {
            label: 'Tutorials',
            href: 'https://www.tigera.io/self-paced-workshops/',
            position: 'left',
          },
          {
            label: 'Try Calico Cloud',
            href: 'https://calicocloud.io',
            position: 'left',
          },
          {
            href: 'https://github.com/projectcalico',
            position: 'right',
            className: 'header-icon-link github-icon',
            'aria-label': 'GitHub repository',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Learn',
            items: [
              {
                label: 'Documentation',
                to: '/',
              },
              {
                label: 'Events',
                href: 'https://tigera.io/events',
              },
              {
                label: 'Resource center',
                href: 'https://tigera.io/resources',
              },
              {
                label: 'Blog',
                href: 'https://tigera.io/blog',
              },
              {
                label: 'Trade shows',
                href: 'https://tigera.io/lp/tradeshows',
              },
              {
                label: 'Certification',
                href: 'https://tigera.io/lp/calico-certification',
              },
              {
                label: 'Guides',
                href: 'https://tigera.io/learn/guides/kubernetes-monitoring',
              },
            ],
          },
          {
            title: 'Support',
            items: [
              {
                label: 'Customer success',
                href: 'https://tigera.io/customer-success',
              },
              {
                label: 'Support portal',
                href: 'http://tigera.force.com/community/s/login/'
              },
              {
                label: 'Security bulletins',
                href: 'https://tigera.io/security-bulletins',
              },
              {
                label: 'Report a security issue',
                href: 'https://tigera.io/vulnerability-disclosure',
              },
            ],
          },
          {
            title: 'Open source',
            items: [
              {
                label: 'Project Calico',
                href: 'https://tigera.io/project-calico',
              },
              {
                label: 'OSS events',
                href: 'https://www.tigera.io/project-calico/calico-open-source-events',
              },
              {
                label: 'Community',
                href: 'https://tigera.io/project-calico/community',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/project-calico',
              },
            ],
          },
          {
            title: 'Company',
            items: [
              {
                label: 'About',
                href: 'https://tigera.io/about',
              },
              {
                label: 'Customers',
                href: 'https://tigera.io/customer-stories',
              },
              {
                label: 'Partners',
                href: 'https://tigera.io/partners',
              },
              {
                label: 'Newsroom',
                href: 'https://tigera.io/media',
              },
              {
                label: 'Careers',
                href: 'https://tigera.io/careers',
              },
              {
                label: 'Contact',
                href: 'https://tigera.io/contact',
              },
            ],
          },
      ],
        // TODO: Add appropriate icons and links
        copyright: `
          <div>
            <div>Copyright © ${new Date().getFullYear()} Tigera, Inc.</div>
            <div>
              <a
                href="https://github.com/projectcalico"
                target="_blank" rel="noopener noreferrer"
                class="footer-social-icon github-icon"
                aria-label="GitHub repository"
              ></a>
              <a
                href="https://github.com/projectcalico"
                target="_blank" rel="noopener noreferrer"
                class="footer-social-icon github-icon"
                aria-label="GitHub repository"
              ></a>
              <a
                href="https://github.com/projectcalico"
                target="_blank" rel="noopener noreferrer"
                class="footer-social-icon github-icon"
                aria-label="GitHub repository"
              ></a>
              <a
                href="https://github.com/projectcalico"
                target="_blank" rel="noopener noreferrer"
                class="footer-social-icon github-icon"
                aria-label="GitHub repository"
              ></a>
              <a
                href="https://github.com/projectcalico"
                target="_blank" rel="noopener noreferrer"
                class="footer-social-icon github-icon"
                aria-label="GitHub repository"
              ></a>
            </div>
          </div>
        `,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ['powershell'],
      },
    }),
  plugins: [
    'docusaurus-plugin-sass',
    [
      '@docusaurus/plugin-content-docs',
      /** @type {import('@docusaurus/plugin-content-docs').Options} */
      {
        id: 'calico',
        path: 'calico',
        routeBasePath: 'calico',
        editCurrentVersion: true,
        sidebarPath: require.resolve('./sidebars-calico.js'),
        beforeDefaultRemarkPlugins: [variablesPlugin, componentImagePlugin],
        exclude: excludeContentDocsPatterns,
        editUrl: generateEditUrl,
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      /** @type {import('@docusaurus/plugin-content-docs').Options} */
      {
        id: 'calico-enterprise',
        path: 'calico-enterprise',
        routeBasePath: 'calico-enterprise',
        editCurrentVersion: true,
        sidebarPath: require.resolve('./sidebars-calico-enterprise.js'),
        beforeDefaultRemarkPlugins: [variablesPlugin, componentImagePlugin],
        exclude: excludeContentDocsPatterns,
        editUrl: generateEditUrl,
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      /** @type {import('@docusaurus/plugin-content-docs').Options} */
      {
        id: 'calico-cloud',
        path: 'calico-cloud',
        routeBasePath: 'calico-cloud',
        editCurrentVersion: true,
        sidebarPath: require.resolve('./sidebars-calico-cloud.js'),
        beforeDefaultRemarkPlugins: [variablesPlugin, componentImagePlugin],
        exclude: excludeContentDocsPatterns,
        editUrl: generateEditUrl,
      },
    ],
  ],
  customFields: {
    isTesting: process.env.TESTING || false,
  },
};

module.exports = config;

function generateEditUrl(params) {
  const { versionDocsDirPath, docPath } = params;

  // TODO: Change `alt-main` to `main` after the release
  const baseUrl = 'https://github.com/tigera/docs/edit/alt-main';
  const url = `${baseUrl}/${versionDocsDirPath}/${docPath}`;

  return url;
}
