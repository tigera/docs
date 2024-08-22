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
  'InstallEKS',
  'InstallGeneric',
  'InstallGKE',
  'UpgradeOperatorSimple',
  'InstallOpenShift',
  'InstallOpenShiftManifests',
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
    case 'InstallOpenShiftManifests':
      return require(`../../calico_versioned_docs/version-${version}/_includes/components/InstallOpenShiftManifests`)
        .default;
    default:
      console.error(`Versioned ${componentName} component isn't registered for Calico`);
  }
}

function getCalicoCloudVersionedComponent(version, componentName) {
  switch (componentName) {
    default:
      console.error(`Versioned ${componentName} component isn't registered for Calico Cloud`);
  }
}

function getCalicoEnterpriseVersionedComponent(version, componentName) {
  switch (componentName) {
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
    case 'UpgradeOperatorSimple':
      return require(`../../calico-enterprise_versioned_docs/version-${version}/_includes/components/UpgradeOperatorSimple`)
        .default;
    default:
      console.error(`Versioned ${componentName} component isn't registered for Calico Enterprise`);
  }
}

function wrapPartials(partials) {
  return Object.fromEntries(partials.map((name) => [name, resolveComponent(name)]));
}
