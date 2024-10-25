// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

import { themes } from 'prism-react-renderer';
import variablesPlugin from './src/remark/variablesPlugin';

const lightCodeTheme = themes.github;
const darkCodeTheme = themes.dracula;

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Calico Documentation',
  tagline: 'Active, zero-trust based security for containers and Kubernetes',
  url: 'https://docs.tigera.io',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'throw',
  favicon: 'img/favicon.png',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  scripts: [
    {
      src: 'https://widget.kapa.ai/kapa-widget.bundle.js',
      'data-website-id': '578b0d26-ff67-42e3-b465-5839865a7471',
      'data-project-name': 'Calico',
      'data-project-color': '#F89C1D',
      'data-project-logo': 'https://www.tigera.io/app/uploads/2021/06/Tigera-orange.png',
      'data-modal-disclaimer':
        "The Calico Docs AI answers questions based on what it finds in our product documentation. As with all AI solutions, it's a good idea to verify answers in the source material. ",
      //"data-modal-example-questions": "Docs Calico use eBPF?,Get started with egress gateways",
      'data-modal-ask-ai-input-placeholder': 'Ask me a question about Calico',
      'data-font-family': 'Poppins,Helvetica Neue,Helvetica,Arial,sans-serif',
      'data-modal-border-radius': '6px',
      'data-button-box-shadow': '2px 2px 8px rgba(0, 0, 0, 0.2)',
      'data-modal-header-bg-color': '#FFFFFF',
      'data-user-analytics-fingerprint-enabled': 'true',
      async: true,
    },
  ],
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
        googleTagManager: {
          containerId: 'GTM-KCHDXB2',
        },
        blog: false,
        theme: {
          customCss: ['./src/css/custom.css', './src/css/external-links.scss', './src/css/modal.scss'],
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    {
      metadata: [
        {
          name: 'keywords',
          content:
            'kubernetes,k8s,kubernetes security,container security,kubernetes networking,kubernetes monitoring,cwpp,cnapp',
        },
      ],
      algolia: {
        appId: 'Q4GSZWRKBA',
        apiKey: '34ecd6611b6cef7a420bd30587d0d502',
        indexName: 'calico',
        contextualSearch: true,
        searchPagePath: '/search',
      },
      announcementBar: {
        id: 'KubeCon24',
        content:
          '🎉 Learn the latest trends in Kubernetes networking and security. Join us at CalicoCon 2024 on' +
          " November 12. <a href='https://link.tigera.io/uhuRC'><strong>Register now!</strong></a> :🎉",
        backgroundColor: '#FCE181',
        textColor: '#000',
        isCloseable: true,
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
            to: 'https://www.tigera.io/tutorials/',
            position: 'left',
          },
          {
            label: 'Certification',
            to: 'https://www.tigera.io/lp/calico-certification/',
          },
          {
            label: 'Try Calico Cloud',
            to: 'https://www.calicocloud.io/home',
            position: 'left',
          },
          {
            type: 'dropdown',
            label: 'Use cases',
            position: 'left',
            items: [
              {
                label: 'Microsegmentation',
                to: '/use-cases/microsegmentation',
              },
              {
                label: 'Observability',
                to: '/use-cases/observability',
              },
              {
                label: 'Egress access controls',
                to: '/use-cases/egress-access-controls',
              },
              {
                label: 'Egress gateways',
                to: '/use-cases/egress-gateways',
              },
              {
                label: 'Cluster mesh',
                to: '/use-cases/cluster-mesh',
              },
            ],
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
                to: 'https://www.tigera.io/events',
              },
              {
                label: 'Resource center',
                to: 'https://www.tigera.io/resources',
              },
              {
                label: 'Blog',
                to: 'https://www.tigera.io/blog',
              },
              {
                label: 'Trade shows',
                to: 'https://www.tigera.io/lp/tradeshows',
              },
              {
                label: 'Certification',
                to: 'https://www.tigera.io/lp/calico-certification',
              },
              {
                label: 'Guides',
                to: 'https://www.tigera.io/learn/guides/kubernetes-monitoring',
              },
            ],
          },
          {
            title: 'Support',
            items: [
              {
                label: 'Customer success',
                to: 'https://www.tigera.io/customer-success',
              },
              {
                label: 'Support portal',
                to: 'https://tigera.force.com/community/s/login/',
              },
              {
                label: 'Security bulletins',
                to: 'https://www.tigera.io/security-bulletins',
              },
              {
                label: 'Report a security issue',
                to: 'https://www.tigera.io/vulnerability-disclosure',
              },
            ],
          },
          {
            title: 'Open source',
            items: [
              {
                label: 'Project Calico',
                to: 'https://www.tigera.io/project-calico',
              },
              {
                label: 'Community',
                to: 'https://www.tigera.io/project-calico/community',
              },
              {
                label: 'GitHub',
                to: 'https://github.com/projectcalico',
              },
              {
                label: 'Stack Overflow',
                to: 'https://stackoverflow.com/questions/tagged/project-calico',
              },
              {
                label: 'Slack',
                to: 'https://calicousers.slack.com/',
              },
            ],
          },
          {
            title: 'Company',
            items: [
              {
                label: 'About',
                to: 'https://www.tigera.io/about',
              },
              {
                label: 'Customers',
                to: 'https://www.tigera.io/customer-stories',
              },
              {
                label: 'Partners',
                to: 'https://www.tigera.io/partners',
              },
              {
                label: 'Newsroom',
                to: 'https://www.tigera.io/media',
              },
              {
                label: 'Careers',
                to: 'https://www.tigera.io/careers',
              },
              {
                label: 'Contact',
                to: 'https://www.tigera.io/contact',
              },
            ],
          },
        ],
        // TODO: Add appropriate icons and links
        copyright: `
          <div>
          </br>
            <div class='footer-copyright__title'>Copyright © ${new Date().getFullYear()} Tigera, Inc.</div>
            <div class='footer-copyright__description'>Tigera is the creator and maintainer of Project Calico.</div>
            <a href="#" onClick="Clym.showWidget('', '', event);">Privacy Center</a> |
            <a href="#" onclick="Clym.showWidget('/requests/new/do_not_sell_my_information', '', event);">Do not sell or share my personal information</a>
            <div>
              <a
                href='https://www.linkedin.com/company/tigera/'
                target='_blank' rel='noopener noreferrer'
                class='footer-social-icon linkedin-icon'
                aria-label='Linkedin profile'
              ></a>
              <a
                href='https://twitter.com/tigeraio'
                target='_blank' rel='noopener noreferrer'
                class='footer-social-icon twitter-icon'
                aria-label='Twitter profile'
              ></a>
              <a
                href='https://www.youtube.com/channel/UC8uN3yhpeBeerGNwDiQbcgw'
                target='_blank' rel='noopener noreferrer'
                class='footer-social-icon youtube-icon'
                aria-label='YouTube channel'
              ></a>
              <a
                href='https://calicousers.slack.com/'
                target='_blank' rel='noopener noreferrer'
                class='footer-social-icon slack-icon'
                aria-label='Slack team'
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
        magicComments: [
          // Default highlight class name (should be specified)-
          {
            className: 'theme-code-block-highlighted-line',
            line: 'highlight-next-line',
            block: { start: 'highlight-start', end: 'highlight-end' },
          },
          {
            className: 'code-block-callout',
            line: 'callout-for-next-line',
          },
        ],
      },
    },
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
        onlyIncludeVersions: ['3.28','3.27','3.26'],
        lastVersion: '3.28',
        versions: {
          current: {
            label: 'Next',
            path: 'next',
            banner: 'unreleased',
          },
          3.29: {
            label: '3.29 (latest)',
            path: '3.29',
            banner: 'none',
          },
          3.28: {
            label: '3.28 (latest)',
            path: 'latest',
            banner: 'none'
          },
          3.27: {
            label: '3.27',
            path: '3.27',
            banner: 'none',
          },
          3.26: {
            label: '3.26',
            path: '3.26',
            banner: 'none',
          },
        },
        sidebarPath: require.resolve('./sidebars-calico.js'),
        beforeDefaultRemarkPlugins: [variablesPlugin],
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
        onlyIncludeVersions: ['3.20-1','3.19-2','3.18-2','3.17'],
        //lastVersion: '3.19-2',
        versions: {
          current: {
            label: 'Next',
            path: 'next',
            banner: 'unreleased',
          },
          '3.20-1': {
            label: '3.20 (early preview)',
            path: '3.20',
            banner: 'unreleased',
          },
          '3.19-2': {
            label: '3.19 (latest)',
            path: 'latest',
            banner: 'none',
          },
          '3.18-2': {
            label: '3.18',
            path: '3.18',
            banner: 'none',
          },
          3.17: {
            label: '3.17',
            path: '3.17',
            banner: 'none',
          },
        },
        sidebarPath: require.resolve('./sidebars-calico-enterprise.js'),
        beforeDefaultRemarkPlugins: [variablesPlugin],
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
        //To see builds for unreleased versions, remove comments in the next line.
        onlyIncludeVersions: ['20-1'],
        versions: {
          current: {
            label: 'Next',
            path: 'next',
            banner: 'unreleased',
          },
          '20-1': {
            path: '/',
            banner: 'none',
          },
        },
        sidebarPath: './sidebars-calico-cloud.js',
        beforeDefaultRemarkPlugins: [variablesPlugin],
        editUrl: generateEditUrl,
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      /** @type {import('@docusaurus/plugin-content-docs').Options} */
      {
        id: 'use-cases',
        path: 'use-cases',
        routeBasePath: 'use-cases',
        editCurrentVersion: true,
        onlyIncludeVersions: ['current'],
        versions: {
          current:{
            path: '/',
          },
        },
        //To see builds for unreleased versions, remove comments in the next line.
        sidebarPath: require.resolve('./sidebars-use-cases.js'),
        editUrl: generateEditUrl,
      },
    ],
  ],
  customFields: {
    isTesting: process.env.TESTING || false,
  },
};

export default config;

function generateEditUrl(params) {
  const { versionDocsDirPath, docPath } = params;

  const baseUrl = 'https://github.com/tigera/docs/edit/main';
  const url = `${baseUrl}/${versionDocsDirPath}/${docPath}`;

  return url;
}
