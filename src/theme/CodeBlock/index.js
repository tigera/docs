import React from 'react';
import CodeBlock from '@theme-original/CodeBlock';
import Details from '@theme/Details';
import styles from './styles.module.css';

export default function CodeBlockWrapper(props) {
  const { collapsible, title, metastring, ...otherProps } = props;
  const NO_VAL = 'noValidation';

  const noValidation = typeof props[NO_VAL] !== 'undefined'
    || (typeof metastring === 'string' && metastring.includes(NO_VAL));

  const codeBlockValidation = <div data-codeblock-validation={!noValidation}>
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
