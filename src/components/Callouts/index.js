import React from 'react';

import styles from './styles.module.css';

export default function Callouts(props) {
  return <div className={styles.callouts}>{props.children}</div>;
}
