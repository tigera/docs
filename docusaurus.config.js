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
            label: 'Calico Open Source',
            type: 'docSidebar',
            sidebarId: 'calicoSidebar',
            docsPluginId: 'calico',
            position: 'left',
            className: 'navbar-product-link_calico',
          },
          {
            label: 'Calico Enterprise',
            type: 'docSidebar',
            sidebarId: 'calicoEnterpriseSidebar',
            docsPluginId: 'calico-enterprise',
            position: 'left',
            className: 'navbar-product-link_calico-enterprise',
          },
          {
            label: 'Calico Cloud',
            type: 'docSidebar',
            sidebarId: 'calicoCloudSidebar',
            docsPluginId: 'calico-cloud',
            position: 'left',
            className: 'navbar-product-link_calico-cloud',
          },
          {
            type: 'docsVersionDropdown',
            position: 'right',
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
            label: 'Tigera',
            href: 'https://tigera.io',
            position: 'right',
          },
          {
            label: 'Blog',
            href: 'https://tigera.io/blog',
            position: 'right',
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
            title: 'Docs',
            items: [
              {
                label: 'Calico Open Source',
                to: '/calico/about',
              },
              {
                label: 'Calico Enterprise',
                to: '/calico-enterprise/about-calico-enterprise',
              },
              {
                label: 'Calico Cloud',
                to: '/calico-cloud/',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Slack',
                href: 'https://slack.projectcalico.org/',
              },
              {
                label: 'Tigera Twitter',
                href: 'https://twitter.com/tigeraio',
              },
              {
                label: 'Calico Twitter',
                href: 'https://twitter.com/projectcalico',
              },
              {
                label: 'Stack Overflow',
                href: 'https://stackoverflow.com/questions/tagged/project-calico',
              },
              {
                label: 'Discourse',
                href: 'https://discuss.projectcalico.org/',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Tigera Blog',
                href: 'https://tigera.io/blog',
              },
              {
                label: 'Calico GitHub',
                href: 'https://github.com/projectcalico',
              },
              {
                label: 'Docs GitHub',
                href: 'https://github.com/tigera/docs',
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
