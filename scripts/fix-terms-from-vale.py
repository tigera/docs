#!/usr/bin/env python3
"""
Read vale JSON output and apply Terms substitutions on the exact flagged lines.
Only applies safe casing substitutions (not context-dependent ones).

Usage:
    bash scripts/vale-lint.sh --output=JSON calico/ calico-cloud/ calico-enterprise/ | \
        python3 scripts/fix-terms-from-vale.py [--dry-run]
"""

import json
import re
import sys
from pathlib import Path

DRY_RUN = '--dry-run' in sys.argv

# Safe substitutions: these are always the same replacement regardless of context
# Only include terms where the fix is unambiguous casing
SAFE_SUBS = {
    'yaml': 'YAML',
    'kubernetes': 'Kubernetes',
    'bgp': 'BGP',
    'prometheus': 'Prometheus',
    'dns': 'DNS',
    'ipam': 'IPAM',
    'felix': 'Felix',
    'busybox': 'BusyBox',
    'daemonset': 'DaemonSet',
    'vpp': 'VPP',
    'alertmanager': 'Alertmanager',
    'fluentd': 'Fluentd',
    'cni': 'CNI',
    'tcp': 'TCP',
    'kibana': 'Kibana',
    'typha': 'Typha',
    'linux': 'Linux',
    'coredns': 'CoreDNS',
    'configmap': 'ConfigMap',
    'Nginx': 'NGINX',
    'ipvs': 'IPVS',
    'github': 'GitHub',
    'wireguard': 'WireGuard',
    'icmp': 'ICMP',
    'elasticsearch': 'Elasticsearch',
    'udp': 'UDP',
    'sctp': 'SCTP',
    'openshift': 'OpenShift',
    'Kubectl': 'kubectl',
    'IPSec': 'IPsec',
    'Busybox': 'BusyBox',
    'Kubeadm': 'kubeadm',
    'IPtables': 'iptables',
    'IPTables': 'iptables',
    'NFTables': 'nftables',
    'xdp': 'XDP',
    'Wordpress': 'WordPress',
    'Daemonsets': 'DaemonSets',
    'Kubelet': 'kubelet',
    'Confd': 'confd',
    'Etcd': 'etcd',
    'eks': 'EKS',
    'Daemonset': 'DaemonSet',
    'jira': 'Jira',
    'daemonsets': 'DaemonSets',
    'Devops': 'DevOps',
    'netfilter': 'Netfilter',
    'Golang': 'golang',
    'vxlan': 'VXLAN',
    'kops': 'kOps',
    'Dnsmasq': 'dnsmasq',
    'istio': 'Istio',
    'goldmane': 'Goldmane',
    'Tcpdump': 'tcpdump',
    'coraza': 'Coraza',
    'Containerd': 'containerd',
    'Kubevirt': 'KubeVirt',
}

# Skip these — context-dependent, need manual review
SKIP = {'tigera', 'api', 'apiserver', 'ip', 'ui', 'http', 'cidr', 'REGEX',
        'IPS', 'vpn', 'heps', 'crd', 'nic', 'waf', 'crs', 'CRS', 'nfqueue'}

INLINE_CODE_RE = re.compile(r'`[^`]+`')
IMAGE_RE = re.compile(r'!\[([^\]]*)\]\([^)]*\)')
URL_RE = re.compile(r'https?://[^\s)>\]]+')


def protect_zones(line):
    protected = []
    for m in INLINE_CODE_RE.finditer(line):
        protected.append((m.start(), m.end()))
    for m in IMAGE_RE.finditer(line):
        protected.append((m.start(), m.end()))
    for m in URL_RE.finditer(line):
        protected.append((m.start(), m.end()))
    return protected


def is_protected(pos, end, protected):
    for pstart, pend in protected:
        if pos < pend and end > pstart:
            return True
    return False


def apply_sub(line, term, replacement):
    protected = protect_zones(line)
    pattern = re.compile(r'(?<![`\w/\-\.])' + re.escape(term) + r'(?![`\w/\-\.])')
    result = []
    last_end = 0
    for m in pattern.finditer(line):
        if is_protected(m.start(), m.end(), protected):
            continue
        result.append(line[last_end:m.start()])
        result.append(replacement)
        last_end = m.end()
    if not result:
        return line
    result.append(line[last_end:])
    return ''.join(result)


def main():
    data = json.load(sys.stdin)

    # Collect fixes: {filepath: {line_num: [(term, replacement)]}}
    from collections import defaultdict
    fixes = defaultdict(lambda: defaultdict(list))

    for filepath, violations in data.items():
        for v in violations:
            if v.get('Check') != 'Vale.Terms':
                continue
            word = v['Match'].strip()
            if word in SKIP:
                continue
            if word not in SAFE_SUBS:
                continue
            line_num = v['Line']
            fixes[filepath][line_num].append((word, SAFE_SUBS[word]))

    modified = 0
    total_subs = 0

    for filepath in sorted(fixes.keys()):
        path = Path(filepath)
        if not path.exists():
            continue

        content = path.read_text()
        lines = content.split('\n')
        changed = False

        # Check if line is inside a code fence
        in_fence = False
        for i, line in enumerate(lines):
            if line.strip().startswith('```'):
                in_fence = not in_fence
                continue
            if in_fence:
                continue

            line_num = i + 1  # 1-indexed
            if line_num not in fixes[filepath]:
                continue

            new_line = line
            for term, replacement in fixes[filepath][line_num]:
                new_line = apply_sub(new_line, term, replacement)

            if new_line != line:
                lines[i] = new_line
                changed = True
                total_subs += 1

        if changed:
            if not DRY_RUN:
                path.write_text('\n'.join(lines))
            modified += 1

    print(f"{'DRY RUN: ' if DRY_RUN else ''}Modified {modified} files, {total_subs} substitutions")


if __name__ == '__main__':
    main()
