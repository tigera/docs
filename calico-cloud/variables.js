import releases from './releases.json';

const variables = {
  releaseTitle: 'v3.19.0-1.0',
  prodname: 'Calico Cloud',
  prodnamedash: 'calico-cloud',
  baseUrl: '/calico-cloud',
  filesUrl: 'https://docs.calicocloud.io',
  filesUrl_CE: 'https://downloads.tigera.io/ee/v3.19.0-1.0',
  tutorialFilesURL: 'https://docs.tigera.io/files',
  prodnameWindows: 'Calico Enterprise for Windows',
  rootDirWindows: 'C:\\TigeraCalico',
  nodecontainer: 'cnx-node',
  noderunning: 'calico-node',
  cloudversion: 'v3.19.0-1.0-4',
  clouddownloadurl: 'https://installer.calicocloud.io/manifests/v3.19.0-1.0-4',
  clouddownloadbase: 'https://installer.calicocloud.io',
  cloudoperatorimage: 'quay.io/tigera/cc-operator',
  imageassuranceversion: 'v1.14.1',
  tigeraOperator: releases[0]['tigera-operator'],
  dikastesVersion: releases[0].components.dikastes.version,
  releases,
  registry: 'quay.io/',
  imageNames: {
    node: 'tigera/cnx-node',
    kubeControllers: 'tigera/kube-controllers',
  },
};

export default variables;
