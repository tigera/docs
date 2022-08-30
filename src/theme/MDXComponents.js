import React from 'react';
import MDXComponents from '@theme-original/MDXComponents';
import ReqsSys from '@site/src/components/partials/reqs-sys';
import ReqsKernel from '@site/src/components/partials/reqs-kernel';
import HostEndpointsUpgrade from '@site/src/components/partials/hostendpoints-upgrade';
import PodCidrSed from '@site/src/components/partials/pod-cidr-sed';

export default {
    // Re-use the default mapping
    ...MDXComponents,

    // all of our partials
    ReqsSys,
    ReqsKernel,
    HostEndpointsUpgrade,
    PodCidrSed,
};
