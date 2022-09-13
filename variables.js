const variables = {
  // This is an example of how to override variables. Bear in mind that 1) the
  // 'docsPathPrefix' is necessary, except for 'global' object. And, 2) the
  // order is important as the first objects listed here will take precedence
  // over the objects listed further down, as long as the paths match.
  //
  // override: {
  // 	docsPathPrefix: ["/docs/calico-cloud/new-folder-example/"],
  // 	nodecontainer: 'cnx-node-override'
  // },
  cloud: {
    prodname: 'Calico Cloud',
    prodnamedash: 'calico-cloud',
    docsPathPrefix: ['/docs/calico-cloud/', '/docs/_includes/calico-cloud/'],
    prodnameWindows: 'Calico Enterprise for Windows',
    rootDirWindows: 'C:\\TigeraCalico',
    nodecontainer: 'cnx-node',
    noderunning: 'calico-node',
    clouddownloadurl: 'https://installer.calicocloud.io/manifests/v3.14.1-1',
    components: {
      'cnx-manager': {
        image: 'tigera/cnx-manager',
        version: 'v3.14.1',
      },
      voltron: {
        image: 'tigera/voltron',
        version: 'v3.14.1',
      },
      guardian: {
        image: 'tigera/guardian',
        version: 'v3.14.1',
      },
      'cnx-apiserver': {
        image: 'tigera/cnx-apiserver',
        version: 'v3.14.1',
      },
      'cnx-queryserver': {
        image: 'tigera/cnx-queryserver',
        version: 'v3.14.1',
      },
      'cnx-kube-controllers': {
        image: 'tigera/kube-controllers',
        version: 'v3.14.1',
      },
      calicoq: {
        image: 'tigera/calicoq',
        version: 'v3.14.1',
      },
      typha: {
        image: 'tigera/typha',
        version: 'v3.14.1',
      },
      calicoctl: {
        image: 'tigera/calicoctl',
        version: 'v3.14.1',
      },
      'cnx-node': {
        image: 'tigera/cnx-node',
        version: 'v3.14.1',
      },
      dikastes: {
        image: 'tigera/dikastes',
        version: 'v3.14.1',
      },
      dex: {
        image: 'tigera/dex',
        version: 'v3.14.1',
      },
      fluentd: {
        image: 'tigera/fluentd',
        version: 'v3.14.1',
      },
      'fluentd-windows': {
        image: 'tigera/fluentd-windows',
        version: 'v3.14.1',
      },
      'es-proxy': {
        image: 'tigera/es-proxy',
        version: 'v3.14.1',
      },
      'eck-kibana': {
        version: '7.16.2',
      },
      kibana: {
        image: 'tigera/kibana',
        version: 'v3.14.1',
      },
      'eck-elasticsearch': {
        version: '7.16.2',
      },
      elasticsearch: {
        image: 'tigera/elasticsearch',
        version: 'v3.14.1',
      },
      'cloud-controllers': {
        image: 'tigera/cloud-controllers',
        version: 'v3.14.1',
      },
      'elastic-tsee-installer': {
        image: 'tigera/intrusion-detection-job-installer',
        version: 'v3.14.1',
      },
      'es-curator': {
        image: 'tigera/es-curator',
        version: 'v3.14.1',
      },
      'intrusion-detection-controller': {
        image: 'tigera/intrusion-detection-controller',
        version: 'v3.14.1',
      },
      'compliance-controller': {
        image: 'tigera/compliance-controller',
        version: 'v3.14.1',
      },
      'compliance-reporter': {
        image: 'tigera/compliance-reporter',
        version: 'v3.14.1',
      },
      'compliance-snapshotter': {
        image: 'tigera/compliance-snapshotter',
        version: 'v3.14.1',
      },
      'compliance-server': {
        image: 'tigera/compliance-server',
        version: 'v3.14.1',
      },
      'compliance-benchmarker': {
        image: 'tigera/compliance-benchmarker',
        version: 'v3.14.1',
      },
      'ingress-collector': {
        image: 'tigera/ingress-collector',
        version: 'v3.14.1',
      },
      'l7-collector': {
        image: 'tigera/l7-collector',
        version: 'v3.14.1',
      },
      'license-agent': {
        image: 'tigera/license-agent',
        version: 'v3.14.1',
      },
      'tigera-cni': {
        image: 'tigera/cni',
        version: 'v3.14.1',
      },
      'firewall-integration': {
        image: 'tigera/firewall-integration',
        version: 'v3.14.1',
      },
      'egress-gateway': {
        image: 'tigera/egress-gateway',
        version: 'v3.14.1',
      },
      honeypod: {
        image: 'tigera/honeypod',
        version: 'v3.14.1',
      },
      'honeypod-exp-service': {
        image: 'tigera/honeypod-exp-service',
        version: 'v3.14.1',
      },
      'honeypod-controller': {
        image: 'tigera/honeypod-controller',
        version: 'v3.14.1',
      },
      'key-cert-provisioner': {
        image: 'tigera/key-cert-provisioner',
        version: 'v1.1.3',
        registry: 'quay.io',
      },
      anomaly_detection_jobs: {
        image: 'tigera/anomaly_detection_jobs',
        version: 'v3.14.1',
      },
      'anomaly-detection-api': {
        image: 'tigera/anomaly-detection-api',
        version: 'v3.14.1',
      },
      'elasticsearch-metrics': {
        image: 'tigera/elasticsearch-metrics',
        version: 'v3.14.1',
      },
      'packetcapture-api': {
        image: 'tigera/packetcapture-api',
        version: 'v3.14.1',
      },
      prometheus: {
        image: 'tigera/prometheus',
        version: 'v3.14.1',
      },
      'coreos-prometheus': {
        version: 'v2.32.0',
      },
      'prometheus-operator': {
        image: 'tigera/prometheus-operator',
        version: 'v3.14.1',
      },
      'prometheus-config-reloader': {
        image: 'tigera/prometheus-config-reloader',
        version: 'v3.14.1',
      },
      'tigera-prometheus-service': {
        image: 'tigera/prometheus-service',
        version: 'v3.14.1',
      },
      'es-gateway': {
        image: 'tigera/es-gateway',
        version: 'v3.14.1',
      },
      'deep-packet-inspection': {
        image: 'tigera/deep-packet-inspection',
        version: 'v3.14.1',
      },
      'eck-elasticsearch-operator': {
        version: '1.8.0',
      },
      'elasticsearch-operator': {
        image: 'tigera/eck-operator',
        version: 'v3.14.1',
      },
      'coreos-alertmanager': {
        version: 'v0.23.0',
      },
      alertmanager: {
        image: 'tigera/alertmanager',
        version: 'v3.14.1',
      },
      envoy: {
        image: 'tigera/envoy',
        version: 'v3.14.1',
      },
      'envoy-init': {
        image: 'tigera/envoy-init',
        version: 'v3.14.1',
      },
      windows: {
        image: 'tigera/calico-windows',
        version: 'v3.14.1',
      },
      'windows-upgrade': {
        image: 'tigera/calico-windows-upgrade',
        version: 'v3.14.1',
      },
      flexvol: {
        image: 'calico/pod2daemon-flexvol',
        version: 'v3.23.1',
        registry: 'quay.io',
      },
    },
  },
  enterprise: {
    prodname: 'Calico Enterprise',
    prodnamedash: 'calico-enterprise',
    docsPathPrefix: ['/docs/calico-enterprise/', '/docs/_includes/calico-enterprise/'],
    prodnameWindows: 'Calico Enterprise for Windows',
    downloadsurl: 'https://downloads.tigera.io',
    nodecontainer: 'cnx-node',
    noderunning: 'calico-node',
    rootDirWindows: 'C:\\TigeraCalico',
    registry: 'gcr.io/unique-caldron-775/cnx/',
    tigeraOperator: {
      image: 'tigera/operator',
      version: 'master',
      registry: 'quay.io',
    },
    components: {
      'cnx-manager': {
        image: 'tigera/cnx-manager',
        version: 'master',
      },
      voltron: {
        image: 'tigera/voltron',
        version: 'master',
      },
      guardian: {
        image: 'tigera/guardian',
        version: 'master',
      },
      'cnx-apiserver': {
        image: 'tigera/cnx-apiserver',
        version: 'master',
      },
      'cnx-queryserver': {
        image: 'tigera/cnx-queryserver',
        version: 'master',
      },
      'cnx-kube-controllers': {
        image: 'tigera/kube-controllers',
        version: 'master',
      },
      calicoq: {
        image: 'tigera/calicoq',
        version: 'master',
      },
      typha: {
        image: 'tigera/typha',
        version: 'master',
      },
      calicoctl: {
        image: 'tigera/calicoctl',
        version: 'master',
      },
      'cnx-node': {
        image: 'tigera/cnx-node',
        version: 'master',
      },
      dikastes: {
        image: 'tigera/dikastes',
        version: 'master',
      },
      dex: {
        image: 'tigera/dex',
        version: 'master',
      },
      fluentd: {
        image: 'tigera/fluentd',
        version: 'master',
      },
      'fluentd-windows': {
        image: 'tigera/fluentd-windows',
        version: 'master',
      },
      'es-proxy': {
        image: 'tigera/es-proxy',
        version: 'master',
      },
      'eck-kibana': {
        version: '7.16.2',
      },
      kibana: {
        image: 'tigera/kibana',
        version: 'master',
      },
      'eck-elasticsearch': {
        version: '7.16.2',
      },
      elasticsearch: {
        image: 'tigera/elasticsearch',
        version: 'master',
      },
      'cloud-controllers': {
        image: 'tigera/cloud-controllers',
        version: 'master',
      },
      'elastic-tsee-installer': {
        image: 'tigera/intrusion-detection-job-installer',
        version: 'master',
      },
      'es-curator': {
        image: 'tigera/es-curator',
        version: 'master',
      },
      'intrusion-detection-controller': {
        image: 'tigera/intrusion-detection-controller',
        version: 'master',
      },
      'compliance-controller': {
        image: 'tigera/compliance-controller',
        version: 'master',
      },
      'compliance-reporter': {
        image: 'tigera/compliance-reporter',
        version: 'master',
      },
      'compliance-snapshotter': {
        image: 'tigera/compliance-snapshotter',
        version: 'master',
      },
      'compliance-server': {
        image: 'tigera/compliance-server',
        version: 'master',
      },
      'compliance-benchmarker': {
        image: 'tigera/compliance-benchmarker',
        version: 'master',
      },
      'ingress-collector': {
        image: 'tigera/ingress-collector',
        version: 'master',
      },
      'l7-collector': {
        image: 'tigera/l7-collector',
        version: 'master',
      },
      'license-agent': {
        image: 'tigera/license-agent',
        version: 'master',
      },
      'tigera-cni': {
        image: 'tigera/cni',
        version: 'master',
      },
      'firewall-integration': {
        image: 'tigera/firewall-integration',
        version: 'master',
      },
      'egress-gateway': {
        image: 'tigera/egress-gateway',
        version: 'master',
      },
      honeypod: {
        image: 'tigera/honeypod',
        version: 'master',
      },
      'honeypod-exp-service': {
        image: 'tigera/honeypod-exp-service',
        version: 'master',
      },
      'honeypod-controller': {
        image: 'tigera/honeypod-controller',
        version: 'master',
      },
      'key-cert-provisioner': {
        image: 'tigera/key-cert-provisioner',
        version: 'master',
        registry: 'quay.io',
      },
      anomaly_detection_jobs: {
        image: 'tigera/anomaly_detection_jobs',
        version: 'master',
      },
      'anomaly-detection-api': {
        image: 'tigera/anomaly-detection-api',
        version: 'master',
      },
      'elasticsearch-metrics': {
        image: 'tigera/elasticsearch-metrics',
        version: 'master',
      },
      packetcapture: {
        image: 'tigera/packetcapture',
        version: 'master',
      },
      prometheus: {
        image: 'tigera/prometheus',
        version: 'master',
      },
      'coreos-prometheus': {
        version: 'v2.32.0',
      },
      'prometheus-operator': {
        image: 'tigera/prometheus-operator',
        version: 'master',
      },
      'prometheus-config-reloader': {
        image: 'tigera/prometheus-config-reloader',
        version: 'master',
      },
      'tigera-prometheus-service': {
        image: 'tigera/prometheus-service',
        version: 'master',
      },
      'es-gateway': {
        image: 'tigera/es-gateway',
        version: 'master',
      },
      'deep-packet-inspection': {
        image: 'tigera/deep-packet-inspection',
        version: 'master',
      },
      'eck-elasticsearch-operator': {
        version: '1.8.0',
      },
      'elasticsearch-operator': {
        image: 'tigera/eck-operator',
        version: 'master',
      },
      'coreos-alertmanager': {
        version: 'v0.23.0',
      },
      alertmanager: {
        image: 'tigera/alertmanager',
        version: 'master',
      },
      envoy: {
        image: 'tigera/envoy',
        version: 'master',
      },
      'envoy-init': {
        image: 'tigera/envoy-init',
        version: 'master',
      },
      windows: {
        image: 'tigera/calico-windows',
        version: 'master',
      },
      'windows-upgrade': {
        image: 'tigera/calico-windows-upgrade',
        version: 'master',
      },
      flexvol: {
        image: 'calico/pod2daemon-flexvol',
        version: 'master',
        registry: 'quay.io',
      },
      'csi-driver': {
        image: 'calico/csi',
        version: 'master',
        registry: 'quay.io',
      },
    },
  },
  openSource: {
    prodname: 'Calico',
    prodnamedash: 'calico',
    docsPathPrefix: ['/docs/calico/', '/docs/_includes/calico/'],
    prodnameWindows: 'Calico for Windows',
    nodecontainer: 'calico/node',
    noderunning: 'calico-node',
    rootDirWindows: 'C:\\CalicoWindows',
  },
  global: {
    orchestrators: {
      All: 'All',
      Kubernetes: 'Kubernetes',
      OpenShift: 'OpenShift',
      OpenStack: 'OpenStack',
      HostProtection: 'host protection',
      'host protection': 'host protection',
    },
  },
};

module.exports = variables;
