import React from 'react';
import MDXComponents from '@theme-original/MDXComponents';
import ReqsSys from '@site/src/components/partials/reqs-sys';

export default {
    // Re-use the default mapping
    ...MDXComponents,

    // all of our partials
    ReqsSys: ReqsSys,
};
