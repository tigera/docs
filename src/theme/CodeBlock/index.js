import React from 'react';
import CodeBlock from '@theme-original/CodeBlock';
import Details from '@theme/Details';
import styles from './styles.module.css';

export default function CodeBlockWrapper(props) {
  const { collapsible, title, metastring, ...otherProps } = props;

  if (collapsible) {
    const summary = <summary className={styles.codeBlockSummary}>{title}</summary>;

    return (
      <Details
        summary={summary}
        className={styles.codeBlockDetails}
      >
        <CodeBlock {...otherProps} />
      </Details>
    );
  }

  return (
    <>
      <CodeBlock {...props} />
    </>
  );
}
