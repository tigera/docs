import React from 'react';
import clsx from 'clsx';
import Translate from '@docusaurus/Translate';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';

/**
 * The 404 page body.
 *
 * Swizzled from theme-classic to replace the stock text, which tells the reader to
 * "contact the owner of the site that linked you to the original URL". On a docs site
 * the reader is nearly always someone who followed a stale link or an agent that
 * guessed a URL, and neither can act on that advice.
 *
 * Docusaurus prerenders this into 404.html, so the links below are in the served
 * markup rather than only after hydration. That matters because the audience includes
 * clients that read the HTML and never run the JavaScript.
 *
 * llms.txt and sitemap.xml are static files rather than routes, so they are plain
 * anchors: <Link> would try to resolve them through the client-side router.
 */
export default function NotFoundContent({ className }) {
  return (
    <main className={clsx('container margin-vert--xl', className)}>
      <div className='row'>
        <div className='col col--6 col--offset-3'>
          <Heading
            as='h1'
            className='hero__title'
          >
            <Translate
              id='theme.NotFound.title'
              description='The title of the 404 page'
            >
              Page Not Found
            </Translate>
          </Heading>
          <p>There is no Calico documentation page at this URL.</p>
          <p>Start from one of these instead:</p>
          <ul>
            <li>
              <Link to='/calico/latest/about'>Calico Open Source</Link>
            </li>
            <li>
              <Link to='/calico-enterprise/latest/about'>Calico Enterprise</Link>
            </li>
            <li>
              <Link to='/calico-cloud/about'>Calico Cloud</Link>
            </li>
            <li>
              <a href='/sitemap.xml'>sitemap.xml</a> — every published URL
            </li>
            <li>
              <a href='/llms.txt'>llms.txt</a> — an index of the documentation, written for agents
            </li>
          </ul>
          <p>
            Every documentation page also has a Markdown version at its own URL with <code>.md</code> appended.
          </p>
        </div>
      </div>
    </main>
  );
}
