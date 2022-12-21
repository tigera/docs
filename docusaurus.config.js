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
  tagline: 'Active security, networking, and observability for cloud-native applications',
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
                label: 'Calico Cloud',
                type: 'docSidebar',
                sidebarId: 'calicoCloudSidebar',
                docsPluginId: 'calico-cloud',
                className: 'navbar-product-link_calico-cloud',
              },
              {
                label: 'Calico Enterprise',
                type: 'docSidebar',
                sidebarId: 'calicoEnterpriseSidebar',
                docsPluginId: 'calico-enterprise',
                className: 'navbar-product-link_calico-enterprise',
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
            // TODO: Marketing is building a page at /tutorials. Using self-paced-workshops as placeholder.
            href: 'https://www.tigera.io/self-paced-workshops/',
            position: 'left',
          },
          {
            label: 'Certification',
            href: 'https://www.tigera.io/lp/calico-certification/',
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
                href: 'https://www.tigera.io/events',
              },
              {
                label: 'Resource center',
                href: 'https://www.tigera.io/resources',
              },
              {
                label: 'Blog',
                href: 'https://www.tigera.io/blog',
              },
              {
                label: 'Trade shows',
                href: 'https://www.tigera.io/lp/tradeshows',
              },
              {
                label: 'Certification',
                href: 'https://www.tigera.io/lp/calico-certification',
              },
              {
                label: 'Guides',
                href: 'https://www.tigera.io/learn/guides/kubernetes-monitoring',
              },
            ],
          },
          {
            title: 'Support',
            items: [
              {
                label: 'Customer success',
                href: 'https://www.tigera.io/customer-success',
              },
              {
                label: 'Support portal',
                href: 'http://www.tigera.force.com/community/s/login/',
              },
              {
                label: 'Security bulletins',
                href: 'https://www.tigera.io/security-bulletins',
              },
              {
                label: 'Report a security issue',
                href: 'https://www.tigera.io/vulnerability-disclosure',
              },
            ],
          },
          {
            title: 'Open source',
            items: [
              {
                label: 'Project Calico',
                href: 'https://www.tigera.io/project-calico',
              },
              {
                label: 'Community',
                href: 'https://www.tigera.io/project-calico/community',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/project-calico',
              },
              {
                label: 'Stack Overflow',
                href: 'https://stackoverflow.com/questions/tagged/project-calico',
              },
              {
                label: 'Slack',
                href: 'https://slack.projectcalico.org/',
              },
            ],
          },
          {
            title: 'Company',
            items: [
              {
                label: 'About',
                href: 'https://www.tigera.io/about',
              },
              {
                label: 'Customers',
                href: 'https://www.tigera.io/customer-stories',
              },
              {
                label: 'Partners',
                href: 'https://www.tigera.io/partners',
              },
              {
                label: 'Newsroom',
                href: 'https://www.tigera.io/media',
              },
              {
                label: 'Careers',
                href: 'https://www.tigera.io/careers',
              },
              {
                label: 'Contact',
                href: 'https://www.tigera.io/contact',
              },
            ],
          },
        ],
        // TODO: Add appropriate icons and links
        copyright: `
          <div>
            <div>Copyright © ${new Date().getFullYear()} Tigera, Inc.</div>
            <div>Tigera is the creator and maintainer of Project Calico.</div>
            <div>
              <a
                href="https://www.linkedin.com/company/tigera/"
                target="_blank" rel="noopener noreferrer"
                class="footer-social-icon linkedin-icon"
                aria-label="Linkedin profile"
              ></a>
              <a
                href="https://twitter.com/tigeraio"
                target="_blank" rel="noopener noreferrer"
                class="footer-social-icon twitter-icon"
                aria-label="Twitter profile"
              ></a>
              <a
                href="https://www.youtube.com/channel/UC8uN3yhpeBeerGNwDiQbcgw"
                target="_blank" rel="noopener noreferrer"
                class="footer-social-icon youtube-icon"
                aria-label="YouTube channel"
              ></a>
              <a
                href="https://calicousers.slack.com/"
                target="_blank" rel="noopener noreferrer"
                class="footer-social-icon slack-icon"
                aria-label="Slack team"
              ></a>
            </div>
          </div>
        `,
      },
      docs: {
        sidebar: {
          autoCollapseCategories: true,
        },
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
