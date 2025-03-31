/* eslint-disable max-len */

export default {
  entries: [
    {
      title: 'Networking',
      content: [
        {
          rowHeader: 'High-performance, scalable pod networking',
          CalicoOpenSource: 'Y',
          CalicoEnterprise: 'Y',
          CalicoCloud: 'Y',
        },
        {
          rowHeader: 'Advanced IP address management',
          CalicoOpenSource: 'Y',
          CalicoEnterprise: 'Y',
          CalicoCloud: 'Y',
        },
        {
          rowHeader: 'Direct infrastructure peering without the overlay',
          CalicoOpenSource: 'Y',
          CalicoEnterprise: 'Y',
          CalicoCloud: 'Y',
        },
        {
          rowHeader: 'Dual ToR peering',
          CalicoOpenSource: '',
          CalicoEnterprise: 'Y',
          CalicoCloud: 'Y',
        },
        {
          rowHeader: 'Egress gateway',
          CalicoOpenSource: 'N',
          CalicoEnterprise: 'Y',
          CalicoCloud: 'Y',
        },
        {
          rowHeader: 'Multiple Calico networks on a pod',
          CalicoOpenSource: '',
          CalicoEnterprise: 'Y',
          CalicoCloud: 'Y',
        },
      ],
    },
    {
      title: 'Apps, pods, clusters',
      content: [
        {
          rowHeader: 'Seamless support with Kubernetes network policy',
          CalicoOpenSource: 'Y',
          CalicoEnterprise: 'Y',
          CalicoCloud: 'Y',
        },
        {
          rowHeader: 'Label-based (identity-aware) policy',
          CalicoOpenSource: 'Y',
          CalicoEnterprise: 'Y',
          CalicoCloud: 'Y',
        },
        {
          rowHeader: 'Namespace and cluster-wide scope ',
          CalicoOpenSource: 'Y',
          CalicoEnterprise: 'Y',
          CalicoCloud: 'Y',
        },
        {
          rowHeader: 'Global default deny policy design ',
          CalicoOpenSource: 'Y',
          CalicoEnterprise: 'Y',
          CalicoCloud: 'Y',
        },
        {
          rowHeader: 'Application layer policy',
          CalicoOpenSource: 'Y',
          CalicoEnterprise: 'Y',
          CalicoCloud: 'Y',
        },
        {
          rowHeader: 'Policy for services',
          CalicoOpenSource: 'Y',
          CalicoEnterprise: 'Y',
          CalicoCloud: 'Y',
        },
        {
          rowHeader: 'Web UI',
          CalicoOpenSource: '',
          CalicoEnterprise: 'Y',
          CalicoCloud: 'Y',
        },
        {
          rowHeader: 'Onboarding tutorials and lab cluster',
          CalicoOpenSource: '',
          CalicoEnterprise: '',
          CalicoCloud: 'Y',
        },
        {
          rowHeader: 'DNS/FQDN-based policy',
          CalicoOpenSource: '',
          CalicoEnterprise: 'Y',
          CalicoCloud: 'Y',
        },
        {
          rowHeader: 'Hierarchical tiered network policy',
          CalicoOpenSource: '',
          CalicoEnterprise: 'Y',
          CalicoCloud: 'Y',
        },
        {
          rowHeader: 'Policy recommendations',
          CalicoOpenSource: '',
          CalicoEnterprise: 'Y',
          CalicoCloud: 'Y',
        },
        {
          rowHeader: 'Preview and staged network policy',
          CalicoOpenSource: '',
          CalicoEnterprise: 'Y',
          CalicoCloud: 'Y',
        },
        {
          rowHeader: 'Policy integration for third-party firewalls',
          CalicoOpenSource: '',
          CalicoEnterprise: 'Y',
          CalicoCloud: 'Y',
        },
        {
          rowHeader: 'Network sets to limit IP ranges for egress and ingress traffic to workloads',
          CalicoOpenSource: 'Y',
          CalicoEnterprise: 'Y',
          CalicoCloud: 'Y',
        },
      ],
    },
    {
      title: 'Data',
      content: [
        {
          rowHeader: 'Data-in-transit encryption for pod traffic using WireGuard',
          CalicoOpenSource: 'Y',
          CalicoEnterprise: 'Y',
          CalicoCloud: 'Y',
        },
        {
          rowHeader: 'SIEM integration',
          CalicoOpenSource: '',
          CalicoEnterprise: 'Y',
          CalicoCloud: 'Y',
        },
      ],
    },
    {
      title: 'Non-cluster hosts',
      content: [
        {
          rowHeader: 'Restrict traffic to/from hosts using network policy',
          CalicoOpenSource: 'Y',
          CalicoEnterprise: 'Y',
          CalicoCloud: 'N',
        },
        {
          rowHeader: 'Automatic host endpoints',
          CalicoOpenSource: 'Y',
          CalicoEnterprise: 'Y',
          CalicoCloud: 'N',
        },
        {
          rowHeader: 'Secure Kubernetes nodes with host endpoints managed by Calico',
          CalicoOpenSource: 'Y',
          CalicoEnterprise: 'Y',
          CalicoCloud: 'Y',
        },
        {
          rowHeader: 'Apply policy to host-forwarded traffic ',
          CalicoOpenSource: 'Y',
          CalicoEnterprise: 'Y',
          CalicoCloud: 'Y',
        },
      ],
    },
    {
      title: 'Dataplane',
      content: [
        {
          rowHeader: 'eBPF',
          CalicoOpenSource: 'Y',
          CalicoEnterprise: 'Y',
          CalicoCloud: 'Y',
        },
        {
          rowHeader: 'iptables',
          CalicoOpenSource: 'Y',
          CalicoEnterprise: 'Y',
          CalicoCloud: 'Y',
        },
        {
          rowHeader: 'Windows HNS',
          CalicoOpenSource: 'Y',
          CalicoEnterprise: 'Y',
          CalicoCloud: 'Y',
        },
        {
          rowHeader: 'VPP',
          CalicoOpenSource: 'Y',
          CalicoEnterprise: '',
          CalicoCloud: '',
        },
      ],
    },
    {
      title: 'Observability and troubleshooting',
      content: [
        {
          rowHeader: 'Application-level observability and troubleshooting',
          CalicoOpenSource: '',
          CalicoEnterprise: 'Y',
          CalicoCloud: 'Y',
        },
        {
          rowHeader: 'Service Graph',
          CalicoOpenSource: '',
          CalicoEnterprise: 'Y',
          CalicoCloud: 'Y',
        },
        {
          rowHeader: 'Elasticsearch  logs (flow, l7, audit, bgp, dns, events)',
          CalicoOpenSource: '',
          CalicoEnterprise: 'Y',
          CalicoCloud: 'Y',
        },
        {
          rowHeader: 'Alerts',
          CalicoOpenSource: '',
          CalicoEnterprise: 'Y',
          CalicoCloud: 'Y',
        },
        {
          rowHeader: 'Kibana DNS dashboards',
          CalicoOpenSource: '',
          CalicoEnterprise: 'Y',
          CalicoCloud: 'Y',
        },
        {
          rowHeader: 'Traffic Flow Visualizer',
          CalicoOpenSource: '',
          CalicoEnterprise: 'Y',
          CalicoCloud: 'Y',
        },
      ],
    },
    {
      title: 'Multi-cluster management',
      content: [
        {
          rowHeader: 'Federated identity and services',
          CalicoOpenSource: '',
          CalicoEnterprise: 'Y',
          CalicoCloud: 'Y',
        },
      ],
    },
    {
      title: 'Threat defense',
      content: [
        {
          rowHeader: 'Workload-centric Web Application Firewall (WAF)',
          CalicoOpenSource: '',
          CalicoEnterprise: 'Y',
          CalicoCloud: 'Y',
        },
        {
          rowHeader: 'Add threatfeeds to trace suspicious network flows',
          CalicoOpenSource: '',
          CalicoEnterprise: 'Y',
          CalicoCloud: 'Y',
        },
      ],
    },
    {
      title: 'Reports',
      content: [
        {
          rowHeader: 'CIS benchmark reports',
          CalicoOpenSource: '',
          CalicoEnterprise: 'Y',
          CalicoCloud: 'Y',
        },
      ],
    },
    {
      title: 'Monitor Calico components',
      content: [
        {
          rowHeader: 'Prometheus',
          CalicoOpenSource: 'Y',
          CalicoEnterprise: 'Y',
          CalicoCloud: 'Y',
        },
      ],
    },
  ],
};
