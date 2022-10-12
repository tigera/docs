import React from 'react';

import MDXComponents from '@theme-original/MDXComponents';
import ReqsSys from '@site/src/components/partials/reqs-sys';
import ReqsKernel from '@site/src/components/partials/reqs-kernel';
import AutoHostendpointsMigrate from '@site/src/components/partials/auto-hostendpoints-migrate';
import HostEndpointsUpgrade from '@site/src/components/partials/hostendpoints-upgrade';
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
import ReleaseNotesCalico from '@site/src/components/partials/release-notes-calico';
import ReleaseNotesCalicoEnterprise from '@site/src/components/partials/release-notes-calico-enterprise';
import CliConfigIntro from '@site/src/components/partials/cli-config-intro';

const partials = {
  ReqsSys,
  ReqsKernel,
  HostEndpointsUpgrade,
  InstallOpenshiftBeforeYouBegin,
  CalicoWindowsInstall,
  PodCidrSed,
  EnvironmentFile,
  AutoHostendpointsMigrate,
  ConfigureManagedCluster,
  InstallAKS,
  InstallEKS,
  InstallGeneric,
  InstallGKE,
  PrivateRegistryRegular,
  UpgradeOperatorSimple,
  InstallOpenShift,
  InstallOpenShiftManifests,
  OpenShiftPullSecret,
  OpenShiftPrometheusOperator,
  GeekDetails,
  ReleaseNotesCalico,
  ReleaseNotesCalicoEnterprise,
  CliConfigIntro,
};

const wrappedPartials = wrapPartials(partials);

export default {
  ...MDXComponents,
  ...wrappedPartials,
};

function wrapPartials(partials) {
  const wrapPartial = (Partial) => (props) =>
    (
      <div className='docs-partial'>
        <Partial {...props} />
      </div>
    );

  return Object.fromEntries(Object.entries(partials).map(([key, comp]) => [key, wrapPartial(comp)]));
}
