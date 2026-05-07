/**
 * Platform compatibility data for Calico Enterprise.
 *
 * Single source of truth for the matrix on the compatibility page and
 * (eventually) for platform-specific snippets on the per-platform install pages.
 *
 * Per-platform fields:
 *   id            unique key.
 *   label         display name in the row header.
 *   installPath   link target wrapped around the row label.
 *   cni           supported CNI options for this platform.
 *   notes         footnote rendered under the table; row label gets a *.
 *   alignedWith   id of another platform whose `versions` data this platform
 *                 inherits — used for AKS/EKS/GKE/Charmed which align with
 *                 kubeadm's k8s ranges. Update kubeadm and they all follow.
 *   versions      { [ceVersion]: SupportEntry[] }. Required unless alignedWith.
 *
 * Each cell holds 0+ SupportEntry items: { k8sVersions?, platformVersion? }.
 *   - 0 entries  → cell renders "—".
 *   - 1 entry    → single line, platformVersion above k8s sub-line.
 *   - 2+ entries → stacked (e.g. MKE on CE 3.22 has both 3.9 and 3.8).
 */

export const CE_VERSIONS = ['3.20', '3.21', '3.22', '3.23'];
export const VISIBLE_COLUMN_COUNT = 3;

const CALICO_CNI = '$[prodname] CNI with network policy';

export const PLATFORMS = [
  {
    id: 'aks',
    label: 'AKS',
    installPath: 'install-on-clusters/aks',
    cni: [CALICO_CNI, 'Azure CNI with $[prodname] network policy'],
    alignedWith: 'kubeadm',
  },
  {
    id: 'eks',
    label: 'EKS',
    installPath: 'install-on-clusters/eks',
    cni: [CALICO_CNI, 'AWS CNI with $[prodname] network policy'],
    alignedWith: 'kubeadm',
  },
  {
    id: 'gke',
    label: 'GKE',
    installPath: 'install-on-clusters/gke',
    cni: ['GKE CNI with $[prodname] network policy'],
    alignedWith: 'kubeadm',
  },
  {
    id: 'charmed',
    label: 'Charmed Kubernetes',
    installPath: 'install-on-clusters/charmed-k8s',
    cni: [CALICO_CNI],
    alignedWith: 'kubeadm',
  },
  {
    id: 'kubeadm',
    label: 'Kubernetes (kubeadm)',
    installPath: 'install-on-clusters/kubernetes',
    cni: [CALICO_CNI],
    versions: {
      '3.23': [{ k8sVersions: '1.33 - 1.35' }],
      '3.22': [{ k8sVersions: '1.31 - 1.34' }],
      '3.21': [{ k8sVersions: '1.31 - 1.33' }],
      '3.20': [{ k8sVersions: '1.29 - 1.31' }],
    },
  },
  {
    id: 'kops',
    label: 'kOps on AWS',
    installPath: 'install-on-clusters/aws',
    cni: [CALICO_CNI, 'AWS CNI with $[prodname] network policy'],
    versions: {
      '3.23': [{ k8sVersions: '1.33 - 1.34' }],
      '3.22': [{ k8sVersions: '1.31 - 1.34' }],
      '3.21': [{ k8sVersions: '1.31 - 1.32' }],
      '3.20': [{ k8sVersions: '1.29 - 1.30' }],
    },
  },
  {
    id: 'mke',
    label: 'MKE',
    installPath: 'install-on-clusters/docker-enterprise',
    cni: [CALICO_CNI],
    versions: {
      '3.23': [{ platformVersion: 'MKE 3.9', k8sVersions: '1.34' }],
      '3.22': [
        { platformVersion: 'MKE 3.9', k8sVersions: '1.34' },
        { platformVersion: 'MKE 3.8', k8sVersions: '1.31' },
      ],
      '3.21': [{ platformVersion: 'MKE 3.8', k8sVersions: '1.31' }],
      '3.20': [{ platformVersion: 'MKE 3.8', k8sVersions: '1.31' }],
    },
  },
  {
    id: 'mke4k',
    label: 'MKE 4k',
    installPath: 'install-on-clusters/docker-enterprise',
    cni: [CALICO_CNI],
    versions: {
      '3.23': [{ platformVersion: 'MKE 4k 4.1.2', k8sVersions: '1.32' }],
      '3.22': [{ platformVersion: 'MKE 4k 4.1.2', k8sVersions: '1.32' }],
    },
  },
  {
    id: 'openshift',
    label: 'OpenShift',
    installPath: 'install-on-clusters/openshift/installation',
    cni: [CALICO_CNI],
    notes: 'OpenShift cells show OpenShift releases, not Kubernetes versions.',
    versions: {
      '3.23': [{ platformVersion: '4.18 - 4.20' }],
      '3.22': [{ platformVersion: '4.17 - 4.20' }],
      '3.21': [{ platformVersion: '4.16 - 4.18' }],
      '3.20': [{ platformVersion: '4.15 - 4.17' }],
    },
  },
  {
    id: 'rke',
    label: 'RKE',
    installPath: 'install-on-clusters/rancher',
    cni: [CALICO_CNI],
    versions: {
      '3.23': [{ platformVersion: 'RKE 1.8', k8sVersions: '1.32' }],
      '3.22': [{ platformVersion: 'RKE 1.8', k8sVersions: '1.32' }],
      '3.21': [{ platformVersion: 'RKE 1.8', k8sVersions: '1.32' }],
      '3.20': [{ platformVersion: 'RKE 1.7', k8sVersions: '1.31' }],
    },
  },
  {
    id: 'rke2',
    label: 'RKE2',
    installPath: 'install-on-clusters/rke2',
    cni: [CALICO_CNI],
    versions: {
      '3.23': [{ k8sVersions: '1.33 - 1.34' }],
      '3.22': [{ k8sVersions: '1.31 - 1.34' }],
      '3.21': [{ k8sVersions: '1.31 - 1.33' }],
      '3.20': [{ k8sVersions: '1.29 - 1.31' }],
    },
  },
  {
    id: 'tkg',
    label: 'TKG',
    installPath: 'install-on-clusters/tkg',
    cni: [CALICO_CNI],
    versions: {
      '3.23': [{ platformVersion: 'TKG 2.4', k8sVersions: '1.27' }],
      '3.22': [{ platformVersion: 'TKG 2.4', k8sVersions: '1.27' }],
      '3.21': [{ platformVersion: 'TKG 2.4', k8sVersions: '1.27' }],
      '3.20': [{ platformVersion: 'TKG 2.4', k8sVersions: '1.27' }],
    },
  },
];

export function getPlatform(id) {
  return PLATFORMS.find((p) => p.id === id);
}

export function getEntries(platform, ceVersion) {
  if (!platform) return [];
  if (platform.alignedWith) {
    return getEntries(getPlatform(platform.alignedWith), ceVersion);
  }
  return platform.versions?.[ceVersion] ?? [];
}
