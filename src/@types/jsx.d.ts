declare namespace JSX {
    export import IntrinsicElements = React.JSX.IntrinsicElements
    export import Element = React.JSX.Element
  }

declare module '@docusaurus/Link' {
  import * as React from 'react';

  interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    to?: string;
    href?: string;
    children?: React.ReactNode;
    className?: string;
    activeClassName?: string;
    isNavLink?: boolean;
    prependBaseUrlToHref?: boolean;
  }

  const Link: React.FC<LinkProps>;
  export default Link;
}