import React from 'react';
import MDXComponents from '@theme-original/MDXComponents';
import ReqsSys from '@site/src/components/partials/reqs-sys';
import ReqsKernel from '@site/src/components/partials/reqs-kernel';
import AutoHostendpointsMigrate from '@site/src/components/partials/auto-hostendpoints-migrate';

export default {
    // Re-use the default mapping
    ...MDXComponents,

    // all of our partials
    ReqsSys: ReqsSys,
    ReqsKernel: ReqsKernel,
    AutoHostendpointsMigrate,
};
