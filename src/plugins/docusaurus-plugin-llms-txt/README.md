# docusaurus-plugin-llms-txt

A Docusaurus plugin that runs after the build and writes Markdown for AI agents to read:

- A Markdown twin of every doc page, at the page URL plus `.md`.
- An `llms.txt` index and an `llms-full.txt` with every page in one file, for each docs instance.
- Optionally, a root `llms.txt` that links to every instance's files.

It converts the rendered HTML, not the MDX source, so the twins match what readers see.

## Requirements

- Docusaurus 3 with the classic theme. The converter finds page content by the theme's `theme-doc-*` class names.
- The dependencies in `package.json`, installed in the site's own `package.json`.
- A lockfile in the site directory: `yarn.lock`, `package-lock.json` or `pnpm-lock.yaml`.

## Add it to a site

The canonical copy is in tigera/docs at `src/plugins/docusaurus-plugin-llms-txt`.
Other sites use a copy of this directory.

1. Copy the directory into the site.
   Record the tigera/docs commit you copied from.
2. Add the `dependencies` from `package.json` to the site's `package.json`.
3. Add `.llms-cache` to the site's `.gitignore`.
4. Add the plugin to `docusaurus.config`, with options.

To update a copy, replace the whole directory from tigera/docs.
Do not edit a copy in place.

## Options

| Option | Default | Description |
| --- | --- | --- |
| `instances` | `{}` | Docs instance ID to its settings, described below. Only listed instances get output. |
| `skipInstances` | `[]` | Instance IDs that should get no output. Listing them stops the warning for unconfigured instances. |
| `rootIndex` | none | `{ title, description, topPages }` for a root `llms.txt` that links to every instance's files. `topPages` is a list of permalinks. Leave it out on a single-instance site. |
| `optionalSections` | `[]` | Sidebar section labels whose pages go under `## Optional` in `llms.txt`. Matched case-insensitively as substrings. |
| `versions` | `'last'` | `'last'` converts only the version served at the instance's root. `'all'` converts every built version. |

Settings for each instance:

| Setting | Default | Description |
| --- | --- | --- |
| `name` | the instance ID | Product name, used in `llms.txt` and in each twin's frontmatter. |
| `description` | `''` | One line for the `llms.txt` blockquote. |
| `indexPath` | the instance ID | Path under the site's baseUrl where this instance's `llms.txt` and `llms-full.txt` are written. Use `''` for the site root. |
| `rootSection` | none | Instead of writing its own files, list this instance's pages in full under this heading in the root `llms.txt`. Needs `rootIndex`. |
| `unversioned` | `false` | Leave the version out of twin frontmatter. |
| `versionVariable` | none | A key in each version's `variables.js` that holds the user-facing version, for when the Docusaurus version label is not one. |

The plugin also reads `customFields.markdownTwinExclusions` from the site config if it is set.
This is a list of path suffixes for pages that get no twin, such as pages rendered entirely in the browser.
The plugin warns when the list and the pages it skipped disagree.

## Examples

A single-instance site served from `/lynx/`:

```js
plugins: [
  [
    './src/plugins/docusaurus-plugin-llms-txt',
    {
      instances: {
        default: { name: 'Calico Lynx', description: 'Secure agent-to-agent communication.', indexPath: '' },
      },
      versions: 'all',
    },
  ],
],
```

This writes `/lynx/llms.txt`, `/lynx/llms-full.txt` and a twin for every page.

For a site with several instances and a root `llms.txt`, see the plugin entry in tigera/docs `docusaurus.config.js`.

## Build cache

Converting a page takes about 17 ms, so the plugin caches each conversion in `.llms-cache` in the site directory.
An entry is reused while the page's HTML, the converter code, the lockfile and the site URL are unchanged.

A cold run converts every page.
To keep the cache between Netlify builds, tigera/docs uses the build plugin in `netlify/plugins/llms-cache`.
A small site can skip this.

## Tests

The tests are in `__test__` and run under Jest.
The unified and rehype packages are ESM only, so Jest must transform `node_modules`.
In tigera/docs, `jest.config.mjs` sets `transformIgnorePatterns: []` for this.

```sh
yarn jest src/plugins/docusaurus-plugin-llms-txt
```
