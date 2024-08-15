import React from 'react';
import clsx from 'clsx';
import { ThemeClassNames } from '@docusaurus/theme-common';
import { useSidebarBreadcrumbs } from '@docusaurus/plugin-content-docs/client';
import { useHomePageRoute } from '@docusaurus/theme-common/internal';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { translate } from '@docusaurus/Translate';
import styles from './styles.module.css';
import { useProductId } from '../../utils/useProductId';
import { getProductNameById } from '../../utils/getProductNameById';
// TODO move to design system folder
function BreadcrumbsItemLink({ children, href, isLast }) {
  const className = 'breadcrumbs__link';
  if (isLast) {
    return (
      <span
        className={className}
        itemProp='name'
      >
        {children}
      </span>
    );
  }
  return href ? (
    <Link
      className={className}
      href={href}
      itemProp='item'
    >
      <span itemProp='name'>{children}</span>
    </Link>
  ) : (
    // TODO Google search console doesn't like breadcrumb items without href.
    // The schema doesn't seem to require `id` for each `item`, although Google
    // insist to infer one, even if it's invalid. Removing `itemProp="item
    // name"` for now, since I don't know how to properly fix it.
    // See https://github.com/facebook/docusaurus/issues/7241
    <span className={className}>{children}</span>
  );
}
// TODO move to design system folder
function BreadcrumbsItem({ children, active, index, addMicrodata }) {
  return (
    <li
      {...(addMicrodata && {
        itemScope: true,
        itemProp: 'itemListElement',
        itemType: 'https://schema.org/ListItem',
      })}
      className={clsx('breadcrumbs__item', {
        'breadcrumbs__item--active': active,
      })}
    >
      {children}
      <meta
        itemProp='position'
        content={String(index + 1)}
      />
    </li>
  );
}
function HomeBreadcrumbItem() {
  const homeHref = useBaseUrl('/');
  return (
    <li className='breadcrumbs__item'>
      <Link
        aria-label={translate({
          id: 'theme.docs.breadcrumbs.home',
          message: 'Home page',
          description: 'The ARIA label for the home page in the breadcrumbs',
        })}
        className={clsx('breadcrumbs__link', styles.breadcrumbsItemLink)}
        href={homeHref}
      >
        Home
      </Link>
    </li>
  );
}
function usuBreadCrumbsWithProduct(sidebarBreadcrumbs) {
  const productId = useProductId();

  const [breadcrumbs, setBreadcrumbs] = React.useState([
    {
      label: getProductNameById(productId),
      type: 'link',
      href: '/',
    },
    ...(sidebarBreadcrumbs || []),
  ]);

  React.useEffect(() => {
    // just take the link from navbar to not invent the wheel and care about current version, root doc etc
    const navbarLink = Array.from(document.getElementsByClassName(`navbar-product-link_${productId}`))[0];

    if (navbarLink) {
      breadcrumbs.splice(0, 1, {
        label: getProductNameById(productId),
        type: 'link',
        href: navbarLink.href.replace(location.origin, ''),
      });

      setBreadcrumbs([...breadcrumbs]);
    }
  }, []);

  return breadcrumbs;
}
export default function DocBreadcrumbs() {
  const sidebarBreadcrumbs = useSidebarBreadcrumbs();
  const breadcrumbs = usuBreadCrumbsWithProduct(sidebarBreadcrumbs);

  const homePageRoute = useHomePageRoute();
  if (!breadcrumbs) {
    return null;
  }

  return (
    <nav
      className={clsx(ThemeClassNames.docs.docBreadcrumbs, styles.breadcrumbsContainer)}
      aria-label={translate({
        id: 'theme.docs.breadcrumbs.navAriaLabel',
        message: 'Breadcrumbs',
        description: 'The ARIA label for the breadcrumbs',
      })}
    >
      <ul
        className='breadcrumbs'
        itemScope
        itemType='https://schema.org/BreadcrumbList'
      >
        {homePageRoute && <HomeBreadcrumbItem />}
        {breadcrumbs.map((item, idx) => {
          const isLast = idx === breadcrumbs.length - 1;
          return (
            <BreadcrumbsItem
              key={idx}
              active={isLast}
              index={idx}
              addMicrodata={!!item.href}
            >
              <BreadcrumbsItemLink
                href={item.href}
                isLast={isLast}
              >
                {item.label}
              </BreadcrumbsItemLink>
            </BreadcrumbsItem>
          );
        })}
      </ul>
    </nav>
  );
}
