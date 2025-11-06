import React from 'react';

import Link from '@docusaurus/Link';
import GeekDetails from '@site/src/components/partials/GeekDetails';

import { prodname, prodnameWindows, baseUrl } from '../../variables';

export default function InstallOpenshiftBeforeYouBegin(props) {
  return (
    <>
      <p>
        <strong>CNI support</strong>
      </p>
      <p>Calico CNI for networking with {prodname} network policy</p>
      <p>The geeky details of what you get:</p>
      <GeekDetails details='Policy:Calico,IPAM:Calico,CNI:Calico,Overlay:VXLAN,Routing:Calico,Datastore:Kubernetes' />
      <p>
        <strong>Required</strong>
      </p>
      <ul>
        <li>
          <p>
            A <Link href={`${baseUrl}/getting-started/compatibility#openshift`}>compatible OpenShift cluster</Link>
          </p>
          <p>
            Your environment meets the {prodname}{' '}
            <Link href={`${baseUrl}/getting-started/install-on-clusters/openshift/requirements`}>
              system requirements
            </Link>
          </p>
        </li>
        <li>
          <p>
            A{' '}
            <Link
              href='https://cloud.redhat.com/'
              target='_blank'
              rel='noopener noreferrer'
            >
              RedHat account
            </Link>{' '}
            for the pull secret to provision an OpenShift cluster.
          </p>
        </li>
        <li>
          <p>
            OpenShift command line interface from{' '}
            <Link
              href='https://cloud.redhat.com/openshift/install/aws/installer-provisioned'
              target='_blank'
              rel='noopener noreferrer'
            >
              cloud.redhat.com
            </Link>
          </p>
        </li>
        <li>
          <p>
            Cluster meets the {prodname}{' '}
            <Link href={`${baseUrl}/getting-started/install-on-clusters/openshift/requirements`}>system requirements</Link>
          </p>
        </li>
        <li>
          <p>
            <strong>If installing on AWS</strong>, a{' '}
            <Link href='https://docs.openshift.com/container-platform/4.2/installing/installing_aws/installing-aws-account.html'>
              configured AWS account
            </Link>{' '}
            appropriate for OpenShift 4, and have{' '}
            <Link href='https://docs.aws.amazon.com/sdk-for-java/v1/developer-guide/setup-credentials.html'>
              set up your AWS credentials
            </Link>
            . Note that the OpenShift installer supports a subset of{' '}
            <Link href='https://docs.openshift.com/container-platform/4.3/installing/installing_aws/installing-aws-account.html#installation-aws-regions_installing-aws-account'>
              AWS regions
            </Link>
            .
          </p>
        </li>
        <li>
          <p>
            OpenShift installer and OpenShift command line interface from{' '}
            <Link href='https://cloud.redhat.com/openshift/install/aws/installer-provisioned'>cloud.redhat.com</Link>
          </p>
        </li>
        <li>
          <p>
            A{' '}
            <Link href='https://docs.openshift.com/container-platform/4.1/installing/installing_aws/installing-aws-default.html#ssh-agent-using_installing-aws-default'>
              generated a local SSH private key
            </Link>{' '}
            that is added to your ssh-agent
          </p>
        </li>
        <li>
          <p>
            A <Link href={`${baseUrl}/getting-started/install-on-clusters/calico-enterprise`}>Tigera license key and credentials</Link>
          </p>
        </li>
        {props.clusterOS === 'hybrid' && (
          <>
            <li>The {prodnameWindows} installation zip archive, which you can get from your support representative.</li>
            <p>
              <strong>Limitations</strong>
            </p>
            <p>
              Due to an <Link href='https://bugzilla.redhat.com/show_bug.cgi?id=1768858'>upstream issue</Link>, Windows
              pods can only be run in specific namespaces if you disable SCC. To do this, label the namespace with{' '}
              <code>openshift.io/run-level: &quot;1&quot;</code>.
            </p>
          </>
        )}
      </ul>
    </>
  );
}
