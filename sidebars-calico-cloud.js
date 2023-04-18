module.exports = {
  calicoCloudSidebar: [
    'index',
    {
      type: 'category',
      label: 'Install and upgrade',
      link: {type: 'doc', id:'get-started/index'},
      items: [
        {
          type: 'category',
          label: 'Connect clusters to Calico Cloud',
          link: {type: 'doc', id:'get-started/connect/index'},
          items: [
            'get-started/connect/install-cluster',
            'get-started/connect/cc-arch-diagram',
            'get-started/connect/setup-private-registry',
          ],
        },
        {
          type: 'category',
          label: 'Requirements',
          link: {type: 'doc', id:'get-started/connect/requirements/index'},
          items: [
            'get-started/connect/requirements/system-requirements',
            'get-started/connect/requirements/aks',
            'get-started/connect/requirements/gke',
            'get-started/connect/requirements/rke',
            'get-started/connect/requirements/rke2',
          ],
        },
        'get-started/connect/connect-cluster',
        'get-started/connect/checklist',
        'get-started/connect/operator-checklist',

        'get-started/upgrade-cluster',
      ],
    },
    {
      type: 'category',
      label: 'Tutorials',
      link: {type: 'doc', id:'tutorials/index'},
      items: [
        {
          type: 'category',
          label: 'Calico Cloud features',
          link: {type: 'doc', id:'tutorials/calico-cloud-features/index'},
          items: [
            'tutorials/calico-cloud-features/tour',
            'tutorials/calico-cloud-features/service-graph',
            'tutorials/calico-cloud-features/networksets',
          ],
        },
        'tutorials/about-calico-enterprise',
        {
          type: 'category',
          label: 'Secure ingress and egress for applications',
          link: {type: 'doc', id:'tutorials/applications/index'},
          items: [
            'tutorials/applications/ingress-microservices',
            'tutorials/applications/egress-controls',
          ],
        },
        {
          type: 'category',
          label: 'Implement enterprise security controls',
          link: {type: 'doc', id:'tutorials/enterprise-security/index'},
          items: [
            'tutorials/enterprise-security/namespace-isolation',
            'tutorials/enterprise-security/global-egress',
            'tutorials/enterprise-security/default-deny',
            'tutorials/enterprise-security/platform',
          ],
        },
        {
          type: 'category',
          label: 'Kubernetes networking for beginners',
          link: {type: 'doc', id:'tutorials/training/index'},
          items: [
            'tutorials/training/about-network-policy',
            'tutorials/training/about-kubernetes-services',
            'tutorials/training/about-kubernetes-ingress',
            'tutorials/training/about-kubernetes-egress',
          ],
        },
        {
          type: 'category',
          label: 'Kubernetes tutorials and demos',
          link: {type: 'doc', id:'tutorials/kubernetes-tutorials/index'},
          items: [
            'tutorials/kubernetes-tutorials/kubernetes-demo',
            'tutorials/kubernetes-tutorials/kubernetes-network-policy',
            'tutorials/kubernetes-tutorials/kubernetes-policy-basic',
            'tutorials/kubernetes-tutorials/kubernetes-policy-advanced',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Network policy',
      link: {type: 'doc', id: 'network-policy/index'},
      items: [
        {
          type: 'category',
          label: 'Policy recommendations',
          link: {type: 'doc', id: 'network-policy/recommendations/index'},
          items: [
            'network-policy/recommendations/policy-recommendations',
            'network-policy/recommendations/denied-traffic-flows',
          ],
        },
        'network-policy/policy-best-practices',
        {
          type: 'category',
          label: 'Tiered network policy',
          link: {type: 'doc', id: 'network-policy/policy-tiers/index'},
          items: [
            'network-policy/policy-tiers/tiered-policy',
            'network-policy/policy-tiers/policy-tutorial-ui',
            'network-policy/policy-tiers/allow-tigera',
            'network-policy/policy-tiers/rbac-tiered-policies',
          ],
        },
        'network-policy/networksets',
        'network-policy/default-deny',
        'network-policy/staged-network-policies',
        'network-policy/policy-troubleshooting',
        {
          type: 'category',
          label: 'Calico Cloud network policy for beginners',
          link: {type: 'doc', id: 'network-policy/beginners/index'},
          items: [
            'network-policy/beginners/kubernetes-default-deny',
            'network-policy/beginners/calico-network-policy',
            'network-policy/beginners/simple-policy-cnx',
            {
              type: 'category',
              label: 'Policy rules',
              link: {type: 'doc', id: 'network-policy/beginners/policy-rules/index'},
              items: [
                'network-policy/beginners/policy-rules/policy-rules-overview',
                'network-policy/beginners/policy-rules/namespace-policy',
                'network-policy/beginners/policy-rules/service-accounts',
                'network-policy/beginners/policy-rules/service-policy',
                'network-policy/beginners/policy-rules/external-ips-policy',
                'network-policy/beginners/policy-rules/icmp-ping',
              ],
            },
            {
              type: 'category',
              label: 'Policy for services',
              link: {type: 'doc', id: 'network-policy/beginners/services/index'},
              items: [
                'network-policy/beginners/services/kubernetes-node-ports',
                'network-policy/beginners/services/services-cluster-ips',
              ],
            },
          ],
        },
        'network-policy/domain-based-policy',
        {
          type: 'category',
          label: 'Application layer policies',
          link: {type: 'doc', id: 'network-policy/application-layer-policies/index'},
          items: [
            'network-policy/application-layer-policies/alp',
            'network-policy/application-layer-policies/alp-tutorial',
          ],
        },
        {
          type: 'category',
          label: 'Policy for firewalls',
          link: {type: 'doc', id: 'network-policy/policy-firewalls/index'},
          items: [
            {
              type: 'category',
              label: 'Panorama firewall integrations',
              link: {type: 'doc', id: 'network-policy/policy-firewalls/panorama-integration/index'},
              items: [
                'network-policy/policy-firewalls/panorama-integration/tigera-panorama-policy-integration',
              ],
            },
            {
              "type": "category",
              "label": "Fortinet firewall integrations",
              "link": {
                "type": "doc",
                "id": "network-policy/policy-firewalls/fortinet-integration/index"
              },
              "items": [
                "network-policy/policy-firewalls/fortinet-integration/overview",
                "network-policy/policy-firewalls/fortinet-integration/firewall-integration",
                "network-policy/policy-firewalls/fortinet-integration/fortimgr-integration"
              ]
            },
            {
              "type": "category",
              "label": "AWS security groups integration",
              "link": {
                "type": "doc",
                "id": "network-policy/policy-firewalls/aws-integration/index"
              },
              "items": [
                "network-policy/policy-firewalls/aws-integration/get-started",
                "network-policy/policy-firewalls/aws-integration/aws-security-group-integration",
                "network-policy/policy-firewalls/aws-integration/tiers-and-policy",
                "network-policy/policy-firewalls/aws-integration/metadata-access"
              ],
            },
          ],
        },
        "network-policy/hosts/kubernetes-nodes",
        "network-policy/hosts/host-forwarded-traffic",
        {
          type: 'category',
          label: 'Policy for extreme traffic',
          link: {type: 'doc', id: 'network-policy/extreme-traffic/index'},
          items: [
            'network-policy/extreme-traffic/high-connection-workloads',
            'network-policy/extreme-traffic/defend-dos-attack',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Observability and troubleshooting',
      link: {type: 'doc', id: 'visibility/index'},
      items: [
        'visibility/alerts',
        'visibility/kibana',
        'visibility/packetcapture',
        'visibility/visualize-traffic',
        {
          type: 'category',
          label: 'Calico Cloud logs',
          link: {type: 'doc', id: 'visibility/elastic/index'},
          items: [
            'visibility/elastic/overview',
            'visibility/elastic/archive-storage',
            {
              type: 'category',
              label: 'Flow logs',
              link: {type: 'doc', id: 'visibility/elastic/flow/index'},
              items: [
                'visibility/elastic/flow/datatypes',
                'visibility/elastic/flow/filtering',
                'visibility/elastic/flow/aggregation',
                'visibility/elastic/flow/hep',
                'visibility/elastic/flow/tcpstats',
                'visibility/elastic/flow/processpath',
              ],
            },
            'visibility/elastic/audit-overview',
            {
              type: 'category',
              label: 'DNS logs',
              link: {type: 'doc', id: 'visibility/elastic/dns/index'},
              items: [
                'visibility/elastic/dns/dns-logs',
                'visibility/elastic/dns/filtering-dns',
              ],
            },
            'visibility/elastic/bgp',
            {
              type: 'category',
              label: 'L7 logs',
              link: {type: 'doc', id: 'visibility/elastic/l7/index'},
              items: [
                'visibility/elastic/l7/configure',
                'visibility/elastic/l7/datatypes',
              ],
            },
          ],
        },
        'visibility/kube-audit',
        'visibility/iptables',
      ],
    },
    {
      type: 'category',
      label: 'Threat defense',
      link: {type: 'doc', id: 'threat/index'},
      items: [
        'threat/security-anomalies',
        'threat/suspicious-ips',
        'threat/suspicious-domains',
        'threat/suspicious-external-ips',
        'threat/tor-vpn-feed-and-dashboard',
        {
          type: 'category',
          label: 'Honeypods',
          link: {type: 'doc', id: 'threat/honeypod/index'},
          items: [
            'threat/honeypod/honeypods',
            'threat/honeypod/honeypod-controller'
          ],
        },
        'threat/deeppacketinspection',
        'threat/container-threat-detection',
        'threat/web-application-firewall',
      ],
    },
    {
      type: 'category',
      label: 'Image Assurance',
      link: {type: 'doc', id: 'image-assurance/index'},
      items: [
        'image-assurance/scan-image-registries',
        'image-assurance/set-up-alerts',
        'image-assurance/install-the-admission-controller'
      ],
    },
    {
      type: 'category',
      label: 'Compliance and security',
      link: {type: 'doc', id: 'compliance/index'},
      items: [
        'compliance/overview',
        'compliance/compliance-reports-cis',
        'compliance/encrypt-cluster-pod-traffic',
      ],
    },
    {
      type: 'category',
      label: 'Networking',
      link: {type: 'doc', id: 'networking/index'},
      items: [
        {
          type: 'category',
          label: 'Networking basics',
          link: {type: 'doc', id: 'networking/training/index'},
          items: [
            'networking/training/about-networking',
            'networking/training/about-kubernetes-networking',
          ],
        },
        {
          type: 'category',
          label: 'Configure Calico Cloud networking',
          link: {type: 'doc', id: 'networking/configuring/index'},
          items: [
            'networking/configuring/bgp',
            'networking/configuring/dual-tor',
            'networking/configuring/multiple-networks',
            'networking/configuring/vxlan-ipip',
            'networking/configuring/advertise-service-ips',
            'networking/configuring/mtu',
            'networking/configuring/custom-bgp-config',
            'networking/configuring/workloads-outside-cluster',
            'networking/configuring/pod-mac-address',
          ],
        },
        {
          type: 'category',
          label: 'Egress gateways',
          link: {type: 'doc', id: 'networking/egress/index'},
          items: [
            'networking/egress/egress-gateway-on-prem',
            'networking/egress/egress-gateway-aws',
            'networking/egress/egress-gateway-azure',
            'networking/egress/egress-gateway-maintenance',
            'networking/egress/external-network',
            'networking/egress/troubleshoot',
          ],
        },
        {
          type: 'category',
          label: 'Customize IP address management',
          link: {type: 'doc', id: 'networking/ipam/index'},
          items: [
            'networking/ipam/get-started-ip-addresses',
            'networking/ipam/initial-ippool',
            'networking/ipam/ip-autodetection',
            'networking/ipam/ipv6',
            'networking/ipam/use-specific-ip',
            'networking/ipam/assign-ip-addresses-topology',
            'networking/ipam/migrate-pools',
            'networking/ipam/change-block-size',
            'networking/ipam/legacy-firewalls',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Multi-cluster management',
      link: {type: 'doc', id: 'multicluster/index'},
      items: [
        'multicluster/overview',
        'multicluster/kubeconfig',
        'multicluster/services-controller',
        'multicluster/aws',
      ],
    },
    {
      type: 'category',
      label: 'Operations',
      link: {type: 'doc', id: 'operations/index'},
      items: [
        'operations/cluster-management',
        'operations/disconnect',
        {
          type: 'category',
          label: 'Secure component communications',
          link: { type: 'doc', id: 'operations/comms/index' },
          items: [
            'operations/comms/secure-metrics',
            'operations/comms/secure-bgp',
          ],
        },
        {
          type: 'category',
          label: 'Monitoring',
          link: {type: 'doc', id: 'operations/monitor/index'},
          items: [
            {
              type: 'category',
              label: 'Prometheus',
              link: {type: 'doc', id: 'operations/monitor/prometheus/index'},
              items: [
                'operations/monitor/prometheus/support',
                'operations/monitor/prometheus/byo-prometheus',
                'operations/monitor/prometheus/configure-prometheus',
                'operations/monitor/prometheus/alertmanager',
              ],
            },
            {
              type: 'category',
              label: 'Metrics',
              link: {type: 'doc', id: 'operations/monitor/metrics/index'},
              items: [
                'operations/monitor/metrics/bgp-metrics',
                'operations/monitor/metrics/policy-metrics',
                'operations/monitor/metrics/elasticsearch-and-fluentd-metrics',
              ],
            },
          ],
        },
        {
          type: 'category',
          label: 'eBPF',
          link: {type: 'doc', id: 'operations/ebpf/index'},
          items: [
            'operations/ebpf/use-cases-ebpf',
            'operations/ebpf/enabling-ebpf',
            'operations/ebpf/troubleshoot-ebpf',
          ],
        },
        'operations/decommissioning-a-node',
        'operations/component-logs',
      ],
    },
    {
      type: 'category',
      label: 'Reference',
      link: {type: 'doc', id: 'reference/index'},
      items: [
        'reference/api',
        'reference/installation/api',
        'reference/installation/ia-api',
        'reference/anomaly-detection',
        {
          type: 'category',
          label: 'Resource definitions',
          link: {type: 'doc', id: 'reference/resources/index'},
          items: [
            'reference/resources/overview',
            'reference/resources/bgpconfig',
            'reference/resources/bgppeer',
            'reference/resources/bgpfilter',
            'reference/resources/blockaffinity',
            'reference/resources/caliconodestatus',
            'reference/resources/containeradmissionpolicy',
            {
              type: 'category',
              label: 'Compliance reports',
              link: {type: 'doc', id: 'reference/resources/compliance-reports/index'},
              items: [
                'reference/resources/compliance-reports/overview',
                'reference/resources/compliance-reports/inventory',
                'reference/resources/compliance-reports/network-access',
                'reference/resources/compliance-reports/policy-audit',
                'reference/resources/compliance-reports/cis-benchmark',
              ],
            },
            'reference/resources/deeppacketinspection',
            'reference/resources/felixconfig',
            'reference/resources/globalalert',
            'reference/resources/globalnetworkpolicy',
            'reference/resources/globalnetworkset',
            'reference/resources/globalreport',
            'reference/resources/globalthreatfeed',
            'reference/resources/hostendpoint',
            'reference/resources/ippool',
            'reference/resources/ipreservation',
            'reference/resources/ipamconfig',
            'reference/resources/licensekey',
            'reference/resources/kubecontrollersconfig',
            'reference/resources/managedcluster',
            'reference/resources/networkpolicy',
            'reference/resources/networkset',
            'reference/resources/node',
            'reference/resources/packetcapture',
            'reference/resources/remoteclusterconfiguration',
            'reference/resources/stagedglobalnetworkpolicy',
            'reference/resources/stagedkubernetesnetworkpolicy',
            'reference/resources/stagednetworkpolicy',
            'reference/resources/tier',
            'reference/resources/workloadendpoint',
          ],
        },
        {
          type: 'category',
          label: 'Architecture and network design',
          link: {type: 'doc', id: 'reference/architecture/index'},
          items: [
            'reference/architecture/data-path',
            {
              type: 'category',
              label: 'Network design',
              link: {type: 'doc', id: 'reference/architecture/design/index'},
              items: [
                'reference/architecture/design/l2-interconnect-fabric',
                'reference/architecture/design/l3-interconnect-fabric',
              ],
            },
          ],
        },
        {
          type: 'category',
          label: 'Component resources',
          link: {type: 'doc', id: 'reference/component-resources/index'},
          items: [
            'reference/component-resources/configuration',
            {
              type: 'category',
              label: 'Calico Cloud Kubernetes controllers',
              link: {type: 'doc', id: 'reference/component-resources/kube-controllers/index'},
              items: [
                'reference/component-resources/kube-controllers/configuration',
                'reference/component-resources/kube-controllers/prometheus',
              ],
            },
            {
              type: 'category',
              label: 'Calico Cloud node (cnx-node)',
              link: {type: 'doc', id: 'reference/component-resources/node/index'},
              items: [
                'reference/component-resources/node/configuration',
                {
                  type: 'category',
                  label: 'Felix',
                  link: {type: 'doc', id: 'reference/component-resources/node/felix/index'},
                  items: [
                    'reference/component-resources/node/felix/configuration',
                    'reference/component-resources/node/felix/prometheus',
                  ],
                },
              ],
            },
          ],
        },
        {
          type: 'category',
          label: 'Configuration on public clouds',
          link: {type: 'doc', id: 'reference/public-cloud/index'},
          items: [
            'reference/public-cloud/aws',
            'reference/public-cloud/azure',
            'reference/public-cloud/gce',
          ],
        },
        {
          type: 'category',
          label: 'Host endpoints',
          link: {type: 'doc', id: 'reference/host-endpoints/index'},
          items: [
            'reference/host-endpoints/overview',
            'reference/host-endpoints/connectivity',
            'reference/host-endpoints/objects',
            'reference/host-endpoints/selector',
            'reference/host-endpoints/failsafe',
            'reference/host-endpoints/pre-dnat',
            'reference/host-endpoints/forwarded',
            'reference/host-endpoints/summary',
            'reference/host-endpoints/conntrack',
          ],
        },
        'reference/attribution',
        'reference/rest-api-reference',
        'reference/faq',
      ],
    },
    'get-help/support',
    'release-notes/index',
  ],
};

