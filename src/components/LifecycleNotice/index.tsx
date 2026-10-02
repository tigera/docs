import React from 'react';
import Admonition from '@theme/Admonition';

/**
 * The lifecycle statuses a page can declare about itself.
 *
 * This is deliberately narrower than the set in `data/feature-status.yaml`, which also records
 * `ga` and `removed`. A page says nothing when a feature is generally available, and a removed
 * feature has no page left to say it on, so neither is expressible here.
 */
export type LifecycleStatus = 'tech-preview' | 'deprecated';

interface Variant {
  /** The admonition type, chosen to match what each notice already used before this component. */
  type: 'note' | 'warning';
  /** The title when no feature name is given. */
  title: string;
  /** The title when one is. The name is a title, not a sentence subject, so that plural names
   *  ("Native v3 CRDs") and singular ones ("Gateway WAF") both read correctly with one body. */
  titleFor: (feature: string) => string;
  body: string;
}

const VARIANTS: Record<LifecycleStatus, Variant> = {
  'tech-preview': {
    type: 'note',
    title: 'Technology preview',
    titleFor: (feature) => `Technology preview: ${feature}`,
    body:
      'Technology preview features are for evaluation and feedback only and are not supported ' +
      'for production use. Behavior, APIs, and configuration may change before a feature reaches ' +
      'general availability.',
  },
  deprecated: {
    type: 'warning',
    title: 'Deprecation and removal notice',
    titleFor: (feature) => `Deprecated: ${feature}`,
    body:
      'Deprecated features are still present and supported, but they are scheduled for removal. ' +
      'You should consider migrating away from a deprecated feature before it is removed.',
  },
};

export interface LifecycleNoticeProps {
  status: LifecycleStatus;
  /** The feature name, used as the admonition title. Omit it on a page whose heading already
   *  names the feature unambiguously. */
  feature?: string;
  /**
   * The matching `id` in `data/feature-status.yaml`.
   *
   * Not rendered, and never read at runtime — the notice is a page-level editorial statement and
   * does not depend on the data file. It exists so the build-time drift check can bind an inline
   * notice to a feature; pages that declare their status in front matter use `lifecycle-id`
   * instead. Without it an inline notice is simply not drift-checked.
   */
  id?: string;
  /** Extra guidance shown after the standard sentence, such as what to migrate to. */
  children?: React.ReactNode;
}

/**
 * A feature lifecycle notice.
 *
 * Used directly in MDX when only part of an otherwise generally available page is affected.
 * For a whole page, declare `lifecycle-status` in front matter instead and let
 * `src/remark/lifecycleNoticePlugin.js` place this component after the page title, so the
 * wording and position cannot drift from one page to the next.
 */
const LifecycleNotice: React.FC<LifecycleNoticeProps> = ({ status, feature, children }) => {
  const variant = VARIANTS[status];

  if (!variant) {
    // Thrown rather than rendered: a mistyped status in front matter or a prop should fail the
    // build, not publish a page that quietly says nothing about a feature's status.
    throw new Error(
      `LifecycleNotice: unknown status "${status}". Expected one of ${Object.keys(VARIANTS).join(', ')}.`
    );
  }

  return (
    <Admonition type={variant.type} title={feature ? variant.titleFor(feature) : variant.title}>
      <p>{variant.body}</p>
      {children}
    </Admonition>
  );
};

export default LifecycleNotice;
