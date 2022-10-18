// NOTE: All directories in the content root MUST be accounted for.
// IF they're not, you'll get build errors that do not appear when you run yarn start.

const sidebars = {
  calicoSidebar: [
    //{type: 'ref', id: 'calico/about/about-calico'},
    {
      type: 'category',
      label: 'About',
      link: {
        type: 'doc',
        id: 'calico/about/index',
      },
      items: [
          'calico/about/about-calico',
          'calico/about/about-k8s-networking',
          'calico/about/about-network-policy',
          'calico/about/about-kubernetes-services',
          'calico/about/about-kubernetes-ingress',
          'calico/about/about-kubernetes-egress',
          'calico/about/about-ebpf',
      ],
    },
    {
      type: 'category',
      label: 'Install Calico',
      link: {
        type: 'doc',
        id: 'calico/getting-started/index',
      },
        items: [
          {
            type: 'category',
            label: 'Kubernetes',
            link: {type: 'doc', id: 'calico/getting-started/kubernetes/index'},
            items: [
                'calico/getting-started/kubernetes/quickstart',
              {
                type: 'category',
                label: 'Managed public cloud',
                link: {type: 'doc', id: 'calico/getting-started/kubernetes/managed-public-cloud/index'},
                items: [
                  'calico/getting-started/kubernetes/managed-public-cloud/eks',
                  'calico/getting-started/kubernetes/managed-public-cloud/gke',
                  'calico/getting-started/kubernetes/managed-public-cloud/iks',
                  'calico/getting-started/kubernetes/managed-public-cloud/aks',
                ],
              },
              {
                type: 'category',
                label: 'Self-managed public cloud',
                link: {type: 'doc', id: 'calico/getting-started/kubernetes/self-managed-public-cloud/index'},
                items: [
                  'calico/getting-started/kubernetes/self-managed-public-cloud/aws',
                  'calico/getting-started/kubernetes/self-managed-public-cloud/gce',
                  'calico/getting-started/kubernetes/self-managed-public-cloud/azure',
                  'calico/getting-started/kubernetes/self-managed-public-cloud/do',
                ],
              },
              {
                type: 'category',
                label: 'Self-managed on-premises',
                link: {type: 'doc', id: 'calico/getting-started/kubernetes/self-managed-onprem/index'},
                items: [
                  'calico/getting-started/kubernetes/self-managed-onprem/onpremises',
                  'calico/getting-started/kubernetes/self-managed-onprem/config-options',

                ],
              },
              {
                type: 'category',
                label: 'OpenShift',
                link: {type: 'doc', id: 'calico/getting-started/kubernetes/openshift/index'},
                items: [
                  'calico/getting-started/kubernetes/openshift/requirements',
                  'calico/getting-started/kubernetes/openshift/installation',
                ],
              },
                'calico/getting-started/kubernetes/rancher',
              {
                type: 'category',
                label: 'Flannel',
                link: {type: 'doc', id: 'calico/getting-started/kubernetes/flannel/index'},
                items: [
                    'calico/getting-started/kubernetes/flannel/install-for-flannel',
                    'calico/getting-started/kubernetes/flannel/migration-from-flannel',
                ],
              },
              {
                type: 'category',
                label: 'Calico for Windows',
                link: {type: 'doc', id: 'calico/getting-started/kubernetes/windows-calico/index'},
                items: [
                    'calico/getting-started/kubernetes/windows-calico/limitations',
                    'calico/getting-started/kubernetes/windows-calico/quickstart',
                    'calico/getting-started/kubernetes/windows-calico/demo',
                  {
                    type: 'category',
                    label: 'Kubernetes',
                    link: {type: 'doc', id: 'calico/getting-started/kubernetes/windows-calico/kubernetes/index'},
                    items: [
                        'calico/getting-started/kubernetes/windows-calico/kubernetes/requirements',
                        'calico/getting-started/kubernetes/windows-calico/kubernetes/standard',
                        'calico/getting-started/kubernetes/windows-calico/kubernetes/rancher',
                    ],
                  },
                    'calico/getting-started/kubernetes/windows-calico/openshift-installation',
                    'calico/getting-started/kubernetes/windows-calico/kubeconfig',
                    'calico/getting-started/kubernetes/windows-calico/maintain',
                    'calico/getting-started/kubernetes/windows-calico/troubleshoot',
                  {
                    type: 'autogenerated',
                    dirName: 'calico/getting-started/kubernetes/windows-calico',
                  },
                ],
              },
              {
                type: 'category',
                label: 'K3s',
                link: {type: 'doc', id: 'calico/getting-started/kubernetes/k3s/index'},
                items: [
                    'calico/getting-started/kubernetes/k3s/quickstart',
                    'calico/getting-started/kubernetes/k3s/multi-node-install',
                ],
              },
                'calico/getting-started/kubernetes/helm',
                'calico/getting-started/kubernetes/microk8s',
                'calico/getting-started/kubernetes/minikube',
              {
                type: 'category',
                label: 'Calico the hard way',
                link: {type: 'doc', id: 'calico/getting-started/kubernetes/hardway/index'},
                items: [
                  'calico/getting-started/kubernetes/hardway/overview',
                  'calico/getting-started/kubernetes/hardway/standing-up-kubernetes',
                  'calico/getting-started/kubernetes/hardway/the-calico-datastore',
                  'calico/getting-started/kubernetes/hardway/configure-ip-pools',
                  'calico/getting-started/kubernetes/hardway/install-cni-plugin',
                  'calico/getting-started/kubernetes/hardway/install-typha',
                  'calico/getting-started/kubernetes/hardway/install-node',
                  'calico/getting-started/kubernetes/hardway/configure-bgp-peering',
                  'calico/getting-started/kubernetes/hardway/test-networking',
                  'calico/getting-started/kubernetes/hardway/test-network-policy',
                  'calico/getting-started/kubernetes/hardway/end-user-rbac',
                  'calico/getting-started/kubernetes/hardway/istio-integration',
                ],
              },
                'calico/getting-started/kubernetes/requirements',
              {
                type: 'category',
                label: 'VPP dataplane',
                link: {type: 'doc', id: 'calico/getting-started/kubernetes/vpp/index'},
                items: [
                    'calico/getting-started/kubernetes/vpp/getting-started',
                    'calico/getting-started/kubernetes/vpp/ipsec',
                    'calico/getting-started/kubernetes/vpp/specifics',
                ],
              },
            ],
          },
          {
            type: 'category',
            label: 'OpenStack',
            link: {type: 'doc', id: 'calico/getting-started/openstack/index'},
            items: [
                'calico/getting-started/openstack/overview',
                'calico/getting-started/openstack/requirements',
              {
                type: 'category',
                label: 'Installation',
                link: {type: 'doc', id: 'calico/getting-started/openstack/installation/index'},
                items: [
                   'calico/getting-started/openstack/installation/overview',
                   'calico/getting-started/openstack/installation/ubuntu',
                   'calico/getting-started/openstack/installation/redhat',
                   'calico/getting-started/openstack/installation/devstack',
                   'calico/getting-started/openstack/installation/verification',
                ],
              },
            ],
          },
          {
            type: 'category',
            label: 'Non-cluster hosts',
            link: {type: 'doc', id: 'calico/getting-started/bare-metal/index'},
            items: [
                'calico/getting-started/bare-metal/about',
                'calico/getting-started/bare-metal/requirements',
              {
                type: 'category',
                label: 'Installation',
                link: {type: 'doc', id: 'calico/getting-started/bare-metal/installation/index'},
                items: [
                    'calico/getting-started/bare-metal/installation/container',
                    'calico/getting-started/bare-metal/installation/binary-mgr',
                    'calico/getting-started/bare-metal/installation/binary',
                ],
              },
            ],
          },
      ],
    },
    {
      type: 'category',
      label: 'Networking',
      link: {type: 'doc', id: 'calico/networking/index'},
      items: [
          'calico/networking/determine-best-networking',
        {
          type: 'category',
          label: 'Configure networking',
          link: {type: 'doc', id: 'calico/networking/configuring/index'},
          items: [
              'calico/networking/configuring/bgp',
              'calico/networking/configuring/vxlan-ipip',
              'calico/networking/configuring/advertise-service-ips',
              'calico/networking/configuring/mtu',
              'calico/networking/configuring/workloads-outside-cluster',
              'calico/networking/configuring/use-ipvs',
              'calico/networking/configuring/sidecar-acceleration',
              'calico/networking/configuring/pod-mac-address',
          ],
        },
        {
          type: 'category',
          label: 'Customize IP address management',
          link: {type: 'doc', id: 'calico/networking/ipam/index'},
          items: [
              'calico/networking/ipam/get-started-ip-addresses',
              'calico/networking/ipam/ip-autodetection',
              'calico/networking/ipam/ipv6',
              'calico/networking/ipam/ipv6-control-plane',
              'calico/networking/ipam/add-floating-ip',
              'calico/networking/ipam/use-specific-ip',
              'calico/networking/ipam/assign-ip-addresses-topology',
              'calico/networking/ipam/migrate-pools',
              'calico/networking/ipam/change-block-size',
              'calico/networking/ipam/legacy-firewalls',
          ],
        },
        {
          type: 'category',
          label: 'Calico networking for OpenStack',
          link: {type: 'doc', id: 'calico/networking/openstack/index'},
          items: [
              'calico/networking/openstack/dev-machine-setup',
              'calico/networking/openstack/ipv6',
              'calico/networking/openstack/connectivity',
              'calico/networking/openstack/labels',
              'calico/networking/openstack/configuration',
              'calico/networking/openstack/semantics',
              'calico/networking/openstack/floating-ips',
              'calico/networking/openstack/service-ips',
              'calico/networking/openstack/host-routes',
              'calico/networking/openstack/multiple-regions',
              'calico/networking/openstack/kuryr',
              'calico/networking/openstack/neutron-api',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Security',
      link: {type: 'doc', id: 'calico/security/index'},
      items: [
        'calico/security/adopt-zero-trust',
        'calico/security/non-privileged',
        {
          type: 'category',
          label: 'Get started with policy',
          link: {type: 'doc', id: 'calico/security/get-started/index'},
          items: [
            {
              type: 'category',
              label: 'Calico policy',
              link: {type: 'doc', id: 'calico/security/get-started/calico-policy/index'},
              items: [
                  'calico/security/get-started/calico-policy/calico-network-policy',
                  'calico/security/get-started/calico-policy/network-policy-openstack',
                  'calico/security/get-started/calico-policy/calico-policy-tutorial',
              ],
            },
            {
              type: 'category',
              label: 'Kubernetes policy',
              link: {type: 'doc', id: 'calico/security/get-started/kubernetes-policy/index'},
              items: [
                  'calico/security/get-started/kubernetes-policy/kubernetes-network-policy',
                  'calico/security/get-started/kubernetes-policy/kubernetes-demo',
                  'calico/security/get-started/kubernetes-policy/kubernetes-policy-basic',
                  'calico/security/get-started/kubernetes-policy/kubernetes-policy-advanced',
              ],
            },
              'calico/security/get-started/kubernetes-default-deny',
          ],
        },
        {
          type: 'category',
          label: 'Policy rules',
          link: {type: 'doc', id: 'calico/security/policy-rules/index'},
          items: [
              'calico/security/policy-rules/policy-rules-overview',
              'calico/security/policy-rules/namespace-policy',
              'calico/security/policy-rules/service-policy',
              'calico/security/policy-rules/service-accounts',
              'calico/security/policy-rules/external-ips-policy',
              'calico/security/policy-rules/icmp-ping',

          ],
        },
        {
          type: 'category',
          label: 'Policy for hosts',
          link: {type: 'doc', id: 'calico/security/hosts/index'},
          items: [
              'calico/security/hosts/protect-hosts',
              'calico/security/hosts/kubernetes-nodes',
              'calico/security/hosts/protect-hosts-tutorial',
              'calico/security/hosts/host-forwarded-traffic',
          ],
        },
        {
          type: 'category',
          label: 'Policy for services',
          link: {type: 'doc', id: 'calico/security/services/index'},
          items: [
              'calico/security/services/kubernetes-node-ports',
              'calico/security/services/services-cluster-ips',
          ],
        },
        {
          type: 'category',
          label: 'Policy for Istio',
          link: {type: 'doc', id: 'calico/security/istio/index'},
          items: [
              'calico/security/istio/enforce-policy-istio',
              'calico/security/istio/http-methods',
              'calico/security/istio/enforce-policy-istio',
          ],
        },
        {
          type: 'category',
          label: 'Policy for extreme traffic',
          link: {type: 'doc', id: 'calico/security/extreme-traffic/index'},
          items: [
              'calico/security/extreme-traffic/high-connection-workloads',
              'calico/security/extreme-traffic/defend-dos-attack',
          ],
        },
          'calico/security/encrypt-cluster-pod-traffic',
        {
          type: 'category',
          label: 'Secure Calico component communications',
          link: {type: 'doc', id: 'calico/security/comms/index'},
          items: [
              'calico/security/comms/crypto-auth',
              'calico/security/comms/reduce-nodes',
              'calico/security/comms/secure-metrics',
              'calico/security/comms/secure-bgp',
          ],
        },
      ],
    },

    {
      type: 'category',
      label: 'Operations',
      link: {type: 'doc', id: 'calico/maintenance/index'},
      items: [
        {
          type: 'category',
          label: 'Upgrade',
          link: {type: 'doc', id: 'calico/maintenance/upgrading/index'},
          items: [
              'calico/maintenance/upgrading/kubernetes-upgrade',
              'calico/maintenance/upgrading/openshift-upgrade',
              'calico/maintenance/upgrading/openstack-upgrade',
          ],
        },
        {
          type: 'category',
          label: 'calicoctl',
          link: {type: 'doc', id: 'calico/maintenance/calicoctl/index'},
          items: [
              'calico/maintenance/calicoctl/install',
            {
              type: 'category',
              label: 'Configure calicoctl',
              link: {type: 'doc', id: 'calico/maintenance/calicoctl/configure/index'},
              items: [
                  'calico/maintenance/calicoctl/configure/overview',
                  'calico/maintenance/calicoctl/configure/etcd',
                  'calico/maintenance/calicoctl/configure/kdd',
              ],
            },
          ],
        },
        {
          type: 'category',
          label: 'Deploy image options',
          link: {type: 'doc', id: 'calico/maintenance/image-options/index'},
          items: [
              'calico/maintenance/image-options/imageset',
              'calico/maintenance/image-options/alternate-registry',
          ],
        },
          'calico/maintenance/datastore-migration',
          'calico/maintenance/operator-migration',
          'calico/maintenance/install-apiserver',
        {
          type: 'category',
          label: 'eBPF',
          link: {type: 'doc', id: 'calico/maintenance/ebpf/index'},
          items: [
              'calico/maintenance/ebpf/use-cases-ebpf',
              'calico/maintenance/ebpf/enabling-ebpf',
              'calico/maintenance/ebpf/install',
              'calico/maintenance/ebpf/troubleshoot-ebpf',
          ],
        },
        {
          type: 'category',
          label: 'Monitor',
          link: {type: 'doc', id: 'calico/maintenance/monitor/index'},
          items: [
              'calico/maintenance/monitor/monitor-component-metrics',
              'calico/maintenance/monitor/monitor-component-visual',
          ],
        },
          'calico/maintenance/decommissioning-a-node',
        {
          type: 'category',
          label: 'Troubleshoot',
          link: {type: 'doc', id: 'calico/maintenance/troubleshoot/index'},
          items: [
              'calico/maintenance/troubleshoot/troubleshooting',
              'calico/maintenance/troubleshoot/commands',
              'calico/maintenance/troubleshoot/component-logs',
              //NOTE: Source doubled up on 'calico/maintenance/ebpf/troubleshoot-ebpf'. Removing from here.
              'calico/maintenance/troubleshoot/vpp',
          ],
        },
          'calico/maintenance/certificate-management',
      ],
    },
    {
      type: 'category',
      label: 'Reference',
      link: {type: 'doc', id: 'calico/reference/index'},
      items: [
          'calico/reference/api',
          {
              type: 'doc',
              id: 'calico/reference/installation/api',
              label: 'Installation API',
          },
          // TODO: 'Installation' category needs to be collapsed into single Operator API page
        {
          type: 'category',
          label: 'calicoctl',
          link: {type: 'doc', id: 'calico/reference/calicoctl/index'},
          items: [
              'calico/reference/calicoctl/overview',
              'calico/reference/calicoctl/create',
              'calico/reference/calicoctl/replace',
              'calico/reference/calicoctl/apply',
              'calico/reference/calicoctl/delete',
              'calico/reference/calicoctl/get',
              'calico/reference/calicoctl/patch',
              'calico/reference/calicoctl/label',
              'calico/reference/calicoctl/convert',
              {
                  type: 'category',
                  label: 'ipam',
                  link: {type: 'doc', id: 'calico/reference/calicoctl/ipam/index'},
                  items: [
                      'calico/reference/calicoctl/ipam/overview',
                      'calico/reference/calicoctl/ipam/check',
                      'calico/reference/calicoctl/ipam/release',
                      'calico/reference/calicoctl/ipam/show',
                      'calico/reference/calicoctl/ipam/configure',
                  ],
              },
              {
                  type: 'category',
                  label: 'node',
                  link: {type: 'doc', id: 'calico/reference/calicoctl/node/index'},
                  items: [
                      'calico/reference/calicoctl/node/overview',
                      'calico/reference/calicoctl/node/run',
                      'calico/reference/calicoctl/node/status',
                      'calico/reference/calicoctl/node/diags',
                      'calico/reference/calicoctl/node/checksystem',
                  ],
              },
              {
                  type: 'category',
                  label: 'datastore',
                  link: {type: 'doc', id: 'calico/reference/calicoctl/datastore/index'},
                  items: [
                      'calico/reference/calicoctl/datastore/overview',
                      {
                          type: 'category',
                          label: 'migrate',
                          link: {type: 'doc', id: 'calico/reference/calicoctl/datastore/migrate/index'},
                          items: [
                              'calico/reference/calicoctl/datastore/migrate/overview',
                              'calico/reference/calicoctl/datastore/migrate/export',
                              'calico/reference/calicoctl/datastore/migrate/import',
                              'calico/reference/calicoctl/datastore/migrate/lock',
                              'calico/reference/calicoctl/datastore/migrate/unlock',
                          ],
                      },
                  ],
              },
              'calico/reference/calicoctl/version',
          ],
        },
        {
          type: 'category',
          label: 'Resource definitions',
          link: {type: 'doc', id: 'calico/reference/resources/index'},
          items: [
              'calico/reference/resources/overview',
              'calico/reference/resources/bgpconfig',
              'calico/reference/resources/bgppeer',
              'calico/reference/resources/blockaffinity',
              'calico/reference/resources/caliconodestatus',
              'calico/reference/resources/felixconfig',
              'calico/reference/resources/globalnetworkpolicy',
              'calico/reference/resources/globalnetworkset',
              'calico/reference/resources/hostendpoint',
              'calico/reference/resources/ippool',
              'calico/reference/resources/ipreservation',
              'calico/reference/resources/ipamconfig',
              'calico/reference/resources/kubecontrollersconfig',
              'calico/reference/resources/networkpolicy',
              'calico/reference/resources/networkset',
              'calico/reference/resources/node',
              'calico/reference/resources/profile',
              'calico/reference/resources/workloadendpoint',
          ],
        },
        {
          type: 'category',
          label: 'Configuring etcd RBAC',
          link: {type: 'doc', id: 'calico/reference/etcd-rbac/index'},
          items: [
              'calico/reference/etcd-rbac/overview',
              'calico/reference/etcd-rbac/certificate-generation',
              'calico/reference/etcd-rbac/users-and-roles',
              'calico/reference/etcd-rbac/kubernetes',
              'calico/reference/etcd-rbac/kubernetes-advanced',
              'calico/reference/etcd-rbac/calico-etcdv3-paths',
          ],
        },
          'calico/reference/configure-calico-node',
        {
          type: 'category',
          label: 'Felix',
          link: {type: 'doc', id: 'calico/reference/felix/index'},
          items: [
              'calico/reference/felix/configuration',
              'calico/reference/felix/prometheus',
          ],
        },
        {
          type: 'category',
          label: 'Typha',
          link: {type: 'doc', id: 'calico/reference/typha/index'},
          items: [
              'calico/reference/typha/overview',
              'calico/reference/typha/configuration',
              'calico/reference/typha/prometheus',
          ],
        },
          'calico/reference/configure-cni-plugins',
        {
          type: 'category',
          label: 'Calico Kubernetes controllers',
          link: {type: 'doc', id: 'calico/reference/kube-controllers/index'},
          items: [
              'calico/reference/kube-controllers/configuration',
              'calico/reference/kube-controllers/prometheus',
          ],
        },
        {
          type: 'category',
          label: 'Configuration on public clouds',
          link: {type: 'doc', id: 'calico/reference/public-cloud/index'},
          items: [
              'calico/reference/public-cloud/aws',
              'calico/reference/public-cloud/azure',
              'calico/reference/public-cloud/gce',
              'calico/reference/public-cloud/ibm',
          ],
        },
        {
          type: 'category',
          label: 'Host endpoints',
          link: {type: 'doc', id: 'calico/reference/host-endpoints/index'},
          items: [
              'calico/reference/host-endpoints/overview',
              'calico/reference/host-endpoints/connectivity',
              'calico/reference/host-endpoints/objects',
              'calico/reference/host-endpoints/selector',
              'calico/reference/host-endpoints/failsafe',
              'calico/reference/host-endpoints/pre-dnat',
              'calico/reference/host-endpoints/forwarded',
              'calico/reference/host-endpoints/summary',
              'calico/reference/host-endpoints/conntrack',
          ],
        },
        {
          type: 'category',
          label: 'Architecture',
          link: {type: 'doc', id: 'calico/reference/architecture/index'},
          items: [
              'calico/reference/architecture/overview',
              'calico/reference/architecture/data-path',
            {
              type: 'category',
              label: 'Network design',
                link: {type: 'doc', id: 'calico/reference/architecture/design/index'},
                items: [
                    'calico/reference/architecture/design/l2-interconnect-fabric',
                    'calico/reference/architecture/design/l2-interconnect-fabric',
                ]
            },
          ],
        },
        {
          type: 'category',
          label: 'VPP dataplane',
          link: {type: 'doc', id: 'calico/reference/vpp/index'},
          items: [
              'calico/reference/vpp/uplink-configuration',
              'calico/reference/vpp/technical-details',
              'calico/reference/vpp/host-network',
          ],
        },
          'calico/reference/faq',
          'calico/reference/involved',
          {
              type: 'category',
              label: 'Attributions',
              link: {type: 'doc', id: 'calico/reference/legal/index'},
              items: [
                  'calico/reference/legal/alp',
                  'calico/reference/legal/calicoctl',
                  'calico/reference/legal/cni',
                  'calico/reference/legal/confd',
                  'calico/reference/legal/felix',
                  'calico/reference/legal/node',
                  'calico/reference/legal/typha',
              ]
          }
      ],
    },
    'calico/release-notes/index'
  ],

  calicoEnterpriseSidebar: [
      'calico-enterprise/about-calico-enterprise',
    {
      type: 'category',
      label: 'Install and upgrade',
      link: {
        type: 'generated-index',
        title: 'Install and upgrade',
        /*description: '', */
        slug: 'calico-enterprise/getting-started',
      },
      items: [
        {
          type: 'autogenerated',
          dirName: 'calico-enterprise/getting-started',
        },
      ],
    },
    {
      type: 'category',
      label: 'Networking',
      link: {
        type: 'generated-index',
        title: 'Networking',
        /*description: '', */
        slug: 'calico-enterprise/networking',
      },
      items: [
        {
          type: 'autogenerated',
          dirName: 'calico-enterprise/networking',
        },
      ],
    },
    {
      type: 'category',
      label: 'Network policy',
      link: {
        type: 'generated-index',
        title: 'Network policy',
        /*description: '', */
        slug: 'calico-enterprise/security',
      },
      items: [
        {
          type: 'autogenerated',
          dirName: 'calico-enterprise/security',
        },
      ],
    },

    {
      type: 'category',
      label: 'Visibility and troubleshooting',
      link: {
        type: 'generated-index',
        title: 'Visibility and troubleshooting',
        /*description: '', */
        slug: 'calico-enterprise/visibility',
      },
      items: [
        {
          type: 'autogenerated',
          dirName: 'calico-enterprise/visibility',
        },
      ],
    },
    {
      type: 'category',
      label: 'Multi-cluster management',
      link: {
        type: 'generated-index',
        title: 'Multi-cluster management',
        /*description: '', */
        slug: 'calico-enterprise/multicluster',
      },
      items: [
        {
          type: 'autogenerated',
          dirName: 'calico-enterprise/multicluster',
        },
      ],
    },
    {
      type: 'category',
      label: 'Threat defense',
      link: {
        type: 'generated-index',
        title: 'Threat defense',
        /*description: 'Learn about the most important Docusaurus concepts!',*/
        slug: '/calico-enterprise/threat',
      },
      items: [
        {
          type: 'autogenerated',
          dirName: 'calico-enterprise/threat',
        },
      ],
    },
    {
      type: 'category',
      label: 'Compliance and security',
      link: {
        type: 'generated-index',
        title: 'Compliance and security',
        /*description: '', */
        slug: 'calico-enterprise/compliance',
      },
      items: [
        {
          type: 'autogenerated',
          dirName: 'calico-enterprise/compliance',
        },
      ],
    },
    {
      type: 'category',
      label: 'Operations',
      link: {
        type: 'generated-index',
        title: 'Operations',
        /*description: '', */
        slug: 'calico-enterprise/operations',
      },
      items: [
        {
          type: 'autogenerated',
          dirName: 'calico-enterprise/maintenance',
        },
      ],
    },
    {
      type: 'category',
      label: 'Reference',
      link: {
        type: 'generated-index',
        title: 'Reference',
        /*description: '', */
        slug: 'calico-enterprise/reference',
      },
      items: [
        {
          type: 'autogenerated',
          dirName: 'calico-enterprise/reference',
        },
      ],
    },
    'calico-enterprise/release-notes/index'
  ],

  calicoCloudSidebar: [
      'calico-cloud/index',
    {
      type: 'category',
      label: 'Install and upgrade',
      link: {
        type: 'generated-index',
        title: 'Install and upgrade',
        /*description: '', */
        slug: 'calico-cloud/get-started',
      },
      items: [
        {
          type: 'autogenerated',
          dirName: 'calico-cloud/get-started'
        }
      ],
    },
    {
      type: 'category',
      label: 'Tutorials',
      link: {
        type: 'generated-index',
        title: 'Tutorials',
        /*description: '', */
        slug: 'calico-cloud/get-started/tutorials',
      },
      items: [
        {
          type: 'autogenerated',
          dirName: 'calico-cloud/get-started/tutorials',
        },
      ],
    },
    {
      type: 'category',
      label: 'Workload access controls',
      link: {
        type: 'generated-index',
        title: 'Workload access controls',
        /*description: '', */
        slug: 'calico-cloud/workload-access',
      },
      items: [
        {
          type: 'autogenerated',
          dirName: 'calico-cloud/workload-access',
        },
        {
          type: 'autogenerated',
          dirName: 'calico-cloud/security',
        },
      ],
    },
    {
      type: 'category',
      label: 'Observability and troubleshooting',
      link: {
        type: 'generated-index',
        title: 'Observability and troubleshooting',
        /*description: '', */
        slug: 'calico-cloud/visibility',
      },
      items: [
        {
          type: 'autogenerated',
          dirName: 'calico-cloud/visibility',
        },
      ],
    },
    {
      type: 'category',
      label: 'Threat',
      link: {
        type: 'generated-index',
        title: 'Threat',
        /*description: '', */
        slug: 'calico-cloud/threat',
      },
      items: [
        {
          type: 'autogenerated',
          dirName: 'calico-cloud/threat',
        },
      ],
    },
    {
      type: 'category',
      label: 'Image assurance',
      link: {
        type: 'generated-index',
        title: 'Image assurance',
        /*description: '', */
        slug: 'calico-cloud/image-assurance',
      },
      items: [
        {
          type: 'autogenerated',
          dirName: 'calico-cloud/image-assurance',
        },
      ],
    },
    {
      type: 'category',
      label: 'Compliance and security',
      link: {
        type: 'generated-index',
        title: 'Compliance and security',
        /*description: '', */
        slug: 'calico-cloud/compliance',
      },
      items: [
        {
          type: 'autogenerated',
          dirName: 'calico-cloud/compliance',
        },
      ],
    },
    {
      type: 'category',
      label: 'Networking',
      link: {
        type: 'generated-index',
        title: 'Networking',
        /*description: '', */
        slug: 'calico-cloud/networking',
      },
      items: [
        {
          type: 'autogenerated',
          dirName: 'calico-cloud/networking',
        },
      ],
    },
    {
      type: 'category',
      label: 'User and cluster management',
      link: {
        type: 'generated-index',
        title: 'User and cluster management',
        /*description: '', */
        slug: 'calico-cloud/operations',
      },
      items: [
        {
          type: 'autogenerated',
          dirName: 'calico-cloud/operations',
        },
      ],
    },
    {
      type: 'category',
      label: 'Reference',
      link: {
        type: 'generated-index',
        title: 'Reference',
        /*description: '', */
        slug: 'calico-cloud/reference',
      },
      items: [
        {
          type: 'autogenerated',
          dirName: 'calico-cloud/reference',
        },
      ],
    },
    {
      type: 'category',
      label: 'Get help',
      link: {
        type: 'generated-index',
        title: 'Get help',
        /*description: '', */
        slug: 'calico-cloud/get-help',
      },
      items: [
        {
          type: 'autogenerated',
          dirName: 'calico-cloud/get-help',
        },
      ],
    },
      'calico-cloud/release-notes/index',
  ],
};

module.exports = sidebars;
