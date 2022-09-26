import React from 'react';

import MDXComponents from '@theme-original/MDXComponents';
import ReqsSys from '@site/src/components/partials/reqs-sys';
import ReqsKernel from '@site/src/components/partials/reqs-kernel';
import AutoHostendpointsMigrate from '@site/src/components/partials/auto-hostendpoints-migrate';
import HostEndpointsUpgrade from '@site/src/components/partials/hostendpoints-upgrade';
import EnterpriseLink from '@site/src/components/partials/enterprise-link';
import InstallOpenshiftBeforeYouBegin from '@site/src/components/partials/install-openshift-before-you-begin';
import CalicoWindowsInstall from '@site/src/components/partials/calico-windows-install';
import PodCidrSed from '@site/src/components/partials/pod-cidr-sed';
import EnvironmentFile from '@site/src/components/partials/environment-file';
import ConfigureManagedCluster from '@site/src/components/partials/configure-managed-cluster';
import InstallAKS from '@site/src/components/partials/install-aks';
import InstallEKS from '@site/src/components/partials/install-eks';
import InstallGeneric from '@site/src/components/partials/install-generic';
import InstallGKE from '@site/src/components/partials/install-gke';
import PrivateRegistryRegular from '@site/src/components/partials/private-registry-regular';
import UpgradeOperatorSimple from '@site/src/components/partials/upgrade-operator-simple';
import InstallOpenShift from '@site/src/components/partials/install-openshift';
import InstallOpenShiftManifests from '@site/src/components/partials/install-openshift-manifests';
import OpenShiftPullSecret from '@site/src/components/partials/openshift-pull-secret';
import OpenShiftPrometheusOperator from '@site/src/components/partials/openshift-prometheus-operator';
import GeekDetails from '@site/src/components/partials/geek-details';

const wrap = (Partial) => (props) =>
  (
    <div className='docs-partial'>
      <Partial {...props} />
    </div>
  );

export default {
  // Re-use the default mapping
  ...MDXComponents,

  // all of our partials
  ReqsSys: wrap(ReqsSys),
  ReqsKernel: wrap(ReqsKernel),
  HostEndpointsUpgrade: wrap(HostEndpointsUpgrade),
  EnterpriseLink: wrap(EnterpriseLink),
  InstallOpenshiftBeforeYouBegin: wrap(InstallOpenshiftBeforeYouBegin),
  CalicoWindowsInstall: wrap(CalicoWindowsInstall),
  PodCidrSed: wrap(PodCidrSed),
  EnvironmentFile: wrap(EnvironmentFile),
  AutoHostendpointsMigrate: wrap(AutoHostendpointsMigrate),
  ConfigureManagedCluster: wrap(ConfigureManagedCluster),
  InstallAKS: wrap(InstallAKS),
  InstallEKS: wrap(InstallEKS),
  InstallGeneric: wrap(InstallGeneric),
  InstallGKE: wrap(InstallGKE),
  PrivateRegistryRegular: wrap(PrivateRegistryRegular),
  UpgradeOperatorSimple: wrap(UpgradeOperatorSimple),
  InstallOpenShift: wrap(InstallOpenShift),
  InstallOpenShiftManifests: wrap(InstallOpenShiftManifests),
  OpenShiftPullSecret: wrap(OpenShiftPullSecret),
  OpenShiftPrometheusOperator: wrap(OpenShiftPrometheusOperator),
  GeekDetails: wrap(GeekDetails),
};
