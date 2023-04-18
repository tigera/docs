/* eslint-disable max-len */

export default {
  aboutInfo: [
    {
      title: 'Calico Open Source',
      link: '/calico/latest/about/',

      description: [
        'The base product that comprises both Calico Enterprise and Calico Cloud. It provides the core networking and network policy features.',
      ],
      linkDescription: 'Learn more about Calico Open Source',
      image: 'img/calicoOpenPI.png',
    },
    {
      title: 'Calico Enterprise',
      link: '/calico-enterprise/latest/about-calico-enterprise',

      description: [
        'Includes Calico Open Source core networking and network policy, but adds advanced features for networking, network policy, visibility and troubleshooting, threat defense, and compliance reports. ',
      ],
      linkDescription: 'Learn more about Enterprise',
      image: 'img/calicoEntreprisePI.png',
    },
    {
      title: 'Calico Cloud',

      link: 'calico-cloud',
      description: [
        'The SaaS version of Calico Enterprise. It adds Image Assurance to scan and detect vulnerabilities in images, and container threat defense to detect malware. It also adds onboarding tutorials, and eliminates the cost to manage Elasticsearch logs and storage that comes with Calico Enterprise.',
      ],
      linkDescription: 'Learn more about Calico Cloud',
      image: 'img/calicoCloudPI.png',
    },
  ],
  bestFit: [
    {
      title: 'Calico Open Source',
      costSupport: ['Free, self-managed'],
      target: 'Users',
      image: 'img/calico-logo.webp',

      bestFit: [' who want best-in-class networking and network policy capabilities.'],
    },
    {
      title: 'Calico Enterprise',
      costSupport: ['Paid, self-managed'],
      image: '/img/calico-cloud-logo.webp',

      target: 'Enterprise teams',

      bestFit: [
        ' who need full control to customize their networking security deployment to meet regulatory and',
        ' compliance requirements for Kubernetes at scale.',
        ' Teams who require Tigera Customer Support for best practices to get from day zero to production,',
        ' custom training and workshops, and Solution Architects to customize solutions.',
      ],
    },
    {
      title: 'Calico Cloud',
      costSupport: ['Pay-as-you-go, SaaS'],
      image: '/img/calico-enterprise-logo.webp',

      target: 'Small teams',
      bestFit: [
        ' who need to manage the full spectrum of compliance in a web-based console for novice users:',
        '- Secure clusters, pods, and applications',
        '- Scan images for vulnerabilities',
        '- Web-based UI for visibility to troubleshoot Kubernetes',
        '- Detect and mitigate threats',
        '- Run compliance reports',
      ],
      target2: 'Enterprise teams',
      bestFit2: [
        ' who want to scale their Calico Enterprise on-premises deployments by providing more self-service to developers.',
      ],
    },
  ],
};
