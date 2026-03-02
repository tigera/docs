# Vale Spelling Triage — Unversioned Docs

**Total**: 7,451 violations (6,610 spelling, 629 terms, 176 substitutions)
**Unique spelling terms**: 927

## Breakdown by rule

| Rule | Count | Action |
|------|-------|--------|
| Vale.Spelling | 6,610 | Triage below |
| Vale.Terms | 629 | Mostly `tigera→Tigera` (168), `yaml→YAML` (147), `bgp→BGP` (62), `dns→DNS` (54) — fix in source |
| CalicoStyle.Substitutions | 176 | Mostly `kubernetes→Kubernetes` (110), `helm→Helm` (30), `Dataplane→data plane` (29) — fix in source |

---

## Category 1: Legitimate terms → ADD TO ACCEPT LIST

These are real technical/brand terms that should never be flagged.

### Brands & Products (accept-brands.txt)
<!-- Every term here needs your explicit approval -->
- Grafana (39)
- Fluentd (21+19=40)
- Multus (23)
- Kubespray (13)
- Wireguard (28+9=37)
- Openshift (24+4=28)
- Cloudwatch (18)
- Atlassian (10)
- Wireshark (9)
- Tanzu (7)
- Bottlerocket (5)
- Shopify (2)
- Mellanox (2)
- Traefik (1)
- Dynatrace (1)
- Equifax (1)
- Kiali (1)
- Grype (1)
- Syft (1)

These are all okay. But for thoroughness, double-check that theiryre' all correct.

### Technical Terms (accept-terminology.txt)
- datastore[s]? (539+85+3=627)
- boolean (147)
- conntrack (99+9=108)
- autodetection (98+17=115) — also: autodetect, autodetected, autodetects, autodetecting
- namespaced (106)
- peerings (64+8=72)
- failsafe (60+8=68)
- hostname (51+1=52)
- subnets (107) — `subnet` already accepted, need `subnets` pattern
- multicast (12+1=13)
- reachability (25) — also: routability
- rollout[s]? (32+4+3=39)
- daemonset[s]? (27+2+2+1=32)
- configmap (27)
- liveness (16)
- failover (9) — also: failback
- veth[s]? (17+3=20)
- loopback (8)
- multipath (3)
- unicast (1)
- hairpinning (3)
- firewalled (3)
- nexthop[s]? (6+3=9)
- interoperate (3+2=5)
- netmask (3)
- interworking (4)
- passthrough (1)
- hardcoded (1)
- multitenant (1)
- schedulable (6) — also: unschedulable
- sandboxed (1)
- unencrypted (8)
- unencapsulated (4)

### Tools & CLIs (accept-tools.txt)
- kubectl (128) — already in Substitutions but not accept list
- nginx (117+9=126)
- busybox (49+2=51)
- prometheus (37)
- kubeconfig (73+6=79)
- tcpdump (14+1=15)
- systemd (21)
- powershell (13+1=14)
- coredns (13)
- containerd (10+3=13)
- memcached (6)
- elasticsearch (5)
- confd (31+2=33)
- ipvs (8)
- golang (12)
- felix (35) — Calico component
- hugepages (13)

ok for now.


### Acronyms & Abbreviations (accept-acronyms.txt)
- CRDs (20) — also: CRs
- IPsec (31+3+5=39) — various casings
- ENIs (52)
- HEPs (24)
- WEPs (13)
- MTUs (14)
- CVEs (14)
- VPCs (29+2=31)
- VLANs (9)
- ACLs (7)
- NICs (7)
- AZs (9)
- ISPs (6)
- CSRs (6)
- FQDNs (3)
- URIs (3)
- TTLs (4)
- SIEMs (2)
- LUTs (6)
- DNAT[s]? (7+5=12)
- NAT[s]? (various)
- SNATed (9) — also: SNATted, NATted, NATed
- ARPs (6) — also: ARPed
- ANDed (2)

I'm not sure what the best strategy is here. For some things I'm okay but for everything else there must be a mechanism to expand on first mention. Perhpas they belong in accept, but each should also be added to a rule that asks if it's first mention and suggest the expanded term?

### Infrastructure/Networking Terms
- ipam (36+3=39) as a term always capitalized
- vxlan (4+3=7) capital
- bool (37) If this is just in those tables, this should be Boolean
- tcp (32) capital
- udp (5) capital
- sctp (3) cap
- http (17) cap
- icmp (3+14=17) cap
- cidr (18) — already in accept as CIDR but lowercase used  cap only
- mtu (2) cap
- BGP terms: already accepted
- stdout/stderr/stdin (21+6+10=37)
- repo[s]? (23+4=27)
- sudo (9)
- apiserver (22+22+2=46)
- datacenter[s]? (15+18=33)
- devops (6+1=7)
- uplink[s]? (15+1=16)
- syncer[s]? (16+6=22)

---

## Category 2: Code artifacts in prose → FIX WITH BACKTICKS

These are API resource names, field names, or code identifiers that appear in running prose without backtick formatting. They should NOT go in the accept list — they should be backticked in the source.

### Kubernetes/Calico Resource Names (camelCase/PascalCase)
- BGPPeer (119), BGPConfiguration (105), IPPool (65), BGPFilter (26)
- DNSCache (33), IPSet (23), APIServer (22)
- IPReservation (8), IPPools (8), IPSets (5)
- BGPPassword (9), BGPFilters (4), BGPStatus (3), BGPPeers (1), BGPConfigurations (1)

### API Field Names (camelCase)
- namespaceSelector (40), interfaceName (18), prefixAdvertisements (18)
- performanceHints (12), hostPort (12), startTime (16), endTime (16)
- natOutgoing (11), nodeSelector (11) — also: nodeName, nodePorts, etc.
- assignmentMode (7), egressIPSupport (7), ingressProtected (8), egressProtected (6)
- envoyEnabled (8), reconcilerPeriod (9), clusterIPs (9)
- All snake_case identifiers: traffic_direction, feature_control, connection_status, etc.

### Docusaurus/Build Terms
- navbar (53), figCount (3), lastUpdated (7)
- tslib (10), lodash (4), cytoscape (4), codemirror (4), etc.

### Memory/Performance Metrics
- mspan (16), mcache (16), mallocs (8), goroutines (8)

---

## Category 3: Actual Typos → FIX IN SOURCE

- visibile → visible (2)
- visibiliity → visibility (1)
- peformance → performance (2)
- bandwith → bandwidth (3)
- Scaning → Scanning (1)
- paramaters → parameters (1)
- microsegemntation → microsegmentation (1)
- vulnerabilties → vulnerabilities (1)
- explit → explicit (1)
- adjustted → adjusted (1)
- namepace → namespace (1)
- controlle → controller (1)
- cluser → cluster (1)
- suach → such (1)
- matchPaterrn → matchPattern (2)
- Cillium → Cilium (1)
- bpg → BGP? (1)
- stablesAddress → stableAddress? (1)
- modifiedsimplified → ? (1)
all ok
---

## Category 4: Ambiguous / Needs Discussion

- Mebibytes (98) — legitimate unit but unusual frequency; are these all in prose or generated content?
- inscope (23) — is this project jargon or should it be "in scope" / "in-scope"? change to in-scope
- lookback (8) vs lookups (40) — lookback might be a typo for "lookback" or legitimate both are ok
- hipstershop (20) — Google's demo app name; accept or backtick? backtick
- Fortigate (14) — should this be "FortiGate"? yes
- diags (14) — abbreviation for diagnostics; accept? ok in code. otherwise diagnostics
- performant (7) — real word but sometimes flagged as jargon add
- proxying (12) — legitimate gerund add accept
- zTunnel (12) — Istio ztunnel component add to tools/ components

---

## Next Steps

1. Review each category and approve/reject terms
2. For Category 1: I'll add approved terms to categorized accept files
3. For Category 2: I'll fix backtick formatting across all docs
4. For Category 3: I'll fix typos across all docs (versioned + unversioned)
5. For Category 4: Tell me what to do with each
