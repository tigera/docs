# Feature status

How to mark a feature as a tech preview, deprecated, or removed, and what to update when its status changes.
For the words to use, see [Feature lifecycle wording](style-guide.md#feature-lifecycle-wording).

## How it fits together

Three things record a feature's status, and they have to agree:

- **`data/feature-status.yaml`** is the record. It holds one entry per feature, with the release where its status changed in each product. The release notes tables render from it.
- **Lifecycle front matter** on a page, or a `<LifecycleNotice>` in the page, renders the notice the reader sees. The notice reads nothing from the data file.
- **The release notes** describe the change in prose, and render the tables from the data file.

A test, `yarn test:components`, fails when a page and the data file disagree, so a notice can't outlive the status it describes.

## Add or update the data file entry

Record only status changes.
A status carries forward until the next entry, and before a feature's first entry it didn't exist in that release.

```yaml
  - id: gateway-waf
    name: Gateway WAF
    products:
      calico-enterprise:
        "3.23": tech-preview
        "3.24": ga
      calico-cloud:
        "3.23": tech-preview
        "3.24": ga
```

- `id` is the key that pages use in `lifecycle_id`. Lowercase, hyphenated, and never changed after pages reference it.
- `name` is the feature name as it appears in the tables.
- `status` is `tech-preview`, `ga`, `deprecated`, or `removed`.
- Version keys match the release notes table columns. Calico Enterprise and Calico Cloud entries use the release line, such as `"3.24"`, without the `-1` or `-2` suffix that Docusaurus adds.
- `confirmed: false` keeps an entry in the file without rendering it. Use it when the status isn't settled yet.

## Mark a whole page

When the page is about the feature, declare the status in front matter and write nothing in the body.
The build places the notice directly after the H1.

```yaml
---
description: ...
lifecycle_status: tech-preview
lifecycle_feature: Gateway WAF
lifecycle_id: gateway-waf
---
```

- `lifecycle_status` is `tech-preview` or `deprecated`. A generally available feature says nothing.
- `lifecycle_feature` is the name in the notice title. Omit it when the page title already names the feature.
- `lifecycle_id` is the `id` from the data file. It's optional, but set it when the feature has an entry, because it's what lets the test catch a stale notice.

Write the feature name out in these fields.
Don't use `$[variables]` here, because substitution in front matter isn't reliable.

A page that declares a status but has no H1 fails the build.
So does a misspelled key, such as `lifecycle-status`, or `lifecycle_feature` or `lifecycle_id` without `lifecycle_status`.

## Mark part of a page

When only one section of a page is affected, or the notice needs extra guidance such as what to migrate to, place the component yourself.
It's registered globally, so no import is needed.

```mdx
### Selector-scoped configuration

<LifecycleNotice
  status='tech-preview'
  feature='Selector-scoped Felix configuration'
  id='selector-scoped-felix-config'
/>
```

```mdx
<LifecycleNotice status='deprecated' feature='Application layer policy' id='application-layer-policy-envoy'>
  For similar functionality, use [Istio ambient mode](../../compliance/istio/about-istio-ambient.mdx).
</LifecycleNotice>
```

Don't write the admonition by hand, and don't copy one from another page.
The component keeps the wording the same everywhere.

## Update the release notes

The release notes for the minor that changes the status describe the change in prose and render the lifecycle tables from the data file.
The [release notes template](../calico-enterprise/release-notes/_template.mdx) sets the sections.

- A feature that's new as a tech preview gets an H3 under "New features and enhancements" with "(tech preview)" at the end of the title. A tech preview that carries over from an earlier minor doesn't get the suffix again.
- A deprecation or removal gets a bullet under "Deprecated and removed features" that says what to migrate to and, when known, the release that removes it.
- The tables come from `<TechPreviewTable />` and `<DeprecatedFeaturesTable />`. Don't write the rows by hand. Calico Cloud pages pass `version="$[cloudversion]"`, because a Calico Cloud version has no release line of its own.

## When a status changes

Make these changes in the same pull request:

1. Add the new status to the feature's entry in `data/feature-status.yaml`.
2. Update or remove the notice on every page that references the feature's `id`. A feature that reaches GA loses its notice. A deprecated feature's notice changes from `tech-preview` to `deprecated`, or appears for the first time.
3. Describe the change in the release notes for that minor.
4. Run `yarn test:components`.

The test checks only pages that opt in with a `lifecycle_id` or an `id` on the component.
A feature with no entry in the data file costs nothing, but then nothing catches a stale notice either.
