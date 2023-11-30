import React from 'react';

import { useLocation } from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import MDXComponents from '@theme-original/MDXComponents';

import GeekDetails from '@site/src/components/partials/GeekDetails';
import Callouts from '@site/src/components/Callouts';

// TO REGISTER A NEW COMPONENT
//
// Add component name to 'partials' array.
// Add corresponding case to swith-case in getCalicoVersionedComponent(),
// if component exists only for Calico, otherwise add a case for each
// get{product}VersionedComponent(), if the product uses this component.

const partials = [
  'ReqsSys',
  'ReqsKernel',
  'HostEndpointsUpgrade',
  'InstallOpenshiftBeforeYouBegin',
  'CalicoWindowsInstall',
  'PodCidrSed',
  'EnvironmentFile',
  'AutoHostendpointsMigrate',
  'ConfigureManagedCluster',
  'InstallAKS',
  'InstallEKS',
  'InstallGeneric',
  'InstallGKE',
  'PrivateRegistryRegular',
  'UpgradeOperatorSimple',
  'InstallOpenShift',
  'InstallOpenShiftManifests',
  'OpenShiftPullSecret',
  'OpenShiftPrometheusOperator',
  'CliConfigIntro',
  'PrivateRegistryImagePath',
  'GettingStartedInstallOnClustersKubernetesHelm',
  'ComponentVersions',
  'MaintenanceClisCalicoqInstalling',
];

const wrappedPartials = wrapPartials(partials);

export default {
  ...MDXComponents,
  ...wrappedPartials,
  GeekDetails,
  Callouts,
};

function resolveComponent(componentName) {
  return (props) => {
    const { pathname } = useLocation();
    const context = useDocusaurusContext();

    const [, prodnamedash, maybeVersion] = pathname.match(/\/(.*?)\/(.*?)\//);
    const versions = context.globalData['docusaurus-plugin-content-docs'][prodnamedash].versions;

    let Component = null;

    const isNext = maybeVersion === 'next';
    const noVersions = !versions || !versions.length;
    if (isNext || noVersions) {
      Component = getComponentForNextVersion(prodnamedash, componentName);
    } else {
      const isLatest = !versions.some((v) => v.name === maybeVersion);
      const version = isLatest ? versions.find((v) => v.isLast).name : maybeVersion;

      Component = getComponentForVersion(prodnamedash, componentName, version);
    }

    if (!Component) {
      console.error(`Cannot resolve ${componentName} component for ${prodnamedash}`);
    }

    return <Component {...props} />;
  };
}

function getComponentForNextVersion(prodnamedash, componentName) {
  switch (prodnamedash) {
    case 'calico-enterprise':
      return require(`../../calico-enterprise/_includes/components/${componentName}`).default;
    case 'calico':
      return require(`../../calico/_includes/components/${componentName}`).default;
    case 'calico-cloud':
      return require(`../../calico-cloud/_includes/components/${componentName}`).default;
    default:
      console.error(`${prodnamedash} product doesn't exist`);
  }
}

function getComponentForVersion(prodnamedash, componentName, version) {
  switch (prodnamedash) {
    case 'calico-enterprise':
      return getCalicoEnterpriseVersionedComponent(version, componentName);
    case 'calico':
      return getCalicoVersionedComponent(version, componentName);
    case 'calico-cloud':
      return getCalicoCloudVersionedComponent(version, componentName);
    default:
      console.error(`${prodnamedash} product doesn't exist`);
  }
}

function getCalicoVersionedComponent(version, componentName) {
  switch (componentName) {
    case 'AutoHostendpointsMigrate':
      return require(`../../calico_versioned_docs/version-${version}/_includes/components/AutoHostendpointsMigrate`)
        .default;
    case 'CalicoWindowsInstall':
      return require(`../../calico_versioned_docs/version-${version}/_includes/components/CalicoWindowsInstall`)
        .default;
    case 'EnvironmentFile':
      return require(`../../calico_versioned_docs/version-${version}/_includes/components/EnvironmentFile`).default;
    case 'HostEndpointsUpgrade':
      return require(`../../calico_versioned_docs/version-${version}/_includes/components/HostEndpointsUpgrade`)
        .default;
    case 'InstallOpenShiftManifests':
      return require(`../../calico_versioned_docs/version-${version}/_includes/components/InstallOpenShiftManifests`)
        .default;
    case 'PodCidrSed':
      return require(`../../calico_versioned_docs/version-${version}/_includes/components/PodCidrSed`).default;
    case 'ReqsKernel':
      return require(`../../calico_versioned_docs/version-${version}/_includes/components/ReqsKernel`).default;
    case 'ReqsSys':
      return require(`../../calico_versioned_docs/version-${version}/_includes/components/ReqsSys`).default;
    case 'ComponentVersions':
      return require(`../../calico_versioned_docs/version-${version}/_includes/components/ComponentVersions`).default;
    default:
      console.error(`Versioned ${componentName} component isn't registered for Calico`);
  }
}

function getCalicoCloudVersionedComponent(version, componentName) {
  switch (componentName) {
    case 'EnvironmentFile':
      return require(`../../calico-cloud_versioned_docs/version-${version}/_includes/components/EnvironmentFile`)
        .default;
    case 'ReqsKernel':
      return require(`../../calico-cloud_versioned_docs/version-${version}/_includes/components/ReqsKernel`).default;
    case 'ReqsSys':
      return require(`../../calico-cloud_versioned_docs/version-${version}/_includes/components/ReqsSys`).default;
    default:
      console.error(`Versioned ${componentName} component isn't registered for Calico Cloud`);
  }
}

function getCalicoEnterpriseVersionedComponent(version, componentName) {
  switch (componentName) {
    case 'CalicoWindowsInstall':
      return require(`../../calico-enterprise_versioned_docs/version-${version}/_includes/components/CalicoWindowsInstall`)
        .default;
    case 'CliConfigIntro':
      return require(`../../calico-enterprise_versioned_docs/version-${version}/_includes/components/CliConfigIntro`)
        .default;
    case 'ConfigureManagedCluster':
      return require(`../../calico-enterprise_versioned_docs/version-${version}/_includes/components/ConfigureManagedCluster`)
        .default;
    case 'EnvironmentFile':
      return require(`../../calico-enterprise_versioned_docs/version-${version}/_includes/components/EnvironmentFile`)
        .default;
    case 'InstallOpenshiftBeforeYouBegin':
      return require(`../../calico-enterprise_versioned_docs/version-${version}/_includes/components/InstallOpenshiftBeforeYouBegin`)
        .default;
    case 'InstallAKS':
      return require(`../../calico-enterprise_versioned_docs/version-${version}/_includes/components/InstallAKS`)
        .default;
    case 'InstallEKS':
      return require(`../../calico-enterprise_versioned_docs/version-${version}/_includes/components/InstallEKS`)
        .default;
    case 'InstallGeneric':
      return require(`../../calico-enterprise_versioned_docs/version-${version}/_includes/components/InstallGeneric`)
        .default;
    case 'InstallGKE':
      return require(`../../calico-enterprise_versioned_docs/version-${version}/_includes/components/InstallGKE`)
        .default;
    case 'InstallOpenShift':
      return require(`../../calico-enterprise_versioned_docs/version-${version}/_includes/components/InstallOpenShift`)
        .default;
    case 'InstallOpenShiftManifests':
      return require(`../../calico-enterprise_versioned_docs/version-${version}/_includes/components/InstallOpenShiftManifests`)
        .default;
    case 'OpenShiftPrometheusOperator':
      return require(`../../calico-enterprise_versioned_docs/version-${version}/_includes/components/OpenShiftPrometheusOperator`)
        .default;
    case 'OpenShiftPullSecret':
      return require(`../../calico-enterprise_versioned_docs/version-${version}/_includes/components/OpenShiftPullSecret`)
        .default;
    case 'PrivateRegistryRegular':
      return require(`../../calico-enterprise_versioned_docs/version-${version}/_includes/components/PrivateRegistryRegular`)
        .default;
    case 'ReqsKernel':
      return require(`../../calico-enterprise_versioned_docs/version-${version}/_includes/components/ReqsKernel`)
        .default;
    case 'ReqsSys':
      return require(`../../calico-enterprise_versioned_docs/version-${version}/_includes/components/ReqsSys`).default;
    case 'UpgradeOperatorSimple':
      return require(`../../calico-enterprise_versioned_docs/version-${version}/_includes/components/UpgradeOperatorSimple`)
        .default;
    case 'PrivateRegistryImagePath':
      return require(`../../calico-enterprise_versioned_docs/version-${version}/_includes/components/PrivateRegistryImagePath`)
        .default;
    case 'GettingStartedInstallOnClustersKubernetesHelm':
      return require(`../../calico-enterprise_versioned_docs/version-${version}/_includes/components/GettingStartedInstallOnClustersKubernetesHelm`)
        .default;
    case 'ComponentVersions':
      return require(`../../calico-enterprise_versioned_docs/version-${version}/_includes/components/ComponentVersions`)
        .default;
    case 'MaintenanceClisCalicoqInstalling':
      return require(`../../calico-enterprise_versioned_docs/version-${version}/_includes/components/MaintenanceClisCalicoqInstalling`)
        .default;
    default:
      console.error(`Versioned ${componentName} component isn't registered for Calico Enterprise`);
  }
}

function wrapPartials(partials) {
  return Object.fromEntries(partials.map((name) => [name, resolveComponent(name)]));
}
