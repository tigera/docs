import React, { isValidElement } from 'react';
import CodeBlock from '@theme-original/CodeBlock';
import Details from '@theme/Details';
import styles from './styles.module.css';

type Child = {
  props: {
    children: string[];
  };
};

const isString = (obj: any): obj is string => typeof obj === 'string';

const stringifyChilden = (children: React.ReactNode | string) => {
  if (isString(children)) {
    return children;
  }

  const childrenArray = React.Children.toArray(children);

  if (childrenArray.some((child) => isValidElement(child))) {
    return (childrenArray as Child[])
      .flatMap((child) => (isString(child) ? child : child.props.children))
      .join('')
      .replace('\n\n', '\n');
  }

  return children;
};

export default function CodeBlockWrapper(props) {
  const { collapsible, noValidation, title, metastring, ...otherProps } = props;

  const nv = typeof noValidation === 'boolean' && noValidation;
  const codeBlockValidation = (
    <div data-codeblock-validation={!nv}>
      {collapsible ? (
        <CodeBlock {...otherProps} />
      ) : (
        <CodeBlock
          {...props}
          children={stringifyChilden(props.children)}
        />
      )}
    </div>
  );

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

  return <>{codeBlockValidation}</>;
}
