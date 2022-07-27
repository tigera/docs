import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Calico',
    Svg: require('@site/static/img/calico-logo.svg').default,
    description: (
      <>
        Calico...
      </>
    ),
  },
  {
    title: 'Calico Enterprise',
    Svg: require('@site/static/img/calico-enterprise-logo.svg').default,
    description: (
      <>
        Calico Enterprise...
      </>
    ),
  },
  {
    title: 'Calico Cloud',
    Svg: require('@site/static/img/calico-cloud-logo.svg').default,
    description: (
      <>
        Calico Cloud...
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
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
