import React from 'react';
import ReactDOMServer from 'react-dom/server';
import CodeBlock from '@theme-original/CodeBlock';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useLocation } from '@docusaurus/router';

function useURLsCheck(props) {
  const { siteConfig } = useDocusaurusContext();
  const { pathname } = useLocation();

  if (siteConfig.customFields.isTesting) {
    const childrenStr =
      typeof props.children === 'string' ? props.children : ReactDOMServer.renderToString(props.children);
    const regexp = /(https(?:(?!<|>).)*?\.yaml)/g;
    const urls = Array.from(childrenStr.matchAll(regexp)).map((matched) => matched[1]);

    urls.forEach((url) => {
      console.info(`[CodeBlock url] ${url} [location] ${pathname}`);
    });
  }
}

export default function CodeBlockWrapper(props) {
  useURLsCheck(props);

  return (
    <>
      <CodeBlock {...props} />
    </>
  );
}
