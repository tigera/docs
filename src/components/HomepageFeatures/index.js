import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';
import Link from "@docusaurus/Link";

const FeatureList = [
    {
        title: 'Calico',
        Svg: require('@site/static/img/calico-logo.svg').default,
        link: '/docs/calico/about/about-calico',
        description: (
            <>
                Calico...
            </>
        ),
    },
    {
        title: 'Calico Enterprise',
        Svg: require('@site/static/img/calico-enterprise-logo.svg').default,
        link: '/docs/calico-enterprise/about-calico-enterprise',
        description: (
            <>
                Calico Enterprise...
            </>
        ),
    },
    {
        title: 'Calico Cloud',
        Svg: require('@site/static/img/calico-cloud-logo.svg').default,
        link: '/docs/calico-cloud',
        description: (
            <>
                Calico Cloud...
            </>
        ),
    },
];

function Feature({Svg, title, description, link}) {
    return (
        <div className={clsx('col col--4')}>
            <div className="text--center">
                <Link href={link}>
                    <Svg className={styles.featureSvg} role="img"/>
                </Link>
            </div>
            <div className="text--center padding-horiz--md">
                <h3>{title}</h3>
                <p>{description}</p>
            </div>
        </div>
    );
}

export default function HomepageFeatures() {
    return (
        <section className={styles.features}>
            <div className="container">
                <div className="row">
                    {FeatureList.map((props, idx) => (
                        <Feature key={idx} {...props} />
                    ))}
                </div>
            </div>
        </section>
    );
}
