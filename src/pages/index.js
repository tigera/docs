import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import InnerLayout from '../___new___/components/InnerLayout/innerLayout';


export default function Home() {
    const { siteConfig } = useDocusaurusContext();

    return (
        <Layout
            title={`${siteConfig.title}`}
            description='Tigera and Calico (projectcalico) documentation'
        >
            <InnerLayout />
        </Layout>
    );
}
