// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Calico & Tigera Docs',
  tagline: 'Active security for cloud-native applications',
  url: 'https://unified-docs.tigera.io',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.png',

  customFields: {
    // TODO: Migrate all variables
    variables: {
      cloud: {
        prodname: 'Calico Cloud',
      },
      enterprise: {
        prodname: 'Calico Enterprise',
      },
      openSource: {
        prodname: 'Calico Open Source',
      },
    },
  },

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  // organizationName: 'tigera', // Usually your GitHub org/username.
  // projectName: 'docs', // Usually your repo name.

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
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/tigera/docs/',
        },
        blog: false,
        // {
        //   showReadingTime: true,
        //   // Please change this to your repo.
        //   // Remove this to remove the "edit this page" links.
        //   editUrl:
        //     'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        // },
        theme: {
          customCss: [
            require.resolve('./src/css/custom.css'),
            require.resolve('./src/css/glyphicons.scss'),
            require.resolve('./src/css/external-links.scss'),
          ],
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'Calico & Tigera Docs',
        logo: {
          alt: 'Calico & Tigera Docs',
          src: 'img/logo.png',
        },
        items: [
          {
            label: 'Calico',
            type: 'doc',
            docId: 'intro',
            position: 'left',
          },
          {
            label: 'Calico Enterprise',
            type: 'doc',
            docId: 'intro',
            position: 'left',
          },
          {
            label: 'Calico Cloud',
            type: 'doc',
            docId: 'intro',
            position: 'left',
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
            label: 'GitHub',
            href: 'https://github.com/projectcalico',
            position: 'right',
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
                label: 'Intro',
                to: '/docs/intro',
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
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Tigera, Inc.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
  plugins: [
    'docusaurus-plugin-sass',
  ],
};

module.exports = config;
