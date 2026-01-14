/* eslint-disable max-len */

export default {
  aboutInfo: [
    {
      title: 'Calico Open Source',
      link: '/calico/latest/about/',

      description: [
        'A free, self-managed networking and security solution for containers, virtual machines, and native host-based workloads.',
        'Provides networking, network policy, and IP address management capabilities for cloud-native applications.',
      ],
      linkDescription: 'Go to docs',
      image: 'img/calico-open-source.svg',
      alt: 'Calico Open Source documentation',
    },
    {
      title: 'Calico Enterprise',
      link: '/calico-enterprise/latest/about/',

      description: [
        'A paid, self-managed security and observability solution for containers and Kubernetes.',
        'Extends Calico Open Source’s networking and network security capabilities to offer more advanced security and observability capabilities for organizations running Kubernetes at scale.',
      ],
      linkDescription: 'Go to docs',
      image: 'img/calico-enterprise.drawio.svg',
      alt: 'Calico Enterprise documentation',
    },
    {
      title: 'Calico Cloud',

      link: 'calico-cloud/about',
      description: [
        'A pay-as-you-go, SaaS application that provides comprehensive container security across the entire container lifecycle (build, deploy, runtime).',
        'A fully-managed version of Calico Enterprise that adds container image scanning and advanced threat detection capabilities.',
      ],
      linkDescription: 'Go to docs',
      image: 'img/calico-cloud-features.svg',
      alt: 'Calico Cloud documentation',
    },
  ],
  bestFit: [
    {
      title: 'Calico Open Source',
      costSupport: ['Free, self-managed'],
      target: 'Users',
      image: 'img/Calico-logo-2026-badge.svg',
      alt: 'Calico Open Source logo',

      bestFit: [' - Who want best-in-class networking and network policy capabilities.'],
    },
    {
      title: 'Calico Enterprise',
      costSupport: ['Paid, self-managed'],
      image: '/img/Calico-logo-2026-badge.svg',
      alt: 'Calico Enterprise logo',

      target: 'Enterprise teams',

      bestFit: [
        ' - Who need full control to customize their networking security deployment to meet regulatory and',
        ' compliance requirements for Kubernetes at scale.',
        ' - Who want Tigera Customer Support for day-zero to production best practices',
        ' custom training and workshops, and Solution Architects to customize solutions.',
      ],
    },
    {
      title: 'Calico Cloud',
      costSupport: ['Pay-as-you-go, SaaS'],
      image: '/img/Calico-logo-2026-badge.svg',
      alt: 'Calico Cloud logo',

      target: 'Small teams',
      bestFit: [' - Who need to manage the full spectrum of compliance in a web-based console for novice users:'],
      bestFitSub: [
        ' - Secure clusters, pods, and applications',
        ' - Scan images for vulnerabilities',
        ' - Web-based UI for visibility to troubleshoot Kubernetes',
        ' - Detect and mitigate threats',
        ' - Run compliance reports',
      ],
      target2: 'Enterprise teams',
      bestFit2: [
        ' - Who want to scale their Calico Enterprise on-premises deployments by providing more self-service to developers.',
      ],
    },
  ],
};
