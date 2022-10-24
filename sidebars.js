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
                ],
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
      link: {type: 'doc', id:'calico-enterprise/getting-started/index'},
      items: [
        'calico-enterprise/getting-started/compatibility',
        {
          type: 'category',
          label: 'Install on cluters',
          link: {type: 'doc', id:'calico-enterprise/getting-started/install-on-clusters/index'},
          items: [
            {
              type: 'category',
              label: 'Kubernetes',
              link: {type: 'doc', id:'calico-enterprise/getting-started/install-on-clusters/kubernetes/index'},
              items: [
                'calico-enterprise/getting-started/install-on-clusters/kubernetes/quickstart',
                'calico-enterprise/getting-started/install-on-clusters/kubernetes/options-install',
                'calico-enterprise/getting-started/install-on-clusters/kubernetes/generic-install',
                'calico-enterprise/getting-started/install-on-clusters/kubernetes/helm',
              ],
            },
            {
              type: 'category',
              label: 'OpenShift',
              link: {type: 'doc', id:'calico-enterprise/getting-started/install-on-clusters/openshift/index'},
              items: [
                'calico-enterprise/getting-started/install-on-clusters/openshift/requirements',
                'calico-enterprise/getting-started/install-on-clusters/openshift/installation',
              ],
            },
            'calico-enterprise/getting-started/install-on-clusters/aks',
            'calico-enterprise/getting-started/install-on-clusters/eks',
            'calico-enterprise/getting-started/install-on-clusters/gke',
            'calico-enterprise/getting-started/install-on-clusters/aws',
            'calico-enterprise/getting-started/install-on-clusters/docker-enterprise',
            'calico-enterprise/getting-started/install-on-clusters/rancher',
            'calico-enterprise/getting-started/install-on-clusters/rke2',
            'calico-enterprise/getting-started/install-on-clusters/tkg',
            {
              type: 'category',
              label: 'Calico Enterprise for Windows',
              link: {type: 'doc', id:'calico-enterprise/getting-started/install-on-clusters/windows-calico/index'},
              items: [
                'calico-enterprise/getting-started/install-on-clusters/windows-calico/limitations',
                'calico-enterprise/getting-started/install-on-clusters/windows-calico/quickstart',
                'calico-enterprise/getting-started/install-on-clusters/windows-calico/demo',
                {
                  type: 'category',
                  label: 'Kubernetes',
                  link: {type: 'doc', id:'calico-enterprise/getting-started/install-on-clusters/windows-calico/kubernetes/index'},
                  items: [
                    'calico-enterprise/getting-started/install-on-clusters/windows-calico/kubernetes/requirements',
                    'calico-enterprise/getting-started/install-on-clusters/windows-calico/kubernetes/standard',
                    'calico-enterprise/getting-started/install-on-clusters/windows-calico/kubernetes/rancher',
                  ],
                },
                'calico-enterprise/getting-started/install-on-clusters/windows-calico/openshift-installation',
                'calico-enterprise/getting-started/install-on-clusters/windows-calico/flowlogs',
                'calico-enterprise/getting-started/install-on-clusters/windows-calico/dnspolicy',
                'calico-enterprise/getting-started/install-on-clusters/windows-calico/kubeconfig',
                'calico-enterprise/getting-started/install-on-clusters/windows-calico/maintain',
                'calico-enterprise/getting-started/install-on-clusters/windows-calico/troubleshoot',
              ],
            },
            {
              type: 'category',
              label: 'Install from a private registry',
              link: {type: 'doc', id:'calico-enterprise/getting-started/install-on-clusters/private-registry/index'},
              items: [
                'calico-enterprise/getting-started/install-on-clusters/private-registry/private-registry-regular',
                'calico-enterprise/getting-started/install-on-clusters/private-registry/private-registry-image-path',
                // TODO: Remove the following page once we've sorted it out.
                'calico-enterprise/getting-started/install-on-clusters/private-registry/private-registry-archive',
              ],
            },
            'calico-enterprise/getting-started/install-on-clusters/calico-enterprise',
            'calico-enterprise/getting-started/install-on-clusters/requirements',
          ],
        },
        {
          type: 'category',
          label: 'Install on non-cluster hosts',
          link: {type: 'doc', id:'calico-enterprise/getting-started/bare-metal/index'},
          items: [
            'calico-enterprise/getting-started/bare-metal/about',
            'calico-enterprise/getting-started/bare-metal/requirements',
          ],
        },
        {
          type: 'category',
          label: 'Upgrade',
          link: {type: 'doc', id:'calico-enterprise/getting-started/upgrading/index'},
          items: [
            {
              type: 'category',
              label: 'Upgrade Calico Enterprise',
              link: {type: 'doc', id:'calico-enterprise/getting-started/upgrading/upgrading-enterprise/index'},
              items: [
                {
                  type: 'category',
                  label: 'Kubernetes',
                  link: {type: 'doc', id:'calico-enterprise/getting-started/upgrading/upgrading-enterprise/kubernetes-upgrade-tsee/index'},
                  items: [
                    'calico-enterprise/getting-started/upgrading/upgrading-enterprise/kubernetes-upgrade-tsee/helm',
                    'calico-enterprise/getting-started/upgrading/upgrading-enterprise/kubernetes-upgrade-tsee/operator',
                  ],
                },
                'calico-enterprise/getting-started/upgrading/upgrading-enterprise/openshift-upgrade',
              ],
            },
            {
              type: 'category',
              label: 'Upgrade from Calico to Calico Enterprise',
              link: {type: 'doc', id:'calico-enterprise/getting-started/upgrading/upgrading-calico-to-calico-enterprise/index'},
              items: [
                {
                  type: 'category',
                  label: 'Kubernetes',
                  link: {type: 'doc', id:'calico-enterprise/getting-started/upgrading/upgrading-calico-to-calico-enterprise/upgrade-to-tsee/index'},
                  items: [
                      'calico-enterprise/getting-started/upgrading/upgrading-calico-to-calico-enterprise/upgrade-to-tsee/standard',
                      'calico-enterprise/getting-started/upgrading/upgrading-calico-to-calico-enterprise/upgrade-to-tsee/helm',
                  ],
                },
                'calico-enterprise/getting-started/upgrading/upgrading-calico-to-calico-enterprise/upgrade-to-tsee-openshift',
              ],
            },
          ],
        },
        'calico-enterprise/getting-started/manifest-archive',
      ],
    },
    {
      type: 'category',
      label: 'Networking',
      link: {type: 'doc', id: 'calico-enterprise/networking/index'},
      items: [
        'calico-enterprise/networking/determine-best-networking',
        {
          type: 'category',
          label: 'Networking basics',
          link: {type: 'doc', id: 'calico-enterprise/networking/training/index'},
          items: [
            'calico-enterprise/networking/training/about-networking',
            'calico-enterprise/networking/training/about-kubernetes-networking',
          ],
        },
        {
          type: 'category',
          label: 'Configure Calico Enterprise networking',
          link: {type: 'doc', id: 'calico-enterprise/networking/configuring/index'},
          items: [
            'calico-enterprise/networking/configuring/bgp',
            'calico-enterprise/networking/configuring/dual-tor',
            'calico-enterprise/networking/configuring/multiple-networks',
            'calico-enterprise/networking/configuring/vxlan-ipip',
            'calico-enterprise/networking/configuring/advertise-service-ips',
            'calico-enterprise/networking/configuring/mtu',
            'calico-enterprise/networking/configuring/custom-bgp-config',
            'calico-enterprise/networking/configuring/workloads-outside-cluster',
            'calico-enterprise/networking/configuring/pod-mac-address',
          ],
        },
        {
          type: 'category',
          label: 'Egress gateways',
          link: {type: 'doc', id: 'calico-enterprise/networking/egress/index'},
          items: [
            'calico-enterprise/networking/egress/egress-gateway-on-prem',
            'calico-enterprise/networking/egress/egress-gateway-aws',
            'calico-enterprise/networking/egress/egress-gateway-maintenance',
            'calico-enterprise/networking/egress/troubleshoot',
          ],
        },
        {
          type: 'category',
          label: 'Customize IP address management',
          link: {type: 'doc', id: 'calico-enterprise/networking/ipam/index'},
          items: [
            'calico-enterprise/networking/ipam/get-started-ip-addresses',
            'calico-enterprise/networking/ipam/initial-ippool',
            'calico-enterprise/networking/ipam/ip-autodetection',
            'calico-enterprise/networking/ipam/ipv6',
            'calico-enterprise/networking/ipam/use-specific-ip',
            'calico-enterprise/networking/ipam/assign-ip-addresses-topology',
            'calico-enterprise/networking/ipam/migrate-pools',
            'calico-enterprise/networking/ipam/change-block-size',
            'calico-enterprise/networking/ipam/legacy-firewalls',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Network policy',
      link: {type: 'doc', id: 'calico-enterprise/security/index'},
      items: [
        'calico-enterprise/security/policy-best-practices',
        {
          type: 'category',
          label: 'Tiered network policy',
          link: {type: 'doc', id: 'calico-enterprise/security/policy-tiers/index'},
          items: [
            {
              type: 'category',
              label: 'Get started with tiered policy',
              link: {type: 'doc', id: 'calico-enterprise/security/policy-tiers/tiered-policy/index'},
              items: [
                'calico-enterprise/security/policy-tiers/tiered-policy/allow-tigera',
              ],
            },
            'calico-enterprise/security/policy-tiers/rbac-tiered-policies',
          ],
        },
        'calico-enterprise/security/networksets',
        'calico-enterprise/security/default-deny',
        {
          type: 'category',
          label: 'Policy life cycle and automation',
          link: {type: 'doc', id: 'calico-enterprise/security/policy-lifecycle/index'},
          items: [
            'calico-enterprise/security/policy-lifecycle/staged-network-policies',
          ],
        },
        'calico-enterprise/security/policy-troubleshooting',
        {
          type: 'category',
          label: 'Calico Enterprise network policy for beginners',
          link: {type: 'doc', id: 'calico-enterprise/security/beginners/index'},
          items: [
            'calico-enterprise/security/beginners/kubernetes-default-deny',
            'calico-enterprise/security/beginners/calico-network-policy',
            'calico-enterprise/security/beginners/simple-policy-cnx',
            {
              type: 'category',
              label: 'Policy rules',
              link: {type: 'doc', id: 'calico-enterprise/security/beginners/policy-rules/index'},
              items: [
                'calico-enterprise/security/beginners/policy-rules/policy-rules-overview',
                'calico-enterprise/security/beginners/policy-rules/namespace-policy',
                'calico-enterprise/security/beginners/policy-rules/service-accounts',
                'calico-enterprise/security/beginners/policy-rules/service-policy',
                'calico-enterprise/security/beginners/policy-rules/external-ips-policy',
                'calico-enterprise/security/beginners/policy-rules/icmp-ping',
              ],
            },
            {
              type: 'category',
              label: 'Policy for services',
              link: {type: 'doc', id: 'calico-enterprise/security/beginners/services/index'},
              items: [
                'calico-enterprise/security/beginners/services/kubernetes-node-ports',
                'calico-enterprise/security/beginners/services/services-cluster-ips',
              ],
            },
          ],
        },
        'calico-enterprise/security/domain-based-policy',
        {
          type: 'category',
          label: 'Policy for firewalls',
          link: {type: 'doc', id: 'calico-enterprise/security/policy-firewalls/index'},
          items: [
            {
              type: 'category',
              label: 'Panorama firewall integrations',
              link: {type: 'doc', id: 'calico-enterprise/security/policy-firewalls/panorama-integration/index'},
              items: [
                'calico-enterprise/security/policy-firewalls/panorama-integration/tigera-panorama-policy-integration',
              ],
            },
            {
              type: 'category',
              label: 'Fortinet firewall integrations',
              link: {type: 'doc', id: 'calico-enterprise/security/policy-firewalls/fortinet-integration/index'},
              items: [
                'calico-enterprise/security/policy-firewalls/fortinet-integration/overview',
                'calico-enterprise/security/policy-firewalls/fortinet-integration/firewall-integration',
                'calico-enterprise/security/policy-firewalls/fortinet-integration/fortimgr-integration',
              ],
            },
            {
              type: 'category',
              label: 'AWS security groups integration',
              link: {type: 'doc', id: 'calico-enterprise/security/policy-firewalls/aws-integration/index'},
              items: [
                'calico-enterprise/security/policy-firewalls/aws-integration/get-started',
                'calico-enterprise/security/policy-firewalls/aws-integration/aws-security-group-integration',
                'calico-enterprise/security/policy-firewalls/aws-integration/tiers-and-policy',
                'calico-enterprise/security/policy-firewalls/aws-integration/metadata-access',
              ],
            },
          ],
        },
        {
          type: 'category',
          label: 'Policy for hosts',
          link: {type: 'doc', id: 'calico-enterprise/security/hosts/index'},
          items: [
            'calico-enterprise/security/hosts/protect-hosts',
            'calico-enterprise/security/hosts/kubernetes-nodes',
            'calico-enterprise/security/hosts/protect-hosts-tutorial',
            'calico-enterprise/security/hosts/host-forwarded-traffic',
          ],
        },
        {
          type: 'category',
          label: 'Policy for extreme traffic',
          link: {type: 'doc', id: 'calico-enterprise/security/extreme-traffic/index'},
          items: [
            'calico-enterprise/security/extreme-traffic/high-connection-workloads',
            'calico-enterprise/security/extreme-traffic/defend-dos-attack',
          ],
        },
        {
          type: 'category',
          label: 'Kubernetes for beginners',
          link: {type: 'doc', id: 'calico-enterprise/security/get-started/index'},
          items: [
            'calico-enterprise/security/get-started/about-network-policy',
            'calico-enterprise/security/get-started/kubernetes-network-policy',
            'calico-enterprise/security/get-started/kubernetes-demo',
            'calico-enterprise/security/get-started/kubernetes-policy-basic',
            'calico-enterprise/security/get-started/kubernetes-policy-advanced',
            'calico-enterprise/security/get-started/about-kubernetes-services',
            'calico-enterprise/security/get-started/about-kubernetes-ingress',
            'calico-enterprise/security/get-started/about-kubernetes-egress',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Visibility and troubleshooting',
      link: {type: 'doc', id: 'calico-enterprise/visibility/index'},
      items: [
        'calico-enterprise/visibility/get-started-cem',
        'calico-enterprise/visibility/alerts',
        'calico-enterprise/visibility/kibana',
        'calico-enterprise/visibility/packetcapture',
        'calico-enterprise/visibility/visualize-traffic',
        {
          type: 'category',
          label: 'Calico Enterprise logs',
          link: {type: 'doc', id: 'calico-enterprise/visibility/elastic/index'},
          items: [
            'calico-enterprise/visibility/elastic/overview',
            'calico-enterprise/visibility/elastic/retention',
            'calico-enterprise/visibility/elastic/archive-storage',
            'calico-enterprise/visibility/elastic/rbac-elasticsearch',
            {
              type: 'category',
              label: 'Flow logs',
              link: {type: 'doc', id: 'calico-enterprise/visibility/elastic/flow/index'},
              items: [
                'calico-enterprise/visibility/elastic/flow/datatypes',
                'calico-enterprise/visibility/elastic/flow/filtering',
                'calico-enterprise/visibility/elastic/flow/aggregation',
                'calico-enterprise/visibility/elastic/flow/hep',
                'calico-enterprise/visibility/elastic/flow/tcpstats',
                'calico-enterprise/visibility/elastic/flow/processpath',
,              ],
            },
            'calico-enterprise/visibility/elastic/audit-overview',
            {
              type: 'category',
              label: 'DNS logs',
              link: {type: 'doc', id: 'calico-enterprise/visibility/elastic/dns/index'},
              items: [
                'calico-enterprise/visibility/elastic/dns/dns-logs',
                'calico-enterprise/visibility/elastic/dns/filtering-dns',
              ],
            },
            'calico-enterprise/visibility/elastic/bgp',
            {
              type: 'category',
              label: 'L7 logs',
              link: {type: 'doc', id: 'calico-enterprise/visibility/elastic/l7/index'},
              items: [
                'calico-enterprise/visibility/elastic/l7/configure',
                'calico-enterprise/visibility/elastic/l7/datatypes',
              ],
            },
            'calico-enterprise/visibility/elastic/troubleshoot',
          ],
        },
        'calico-enterprise/visibility/kube-audit',
        'calico-enterprise/visibility/iptables',
      ],
    },
    {
      type: 'category',
      label: 'Multi-cluster management',
      link: {type: 'doc', id: 'calico-enterprise/multicluster/index'},
      items: [
        'calico-enterprise/multicluster/create-a-management-cluster',
        'calico-enterprise/multicluster/create-a-managed-cluster',
        'calico-enterprise/multicluster/fine-tune-deployment',
        'calico-enterprise/multicluster/change-cluster-type',
        {
          type: 'category',
          label: 'Federate identity endpoints and services',
          link: {type: 'doc', id: 'calico-enterprise/multicluster/federation/index'},
          items: [
            'calico-enterprise/multicluster/federation/overview',
            'calico-enterprise/multicluster/federation/kubeconfig',
            'calico-enterprise/multicluster/federation/services-controller',
            'calico-enterprise/multicluster/federation/aws',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Threat defense',
      link: {type: 'doc', id: 'calico-enterprise/threat/index'},
      items: [
        {
          type: 'category',
          label: 'Anomaly detection',
          link: {type: 'doc', id: 'calico-enterprise/threat/anomaly-detection/index'},
          items: [
            'calico-enterprise/threat/anomaly-detection/security-anomalies',
            'calico-enterprise/threat/anomaly-detection/storage'
          ],
        },
        'calico-enterprise/threat/suspicious-ips',
        'calico-enterprise/threat/suspicious-domains',
        'calico-enterprise/threat/suspicious-external-ips',
        'calico-enterprise/threat/tor-vpn-feed-and-dashboard',
        {
          type: 'category',
          label: 'Honeypods',
          link: {type: 'doc', id: 'calico-enterprise/threat/honeypod/index'},
          items: [
            'calico-enterprise/threat/honeypod/honeypods',
            'calico-enterprise/threat/honeypod/honeypod-controller'
          ],
        },
        'calico-enterprise/threat/deeppacketinspection',
        'calico-enterprise/threat/web-application-firewall',
      ],
    },
    {
      type: 'category',
      label: 'Compliance and security',
      link: {type: 'doc', id: 'calico-enterprise/compliance/index'},
      items: [
        'calico-enterprise/compliance/overview',
        'calico-enterprise/compliance/compliance-reports-cis',
        'calico-enterprise/compliance/encrypt-cluster-pod-traffic',
      ],
    },
    {
      type: 'category',
      label: 'Operations',
      link: {type: 'doc', id: 'calico-enterprise/maintenance/index'},
      items: [
        {
          type: 'category',
          label: 'Calico Enterprise Manager UI',
          link: {type: 'doc', id: 'calico-enterprise/maintenance/cnx/index'},
          items: [
            'calico-enterprise/maintenance/cnx/access-the-manager',
            'calico-enterprise/maintenance/cnx/authentication-quickstart',
            'calico-enterprise/maintenance/cnx/configure-identity-provider',
            'calico-enterprise/maintenance/cnx/roles-and-permissions',
          ],
        },
        {
          type: 'category',
          label: 'Secure component communications',
          link: {type: 'doc', id: 'calico-enterprise/maintenance/comms/index'},
          items: [
            'calico-enterprise/maintenance/comms/crypto-auth',
            'calico-enterprise/maintenance/comms/secure-metrics',
            'calico-enterprise/maintenance/comms/secure-bgp',
            'calico-enterprise/maintenance/comms/manager-tls',
            'calico-enterprise/maintenance/comms/log-storage-tls',
            'calico-enterprise/maintenance/comms/apiserver-tls',
            'calico-enterprise/maintenance/comms/typha-node-tls',
            'calico-enterprise/maintenance/comms/compliance-tls',
            'calico-enterprise/maintenance/comms/packetcapture-tls',
            'calico-enterprise/maintenance/comms/certificate-management',
          ],
        },
        {
          type: 'category',
          label: 'CLIs',
          link: {type: 'doc', id: 'calico-enterprise/maintenance/clis/index'},
          items: [
            {
              type: 'category',
              label: 'calicoctl',
              link: {type: 'doc', id: 'calico-enterprise/maintenance/clis/calicoctl/index'},
              items: [
                'calico-enterprise/maintenance/clis/calicoctl/install',
                {
                  type: 'category',
                  label: 'Configure calicoctl',
                  link: {type: 'doc', id: 'calico-enterprise/maintenance/clis/calicoctl/configure/index'},
                  items: [
                    'calico-enterprise/maintenance/clis/calicoctl/configure/overview',
                    'calico-enterprise/maintenance/clis/calicoctl/configure/datastore',
                  ],
                },
              ],
            },
            {
              type: 'category',
              label: 'calicoq',
              link: {type: 'doc', id: 'calico-enterprise/maintenance/clis/calicoq/index'},
              items: [
                'calico-enterprise/maintenance/clis/calicoq/installing',
                {
                  type: 'category',
                  label: 'Configure calicoq',
                  link: {type: 'doc', id: 'calico-enterprise/maintenance/clis/calicoq/configure/index'},
                  items: [
                    'calico-enterprise/maintenance/clis/calicoq/configure/overview',
                    'calico-enterprise/maintenance/clis/calicoq/configure/datastore',
                  ],
                },
              ],
            },
          ],
        },
        {
          type: 'category',
          label: 'Storage',
          link: {type: 'doc', id: 'calico-enterprise/maintenance/logstorage/index'},
          items: [
            'calico-enterprise/maintenance/logstorage/log-storage-recommendations',
            'calico-enterprise/maintenance/logstorage/create-storage',
            'calico-enterprise/maintenance/logstorage/adjust-log-storage-size',
            'calico-enterprise/maintenance/logstorage/advanced-node-scheduling',
          ],
        },
        'calico-enterprise/maintenance/license-options',
        {
          type: 'category',
          label: 'Monitoring',
          link: {type: 'doc', id: 'calico-enterprise/maintenance/monitor/index'},
          items: [
            {
              type: 'category',
              label: 'Prometheus',
              link: {type: 'doc', id: 'calico-enterprise/maintenance/monitor/prometheus/index'},
              items: [
                'calico-enterprise/maintenance/monitor/prometheus/support',
                'calico-enterprise/maintenance/monitor/prometheus/byo-prometheus',
                'calico-enterprise/maintenance/monitor/prometheus/configure-prometheus',
                'calico-enterprise/maintenance/monitor/prometheus/alertmanager',
              ],
            },
            {
              type: 'category',
              label: 'Metrics',
              link: {type: 'doc', id: 'calico-enterprise/maintenance/monitor/metrics/index'},
              items: [
                'calico-enterprise/maintenance/monitor/metrics/bgp-metrics',
                'calico-enterprise/maintenance/monitor/metrics/license-agent',
                'calico-enterprise/maintenance/monitor/metrics/policy-metrics',
                'calico-enterprise/maintenance/monitor/metrics/elasticsearch-and-fluentd-metrics',
              ],
            },
          ],
        },
        {
          type: 'category',
          label: 'eBPF',
          link: {type: 'doc', id: 'calico-enterprise/maintenance/ebpf/index'},
          items: [
            'calico-enterprise/maintenance/ebpf/use-cases-ebpf',
            'calico-enterprise/maintenance/ebpf/enabling-ebpf',
            'calico-enterprise/maintenance/ebpf/install',
            'calico-enterprise/maintenance/ebpf/troubleshoot-ebpf',
          ],
        },
        'calico-enterprise/maintenance/decommissioning-a-node',
        'calico-enterprise/maintenance/fips',
        {
          type: 'category',
          label: 'Troubleshooting',
          link: {type: 'doc', id: 'calico-enterprise/maintenance/troubleshoot/index'},
          items: [
            'calico-enterprise/maintenance/troubleshoot/troubleshooting',
            'calico-enterprise/maintenance/troubleshoot/commands',
            'calico-enterprise/maintenance/troubleshoot/component-logs',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Reference',
      link: {type: 'doc', id: 'calico-enterprise/reference/index'},
      items: [
        'calico-enterprise/reference/api',
        'calico-enterprise/reference/installation/api',
        'calico-enterprise/reference/anomaly-detection',
        {
          type: 'category',
          label: 'CLIs',
          link: {type: 'doc', id: 'calico-enterprise/reference/clis/index'},
          items: [
            {
              type: 'category',
              label: 'calicoctl',
              link: {type: 'doc', id: 'calico-enterprise/reference/clis/calicoctl/index'},
              items: [
                'calico-enterprise/reference/clis/calicoctl/overview',
                'calico-enterprise/reference/clis/calicoctl/apply',
                {
                  type: 'category',
                  label: 'bgp',
                  link: {type: 'doc', id: 'calico-enterprise/reference/clis/calicoctl/bgp/index'},
                  items: [
                    'calico-enterprise/reference/clis/calicoctl/bgp/overview',
                    'calico-enterprise/reference/clis/calicoctl/bgp/peers',
                  ],
                },
                'calico-enterprise/reference/clis/calicoctl/captured-packets',
                {
                  type: 'category',
                  label: 'cluster',
                  link: {type: 'doc', id: 'calico-enterprise/reference/clis/calicoctl/cluster/index'},
                  items: [
                    'calico-enterprise/reference/clis/calicoctl/cluster/overview',
                    'calico-enterprise/reference/clis/calicoctl/cluster/diags',

                  ]

                },
                'calico-enterprise/reference/clis/calicoctl/convert',
                'calico-enterprise/reference/clis/calicoctl/create',
                'calico-enterprise/reference/clis/calicoctl/delete',
                'calico-enterprise/reference/clis/calicoctl/get',
                {
                  type: 'category',
                  label: 'ipam',
                  link: {type: 'doc', id: 'calico-enterprise/reference/clis/calicoctl/ipam/index'},
                  items: [
                    'calico-enterprise/reference/clis/calicoctl/ipam/overview',
                    'calico-enterprise/reference/clis/calicoctl/ipam/check',
                    'calico-enterprise/reference/clis/calicoctl/ipam/release',
                    'calico-enterprise/reference/clis/calicoctl/ipam/show',
                    'calico-enterprise/reference/clis/calicoctl/ipam/configure',
                    'calico-enterprise/reference/clis/calicoctl/ipam/split',
                  ],
                },
                {
                  type: 'category',
                  label: 'datastore',
                  link: {type: 'doc', id: 'calico-enterprise/reference/clis/calicoctl/datastore/index'},
                  items: [
                    'calico-enterprise/reference/clis/calicoctl/datastore/overview',
                    {
                      type: 'category',
                      label: 'migrate',
                      link: {type: 'doc', id: 'calico-enterprise/reference/clis/calicoctl/datastore/migrate/index'},
                      items: [
                        'calico-enterprise/reference/clis/calicoctl/datastore/migrate/overview',
                        'calico-enterprise/reference/clis/calicoctl/datastore/migrate/lock',
                        'calico-enterprise/reference/clis/calicoctl/datastore/migrate/unlock',
                      ],
                    },
                  ],
                },
                'calico-enterprise/reference/clis/calicoctl/label',
                {
                  type: 'category',
                  label: 'node',
                  link: {type: 'doc', id: 'calico-enterprise/reference/clis/calicoctl/node/index'},
                  items: [
                    'calico-enterprise/reference/clis/calicoctl/node/overview',
                    'calico-enterprise/reference/clis/calicoctl/node/run',
                    'calico-enterprise/reference/clis/calicoctl/node/status',
                    'calico-enterprise/reference/clis/calicoctl/node/diags',
                    'calico-enterprise/reference/clis/calicoctl/node/checksystem',
                  ],
                },
                'calico-enterprise/reference/clis/calicoctl/patch',
                'calico-enterprise/reference/clis/calicoctl/replace',
                'calico-enterprise/reference/clis/calicoctl/version',
              ],
            },
            {
              type: 'category',
              label: 'calicoq',
              link: {type: 'doc', id: 'calico-enterprise/reference/clis/calicoq/index'},
              items: [
                'calico-enterprise/reference/clis/calicoq/overview',
                'calico-enterprise/reference/clis/calicoq/selectors',
                'calico-enterprise/reference/clis/calicoq/endpoint',
                'calico-enterprise/reference/clis/calicoq/eval',
                'calico-enterprise/reference/clis/calicoq/host',
                'calico-enterprise/reference/clis/calicoq/policy',
                'calico-enterprise/reference/clis/calicoq/version',
              ],
            },
          ],
        },
        {
          type: 'category',
          label: 'Resource definitions',
          link: {type: 'doc', id: 'calico-enterprise/reference/resources/index'},
          items: [
            'calico-enterprise/reference/resources/overview',
            'calico-enterprise/reference/resources/bgpconfig',
            'calico-enterprise/reference/resources/bgppeer',
            'calico-enterprise/reference/resources/blockaffinity',
            'calico-enterprise/reference/resources/caliconodestatus',
            {
              type: 'category',
              label: 'Compliance reports',
              link: {type: 'doc', id: 'calico-enterprise/reference/resources/compliance-reports/index'},
              items: [
                'calico-enterprise/reference/resources/compliance-reports/overview',
                'calico-enterprise/reference/resources/compliance-reports/inventory',
                'calico-enterprise/reference/resources/compliance-reports/network-access',
                'calico-enterprise/reference/resources/compliance-reports/policy-audit',
                'calico-enterprise/reference/resources/compliance-reports/cis-benchmark',
              ]
            },
            'calico-enterprise/reference/resources/deeppacketinspection',
            'calico-enterprise/reference/resources/felixconfig',
            'calico-enterprise/reference/resources/globalalert',
            'calico-enterprise/reference/resources/globalnetworkpolicy',
            'calico-enterprise/reference/resources/globalnetworkset',
            'calico-enterprise/reference/resources/globalreport',
            'calico-enterprise/reference/resources/globalthreatfeed',
            'calico-enterprise/reference/resources/hostendpoint',
            'calico-enterprise/reference/resources/ippool',
            'calico-enterprise/reference/resources/ipreservation',
            'calico-enterprise/reference/resources/ipamconfig',
            'calico-enterprise/reference/resources/licensekey',
            'calico-enterprise/reference/resources/kubecontrollersconfig',
            'calico-enterprise/reference/resources/managedcluster',
            'calico-enterprise/reference/resources/networkpolicy',
            'calico-enterprise/reference/resources/networkset',
            'calico-enterprise/reference/resources/node',
            'calico-enterprise/reference/resources/packetcapture',
            'calico-enterprise/reference/resources/profile',
            'calico-enterprise/reference/resources/remoteclusterconfiguration',
            'calico-enterprise/reference/resources/stagedglobalnetworkpolicy',
            'calico-enterprise/reference/resources/stagedkubernetesnetworkpolicy',
            'calico-enterprise/reference/resources/stagednetworkpolicy',
            'calico-enterprise/reference/resources/tier',
            'calico-enterprise/reference/resources/workloadendpoint',
          ],
        },
        {
          type: 'category',
          label: 'Architecture and network design',
          link: {type: 'doc', id: 'calico-enterprise/reference/architecture/index'},
          items: [
            'calico-enterprise/reference/architecture/overview',
            'calico-enterprise/reference/architecture/data-path',
            {
              type: 'category',
              label: 'Network design',
              link: {type: 'doc', id: 'calico-enterprise/reference/architecture/design/index'},
              items: [
                'calico-enterprise/reference/architecture/design/l2-interconnect-fabric',
                'calico-enterprise/reference/architecture/design/l3-interconnect-fabric',
              ],
            },
          ],
        },
        {
          type: 'category',
          label: 'Component resources',
          link: {type: 'doc', id: 'calico-enterprise/reference/component-resources/index'},
          items: [
            'calico-enterprise/reference/component-resources/configuration',
            {
              type: 'category',
              label: 'Calico Enterprise Kubernetes controllers',
              link: {type: 'doc', id: 'calico-enterprise/reference/component-resources/kube-controllers/index'},
              items: [
                'calico-enterprise/reference/component-resources/kube-controllers/configuration',
                'calico-enterprise/reference/component-resources/kube-controllers/prometheus',
              ],
            },
            {
              type: 'category',
              label: 'Calico Enterprise node (cnx-node)',
              link: {type: 'doc', id: 'calico-enterprise/reference/component-resources/node/index'},
              items: [
                'calico-enterprise/reference/component-resources/node/configuration',
                {
                  type: 'category',
                  label: 'Felix',
                  link: {type: 'doc', id: 'calico-enterprise/reference/component-resources/node/felix/index'},
                  items: [
                    'calico-enterprise/reference/component-resources/node/felix/configuration',
                    'calico-enterprise/reference/component-resources/node/felix/prometheus',
                  ],
                },
              ],
            },
            {
              type: 'category',
              label: 'Typha for scaling',
              link: {type: 'doc', id: 'calico-enterprise/reference/component-resources/typha/index'},
              items: [
                'calico-enterprise/reference/component-resources/typha/overview',
                'calico-enterprise/reference/component-resources/typha/configuration',
              ],
            },
          ],
        },
        {
          type: 'category',
          label: 'Configuration on public clouds',
          link: {type: 'doc', id: 'calico-enterprise/reference/public-cloud/index'},
          items: [
            'calico-enterprise/reference/public-cloud/aws',
            'calico-enterprise/reference/public-cloud/azure',
            'calico-enterprise/reference/public-cloud/gce',
          ],
        },
        {
          type: 'category',
          label: 'Host endpoints',
          link: {type: 'doc', id: 'calico-enterprise/reference/host-endpoints/index'},
          items: [
            'calico-enterprise/reference/host-endpoints/overview',
            'calico-enterprise/reference/host-endpoints/connectivity',
            'calico-enterprise/reference/host-endpoints/objects',
            'calico-enterprise/reference/host-endpoints/selector',
            'calico-enterprise/reference/host-endpoints/failsafe',
            'calico-enterprise/reference/host-endpoints/pre-dnat',
            'calico-enterprise/reference/host-endpoints/forwarded',
            'calico-enterprise/reference/host-endpoints/summary',
            'calico-enterprise/reference/host-endpoints/conntrack',
          ],
        },
        'calico-enterprise/reference/attribution',
        'calico-enterprise/reference/rest-api-reference',
        'calico-enterprise/reference/faq',
        'calico-enterprise/reference/support-policy',
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
