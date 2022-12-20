import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';
import Link from '@docusaurus/Link';

const FeatureList = [
  {
    title: 'Calico Open Source',
    img: '/img/calico-logo.png',
    link: 'calico/about',
    description: <>Calico Open Source...</>,
  },
  {
    title: 'Calico Enterprise',
    img: '/img/calico-enterprise-logo.png',
    link: 'calico-enterprise/about-calico-enterprise',
    description: <>Calico Enterprise...</>,
  },
  {
    title: 'Calico Cloud',
    img: '/img/calico-cloud-logo.png',
    link: 'calico-cloud',
    description: <>Calico Cloud...</>,
  },
];

function Feature({ img, title, description, link }) {
  return (
    <div className={clsx('col col--4')}>
      <div className='text--center'>
        <Link href={link}>
          <img
            src={img}
            alt={title}
          />
        </Link>
      </div>
      <div className='text--center padding-horiz--md'>
        <h1>{title}</h1>
        <p className={styles.featureDescription}>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className='container'>
        <div className='row'>
          {FeatureList.map((props, idx) => (
            <Feature
              key={idx}
              {...props}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
