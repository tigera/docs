import React from 'react';
import CodeBlock from '@theme-original/CodeBlock';
import Details from '@theme/Details';
import styles from './styles.module.css';

export default function CodeBlockWrapper(props) {
  const { collapsible, noValidation, title, metastring, ...otherProps } = props;

  const nv = typeof noValidation === 'boolean' && noValidation;
  const codeBlockValidation = <div data-codeblock-validation={!nv}>
    { collapsible ? <CodeBlock {...otherProps} /> : <CodeBlock {...props} /> }
  </div>;

  if (collapsible) {
    const summary = <summary className={styles.codeBlockSummary}>{title}</summary>;

    return (
      <Details
        summary={summary}
        className={styles.codeBlockDetails}
      >
        {codeBlockValidation}
      </Details>
    );
  }

  return (
    <>
      {codeBlockValidation}
    </>
  );
}
