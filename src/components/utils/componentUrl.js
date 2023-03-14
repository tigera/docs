function componentUrl(component, release) {
  if (release.title === 'master') {
    // For the master docs, there are no releases to link to. So this page will just return an empty string.
    // Except for 'calicoctl', as we do host direct downloads to a binary of calicoctl.
    if (component === 'calicoctl') {
      return 'https://www.projectcalico.org/builds/calicoctl';
    }
    return '';
  }
  switch (component) {
    case 'calico/node':
      return `https://github.com/projectcalico/calico/releases/tag/${release.components[component].version}`;
    case 'calicoctl':
      return `https://github.com/projectcalico/calicoctl/releases/tag/${release.components[component].version}`;
    case 'calico/cni':
      return `https://github.com/projectcalico/calico/releases/tag/${release.components[component].version}`;
    case 'calico/kube-controllers':
      return `https://github.com/projectcalico/calico/releases/tag/${release.components[component].version}`;
    case 'networking-calico':
      return `https://github.com/projectcalico/calico/releases/tag/${release.components[component].version}`;
    case 'typha':
      return `https://github.com/projectcalico/typha/releases/tag/${release.components[component].version}`;
    case 'flannel':
      return `https://github.com/coreos/flannel/releases/tag/${release.components[component].version}`;
    case 'calico/dikastes':
      return `https://github.com/projectcalico/calico/releases/tag/${release.components[component].version}`;
    case 'flexvol':
      return `https://github.com/projectcalico/pod2daemon/releases/tag/${release.components[component].version}`;
  }
}

module.exports.componentUrl = componentUrl;
