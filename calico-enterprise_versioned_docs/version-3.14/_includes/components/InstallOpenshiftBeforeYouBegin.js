import React from 'react';

import Link from '@docusaurus/Link';

import { prodname, prodnameWindows, baseUrl } from '../../variables';

export default function InstallOpenshiftBeforeYouBegin(props) {
  return (
    <>
      <p>
        <strong>Required</strong>
      </p>
      <ul>
        <li>
          <p>
            Your environment meets the {prodname}{' '}
            <Link href={`${baseUrl}/getting-started/install-on-clusters/openshift/requirements`}>
              system requirements
            </Link>
          </p>
        </li>
        <li>
          <p>
            <Link href={`${baseUrl}/getting-started/install-on-clusters/calico-enterprise`}>
              Private registry credentials and license key
            </Link>
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
            A <Link href='https://cloud.redhat.com/'>RedHat account</Link> for the pull secret to provision an OpenShift
            cluster.
          </p>
        </li>
        <li>
          <p>
            OpenShift installer <strong>v4.8 or 4.9</strong> and OpenShift command line interface from{' '}
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
