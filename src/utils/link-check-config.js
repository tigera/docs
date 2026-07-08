/**
 * Central config for the link checker.
 *
 * This file holds the skip and allow lists that the link checker uses. They used to live inside
 * `src/utils/linkChecker.js` and `__tests__/crawler.test.js`. Keeping them here means one place to
 * edit, review, and comment.
 *
 * Each list is grouped by reason. Add a short comment when you add an entry, so the next person
 * knows why it is here.
 *
 * Lists:
 * - defaultSkipList  : links the checker skips but still reports (used by the engine).
 * - defaultIgnoreList: links the checker skips and hides (used by the engine).
 * - crawlerSkipList  : extra links the full crawl skips (used by the crawler test).
 * - skipOriginsForLC : pages whose links the crawler does not check at all.
 */

// Engine defaults (used by src/utils/linkChecker.js).

// Skip patterns are skipped, but remain in the reporting for visibility.
const defaultSkipList = [
  /^https?:\/\/\d+\.\d+\.\d+\.\d+/,
  /^https?:\/\/transfer\.sh/,
  /^https?:\/\/example.com/,
  /^https?:\/\/an\.example\.threat\.feed/,
  /^https?:\/\/my\.threatfeed\.com/,
  /^https?:\/\/mycalicocl-calicodemorg-03a087-36558dbb\.hcp\.canadaeast\.azmk8s\.io/,
  /^https?:\/\/60F939227672BC3D5A1B3EC9744B2B21\.gr7\.us-west-2\.eks\.amazonaws\.com/,
  /^https?:\/\/prometheus-dashboard-svc\.calico-monitoring\.svc/,
  /^https?:\/\/manager\.apps\.demo-ocp\.tigera-solutions\.io/,
  /^https?:\/\/d881b853ae9313e00302a84f1e346a77\.gr7\.us-west-2\.eks\.amazonaws\.com/,
  /^https?:\/\/api\.my-ocp-domain\.com/,
  /\/manifests\/alp\/istio-inject-configmap-$/,
  /^https?:\/\/auth\.calicocloud\.io/,
  /^https?:\/\/www\.calicocloud\.io/,
  /^https?:\/\/hypershift-docs\.netlify\.app/,
  /^https?:\/\/(www\.)?ubuntu\.com\/.*/,
  // debs directory listing 403s (index forbidden) even when the packages exist.
  /^https?:\/\/downloads\.tigera\.io\/ee\/debs\/v3\.23\/?$/,
  // VERY TEMPORARY: remove once the 3.23.1 artifact is published to the download server.
  /^https?:\/\/downloads\.tigera\.io\/ee\/v3\.23\.1\/manifests\/prometheus\/operator-metrics-service-monitor\.yaml$/,
  /^https?:\/\/docs\.tigera\.io\/calico\/latest\/networking\/kubevirt\/?$/,
  // Category-index breadcrumb URLs for pages new in CE 3.23; live once 3.23.1 publishes.
  /^https?:\/\/docs\.tigera\.io\/calico-enterprise\/latest\/networking\/kubevirt\/?$/,
  /^https?:\/\/docs\.tigera\.io\/calico-enterprise\/latest\/reference\/clis\/calicoctl\/review\/?$/,
  /^https?:\/\/docs\.openshift\.com\/.*/,
  /^https?:\/\/docs\.redhat\.com\/.*/,
  /^https?:\/\/access\.redhat\.com\/.*/,
  /^https?:\/\/docs\.mirantis\.com\/.*/,
  'https://en.wikipedia.org/wiki/Autonomous_System_(Internet',
  'https://github.com/dims/etcd3-gateway.git@5a3157a122368c2314c7a961f61722e47355f981',
  'https://installer.calicocloud.io:443/',
  'https://web.archive.org/web/20150923231827/https://www.cisco.com/web/about/ac123/ac147/archived_issues/ipj_14-3/143_trill.html',
  'https://web.archive.org/web/20210204031636/https://cumulusnetworks.com/blog/celebrating-ecmp-part-two/',
  'http://ppa.launchpad.net/project-calico/calico-X.X/ubuntu',
  'https://kb.isc.org/docs/aa-01141',
  'https://microk8s.io/docs/clustering',
  'https://juju.is/docs',
];

// Ignore patterns are skipped and ignored completely - no visibility whatsoever.
const defaultIgnoreList = [
  /^https:\/\/github\.com\/tigera\/docs\/edit\//i,
  /^https:\/\/github\.com\/projectcalico\/calico\/pull\/\d+$/i,
  /^https:\/\/github\.com\/projectcalico\/calico\/tree\/master\/[\w/.-]+?\.md$/i,
];

// Crawler run lists (used by __tests__/crawler.test.js).

// Extra links the full crawl skips. These are known-dead, rate-limited, example, or temporary.
const crawlerSkipList = [
  /^https?:\/\/([\w-]+\.)?example\.com/,
  /^https:\/\/kubernetes\.io\/docs\/reference\/generated\/kubernetes-api\/v1\.18/i,
  /^https:\/\/v1-(15|16|17|18)\.docs\.kubernetes\.io\/docs\/reference\/generated\/kubernetes-api\/v1\.(15|16|17|18)/i,
  /^https:\/\/github\.com\/projectcalico\/calico\/tree\/master\/[\w/.-]+\.md$/i,
  /^https:\/\/www\.linkedin\.com\/company\/tigera\/?$/,
  /^https:\/\/installer\.calicocloud\.io\/manifests\/.+\/manifests/,
  'http://etcd.co',
  'https://www.tigera.io/project-calico/community',
  'https://openid.net/connect/',
  'https://fedoraproject.org/wiki/EPEL',
  'http://kubernetes.io/docs/user-guide/identifiers#names',
  'http://kubernetes.io/docs/user-guide/volumes#emptydir',
  'http://kubernetes.io/docs/user-guide/labels',
  'https://nvd.nist.gov/vuln/detail/CVE-2017-5638',
  'http://kubernetes.io/docs/user-guide/images#specifying-imagepullsecrets-on-a-pod',
  'http://kubernetes.io/docs/user-guide/annotations',
  'https://git.io/getLatestIstio',
  'https://sns.us-east-2.amazonaws.com',
  'https://success.docker.com/article/docker-ee-best-practices',
  `https://installer.calicocloud.io/`,
  `https://installer.calicocloud.io/charts`,
  `https://docs.tigera.io/calico/charts`,
  'https://downloads.tigera.io/ee/charts',
  'https://Q4GSZWRKBA-dsn.algolia.net',
  'http://backend.stars:6379/status',
  'http://client.client:9000/status',
  'http://frontend.stars:80/status',
  `https://github.com/projectcalico/calico/releases/download/master/ocp.tgz`,
  `https://downloads.tigera.io/ee/master/download/binaries/master/calicoctl`,
  `https://github.com/projectcalico/calico/releases/download/master/install-calico-windows.ps1`,
  `https://downloads.tigera.io/ee/master/download/binaries/master/calicoq`,
  `https://en.wikipedia.org/wiki/Autonomous_System_(Internet)%3E`,
  //`https://installer.calicocloud.io/manifests/v3.15.1-8/manifests`,
  //`https://installer.calicocloud.io/manifests/v3.16.1-0/manifests`,
  //`https://installer.calicocloud.io/manifests/v3.16.1-5/manifests`,
  //`https://installer.calicocloud.io/manifests/v3.16.1-11/manifests`,
  //`https://installer.calicocloud.io/manifests/v3.17.1-0/manifests`,
  //`https://installer.calicocloud.io/manifests/v3.17.1-3/manifests`,
  //`https://installer.calicocloud.io/manifests/v3.17.1-4/manifests`,
  `https://d881b853ae312e00302a84f1e346a77.gr7.us-west-2.eks.amazonaws.com`,
  /^https:\/\/fonts\.googleapis\.com\/css2/, // Google Fonts URLs with semicolons confuse the link checker
  `https://www.googletagmanager.com`,
  'https://www.googletagmanager.com/gtm.js?id=',
  'https://twitter.com/tigeraio',
  'https://twitter.com/projectcalico',
  'https://csrc.nist.gov/publications/detail/fips/140/2/final',
  /^https?:\/\/csrc\.nist\.gov\/projects\/cryptographic-module-validation-program\/certificate\/\d+$/,
  /^https:\/\/installer\.calicocloud\.io:[0-9]{3,4}$/,
  'https://help.ubuntu.com/community/NetworkManager', //==>Origin: http://localhost:4242/calico-enterprise/3.14/operations/troubleshoot/troubleshooting
  'http://dpdk.org/git/dpdk', //==>Origin: https://raw.githubusercontent.com/projectcalico/vpp-dataplane/master/scripts/init_eks.sh
  'http://dpdk.org/git/dpdk-kmods', //==>Origin: https://raw.githubusercontent.com/projectcalico/vpp-dataplane/master/scripts/init_eks.sh
  //For frustrating 503 errors:
  'https://nvd.nist.gov/vuln-metrics/cvss/v3-calculator',
  /^https:\/\/amd64\.ocp\.releases\.ci\.openshift\.org\/?$/, //==>Origin: http://localhost:4242/calico-enterprise/latest/getting-started/install-on-clusters/openshift/hostedcontrolplanes
  //temp
  /^https:\/\/v1-21\.docs\.kubernetes\.io\/docs\/reference\/generated\/kubernetes-api\/v1\.21\//,
  'https://dl.fedoraproject.org/pub/epel/epel-release-latest-7.noarch.rpm',
  'https://www.iana.org/assignments/service-names', //==>Origin: https://downloads.tigera.io/ee/v3.15.2/manifests/tigera-operator.yaml'
  'https://stedolan.github.io/jq/',
  `http://kubernetes.io/docs/user-guide/secrets/`,
  `https://github.com/coreos/flannel/blob/master/Documentation/kube-flannel-rbac.yml`,
  `https://kubernetes.io/docs/tasks/access-application-cluster/configure-cloud-provider-firewall/`,
  `https://raw.githubusercontent.com/projectcalico/calico//node/windows-packaging/CalicoWindows/kubernetes/kube-proxy-service.ps1`,
  `https://projectcalico.docs.tigera.io/master/reference/installation/api#operator.tigera.io/v1.APIServer`,
  `https://projectcalico.docs.tigera.io/master/reference/installation/api#operator.tigera.io/v1.Installation`,
  'https://downloads.tigera.io/ee/master/download/binaries/master/calicoctl-darwin-amd64', //==>Origin: http://localhost:4242/calico-enterprise/next/operations/clis/calicoctl/install
  'https://downloads.tigera.io/ee/master/download/binaries/master/calicoctl-windows-amd64.exe', //==>Origin: http://localhost:4242/calico-enterprise/next/operations/clis/calicoctl/install
  'http://www.iana.org/assignments/service-names', //==>Origin: https://downloads.tigera.io/ee/v3.14.4/manifests/tigera-operator.yaml
  'http://docs.openstack.org/',
  'http://docs.openstack.org', //This seems to be temporarily down.
  'https://docs.openstack.org/install-guide/environment-etcd.html', // 403 from OpenStack docs WAF in Netlify build environment
  'https://tools.ietf.org/html/rfc5925',
  'https://datatracker.ietf.org/doc/html/rfc1149',
  'https://datatracker.ietf.org/doc/html/rfc7938',
  'https://tools.ietf.org/html/rfc5890',
  'https://tools.ietf.org/html/rfc1123',
  'http://cr.yp.to/libtai/tai64.html#tai64n',
  'https://thenewstack.io/faster-troubleshooting-with-dynamic-packet-capture/', //==>Origin: http://localhost:4242/calico-cloud/visibility/packetcapture
  'https://golang.org/pkg/crypto/tls/#ClientAuthType', //==>Origin: https://downloads.tigera.io/ee/v3.17.0/manifests/tigera-prometheus-operator.yaml. The dead link is automatically redirected to a working page, so no fix needed in the origin.
  'https://downloads.tigera.io/ee/archives/release-master-master.tgz', //==> This started after redesigning the archive procedure.
  'http://nginx-svc.curl-ns.svc.cluster.local:80',
  'http://nginx-svc.service-ns.svc.cluster.local:80',
  'https://calicousers.slack.com/',
  'https://calicousers.slack.com/archives/C017220EXU1',
  'https://tigera-manager.mycompany.com',
  'https://kb.isc.org/article/AA-01141/31/How-to-workaround-IPv6-prefix-length-issues-with-ISC-DHCP-clients.html',
  'https://www.snort.org/documents',
  'https://www.snort.org/downloads/#rule-downloads',
  'https://www.projectcalico.org/everything-you-need-to-know-about-kubernetes-networking-on-azure/',
  'https://www.tigera.io/calico-support/',
  'https://www.tigera.io/legal/calico-cloud-support-policy',
  'https://www.tigera.io/tutorials/?_sf_s=Deploy%20Service%20Mesh',
  'https://www.projectcalico.org/comparing-kube-proxy-modes-iptables-or-ipvs/',
  'https://www.projectcalico.org/hands-on-with-calicos-ebpf-service-handling/',
  'https://www.tigera.io/blog/?_sft_post_tag=project-calico',
  'https://www.tigera.io/tutorials/?_sf_s=%27calico%20ebpf%20and%20xdp%27,',
  'https://www.tigera.io/tutorials/?_sf_s=Calico%20Basics',
  'https://www.tigera.io/tutorials/?_sf_s=WireGuard',
  'https://www.elastic.co/guide/en/apm/server/current/configuring-howto-apm-server.html',
  'https://www.elastic.co/guide/en/elasticsearch/reference/current/vm-max-map-count.html',
  /^https:\/\/www\.wireguard\.com\/.+/,
  'https://godoc.org/time#Duration',
  'https://www.tigera.io/contact',
  'https://www.projectcalico.org/contact',
  'https://hub.docker.com/_/microsoft-windows-servercore',
  'https://github.com/tigera/operator/blob/master/pkg/render/applicationlayer/modsec-core-ruleset/modsecdefault.conf',
  'https://github.com/tigera/operator/blob/master/pkg/render/applicationlayer/modsec-core-ruleset/crs-setup.conf',
  'https://github.com/tigera/operator/tree/master/pkg/render/applicationlayer/modsec-core-ruleset',
  'https://kubernetes.io/docs/setup/production-environment/tools/kops/#2-5-create-a-route53-domain-for-your-cluster',
  'https://pkgs.k8s.io/',
  'https://apt.kubernetes.io/',
  'https://docs.tigera.io/calico-enterprise/3.15/about-calico-enterprise',
  'https://your-jira-instance-name.atlassian.net/rest/api/2/issue/',
  'https://bugzilla.netfilter.org/show_bug.cgi?id=1119',
  'https://webexapis.com/v1/messages',
  'https://www.projectcalico.org/everything-you-need-to-know-about-kubernetes-ingress-networking/',
  'https://www.projectcalico.org/everything-you-need-to-know-about-kubernetes-networking-on-google-cloud/',
  'https://www.projectcalico.org/everything-you-need-to-know-about-kubernetes-pod-networking-on-aws/',
  'https://www.projectcalico.org/everything-you-need-to-know-about-kubernetes-services-networking/',
  'https://www.projectcalico.org/introducing-the-calico-ebpf-dataplane/',
  'https://www.projectcalico.org/kubernetes-service-ip-route-advertisement/',
  'https://www.projectcalico.org/live-migration-from-flannel-to-calico/',
  'https://www.projectcalico.org/why-bgp/',
  'https://www.tigera.io/blog/calico-ipam-explained-and-enhanced/',
  'https://www.tigera.io/blog/faster-troubleshooting-of-microservices-containers-and-kubernetes-with-dynamic-packet-capture/',
  'https://www.tigera.io/blog/hands-on-guide-how-to-scan-and-block-container-images-to-mitigate-sbom-attacks/',
  'https://www.tigera.io/blog/kubernetes-security-policy-10-critical-best-practices/',
  'https://www.tigera.io/blog/when-linux-conntrack-is-no-longer-your-friend/',
  'https://www.tigera.io/blog/why-bgp/',
  'https://docs.nginx.com/nginx-ingress-controller/configuration/',
  'https://docs.nginx.com/nginx-ingress-controller/configuration/global-configuration/configmap-resource',
  'https://prometheus.io/docs/prometheus/latest/disabled_features/', // ==>Origin: https://downloads.tigera.io/ee/v3.17.4/manifests/tigera-prometheus-operator.yaml
  'https://prometheus.io/docs/prometheus/latest/feature_flags/', // ==>Origin: https://downloads.tigera.io/ee/v3.20.0-1.0/manifests/tigera-prometheus-operator.yaml
  'https://docs.fluentd.org/filter/grep',
  'https://techcommunity.microsoft.com/t5/networking-blog/direct-server-return-dsr-in-a-nutshell/ba-p/693710',
  'https://www.f5.com/glossary/cookie-poisoning', //TEMPORARY
  'https://www.f5.com/glossary/cross-site-scripting', //TEMPORARY
  'https://www.f5.com/glossary/sql-injection', //TEMPORARY
  'https://www.f5.com/labs/articles/threat-intelligence/application-protection-report-2019--episode-2--2018-breach-trend', //TEMPORARY
  'https://installer.calicocloud.io/manifests/cc-operator/latest/deploy-with-container-security.yaml', //TEMPORARY
  'https://stackoverflow.com/questions/tagged/calico',
  /^https?:\/\/github\.com\//,
  /^https?:\/\/(git|examples)\.k8s\.io\//,
  'https://console.developers.google.com/apis/library/admin.googleapis.com/',
  'https://docs.splunk.com/Documentation/Splunk/8.0.0/Data/UsetheHTTPEventCollector',
  'https://guardian.calico-system.svc',
  'https://developer.hashicorp.com/terraform',
  'https://www.terraform.io/',
  'http://developer.openstack.org/api-ref-networking-v2.html',
  'https://docs.openstack.org/kolla-ansible/rocky/user/multi-regions.html',
  'https://archive.istio.io/v1.15/docs/setup/additional-setup/sidecar-injection/#automatic-sidecar-injection',
  'https://istio.io/v1.15/docs/reference/config/security/peer_authentication/',
  'https://istio.io/v1.15/docs/setup/install/',
  'https://sysctl-explorer.net/net/ipv4/fib_multipath_hash_policy/',
  'https://calico-docs.mcp.kapa.ai',
  'https://docs.tigera.io/img/calico-logo-2026-badge.png',
  'http://www.w3.org/2000/svg', // Appears in SVG file 'xmlns', doesn't need checking
  'https://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html', // TEMP
  'https://review.openstack.org/#/c/344008/',
  'http://www.faqs.org/rfcs/rfc1966.html',
  'http://www.faqs.org/rfcs/rfc4893.html',
];

// Pages whose links the crawler does not check at all (literal or regex).
// Example: a license file that must keep license text unmodified, even with dead links.
const skipOriginsForLC = [
  // All origins to skip link checking (literal or regex)
  // Examples:
  // /\/reference\/legal\/felix$/,
  // 'http://localhost:4242/calico/3.24/reference/legal/felix',

  // Skip this license attribution file, since we need to include the text of licenses unmodified,
  // and some have dead links
  'http://localhost:4242/calico/3.24/reference/legal/projectcalico',
  'http://localhost:4242/calico/3.25/reference/legal/projectcalico',
  'http://localhost:4242/calico/3.26/reference/legal/projectcalico',
  'http://localhost:4242/calico/latest/reference/legal/projectcalico',
  'http://localhost:4242/calico/next/reference/legal/projectcalico',
  'http://localhost:4242/calico/3.25/reference/legal/node',
];

module.exports = {
  defaultSkipList,
  defaultIgnoreList,
  crawlerSkipList,
  skipOriginsForLC,
};
