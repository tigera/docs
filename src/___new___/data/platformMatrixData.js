/**
 * Platform compatibility matrix data for Calico Enterprise.
 *
 * CE_VERSIONS: ordered list of CE versions shown as table columns.
 * platforms: array of platform objects with per-version compatibility data.
 *
 * displayType controls cell rendering:
 *   'k8s-range'        – shows k8sVersions string (e.g. "1.31 - 1.34")
 *   'platform-and-k8s' – shows platformVersion + k8sVersions on two lines
 *   'platform-only'    – shows platformVersion only (e.g. OpenShift)
 */

export const CE_VERSIONS = ['3.23', '3.22', '3.21', '3.20'];

export const platforms = [
  {
    id: 'aks',
    label: 'AKS',
    displayType: 'k8s-range',
    data: {
      '3.23': { k8sVersions: '1.33 - 1.35' },
      '3.22': { k8sVersions: '1.31 - 1.34' },
      '3.21': { k8sVersions: '1.31 - 1.33' },
      '3.20': { k8sVersions: '1.29 - 1.31' },
    },
  },
  {
    id: 'eks',
    label: 'EKS',
    displayType: 'k8s-range',
    data: {
      '3.23': { k8sVersions: '1.33 - 1.35' },
      '3.22': { k8sVersions: '1.31 - 1.34' },
      '3.21': { k8sVersions: '1.31 - 1.33' },
      '3.20': { k8sVersions: '1.29 - 1.31' },
    },
  },
  {
    id: 'gke',
    label: 'GKE',
    displayType: 'k8s-range',
    data: {
      '3.23': { k8sVersions: '1.33 - 1.35' },
      '3.22': { k8sVersions: '1.31 - 1.34' },
      '3.21': { k8sVersions: '1.31 - 1.33' },
      '3.20': { k8sVersions: '1.29 - 1.31' },
    },
  },
  {
    id: 'charmed',
    label: 'Charmed Kubernetes',
    displayType: 'k8s-range',
    data: {
      '3.23': { k8sVersions: '1.33 - 1.35' },
      '3.22': { k8sVersions: '1.31 - 1.34' },
      '3.21': { k8sVersions: '1.31 - 1.33' },
      '3.20': { k8sVersions: '1.29 - 1.31' },
    },
  },
  {
    id: 'kubeadm',
    label: 'Kubernetes (kubeadm)',
    displayType: 'k8s-range',
    data: {
      '3.23': { k8sVersions: '1.33 - 1.35' },
      '3.22': { k8sVersions: '1.31 - 1.34' },
      '3.21': { k8sVersions: '1.31 - 1.33' },
      '3.20': { k8sVersions: '1.29 - 1.31' },
    },
  },
  {
    id: 'kops',
    label: 'kOps on AWS',
    displayType: 'k8s-range',
    data: {
      '3.23': { k8sVersions: '1.33 - 1.34' },
      '3.22': { k8sVersions: '1.31 - 1.34' },
      '3.21': { k8sVersions: '1.31 - 1.32' },
      '3.20': { k8sVersions: '1.29 - 1.30' },
    },
  },
  {
    id: 'mke',
    label: 'MKE',
    displayType: 'platform-and-k8s',
    data: {
      '3.23': { platformVersion: 'MKE 3.8', k8sVersions: '1.31' },
      '3.22': { platformVersion: 'MKE 3.8', k8sVersions: '1.31' },
      '3.21': { platformVersion: 'MKE 3.8', k8sVersions: '1.31' },
      '3.20': { platformVersion: 'MKE 3.8', k8sVersions: '1.31' },
    },
  },
  {
    id: 'mke4k',
    label: 'MKE 4k',
    displayType: 'platform-and-k8s',
    data: {
      '3.23': { platformVersion: 'MKE 4k 4.1.2', k8sVersions: '1.32' },
      '3.22': { platformVersion: 'MKE 4k 4.1.2', k8sVersions: '1.32' },
    },
  },
  {
    id: 'openshift',
    label: 'OpenShift',
    displayType: 'platform-only',
    footnote: 'OpenShift versions shown are OpenShift releases, not Kubernetes versions.',
    data: {
      '3.23': { platformVersion: '4.18 - 4.20' },
      '3.22': { platformVersion: '4.17 - 4.20' },
      '3.21': { platformVersion: '4.16 - 4.18' },
      '3.20': { platformVersion: '4.15 - 4.17' },
    },
  },
  {
    id: 'rke',
    label: 'RKE',
    displayType: 'platform-and-k8s',
    data: {
      '3.23': { platformVersion: 'RKE 1.8', k8sVersions: '1.32' },
      '3.22': { platformVersion: 'RKE 1.8', k8sVersions: '1.32' },
      '3.21': { platformVersion: 'RKE 1.8', k8sVersions: '1.32' },
      '3.20': { platformVersion: 'RKE 1.7', k8sVersions: '1.31' },
    },
  },
  {
    id: 'rke2',
    label: 'RKE2',
    displayType: 'k8s-range',
    data: {
      '3.23': { k8sVersions: '1.33 - 1.34' },
      '3.22': { k8sVersions: '1.31 - 1.34' },
      '3.21': { k8sVersions: '1.31 - 1.33' },
      '3.20': { k8sVersions: '1.29 - 1.31' },
    },
  },
  {
    id: 'tkg',
    label: 'TKG',
    displayType: 'platform-and-k8s',
    data: {
      '3.23': { platformVersion: 'TKG 2.4', k8sVersions: '1.27' },
      '3.22': { platformVersion: 'TKG 2.4', k8sVersions: '1.27' },
      '3.21': { platformVersion: 'TKG 2.4', k8sVersions: '1.27' },
      '3.20': { platformVersion: 'TKG 2.4', k8sVersions: '1.27' },
    },
  },
];
