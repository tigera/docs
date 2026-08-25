import React, { useCallback, useEffect, useRef, useState } from 'react';

import { Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import Head from '@docusaurus/Head';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useDoc } from '@docusaurus/plugin-content-docs/client';
import IconCopy from '@theme/Icon/Copy';
import IconSuccess from '@theme/Icon/Success';

import { hasMarkdownTwin, twinPathFor } from '@site/src/utils/markdownTwin';

import styles from './styles.module.css';

const COPIED_FOR_MS = 2000;

// Docusaurus's themed icons default to their intrinsic size, which is far larger
// than this control; they take props straight through to the svg.
const ICON_SIZE = { width: 15, height: 15 };

/** The conventional "M↓" markdown mark, as used on the reference design. */
function IconMarkdown({ width, height }) {
  return (
    <svg width={width} height={height} viewBox='0 0 16 12' aria-hidden='true' focusable='false'>
      <rect x='0.6' y='0.6' width='14.8' height='10.8' rx='1.6' fill='none'
        stroke='currentColor' strokeWidth='1.1' />
      <path d='M3 8.6V3.4l2 2.6 2-2.6v5.2M11 3.4v4.2M9.4 6.2 11 8l1.6-1.8'
        fill='none' stroke='currentColor' strokeWidth='1.1'
        strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  );
}

/**
 * Chevron matching the sidebar's collapse carets. Infima tints those with a filter
 * over a background image, which an inline SVG cannot reuse, so `.chevron` takes
 * --ifm-menu-color directly.
 */
function ChevronIcon({ flipped }) {
  return (
    <svg
      className={flipped ? `${styles.chevron} ${styles.chevronFlipped}` : styles.chevron}
      viewBox='0 0 16 16'
      aria-hidden='true'
      focusable='false'
    >
      <path d='M4.5 6.25 8 9.75l3.5-3.5' />
    </svg>
  );
}

/**
 * The dropdown panel, styled from Infima variables rather than the repo's Chakra
 * Menu theme. That theme hard-codes light-mode colours and nothing renders a Chakra
 * Menu today, so it is untested; Infima variables are what the rest of this control
 * already uses and Docusaurus switches them on the colour mode.
 */
const MENU_SX = {
  bg: 'var(--ifm-background-surface-color, var(--ifm-background-color))',
  border: '1px solid var(--ifm-color-emphasis-200)',
  // Must be set explicitly. The repo's Chakra Menu theme hard-codes
  // color: 'tigeraBlack' on the list with no colour-mode branch, and items inherit
  // it, so without this the item titles are dark on dark in dark mode.
  color: 'var(--ifm-font-color-base)',
  borderRadius: '12px',
  boxShadow: '0 8px 24px rgb(0 0 0 / 12%)',
  minW: '17rem',
  p: '6px',
  zIndex: 'var(--ifm-z-index-dropdown, 100)',
};

const ITEM_SX = {
  alignItems: 'center',
  bg: 'transparent',
  // Explicitly none: Root.js sets resetCSS={false}, so the <button> a MenuItem
  // renders keeps the user agent's 2px outset border. The link item is an <a> and
  // has none, which is why only the first item showed one.
  border: 'none',
  borderRadius: '8px',
  color: 'inherit',
  display: 'flex',
  gap: '0.7rem',
  px: '0.6rem',
  py: '0.5rem',
  textDecoration: 'none',
  _hover: { bg: 'var(--ifm-color-emphasis-100)', color: 'inherit', textDecoration: 'none' },
  _focus: { bg: 'var(--ifm-color-emphasis-100)' },
};

function Item({ icon, title, description }) {
  return (
    <>
      <span className={styles.itemIcon}>{icon}</span>
      <span className={styles.itemText}>
        <span className={styles.itemTitle}>{title}</span>
        <span className={styles.itemDescription}>{description}</span>
      </span>
    </>
  );
}

/**
 * Advertise the page's Markdown twin, to machines and to people.
 *
 * The link tag is the machine-readable half: a crawler or agent that fetches the
 * HTML can discover the Markdown without guessing a URL convention. The split
 * button is the human half, for anyone pasting a page into an assistant — copying
 * is the common case, so it is the primary action rather than a menu item.
 *
 * Renders nothing for pages with no twin, so neither half ever points at a 404.
 */
export default function MarkdownActions() {
  const { metadata } = useDoc();
  const { siteConfig } = useDocusaurusContext();
  const [copied, setCopied] = useState(false);

  const exclusions = siteConfig.customFields?.markdownTwinExclusions ?? [];
  const twin = hasMarkdownTwin(metadata.permalink, exclusions)
    ? twinPathFor(metadata.permalink)
    : null;

  // Cleared on unmount and before each new one, so a quick second click or a
  // navigation inside the two seconds cannot leave a timer setting state behind it.
  const resetTimer = useRef(undefined);
  useEffect(() => () => window.clearTimeout(resetTimer.current), []);

  const markCopied = useCallback(() => {
    setCopied(true);
    window.clearTimeout(resetTimer.current);
    resetTimer.current = window.setTimeout(() => setCopied(false), COPIED_FOR_MS);
  }, []);

  const copyMarkdown = useCallback(async () => {
    // fetch only rejects on network failure, so a 404 would otherwise put an HTML
    // error page on the clipboard and report success.
    const fetchTwin = () =>
      fetch(twin).then((response) => {
        if (!response.ok) {
          throw new Error(`${twin} responded ${response.status}`);
        }
        return response;
      });

    try {
      if (typeof ClipboardItem === 'function') {
        // The fetch stays inside the ClipboardItem rather than being awaited first.
        // WebKit requires the clipboard write to happen in the same user gesture,
        // and an intervening await forfeits it — writeText then rejects with
        // NotAllowedError, which is why the obvious version of this silently did
        // nothing in Safari. Passing a pending promise keeps the gesture, and
        // Chromium and Firefox accept it too.
        await navigator.clipboard.write([
          new ClipboardItem({
            // Re-wrap as text/plain rather than passing the response blob straight
            // through. The twin is served as text/markdown, and Chromium rejects a
            // ClipboardItem whose key does not match its blob's type.
            'text/plain': fetchTwin()
              .then((response) => response.text())
              .then((text) => new Blob([text], { type: 'text/plain' })),
          }),
        ]);
      } else {
        await navigator.clipboard.writeText(await (await fetchTwin()).text());
      }
      markCopied();
    } catch {
      // The clipboard needs a secure context and permission, and either can refuse.
      // Nothing to recover with, but the View item beside this reaches the same file.
      setCopied(false);
    }
  }, [twin, markCopied]);

  if (!twin) {
    return null;
  }

  return (
    <>
      <Head>
        {/* Relative on purpose: siteConfig.url is the production domain, so an
            absolute href would point every deploy preview at docs.tigera.io. */}
        <link rel='alternate' type='text/markdown' href={twin} />
      </Head>

      {/* isLazy so the panel is not in the DOM until opened; without it Chakra
          mounts it on every page and hides it with visibility. autoSelect is left
          on, so opening from the keyboard lands on the first item, which is the
          behaviour the menu pattern calls for. */}
      <Menu placement='bottom-end' isLazy>
        {({ isOpen }) => (
          <div className={styles.wrapper}>
            <div className={styles.split}>
              <button
                type='button'
                className={styles.primary}
                onClick={copyMarkdown}
                aria-label={copied ? 'Page copied as Markdown' : 'Copy page as Markdown'}
              >
                {copied ? <IconSuccess {...ICON_SIZE} /> : <IconCopy {...ICON_SIZE} />}
                <span aria-hidden='true'>{copied ? 'Copied' : 'Copy page'}</span>
              </button>

              <MenuButton
                type='button'
                className={styles.toggle}
                aria-label='More Markdown options'
              >
                <ChevronIcon flipped={isOpen} />
              </MenuButton>
            </div>

            <MenuList sx={MENU_SX}>
              <MenuItem sx={ITEM_SX} onClick={copyMarkdown}>
                <Item
                  icon={<IconCopy {...ICON_SIZE} />}
                  title='Copy page'
                  description='Copy page as Markdown for LLMs'
                />
              </MenuItem>

              <MenuItem
                as='a'
                sx={ITEM_SX}
                href={twin}
                target='_blank'
                rel='noopener noreferrer'
              >
                <Item
                  icon={<IconMarkdown {...ICON_SIZE} />}
                  title='View as Markdown ↗'
                  description='View this page as plain text'
                />
              </MenuItem>
            </MenuList>
          </div>
        )}
      </Menu>
    </>
  );
}
